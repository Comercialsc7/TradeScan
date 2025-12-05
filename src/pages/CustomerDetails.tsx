  import { useEffect, useState } from 'react'
  import { useParams, Link } from 'react-router-dom'
  import { Scan, ArrowLeft, Loader2, MapPin, Phone } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { getCustomerById, type Customer } from '@/services/customers'

  export default function CustomerDetailsPage() {
    const { customerId } = useParams<{ customerId: string }>()
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchCustomer = async () => {
        if (!customerId) return
        setLoading(true)
        try {
          const data = await getCustomerById(customerId)
          setCustomer(data)
        } catch (error) {
          console.error('Error fetching customer:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchCustomer()
    }, [customerId])

    if (loading) {
      return (
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    if (!customer) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Cliente não encontrado</h2>
          <Button asChild className="mt-4">
            <Link to="/search-customer">Voltar para busca</Link>
          </Button>
        </div>
      )
    }

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search-customer">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Detalhes do Cliente</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{customer.nome}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{customer.endereco || 'Endereço não cadastrado'}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="h-5 w-5" />
              <span>{customer.telefone || 'Telefone não cadastrado'}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Button size="lg" className="h-24 text-lg flex flex-col gap-2" asChild>
            <Link to="/scanner" state={{ customerId: customer.id }}>
              <Scan className="h-8 w-8" />
              Escanear Produto
            </Link>
          </Button>
          {/* Add more actions here like "View History" */}
        </div>
      </div>
    )
  }
  