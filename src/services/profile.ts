import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}
