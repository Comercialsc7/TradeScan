  import { useState, useEffect } from 'react'
  import { Link } from 'react-router-dom'
  import { Search, User, ChevronRight, Loader2 } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Card, CardContent } from '@/components/ui/card'
  import { supabase } from '@/lib/supabase/client'
  import type { Customer } from '@/services/customers'
  import { useDebounce } from '@/hooks/use-mobile' // Using mobile hook just for debounce if available, or implement custom. 
  // Since useDebounce is not guaranteed in use-mobile, I will implement simple effect.

  export default function SearchCustomerPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const searchCustomers = async () => {
        if (searchTerm.length < 2) {
          setCustomers([])
          return
        }

        setLoading(true)
        try {
          const { data } = await supabase
            .from('clientes')
            .select('*')
            .ilike('nome', `%${searchTerm}%`)
            .limit(10)

          setCustomers(data || [])
        } catch (error) {
          console.error('Error searching customers:', error)
        } finally {
          setLoading(false)
        }
      }

      const timeoutId = setTimeout(searchCustomers, 500)
      return () => clearTimeout(timeoutId)
    }, [searchTerm])

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Buscar Cliente</h1>
          <p className="text-muted-foreground">
            Digite o nome do cliente para iniciar.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Nome do cliente..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && customers.map((customer) => (
            <Link key={customer.id} to={`/customer/${customer.id}`}>
              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{customer.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        ID: {customer.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}

          {!loading && searchTerm.length >= 2 && customers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum cliente encontrado.
            </div>
          )}
        </div>
      </div>
    )
  }
  