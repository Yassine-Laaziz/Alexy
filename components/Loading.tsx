'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TitleText } from './CustomTexts'

export default function Loading() {
  const [animate, setAnimate] = useState<boolean>(true)

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(false), 6000)
    return () => clearTimeout(timeout)
  }, [])

  return animate ? (
    <div className="fixed z-[99999] h-screen w-screen">
      <div className="absolute left-0 bottom-[63px] flex flex-col justify-center items-center bg-white w-screen h-screen">
        <TitleText
          title="🌟 Loading... 🐾🌸💕✨"
          textStyles="md:text-[44px] text-[20px]"
        />
        <motion.div
          className="w-12 h-12 overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ repeat: 5, duration: 1, repeatDelay: 0.2 }}
        >
          <Image
            src="/SquareCatFace.png"
            alt="Square Cat Face"
            width={40}
            height={40}
            className="absolute inset-0 h-full w-full"
          />
        </motion.div>
      </div>
    </div>
  ) : (
    <></>
  )
}
