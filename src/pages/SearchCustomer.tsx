import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, ChevronRight, ScanLine } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Customer = {
  id: string
  name: string
  avatarUrl: string
}

const customers: Customer[] = [
  {
    id: '789123',
    name: 'Maria Rodriguez',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  {
    id: '456789',
    name: 'John Smith',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
  },
  {
    id: '123456',
    name: 'Emily Johnson',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
  },
  {
    id: '987654',
    name: 'David Brown',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
  },
  {
    id: '321654',
    name: 'Jessica Williams',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=5',
  },
  {
    id: '654987',
    name: 'Michael Jones',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=6',
  },
]

const SearchCustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Search Customer - TradeScan'
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

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-zinc-900 dark:text-white" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-semibold text-zinc-900 dark:text-white">
          Search
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
          <Input
            type="text"
            placeholder="Customer Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 rounded-xl border-none bg-zinc-200 pl-12 text-zinc-900 placeholder:text-zinc-500 dark:bg-zinc-800/50 dark:text-white dark:placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-2">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              onClick={() => console.log(`Selected customer ${customer.id}`)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                <AvatarFallback>
                  {customer.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {customer.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Customer ID: {customer.id}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            </div>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 border-t bg-background p-4">
        <Button className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90">
          <ScanLine className="mr-2 h-6 w-6" />
          Scan Barcode
        </Button>
      </footer>
    </div>
  )
}

export default SearchCustomerPage
