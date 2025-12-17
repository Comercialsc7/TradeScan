import {
  Calendar,
  DollarSign,
  Percent,
  Archive,
  Tag,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { isAfter, subDays } from 'date-fns'
import type { Product, Sale } from '@/services/sales'

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
          new Date(b.dtainclusao || b.dtageracaonf || '').getTime() -
          new Date(a.dtainclusao || a.dtageracaonf || '').getTime(),
      )[0]
      : null

  const lastSalePrice = latestSale?.vlrembtabpreco || 0

  // Note: We don't have baseCost in the products table schema provided,
  // so we can't calculate margin accurately relative to cost right now.
  // However, we have 'percmargemitem' in the sales table which is likely the margin.
  // We'll use the latest sale's margin if available.
  const margin = latestSale?.percmargemitem || 0

  const salesLast30Days = sales
    .filter((sale) => {
      const dateStr = sale.dtainclusao || sale.dtageracaonf
      if (!dateStr) return false
      return isAfter(new Date(dateStr), subDays(new Date(), 30))
    })
    .reduce((acc, sale) => acc + (sale.qtdatendida || 0), 0)

  // Using mock/placeholder for stock and retailPrice as they are not in the schema
  const stock = 0
  const retailPrice = 0

  const stats: Stat[] = [
    {
      icon: Calendar,
      label: 'Última Compra',
      value: latestSale
        ? new Date(
          latestSale.dtainclusao || latestSale.dtageracaonf || '',
        ).toLocaleDateString('pt-BR')
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
      icon: Percent,
      label: 'Margem de Lucro %',
      value: `${margin.toFixed(2)}%`,
    },
    // Leaving Stock and Retail Price as placeholders or N/A until schema supports them
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
