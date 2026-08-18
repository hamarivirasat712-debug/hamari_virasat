import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mwwuudlhfmvqbrybrbcm.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13d3V1ZGxoZm12cWJyeWJyYmNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjgxMzczMywiZXhwIjoyMTAyMzg5NzMzfQ.I_pgwKggbzlTdXN7hAy-bA4jsP46xjKTWMpB5dAUU5E';

// Server-side client using service role key
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});
