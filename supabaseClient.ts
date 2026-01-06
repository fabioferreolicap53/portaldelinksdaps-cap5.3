
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uyhzufftbavgtzyjhcxm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aHp1ZmZ0YmF2Z3R6eWpoY3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NzQxNDksImV4cCI6MjA4MzI1MDE0OX0.mnB6UP815QF36wHnM6K7syfLMacb-Wbw5Zxgkb503Fs';

export const supabase = createClient(supabaseUrl, supabaseKey);
