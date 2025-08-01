// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hcwtpreiicqbizrjhiqs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd3RwcmVpaWNxYml6cmpoaXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTExMDAsImV4cCI6MjA2OTQ2NzEwMH0.JFAUccvdMoB_8pZLOaq2t1m2KM5xY-ffZC6i12aUREs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});