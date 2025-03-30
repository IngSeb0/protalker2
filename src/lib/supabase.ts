
import { createClient } from '@supabase/supabase-js';

// These are public keys, which is fine to include in the client code
const supabaseUrl = 'https://hneuveibybyhvfwipxqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZXV2ZWlieWJ5aHZmd2lweHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NTA5MzYsImV4cCI6MjAzMzMyNjkzNn0.pu8zVXCLMlkrOXeHtc_7YLv46vCrVOWwAy3RGLJrBiQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
