'use client'

import { fadeIn, staggerContainer } from '@/lib/motion'
import { motion } from 'framer-motion'
import { TypingText } from './CustomTexts'
import Image from 'next/image'

export default function GetStarted() {
  const startingFeatures = [
    'Choose services based on your requirements.',
    "choose the date you'd prefer.",
    'A google meet session will be given to you.',
  ]

  return (
    <section
      className='relative z-10 mx-auto flex flex-col
      items-center gap-8 overflow-hidden py-7 lg:flex-row'
    >
      <motion.div
        className='flex h-min flex-1 items-center justify-center'
        variants={fadeIn('right', 1)}
        initial='hidden'
        whileInView='show'
      >
        <Image
          src='/weightLoss.png'
          alt='get started'
          className='h-[90%] w-[90%] rounded-full object-contain'
          width={1080}
          height={720}
        />
      </motion.div>
      <div className='flex flex-[0.75] flex-col justify-center p-7'>
        <TypingText title='Book a session:' textStyles='mt-[8px] font-bold md:text-[40px] text-[20px]' />
        <motion.div
          className='mt-[30px] flex max-w-[405px] flex-col gap-[24px] text-center'
          variants={staggerContainer(0.5, 0.5)}
          initial='hidden'
          whileInView='show'
        >
          {startingFeatures.map((feature, i) => (
            <motion.div
              key={`startingFeature-${i}`}
              className='flex flex-row items-center justify-center'
              variants={fadeIn('left', 1, i * 0.3)}
            >
              <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-pink-300'>
                <p className='text-3xl font-bold text-white'>{i + 1}</p>
              </div>
              <p className='ml-[30px] flex-1 font-semibold leading-[32px] text-cyan-500 md:text-lg lg:text-xl'>{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
