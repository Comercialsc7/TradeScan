import { getCustomerById } from '@/services/customers'

// Sale type reflects the N8N JOIN query response
export type Sale = {
  seqproduto: number | null
  nropedvenda: string | null
  dtainclusao: string | null
  seqpessoa: number | null
  vlrembtabpreco: number | null
  qtdatendida: number | null
  desccompleta: string | null
  codacessonum: string | null
}

// Product info derived from the first sale record
export type ProductInfo = {
  seqproduto: number | null
  desccompleta: string | null
  codbarras: string | null
}

const normalizeSalesResponse = (payload: unknown): Sale[] => {
  if (Array.isArray(payload)) {
    return payload as Sale[]
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const obj = payload as Record<string, unknown>
  const candidateArrays = [obj.data, obj.items, obj.results]

  for (const candidate of candidateArrays) {
    if (Array.isArray(candidate)) {
      return candidate as Sale[]
    }
  }

  const hasSaleShape =
    'seqproduto' in obj ||
    'nropedvenda' in obj ||
    'dtainclusao' in obj ||
    'codacessonum' in obj

  return hasSaleShape ? [obj as Sale] : []
}

export const getSalesHistory = async (
  produto: number | null | undefined,
  seqpessoa?: number | null,
): Promise<Sale[]> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL_SALES

  if (!webhookUrl) {
    console.error('Missing VITE_N8N_WEBHOOK_URL_SALES env var')
    return []
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'vendas',
        produto: produto ?? null,
        seqpessoa: seqpessoa ?? null,
      }),
    })

    if (!response.ok) {
      throw new Error(`N8N Webhook error: ${response.status} ${response.statusText}`)
    }

    const rawText = await response.text()
    if (!rawText?.trim()) {
      return []
    }

    const parsed = JSON.parse(rawText) as unknown
    return normalizeSalesResponse(parsed)
  } catch (error) {
    console.error('Error fetching sales from N8N:', error)
    return []
  }
}

export const getProductAndSales = async (
  barcode: string,
  customerId: string,
): Promise<{ product: ProductInfo; sales: Sale[] }> => {
  // 1. Get customer via cache (sessionStorage) or N8N
  const customer = await getCustomerById(customerId)

  if (!customer?.seqpessoa) {
    console.error('Customer not found or missing seqpessoa:', customerId)
    throw new Error('Cliente não encontrado ou inválido.')
  }

  // 2. Query sales directly via N8N — the JOIN already resolves product info
  const cleanBarcode = Number(barcode.replace(/\D/g, ''))
  const sales = await getSalesHistory(cleanBarcode, customer.seqpessoa)

  if (sales.length === 0) {
    throw new Error('Produto não encontrado ou sem histórico de vendas para este cliente.')
  }

  // 3. Derive product info from the first sale record
  const firstSale = sales[0]
  const product: ProductInfo = {
    seqproduto: firstSale.seqproduto,
    desccompleta: firstSale.desccompleta,
    codbarras: firstSale.codacessonum,
  }

  return { product, sales }
}
