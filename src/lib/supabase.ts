import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mwwuudlhfmvqbrybrbcm.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3V1ZGxoZm12cWJyeWJyYmNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjgxMzczMywiZXhwIjoyMTAyMzg5NzMzfQ.I_pgwKggbzlTdXN7hAy-bA4jsP46xjKTWMpB5dAUU5E';

// Server-side client using service role key
export const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://mwwuudlhfmvqbrybrbcm.supabase.co',
  SUPABASE_SERVICE_KEY.length > 100 ? SUPABASE_SERVICE_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3V1ZGxoZm12cWJyeWJyYmNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjgxMzczMywiZXhwIjoyMTAyMzg5NzMzfQ.I_pgwKggbzlTdXN7hAy-bA4jsP46xjKTWMpB5dAUU5E',
  {
    auth: { persistSession: false },
  }
);
