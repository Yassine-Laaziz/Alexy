'use client'

import { motion } from 'framer-motion'

const textVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

type props = { title: string; textStyles?: string }
export const TypingText = ({ title, textStyles }: props) => (
  <motion.p
    variants={{
      hidden: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.025, delayChildren: 0.1 },
      },
    }}
    initial="hidden"
    whileInView="show"
    className={textStyles}
  >
    {Array.from(title).map((letter, i) => (
      <motion.span variants={textVariant} key={i}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
)

export const TitleText = ({ title, textStyles }: props) => (
  <motion.h2
    variants={textVariant}
    initial="hidden"
    whileInView="show"
    className={`font-bold md:text-[64px] text-[40px] ${textStyles}`}
  >
    {title}
  </motion.h2>
)
