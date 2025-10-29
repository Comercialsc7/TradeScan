import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

type CardData = {
  icon: LucideIcon
  title: string
  description: string
}

type FeatureCardsProps = {
  cards: CardData[]
}

export const FeatureCards = ({ cards }: FeatureCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card, index) => (
        <Card key={index} className="text-left">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <card.icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-base font-semibold">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
