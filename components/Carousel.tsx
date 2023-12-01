'use client'

import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import { FiChevronsRight, FiChevronsLeft } from 'react-icons/fi'
import { slide } from '@/types'
import { urlFor } from '@/lib/sanity'

export default function Carousel({ slides }: { slides: slide[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    setIsWide(window.innerWidth >= 600)

    // interval
    const id: NodeJS.Timer = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => clearInterval(id)
  }, [activeIndex, slides.length])

  // navigation
  const goToSlide = (index: number) => setActiveIndex(index)
  const prevSlide = () => setActiveIndex(prevIndex => (prevIndex + slides.length - 1) % slides.length)
  const nextSlide = () => setActiveIndex(prevIndex => (prevIndex + 1) % slides.length)

  return (
    isWide && (
      <div className='relative h-[calc(100vh-64px)] overflow-hidden border-y-[1px] border-cyan-400 shadow-[0_0_50px_10px_inset_pink]'>
        {/* Slides */}
        <div className='relative flex h-full'>
          {slides.map((slide, index) => (
            <Transition
              key={`slide-${index}`}
              show={index === activeIndex}
              enter='transition-opacity duration-1000'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-1000'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='absolute inset-0'>
                <Image
                  className='absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2'
                  src={urlFor(slide.image).url()}
                  alt={slide.title}
                  quality={100}
                  width={1800}
                  height={1200}
                />
                <div
                  className='absolute bottom-10 left-1/2 max-h-min max-w-full -translate-x-1/2 rounded-xl border-2
                  border-pink-400 bg-white bg-opacity-80 px-2 py-4 text-center'
                >
                  <h1 className='mx-auto w-min whitespace-nowrap rounded-lg px-2 text-2xl font-bold text-pink-400'>
                    {slide.title}
                  </h1>
                  <p className='font-bold text-cyan-500'>{slide.description}</p>
                </div>
              </div>
            </Transition>
          ))}
        </div>

        {/* Arrows */}
        <button className='absolute left-4 top-1/2 -translate-y-1/2 transform focus:outline-none' onClick={prevSlide}>
          <FiChevronsLeft className='h-10 w-10 rounded-lg bg-cyan-300 p-1 font-bold' />
        </button>
        <button className='absolute right-4 top-1/2 -translate-y-1/2 transform focus:outline-none' onClick={nextSlide}>
          <FiChevronsRight className='h-10 w-10 rounded-lg bg-cyan-300 p-1 font-bold' />
        </button>

        {/* Indicators */}
        <div
          className='absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2
      rounded-md bg-pink-400 bg-opacity-50 p-1'
        >
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${activeIndex === index ? 'bg-cyan-400' : 'bg-cyan-500'}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    )
  )
}
