import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Customer = Database['public']['Tables']['clientes']['Row']

export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching customer:', error)
    return null
  }

  return data
}
