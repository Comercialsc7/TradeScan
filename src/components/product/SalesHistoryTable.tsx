import type { Sale } from '@/services/sales'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'

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

  const formatCurrency = (val: number | null) => {
    if (val === null || val === undefined) return '-'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val)
  }

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">Histórico de Vendas</h3>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead className="text-center">Pedido</TableHead>
              <TableHead className="text-center">Qtde.</TableHead>
              <TableHead className="text-right">Valor Unit.</TableHead>
              <TableHead className="text-center">Margem %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  {formatDate(sale.dtainclusao || sale.dtageracaonf)}
                </TableCell>
                <TableCell className="text-center">
                  {sale.nropedvenda || sale.numerodf || '-'}
                </TableCell>
                <TableCell className="text-center">
                  {sale.qtdatendida || 0}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(sale.vlrembtabpreco)}
                </TableCell>
                <TableCell className="text-center">
                  {sale.percmargemitem !== null
                    ? `${sale.percmargemitem.toFixed(2)}%`
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
