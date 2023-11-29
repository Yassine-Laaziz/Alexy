'use client'

import { Switch as Hswitch } from '@headlessui/react'
import { useThemeContext } from '../lib/contexts/ThemeContext'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { classNames } from '../lib/utils/classNames'
import Image from 'next/image'
import { navVariants } from '@/lib/motion'
import { motion } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import { FaGear, FaXmark } from 'react-icons/fa6'
import { Session } from 'next-auth'

const navigation = [{ name: 'Dashboard', href: '/', current: true }]
const dropDown = [{ name: 'Settings', href: '#' }]

export default function Navbar() {
  const { status, data } = useSession()

  return (
    <nav>
      <ScrollProgressBar />
      <motion.div variants={navVariants} initial='hidden' whileInView='show'>
        <Disclosure as='nav'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='relative flex h-16 items-center justify-between'>
                  <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                    {/* Mobile Menu Button */}
                    <Disclosure.Button
                      className='inline-flex items-center justify-center rounded-md p-2 text-pink-400 transition-all
                    hover:bg-rose-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    >
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <FaXmark className='block h-6 w-6' aria-hidden='true' />
                      ) : (
                        <FaBars className='block h-6 w-6' aria-hidden='true' />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                    <Image src='/logo.jpg' alt='logo' className='block h-8 w-auto' width={240} height={180} />
                    <div className='hidden sm:ml-6 sm:block'>
                      <div className='flex space-x-4'>
                        {navigation.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-cyan-400 text-white' : 'text-cyan-500 hover:bg-cyan-300 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium transition-all'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Switch />
                  {status === 'authenticated' ? (
                    <ProfileDropDown data={data} />
                  ) : (
                    <button
                      className='rounded-md bg-pink-400 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-pink-300 hover:px-4 hover:py-3'
                      onClick={() => signIn('google')}
                    >
                      SIGN IN
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile */}
              <Disclosure.Panel className='sm:hidden'>
                <div className='space-y-1 px-2 pb-3 pt-2'>
                  {navigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-cyan-400 text-white' : 'text-cyan-500 hover:bg-cyan-300 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </motion.div>
    </nav>
  )
}

function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const updateScrollPercentage = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrollY = window.scrollY
    const percentage = (scrollY / documentHeight) * 100

    setScrollPercentage(percentage)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScrollPercentage)
    return () => {
      window.removeEventListener('scroll', updateScrollPercentage)
    }
  }, [])
  return (
    <div
      className={`fixed left-0 top-0 z-[999] h-2 bg-cyan-400 shadow-[0_0_20px_5px_cyan] transition-all`}
      style={{ width: `${scrollPercentage}%` }}
    />
  )
}

const ProfileDropDown = ({ data }: { data: Session }) => (
  <Menu as='div' className='relative ml-3'>
    <Menu.Button className='rounded-xl bg-cyan-300'>
      <span className='sr-only'>Open user menu</span>
      {data.user?.image ? (
        <img src={data.user.image} alt={`${data.user.name} image`} className='h-10 w-10 rounded-xl' />
      ) : (
        <FaGear className='h-10 w-10 p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-200' />
      )}
    </Menu.Button>
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <>
          {dropDown.map(item => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a href={item.href} className={classNames(active ? 'bg-rose-100' : '', 'block px-4 py-2 text-sm text-cyan-500')}>
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={classNames(
                  active ? 'text-red-400' : 'text-rose-500',
                  'block w-full px-4 py-2 text-left text-sm font-semibold'
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </>
      </Menu.Items>
    </Transition>
  </Menu>
)

export function Switch() {
  const { theme, switchTheme } = useThemeContext()

  return (
    <Hswitch
      checked={theme === 'dark'}
      onChange={switchTheme}
      className={`${theme === 'dark' ? 'bg-teal-500' : 'bg-teal-300'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className='sr-only'>Use setting</span>
      <span
        aria-hidden='true'
        className={`${theme === 'dark' ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Hswitch>
  )
}
