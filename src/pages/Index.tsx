import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { type CarouselApi } from '@/components/ui/carousel'
import { ScanLine, Store, Search, BarChart3, History } from 'lucide-react'
import { WelcomeCarousel } from '@/components/welcome/WelcomeCarousel'
import { CarouselPagination } from '@/components/welcome/CarouselPagination'
import { FeatureCards } from '@/components/welcome/FeatureCards'

const slides = [
  {
    image:
      'https://www.grupocpcon.com/wp-content/uploads/2024/06/codigo-de-barras-768x439.webp',
    alt: 'Imagem representando pagamento com código de barras',
    title: 'Leitor Inteligente de Produtos Comerciais',
    description:
      'Utilize a câmera do seu celular para escanear produtos e obter informações detalhadas de forma rápida e precisa.',
    cards: [
      {
        icon: ScanLine,
        title: 'Orientações para a Leitura do Código EAN',
        description:
          'Posicione o código de barras dentro da área de leitura e garanta boa iluminação para uma captura precisa.',
      },
      {
        icon: Store,
        title: 'Seleção Exata da Loja',
        description:
          'Escolha a loja correta para evitar erros no processo ou confusão e garantir a acuracidade das informações.',
      },
    ],
  },
  {
    image:
      'https://img.freepik.com/fotos-premium/modelo-de-barra-de-pesquisa-de-site-com-navegacao-do-navegador-ilustracao-vetorial-realista-de-flecha-3d-do-cursor_1191225-12357.jpg',
    alt: 'Imagem representando uma barra de busca inteligente',
    title: 'Busca Inteligente e Avançada',
    description:
      'Esta é uma barra de busca inteligente, onde será possível consultar por razão do cliente, fantasia, CNPJ, rede e código.',
    cards: [
      {
        icon: Search,
        title: 'Filtros de Pesquisa',
        description:
          'Utilize múltiplos critérios como CNPJ, rede ou código para refinar sua busca e encontrar clientes com precisão.',
      },
      {
        icon: Store,
        title: 'Informações Detalhadas',
        description:
          'Acesse rapidamente o histórico e os dados completos dos clientes para um atendimento mais eficaz e personalizado.',
      },
    ],
  },
  {
    image:
      'https://img.freepik.com/free-psd/pie-chart-growth-report-financial-graph-icon-isolated-3d-render-illustration_47987-11328.jpg',
    alt: 'Imagem representando um gráfico financeiro',
    title: 'Leitura Inteligente de Dados',
    description:
      'Obtenha insights valiosos sobre os produtos, como margem, última compra e último preço praticado, com base na seleção do cliente e na leitura do produto.',
    cards: [
      {
        icon: BarChart3,
        title: 'Análise de Margem',
        description:
          'Visualize a margem de lucro de cada produto para tomar decisões de precificação mais estratégicas.',
      },
      {
        icon: History,
        title: 'Histórico de Preços',
        description:
          'Acesse o último preço praticado e a data da última compra para negociações mais informadas.',
      },
    ],
  },
]

const Index = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = 'Leitor de Produtos - Boas-Vindas'
  }, [])

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1))
  }, [api])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-lg text-center">
          <WelcomeCarousel slides={slides} setApi={setApi} />
          <CarouselPagination count={count} current={current} />
          <FeatureCards cards={slides[current - 1]?.cards ?? []} />
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
