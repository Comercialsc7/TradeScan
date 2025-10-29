import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

type Customer = {
  id: string
  name: string
}

const customers: Customer[] = [
  {
    id: '789123',
    name: 'Maria Rodriguez',
  },
  {
    id: '456789',
    name: 'John Smith',
  },
  {
    id: '123456',
    name: 'Emily Johnson',
  },
  {
    id: '987654',
    name: 'David Brown',
  },
  {
    id: '321654',
    name: 'Jessica Williams',
  },
  {
    id: '654987',
    name: 'Michael Jones',
  },
]

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
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.includes(searchTerm),
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
            placeholder="Nome ou ID do Cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 rounded-xl border-none bg-zinc-200 pl-12 text-zinc-900 placeholder:text-zinc-500 dark:bg-zinc-800/50 dark:text-white dark:placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-2">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={cn(
                'flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                {
                  'bg-primary/10 dark:bg-primary/20':
                    selectedCustomerId === customer.id,
                },
              )}
              onClick={() => handleCustomerSelect(customer.id)}
            >
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {customer.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  ID do Cliente: {customer.id}
                </p>
              </div>
              {selectedCustomerId === customer.id ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <ChevronRight className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 border-t bg-background p-4">
        <Button className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90">
          <ScanLine className="mr-2 h-6 w-6" />
          Escanear Código de Barras
        </Button>
      </footer>
    </div>
  )
}

export default SearchCustomerPage
