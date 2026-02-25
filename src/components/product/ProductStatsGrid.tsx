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

  const getUnitPrice = (totalValue: unknown, quantity: unknown) => {
    const total = toSafeNumber(totalValue)
    const qty = toSafeNumber(quantity)
    if (qty <= 0) return 0
    return total / qty
  }

  const latestSale =
    sales.length > 0
      ? [...sales].sort(
        (a, b) =>
          new Date(b.dtainclusao || '').getTime() -
          new Date(a.dtainclusao || '').getTime(),
      )[0]
      : null

  const lastSalePrice = getUnitPrice(
    latestSale?.vlrembtabpreco,
    latestSale?.qtdatendida,
  )

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
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="min-w-0 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="flex min-w-0 items-center space-x-3">
            <stat.icon className="h-5 w-5 flex-shrink-0 text-primary" />
            <p className="truncate text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </div>
          <p className="mt-2 break-all text-base font-bold leading-tight sm:text-2xl">
            {stat.label === 'Último Preço Venda'
              ? `${stat.value} UND`
              : stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
