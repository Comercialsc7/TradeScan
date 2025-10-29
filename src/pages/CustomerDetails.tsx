import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Building,
  Hash,
  Info,
  MapPin,
  Phone,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { customers } from '@/lib/mock-data'

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const customer = customers.find((c) => c.id === id)

  useEffect(() => {
    if (customer) {
      document.title = `${customer.name} - TradeScan`
    } else {
      document.title = 'Cliente não encontrado - TradeScan'
    }
  }, [customer])

  if (!customer) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
        <h1 className="text-2xl font-bold">Cliente não encontrado</h1>
        <p className="text-muted-foreground">
          O cliente que você está procurando não existe.
        </p>
        <Button asChild className="mt-4">
          <Link to="/search-customer">Voltar para a busca</Link>
        </Button>
      </div>
    )
  }

  const details = [
    { icon: Hash, label: 'ID', value: customer.id },
    { icon: Info, label: 'CNPJ', value: customer.cnpj },
    { icon: Users, label: 'Rede', value: customer.rede },
    { icon: Building, label: 'Segmento', value: customer.segmento },
    { icon: MapPin, label: 'Cidade', value: customer.cidade },
    { icon: MapPin, label: 'Endereço', value: customer.endereco },
    { icon: Phone, label: 'Telefone', value: customer.telefone },
  ]

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-zinc-900 dark:text-white" />
        </Button>
        <h1 className="flex-1 truncate px-2 text-center text-lg font-semibold text-zinc-900 dark:text-white">
          {customer.name}
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {details.map((detail) => (
                <li key={detail.label} className="flex items-start space-x-3">
                  <detail.icon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="font-semibold text-foreground">
                      {detail.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default CustomerDetailsPage
