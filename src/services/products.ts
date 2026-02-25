import { Database } from '@/lib/supabase/types'

export type Product = Database['public']['Tables']['produtos']['Row']

export const getProductByBarcode = async (
  barcode: string,
): Promise<Product | null> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL_PRODUCTS

  if (!webhookUrl) {
    console.error('Missing VITE_N8N_WEBHOOK_URL_PRODUCTS env var')
    return null
  }

  // Remove any non-numeric characters just in case
  const cleanBarcode = barcode.replace(/\D/g, '')

  if (!cleanBarcode) {
    console.warn('Invalid barcode format (empty after cleaning):', barcode)
    return null
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'produtos',
        barcode: cleanBarcode
      }),
    })

    if (!response.ok) {
      throw new Error(`N8N Webhook error: ${response.status} ${response.statusText}`)
    }

    const data: Product[] = await response.json()

    // Return the first product found, or null
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('Error fetching product from N8N:', error)
    return null
  }
}
