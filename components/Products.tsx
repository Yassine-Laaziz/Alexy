'use client'
import { product } from '@/types'
import Image from 'next/image'
import { staggerContainer } from '../lib/motion'
import { motion } from 'framer-motion'
import { TitleText } from './CustomTexts'
import { urlFor } from '../lib/sanity'
import Modal from './Modal'
import { useState } from 'react'

export default function Products({ products }: { products: product[] }) {
  const [open, setOpen] = useState<boolean>(false)
  const [productIndex, setProductIndex] = useState<number>(0)

  function handleClick(index: number) {
    setProductIndex(index)
    setOpen(true)
  }
  return (
    <>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <TitleText title='Services' textStyles='text-pink-400 text-center mb-8' />
        <motion.div
          variants={staggerContainer(0.1, 0.3)}
          initial='hidden'
          whileInView='show'
          className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'
        >
          {products.map((product, i) => (
            <motion.div
              key={`product${product.name}`}
              className='group cursor-cell'
              variants={{
                hidden: { y: 40, opacity: 0.3 },
                show: { y: 0, opacity: 1 },
              }}
              onClick={() => handleClick(i)}
            >
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                  width={400}
                  height={500}
                />
              </div>
              <h3 className='mt-4 text-sm font-bold text-pink-400'>{product.name}</h3>
              <p className='mt-1 text-lg font-medium text-cyan-500'>{product.price}$</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Modal setOpen={setOpen} open={open} product={products[productIndex]} />
    </>
  )
}
