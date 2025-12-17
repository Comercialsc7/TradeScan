import { cn } from '@/lib/utils'

type CarouselPaginationProps = {
  count: number
  current: number
}

export const CarouselPagination = ({
  count,
  current,
}: CarouselPaginationProps) => {
  return (
    <div className="my-8 flex justify-center space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn('h-2 rounded-full transition-all', {
            'w-6 bg-primary': current === i + 1,
            'w-2 bg-secondary': current !== i + 1,
          })}
        />
      ))}
    </div>
  )
}
