import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Sale = Database['public']['Tables']['vendas']['Row']

export const getSalesByCustomerAndProduct = async (
  customerId: string,
  productBarcode: string,
): Promise<Sale[]> => {
  const { data, error } = await supabase
    .from('vendas')
    .select('*')
    .eq('CLIENTE', customerId)
    .eq('PRODUTO', productBarcode)
    .order('DATA_FATURAMENTO', { ascending: false })

  if (error) {
    console.error('Error fetching sales:', error)
    return []
  }

  return data || []
}
