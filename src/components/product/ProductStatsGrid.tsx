import { useMemo, useState } from 'react'
import {
  Calendar,
  Calculator,
  DollarSign,
  Archive,
  Tag,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { isAfter, subDays } from 'date-fns'
import type { ProductInfo, Sale } from '@/services/sales'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
  const [costInput, setCostInput] = useState('')
  const [saleInput, setSaleInput] = useState('')

  const toSafeNumber = (value: unknown) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  const parseDecimal = (value: string) => {
    const normalized = value.replace(',', '.').trim()
    if (!normalized) return 0
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : 0
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const formatPercent = (value: number) =>
    `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value)}%`

  const costValue = useMemo(() => parseDecimal(costInput), [costInput])
  const saleValue = useMemo(() => parseDecimal(saleInput), [saleInput])
  const hasValidValues = costValue > 0 && saleValue > 0
  const unitProfit = hasValidValues ? saleValue - costValue : 0
  const margin = hasValidValues ? (unitProfit / saleValue) * 100 : 0
  const markup = hasValidValues ? (unitProfit / costValue) * 100 : 0

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
      value: `${salesLast30Days} UND`,
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
            {stat.value}
          </p>
        </div>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="min-w-0 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-muted/40"
            aria-label="Abrir calculadora"
          >
            <div className="flex h-full min-h-[96px] items-center justify-center">
              <Calculator className="h-14 w-14 text-primary" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="w-[96vw] max-w-2xl p-6 sm:p-8">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold">Calculadora Comercial</DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Informe custo e preço de venda para calcular margem, markup e lucro unitário.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            <div className="space-y-3">
              <label className="text-base font-semibold">Custo unitário (R$)</label>
              <Input
                inputMode="decimal"
                placeholder="Ex.: 12,50"
                value={costInput}
                onChange={(event) => setCostInput(event.target.value)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-base font-semibold">Preço de venda unitário (R$)</label>
              <Input
                inputMode="decimal"
                placeholder="Ex.: 19,90"
                value={saleInput}
                onChange={(event) => setSaleInput(event.target.value)}
                className="h-12 text-lg"
              />
            </div>

            {hasValidValues ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/30 p-4 sm:p-5">
                  <p className="text-sm text-muted-foreground">Lucro Unit.</p>
                  <p className="mt-1 text-xl font-extrabold sm:text-2xl">{formatCurrency(unitProfit)}</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4 sm:p-5">
                  <p className="text-sm text-muted-foreground">Margem</p>
                  <p className="mt-1 text-xl font-extrabold sm:text-2xl">{formatPercent(margin)}</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4 sm:p-5">
                  <p className="text-sm text-muted-foreground">Markup</p>
                  <p className="mt-1 text-xl font-extrabold sm:text-2xl">{formatPercent(markup)}</p>
                </div>
              </div>
            ) : (
              <p className="text-base text-muted-foreground">
                Preencha os dois campos com valores maiores que zero para calcular.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
