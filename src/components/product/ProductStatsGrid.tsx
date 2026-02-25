import {
  Calendar,
  DollarSign,
  Archive,
  Tag,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { isAfter, subDays } from 'date-fns'
import type { ProductInfo, Sale } from '@/services/sales'

type ProductStatsGridProps = {
  product: ProductInfo
  sales: Sale[]
}

type Stat = {
  icon: LucideIcon
  label: string
  value: string
}

export const ProductStatsGrid = ({ product, sales }: ProductStatsGridProps) => {
  const toSafeNumber = (value: unknown) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  const latestSale =
    sales.length > 0
      ? [...sales].sort(
        (a, b) =>
          new Date(b.dtainclusao || '').getTime() -
          new Date(a.dtainclusao || '').getTime(),
      )[0]
      : null

  const lastSalePrice = toSafeNumber(latestSale?.vlrembtabpreco)

  const salesLast30Days = sales
    .filter((sale) => {
      if (!sale.dtainclusao) return false
      return isAfter(new Date(sale.dtainclusao), subDays(new Date(), 30))
    })
    .reduce((acc, sale) => acc + toSafeNumber(sale.qtdatendida), 0)

  const stats: Stat[] = [
    {
      icon: Calendar,
      label: 'Última Compra',
      value: latestSale?.dtainclusao
        ? new Date(latestSale.dtainclusao).toLocaleDateString('pt-BR')
        : 'N/A',
    },
    {
      icon: DollarSign,
      label: 'Último Preço Venda',
      value: lastSalePrice
        ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(lastSalePrice)
        : 'R$ 0,00',
    },
    {
      icon: Archive,
      label: 'Cód. Barras',
      value: product.codbarras?.toString() || '-',
    },
    {
      icon: Tag,
      label: 'ID do Produto',
      value: product.seqproduto?.toString() || '-',
    },
    {
      icon: TrendingUp,
      label: 'Vendas (30 dias)',
      value: salesLast30Days.toString(),
    },
  ]

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <stat.icon className="h-5 w-5 flex-shrink-0 text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </div>
          <p className="mt-2 text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
