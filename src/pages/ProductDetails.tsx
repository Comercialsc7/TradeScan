import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductStatsGrid } from '@/components/product/ProductStatsGrid'
import { SalesHistoryTable } from '@/components/product/SalesHistoryTable'
import { getProductByBarcode, type Product } from '@/services/products'
import { getCustomerById, type Customer } from '@/services/customers'
import { getSalesByCustomerAndProduct, type Sale } from '@/services/sales'
import { toast } from '@/components/ui/use-toast'

const ProductDetailsPage = () => {
  const { customerId, barcode } = useParams<{
    customerId: string
    barcode: string
  }>()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [productSales, setProductSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Detalhes do Produto - TradeScan'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!customerId || !barcode) return

      try {
        setLoading(true)
        setError(null)

        const [customerData, productData] = await Promise.all([
          getCustomerById(customerId),
          getProductByBarcode(barcode),
        ])

        setCustomer(customerData)
        setProduct(productData)

        if (productData) {
          const salesData = await getSalesByCustomerAndProduct(
            customerId,
            barcode,
          )
          setProductSales(salesData)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Erro ao carregar informações.')
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do produto.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [customerId, barcode])

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Carregando dados...</p>
      </div>
    )
  }

  if (error || !product || !customer) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <p className="text-muted-foreground">
          {error || 'Os detalhes do produto não foram encontrados.'}
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
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-semibold">
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
            <CardTitle className="text-2xl">{product.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{product.descricao}</p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Cliente: {customer.nome}
            </p>
          </CardContent>
        </Card>

        <ProductStatsGrid product={product} sales={productSales} />
        <SalesHistoryTable sales={productSales} />
      </main>
    </div>
  )
}

export default ProductDetailsPage
