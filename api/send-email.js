import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { to, subject, text, html, name, isVerification } = req.body || {};

  if (!to || (!isVerification && !subject && (!text && !html))) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ success: false, error: 'Database credentials not configured.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    let finalSubject = subject;
    let finalText = text;
    let finalHtml = html;

    if (isVerification) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      try {
        const { error: dbErr } = await supabase
          .from('verification_codes')
          .upsert({ email: to, code: code });

        if (dbErr) {
          console.warn('Notice: Failed to save verification code in Supabase:', dbErr.message);
        }
      } catch (dbEx) {
        console.warn('Supabase sync skipped for verification code:', dbEx.message);
      }

      finalSubject = `Verification Code: ${code}`;
      finalText = `Hello ${name || 'Member'},\n\nYour Aura Estates verification code is: ${code}\n\nThis code is valid for single-use login.`;
      finalHtml = `<p>Hello <strong>${name || 'Member'}</strong>,</p><p>Your verification code is: <strong style="font-size: 1.5rem; color: #D4AF37;">${code}</strong></p><p>This code is valid for single-use login.</p>`;
    }

    const mailOptions = {
      from: `"Aura Estates" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject: finalSubject,
      text: finalText,
      html: finalHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email dispatched successfully:', info.messageId);

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Email dispatch error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
