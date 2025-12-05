  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { useAuth } from '@/contexts/AuthContext'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
  import { toast } from '@/components/ui/use-toast'
  import { Loader2 } from 'lucide-react'

  export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !password) {
        toast({
          title: 'Campos obrigatórios',
          description: 'Por favor, preencha email e senha.',
          variant: 'destructive',
        })
        return
      }

      setIsLoading(true)
      try {
        const { error } = await signIn(email, password)
        if (error) {
          throw error
        }
        navigate('/')
      } catch (error: any) {
        console.error(error)
        toast({
          title: 'Erro no login',
          description: error.message || 'Credenciais inválidas.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">TradeScan</CardTitle>
            <CardDescription>Entre para acessar o sistema</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }
  