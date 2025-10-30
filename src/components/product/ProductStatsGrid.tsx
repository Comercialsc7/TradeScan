import type { Product } from '@/lib/mock-data'
import {
  Calendar,
  DollarSign,
  Percent,
  Archive,
  Tag,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

type ProductStatsGridProps = {
  product: Product
}

type Stat = {
  icon: LucideIcon
  label: string
  value: string
}

export const ProductStatsGrid = ({ product }: ProductStatsGridProps) => {
  const stats: Stat[] = [
    {
      icon: Calendar,
      label: 'Última Compra',
      value: new Date(product.lastPurchaseDate).toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      }),
    },
    {
      icon: DollarSign,
      label: 'Último Custo',
      value: `R$ ${product.lastCost.toFixed(2)}`,
    },
    {
      icon: Percent,
      label: 'Margem de Lucro %',
      value: `${(product.margin * 100).toFixed(0)}%`,
    },
    {
      icon: Archive,
      label: 'Estoque Disponível',
      value: `${product.stock} unidades`,
    },
    {
      icon: Tag,
      label: 'Preço de Varejo',
      value: `R$ ${product.retailPrice.toFixed(2)}`,
    },
    {
      icon: TrendingUp,
      label: 'Vendas (30 dias)',
      value: product.salesLast30Days.toString(),
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
