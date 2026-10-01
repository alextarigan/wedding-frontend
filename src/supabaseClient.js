import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key dari dashboard Supabase Anda
const supabaseUrl = 'https://rbyklbtmfcrpqmjlvdrf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieWtsYnRtZmNycHFtamx2ZHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NjIxODQsImV4cCI6MjEwNjQzODE4NH0.S-UKsvpO68jdPyBUfaXGVY9-DjjFKEHLVe_XI3u2oH0'; 

export const supabase = createClient(supabaseUrl, supabaseKey);