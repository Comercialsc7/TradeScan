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

export const searchCustomers = async (term: string) => {
  let query = supabase
    .from('clientes')
    .select('*')
    .order('nomerazao', { ascending: true })

  if (term) {
    const sanitizedTerm = term.trim()
    // Start building the OR filter string
    let searchFilter = `nomerazao.ilike.%${sanitizedTerm}%,apelido.ilike.%${sanitizedTerm}%,cnpj.ilike.%${sanitizedTerm}%,rede.ilike.%${sanitizedTerm}%`

    // If the term is a number, we assume the user might be searching for the 'seqpessoa' (ID/Code)
    // We add an exact match check for this integer column
    if (!isNaN(Number(sanitizedTerm))) {
      searchFilter += `,seqpessoa.eq.${sanitizedTerm}`
    }

    query = query.or(searchFilter)
  }

  const { data, error } = await query.limit(50)

  if (error) {
    throw error
  }

  // Filter unique CNPJs locally since we can't easily do DISTINCT ON in Supabase JS client with partial selection
  // and we want to keep the object structure.
  const uniqueCustomers = data.filter(
    (customer, index, self) =>
      index === self.findIndex((c) => c.cnpj === customer.cnpj),
  )

  return uniqueCustomers
}
