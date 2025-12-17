import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Sale = Database['public']['Tables']['vendas']['Row']
export type Product = Database['public']['Tables']['produtos']['Row']
export type Customer = Database['public']['Tables']['clientes']['Row']

export const getSalesHistory = async (
  seqproduto: number,
  seqpessoa?: number | null,
): Promise<Sale[]> => {
  let query = supabase
    .from('vendas')
    .select(
      'nropedvenda, dtainclusao, qtdatendida, vlrembtabpreco, numerodf, percmargemitem, dtageracaonf, id, seqproduto, seqpessoa',
    )
    .eq('seqproduto', seqproduto)
    .order('dtainclusao', { ascending: false })

  if (seqpessoa !== undefined && seqpessoa !== null) {
    query = query.eq('seqpessoa', seqpessoa)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching sales history:', error)
    return []
  }
  return data || []
}

export const getProductAndSales = async (
  barcode: string,
  customerId: string,
) => {
  // 1. Get the customer first to have their 'seqpessoa'
  const { data: customer, error: customerError } = await supabase
    .from('clientes')
    .select('seqpessoa')
    .eq('id', customerId)
    .single()

  if (customerError || !customer?.seqpessoa) {
    console.error('Error fetching customer or seqpessoa missing:', customerError)
    throw new Error('Cliente não encontrado ou inválido.')
  }

  // 2. Get the product by barcode to have its 'seqproduto'
  const cleanBarcode = barcode.replace(/\D/g, '')
  const barcodeNum = Number(cleanBarcode)

  if (isNaN(barcodeNum)) {
    throw new Error('Código de barras inválido.')
  }

  const { data: product, error: productError } = await supabase
    .from('produtos')
    .select('*')
    .eq('codbarras', barcodeNum)
    .maybeSingle()

  if (productError || !product) {
    console.error('Product not found:', productError)
    throw new Error('Produto não encontrado.')
  }

  // 3. Fetch sales history for this customer and product
  // We use the seqpessoa and seqproduto to link sales
  const sales = await getSalesHistory(product.seqproduto!, customer.seqpessoa)

  return {
    product,
    sales,
  }
}
