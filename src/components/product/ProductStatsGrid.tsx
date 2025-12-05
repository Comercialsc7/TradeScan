import {
  Calendar,
  DollarSign,
  Percent,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { isAfter, subDays } from 'date-fns'
import type { Product } from '@/services/products'
import type { Sale } from '@/services/sales'

type ProductStatsGridProps = {
  product: Product
  sales: Sale[]
}

type Stat = {
  icon: LucideIcon
  label: string
  value: string
}

export const ProductStatsGrid = ({ product, sales }: ProductStatsGridProps) => {
  const latestSale =
    sales.length > 0
      ? sales.sort(
          (a, b) =>
            new Date(b.DATA_FATURAMENTO || 0).getTime() -
            new Date(a.DATA_FATURAMENTO || 0).getTime(),
        )[0]
      : null

  const lastSalePrice = latestSale
    ? latestSale.VALOR / (latestSale.QTDE_EMB || 1)
    : 0
  const margin =
    lastSalePrice > 0
      ? ((lastSalePrice - product.base_cost) / lastSalePrice) * 100
      : 0

  const salesLast30Days = sales
    .filter((sale) =>
      sale.DATA_FATURAMENTO
        ? isAfter(new Date(sale.DATA_FATURAMENTO), subDays(new Date(), 30))
        : false,
    )
    .reduce((acc, sale) => acc + (sale.QTDE_EMB || 0), 0)

  const stats: Stat[] = [
    {
      icon: Calendar,
      label: 'Última Compra',
      value:
        latestSale && latestSale.DATA_FATURAMENTO
          ? new Date(latestSale.DATA_FATURAMENTO).toLocaleDateString('pt-BR', {
              timeZone: 'UTC',
            })
          : 'N/A',
    },
    {
      icon: DollarSign,
      label: 'Último Preço Venda',
      value: `R$ ${lastSalePrice.toFixed(2)}`,
    },
    {
      icon: Percent,
      label: 'Margem de Lucro %',
      value: `${margin.toFixed(0)}%`,
    },
    {
      icon: TrendingUp,
      label: 'Vendas (30 dias)',
      value: salesLast30Days.toString(),
    },
  ]

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
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
