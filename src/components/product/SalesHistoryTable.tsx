import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Sale } from '@/services/sales'

type SalesHistoryTableProps = {
  sales: Sale[]
}

export const SalesHistoryTable = ({ sales }: SalesHistoryTableProps) => {
  if (sales.length === 0) {
    return (
      <div className="mt-6 rounded-lg border bg-card p-6 text-center text-card-foreground">
        <h3 className="mb-2 text-lg font-semibold">Histórico de Vendas</h3>
        <p className="text-muted-foreground">
          Nenhum histórico de vendas disponível
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">Histórico de Vendas</h3>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead className="text-center">Qtde.</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-center">Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  {sale.DATA_FATURAMENTO
                    ? new Date(sale.DATA_FATURAMENTO).toLocaleDateString(
                        'pt-BR',
                        {
                          timeZone: 'UTC',
                        },
                      )
                    : '-'}
                </TableCell>
                <TableCell className="text-center">
                  {sale.QTDE_EMB || 0}
                </TableCell>
                <TableCell className="text-right">
                  {`R$ ${sale.VALOR.toFixed(2)}`}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={cn({
                      'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300':
                        sale.SITUACAO === 'Faturado',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300':
                        sale.SITUACAO === 'Pendente',
                      'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300':
                        sale.SITUACAO === 'Cancelado',
                    })}
                    variant="secondary"
                  >
                    {sale.SITUACAO || 'Desconhecido'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
