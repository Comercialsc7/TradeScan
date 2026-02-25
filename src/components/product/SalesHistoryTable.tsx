import type { Sale } from '@/services/sales'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { differenceInCalendarDays, format, startOfDay } from 'date-fns'

type SalesHistoryTableProps = {
  sales: Sale[]
}

export const SalesHistoryTable = ({ sales }: SalesHistoryTableProps) => {
  if (sales.length === 0) {
    return (
      <div className="mt-6 rounded-lg border bg-card p-6 text-center text-card-foreground">
        <p className="text-muted-foreground">
          Nenhum histórico de vendas encontrado para este produto.
        </p>
      </div>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    try {
      return format(new Date(dateString), 'dd/MM/yyyy')
    } catch {
      return dateString
    }
  }

  const parseDate = (dateString: string | null) => {
    if (!dateString) return null
    const parsed = new Date(dateString)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  const getDaysSince = (dateString: string | null) => {
    const parsed = parseDate(dateString)
    if (!parsed) return null

    return Math.max(
      0,
      differenceInCalendarDays(startOfDay(new Date()), startOfDay(parsed)),
    )
  }

  const formatCurrency = (val: number | null) => {
    if (val === null || val === undefined) return '-'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val)
  }

  const getUnitPrice = (totalValue: number | null, quantity: number | null) => {
    if (totalValue === null || totalValue === undefined) return null
    if (quantity === null || quantity === undefined || quantity <= 0) return null
    return totalValue / quantity
  }

  const sortedSales = [...sales].sort((a, b) => {
    const dateA = parseDate(a.dtainclusao)?.getTime() ?? 0
    const dateB = parseDate(b.dtainclusao)?.getTime() ?? 0
    return dateB - dateA
  })

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">Histórico de Vendas</h3>
      <div className="rounded-lg border">
        <Table className="min-w-[620px]">
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead className="text-center">Dias</TableHead>
              <TableHead className="text-center">Pedido</TableHead>
              <TableHead className="text-center">Qtde.</TableHead>
              <TableHead className="text-right">Valor Unit.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSales.map((sale, index) => {
              const daysSince = getDaysSince(sale.dtainclusao)
              const unitPrice = getUnitPrice(sale.vlrembtabpreco, sale.qtdatendida)

              return (
              <TableRow key={sale.nropedvenda ?? index}>
                <TableCell className="whitespace-nowrap">
                  {formatDate(sale.dtainclusao)}
                </TableCell>
                <TableCell className="text-center">
                  {daysSince === null ? (
                    '-'
                  ) : (
                    <span className="inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium">
                      {daysSince} dias
                    </span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  {sale.nropedvenda || '-'}
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  {`${sale.qtdatendida ?? 0} UND`}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  {unitPrice === null ? '-' : formatCurrency(unitPrice)}
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
