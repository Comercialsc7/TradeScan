import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Search, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { manualEntrySchema, type ManualEntrySchema } from '@/lib/schemas'
import { products, type Product } from '@/lib/mock-data'
import { ProductDetailsCard } from '@/components/product/ProductDetailsCard'

const ManualEntryPage = () => {
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Digitar Código - TradeScan'
  }, [])

  const form = useForm<ManualEntrySchema>({
    resolver: zodResolver(manualEntrySchema),
    defaultValues: {
      barcode: '',
    },
  })

  const onSubmit = (data: ManualEntrySchema) => {
    setNotFound(false)
    setFoundProduct(null)

    const product = products.find((p) => p.barcode === data.barcode)

    if (product) {
      setFoundProduct(product)
    } else {
      setNotFound(true)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-zinc-900 dark:text-white" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-semibold text-zinc-900 dark:text-white">
          Digitar Código
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <p className="text-center text-muted-foreground">
          Digite o código de barras do produto para buscar suas informações.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Barras (EAN-13)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Insira os 13 dígitos do código"
                      className="h-14 text-center text-lg tracking-widest"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-14 w-full rounded-xl text-base font-semibold"
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar Produto
            </Button>
          </form>
        </Form>

        {notFound && (
          <Alert variant="destructive" className="mt-6 animate-fade-in">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Produto não encontrado</AlertTitle>
            <AlertDescription>
              Nenhum produto corresponde ao código de barras informado.
              Verifique o número e tente novamente.
            </AlertDescription>
          </Alert>
        )}

        {foundProduct && <ProductDetailsCard product={foundProduct} />}
      </main>
    </div>
  )
}

export default ManualEntryPage
