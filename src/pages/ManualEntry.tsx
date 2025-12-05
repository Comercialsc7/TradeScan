  import { useState } from 'react'
  import { useNavigate, useLocation, Link } from 'react-router-dom'
  import { ArrowLeft, Search, Loader2 } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { getProductByBarcode } from '@/services/products'
  import { toast } from '@/components/ui/use-toast'

  export default function ManualEntryPage() {
    const [barcode, setBarcode] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const customerId = location.state?.customerId

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!barcode) return

      if (!customerId) {
        toast({
          title: "Erro",
          description: "Cliente não identificado. Por favor inicie pela busca de clientes.",
          variant: "destructive"
        })
        navigate('/search-customer')
        return
      }

      setLoading(true)
      try {
        const product = await getProductByBarcode(barcode)
        if (product) {
          navigate(`/customer/${customerId}/product/${barcode}`)
        } else {
          toast({
            title: "Produto não encontrado",
            description: `Nenhum produto encontrado com o código ${barcode}`,
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error("Error searching product:", error)
        toast({
            title: "Erro",
            description: "Erro ao buscar produto.",
            variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="max-w-md mx-auto space-y-6 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Digitar Código</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Código de Barras / EAN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Digite o código do produto"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                type="number"
                className="text-lg h-12"
                autoFocus
              />
              <Button type="submit" className="w-full" size="lg" disabled={loading || !barcode}>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Buscar Produto
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
  