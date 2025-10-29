import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@/lib/mock-data'
import { Tag, DollarSign, Percent, Calendar } from 'lucide-react'

type ProductDetailsCardProps = {
  product: Product
}

export const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
  const details = [
    { icon: Tag, label: 'Marca', value: product.brand },
    {
      icon: DollarSign,
      label: 'Último Preço Praticado',
      value: `R$ ${product.price.toFixed(2)}`,
    },
    {
      icon: Percent,
      label: 'Margem',
      value: `${(product.margin * 100).toFixed(0)}%`,
    },
    {
      icon: Calendar,
      label: 'Última Compra',
      value: new Date(product.lastPurchaseDate).toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      }),
    },
  ]

  return (
    <Card className="mt-6 animate-fade-in-up">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {details.map((detail) => (
            <li key={detail.label} className="flex items-start space-x-3">
              <detail.icon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {detail.label}
                </p>
                <p className="font-semibold text-foreground">{detail.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
