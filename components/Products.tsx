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
      <div
        className='mx-auto
        mb-40 mt-20 max-w-2xl px-4 py-16 shadow-[0_0_999px_100px_black_inset] sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'
      >
        <TitleText title='Services' textStyles='text-white text-center mb-8' />
        <motion.div
          variants={staggerContainer(0.1, 0.3)}
          initial='hidden'
          whileInView='show'
          className='flex flex-wrap justify-around gap-6 xl:gap-8'
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
              <div className='aspect-h-1 aspect-w-1 h-72 w-72 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  className='object-cover object-center group-hover:opacity-75'
                  width={400}
                  height={500}
                />
              </div>
              <h3 className='mt-4 text-sm font-bold text-white'>{product.name}</h3>
              <p className='mt-1 text-lg font-medium text-cyan-500'>{product.price}$</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Modal setOpen={setOpen} open={open} product={products[productIndex]} />
    </>
  )
}
