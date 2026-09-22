import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generic connection tester for checking if Supabase endpoint is reachable and keys are valid
export async function testConnection() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return false;
    }
    const { data, error } = await supabase.from('properties').select('id').limit(1);
    if (error) {
      console.error('Supabase properties query error:', error);
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          apikey: supabaseAnonKey
        }
      });
      return response.ok;
    }
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}
