  import { Link } from 'react-router-dom'
  import { Users, Search } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

  export default function IndexPage() {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao TradeScan</h1>
          <p className="mt-2 text-muted-foreground">
            Selecione uma opção abaixo para começar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Buscar Cliente</CardTitle>
              <CardDescription>
                Encontre clientes para iniciar o atendimento ou escanear produtos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/search-customer">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Add more dashboard cards here as the app grows */}
        </div>
      </div>
    )
  }
  