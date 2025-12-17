import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

type Slide = {
  image: string
  alt: string
  title: string
  description: string
}

type WelcomeCarouselProps = {
  slides: Slide[]
  setApi: (api: CarouselApi) => void
}

export const WelcomeCarousel = ({ slides, setApi }: WelcomeCarouselProps) => {
  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="mx-auto mb-8 w-full max-w-xs rounded-lg object-cover aspect-video"
            />
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {slide.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {slide.description}
            </p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
