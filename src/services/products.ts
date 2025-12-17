import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Product = Database['public']['Tables']['produtos']['Row']

export const getProductByBarcode = async (
  barcode: string,
): Promise<Product | null> => {
  // Database uses 'codbarras' as number
  // Remove any non-numeric characters just in case
  const cleanBarcode = barcode.replace(/\D/g, '')
  const barcodeNum = Number(cleanBarcode)

  if (isNaN(barcodeNum)) {
    console.warn('Invalid barcode format (not a number):', barcode)
    return null
  }

  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('codbarras', barcodeNum)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}
