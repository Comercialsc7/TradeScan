import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { customers, products } from '@/lib/mock-data'
import { ProductStatsGrid } from '@/components/product/ProductStatsGrid'

const ProductDetailsPage = () => {
  const { customerId, barcode } = useParams<{
    customerId: string
    barcode: string
  }>()
  const navigate = useNavigate()

  const customer = customers.find((c) => c.id === customerId)
  const product = products.find((p) => p.barcode === barcode)

  useEffect(() => {
    document.title = 'Detalhes do Produto - TradeScan'
    const originalThemeIsDark =
      document.documentElement.classList.contains('dark')
    document.documentElement.classList.add('dark')

    return () => {
      if (!originalThemeIsDark) {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  if (!customer || !product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
        <h1 className="text-2xl font-bold">Informação não encontrada</h1>
        <p className="text-muted-foreground">
          Os detalhes do cliente ou do produto não foram encontrados.
        </p>
        <Button asChild className="mt-4">
          <Link to="/search-customer">Voltar para a busca</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-zinc-900 dark:text-white" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-semibold text-zinc-900 dark:text-white">
          Detalhes do Produto
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader>
            <p className="text-sm font-medium text-primary">
              SKU: {product.sku}
            </p>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              ID da Venda: {product.saleId}
            </p>
          </CardContent>
        </Card>

        <ProductStatsGrid product={product} />
      </main>
    </div>
  )
}

export default ProductDetailsPage
