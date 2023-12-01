'use client'

import { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { fadeIn, staggerContainer } from '@/lib/motion'
import { motion } from 'framer-motion'
import { TypingText } from '../CustomTexts'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function GetStarted() {
  const startingFeatures = ['Choose any service.', 'Choose a date you like.', 'You get an online session!']

  return (
    <section
      className='relative z-10 mx-auto mt-20 flex w-full flex-col items-center gap-8 overflow-hidden rounded-3xl border-black bg-gradient-to-tl from-black
      via-gray-200 to-white p-8 py-7 shadow-[0_0_999px_100px_white_inset,0_0_100px_10px_white] sm:max-w-fit sm:border-4 dark:sm:border-0 lg:flex-row'
    >
      <motion.div
        className='flex h-96 flex-1 items-center justify-center'
        variants={fadeIn('right', 1)}
        initial='hidden'
        whileInView='show'
      >
        <Canvas>
          <ambientLight intensity={1.5} />
          <OrbitControls enableZoom={false} />
          <BeatingHeart scale={[10, 10, 10]} position={[0, -1.5, 0]} rotation={[0, -1.2, 0]} />
        </Canvas>
      </motion.div>
      <div className='flex flex-[0.75] flex-col justify-center rounded-xl  p-7'>
        <TypingText title='Book a session:' textStyles='mt-[8px] font-bold md:text-[40px] text-[20px]' />
        <motion.div
          className='mt-[30px] flex max-w-[405px] flex-col gap-[24px]'
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
              <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-tr from-black to-gray-700'>
                <p className='text-3xl font-bold text-white'>{i + 1}</p>
              </div>
              <p
                className='ml-[30px] flex-1 rounded-lg p-4 font-semibold leading-[32px] text-white
                shadow-[0_0_40px_1px_inset_gray] md:text-lg lg:text-xl'
              >
                {feature}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <svg className='absolute left-0 top-0 -z-10 h-full blur-3xl xl:-top-6' viewBox='0 0 800 600' fill='none'>
        <path fill='url(#AnyRandomId912)' fillOpacity='.7' d='M50 300Q150 100 300 300T550 300Q650 500 500 500T300 300z' />
        <defs>
          <linearGradient id='AnyRandomId912'>
            <stop offset='0%' stopColor='#1bff00' />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}

export function BeatingHeart(props: any) {
  const mesh = useRef()
  const { scene, animations } = useGLTF('/3D/BeatingHeart.glb')
  const { actions } = useAnimations(animations, mesh)

  useEffect(() => {
    actions?.HeartAction?.play()
    actions['PlusAction.001']?.play()
  }, [actions])

  return (
    <mesh ref={mesh} {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

useGLTF.preload('/3D/BeatingHeart.glb')
