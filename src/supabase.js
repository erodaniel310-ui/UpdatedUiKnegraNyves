// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yjsxofmdjucagogiirif.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqc3hvZm1kanVjYWdvZ2lpcmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzOTM3MDUsImV4cCI6MjA2ODk2OTcwNX0.RsYnXtrUzvPFtg9IwtiPUx3rjf2-OdkUz4Rhk-HCoeo'

export const supabase = createClient(supabaseUrl, supabaseKey)
