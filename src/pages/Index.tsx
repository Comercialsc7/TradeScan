import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScanLine, Search, BarChart3, History, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const Index = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    document.title = 'Dashboard - PayApp'
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const features = [
    {
      icon: ScanLine,
      title: 'Leitor de Produtos',
      description: 'Escaneie produtos para obter informações detalhadas.',
    },
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Consulte por cliente, CNPJ, rede e código.',
    },
    {
      icon: BarChart3,
      title: 'Análise de Dados',
      description: 'Obtenha insights sobre margem e preços.',
    },
    {
      icon: History,
      title: 'Histórico de Compras',
      description: 'Acesse o último preço e data da última compra.',
    },
  ]

  return (
    <div className="flex w-full flex-col animate-fade-in-up">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sair</span>
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-8 py-8">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-foreground">
            Bem-vindo ao PayApp!
          </h2>
          <p className="text-muted-foreground">
            Aqui estão as principais funcionalidades à sua disposição.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {feature.title}
                </CardTitle>
                <feature.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Index
