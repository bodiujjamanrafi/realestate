import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Set up SMTP transporter using Gmail configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take messages');
  }
});

// Endpoint to send emails
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, html, name, isVerification } = req.body;

  if (!to || (!isVerification && !subject && (!text && !html))) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  try {
    let finalSubject = subject;
    let finalText = text;
    let finalHtml = html;

    if (isVerification) {
      // Generate a secure 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Save code to Supabase
      const { error: dbErr } = await supabase
        .from('verification_codes')
        .upsert({ email: to, code: code });

      if (dbErr) {
        console.error('Failed to save verification code in Supabase:', dbErr);
        return res.status(500).json({ success: false, error: `Database error: ${dbErr.message}` });
      }

      finalSubject = `Verification Code: ${code}`;
      finalText = `Hello ${name || 'Member'},\n\nYour Aura Estates verification code is: ${code}\n\nThis code is valid for single-use login.`;
      finalHtml = `<p>Hello <strong>${name || 'Member'}</strong>,</p><p>Your verification code is: <strong style="font-size: 1.5rem; color: #D4AF37;">${code}</strong></p><p>This code is valid for single-use login.</p>`;
    }

    const mailOptions = {
      from: `"Aura Estates" <${process.env.SMTP_FROM}>`,
      to,
      subject: finalSubject,
      text: finalText,
      html: finalHtml,
    };

    if (isVerification) {
      console.log(`Sending verification email to ${to}...`);
    } else {
      console.log(`Sending email to ${to} with subject "${finalSubject}"...`);
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    if (isVerification) {
      console.error('Failed to send verification email');
    } else {
      console.error('Failed to send email:', error);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Email notification server running on port ${PORT}`);
  });
}

export default app;
