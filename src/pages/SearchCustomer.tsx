import { useState, useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  ChevronRight,
  ScanLine,
  CheckCircle2,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { customers } from '@/lib/mock-data'

const SearchCustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  )
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Buscar Cliente - TradeScan'
  }, [])

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
      return customers
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase()
    const numericSearchTerm = lowercasedSearchTerm.replace(/[^\d]/g, '')

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowercasedSearchTerm) ||
        customer.id.includes(lowercasedSearchTerm) ||
        customer.cnpj.replace(/[^\d]/g, '').includes(numericSearchTerm) ||
        customer.rede.toLowerCase().includes(lowercasedSearchTerm),
    )
  }, [searchTerm])

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-zinc-900 dark:text-white" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-semibold text-zinc-900 dark:text-white">
          Buscar Cliente
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
          <Input
            type="text"
            placeholder="Buscar por nome, ID, CNPJ ou rede"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 rounded-xl border-none bg-zinc-200 pl-12 text-zinc-900 placeholder:text-zinc-500 dark:bg-zinc-800/50 dark:text-white dark:placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={cn(
                'flex cursor-pointer items-center space-x-4 rounded-lg p-4 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                {
                  'bg-primary/10 ring-2 ring-primary dark:bg-primary/20':
                    selectedCustomerId === customer.id,
                },
              )}
              onClick={() => handleCustomerSelect(customer.id)}
            >
              <div className="flex-1 space-y-1.5">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {customer.name}
                </p>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400 sm:grid-cols-2">
                  <p>
                    <span className="font-medium">ID:</span> {customer.id}
                  </p>
                  <p>
                    <span className="font-medium">CNPJ:</span> {customer.cnpj}
                  </p>
                  <p className="col-span-full">
                    <span className="font-medium">Rede:</span> {customer.rede}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {selectedCustomerId === customer.id && (
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-primary" />
                )}
                <Link
                  to={`/customer/${customer.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ver detalhes de ${customer.name}`}
                >
                  <ChevronRight className="h-6 w-6 flex-shrink-0 text-zinc-400 dark:text-zinc-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 border-t bg-background p-4">
        <Button
          className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90"
          disabled={!selectedCustomerId}
        >
          <ScanLine className="mr-2 h-6 w-6" />
          Escanear Código de Barras
        </Button>
      </footer>
    </div>
  )
}

export default SearchCustomerPage
