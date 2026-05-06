import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function checkSupabaseConnection(): Promise<boolean> {
  if (!supabase) {
    return false
  }

  const { error } = await supabase.from('task_posts').select('id', { head: true }).limit(1)

  return !error
}

