import { createClient } from '@supabase/supabase-js';

const DEFAULT_URL = 'https://mwwuudlhfmvqbrybrbcm.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3V1ZGxoZm12cWJyeWJyYmNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjgxMzczMywiZXhwIjoyMTAyMzg5NzMzfQ.I_pgwKggbzlTdXN7hAy-bA4jsP46xjKTWMpB5dAUU5E';

function getUrl(): string {
  const envUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return envUrl.startsWith('http') ? envUrl : DEFAULT_URL;
}

function getKey(): string {
  const envKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';
  return envKey.startsWith('eyJ') ? envKey : DEFAULT_KEY;
}

// Server-side client using service role key
export const supabase = createClient(getUrl(), getKey(), {
  auth: { persistSession: false },
});
