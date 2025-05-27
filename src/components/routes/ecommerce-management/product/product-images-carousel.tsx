'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function ProductImagesCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number>(-1)

  return (
    <>
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="max-h-24 w-full"
      >
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/6">
              <div className="cursor-pointer p-1" onClick={() => setIndex(i)}>
                <img src={src} alt={`Imagem ${i}`} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Thumbnails]}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </>
  )
}
