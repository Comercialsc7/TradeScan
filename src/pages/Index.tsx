import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScanLine, Store } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const Index = () => {
  useEffect(() => {
    document.title = 'Leitor de Produtos - Boas-Vindas'
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="flex items-center justify-end p-4 sm:p-6">
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-lg text-center">
          <img
            src="https://www.grupocpcon.com/wp-content/uploads/2024/06/codigo-de-barras-768x439.webp"
            alt="Imagem representando pagamento com código de barras"
            data-alt="Imagem representando pagamento com código de barras"
            className="mx-auto mb-8 w-full max-w-xs rounded-lg"
          />
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Leitor Inteligente de Produtos Comerciais
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Utilize a câmera do seu celular para escanear produtos e obter
            informações detalhadas de forma rápida e precisa.
          </p>
          <div className="my-8 flex justify-center space-x-2">
            <span className="h-2 w-6 rounded-full bg-primary"></span>
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="text-left">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ScanLine className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-semibold">
                  Orientações para a Leitura do Código EAN
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Posicione o código de barras dentro da área de leitura e
                  garanta boa iluminação para uma captura precisa.
                </p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Store className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-semibold">
                  Seleção Exata da Loja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Escolha a loja correta para evitar erros no processo ou
                  confusão e garantir a acuracidade das informações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="p-4 sm:p-6 md:p-8">
        <div className="mx-auto w-full max-w-lg space-y-4">
          <Button
            asChild
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            <Link to="/auth?mode=signup">Começar</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link
              to="/auth?mode=login"
              className="font-semibold text-primary hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index
