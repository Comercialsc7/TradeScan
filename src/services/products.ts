import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Product = Database['public']['Tables']['produtos']['Row']

export const getProductByBarcode = async (barcode: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('ean', barcode)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}
