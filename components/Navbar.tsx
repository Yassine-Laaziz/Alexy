'use client'

import { Switch as Hswitch } from '@headlessui/react'
import { ThemeContextProps, useThemeContext } from '../lib/contexts/ThemeContext'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { classNames } from '../lib/utils/classNames'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import { FaGear, FaXmark } from 'react-icons/fa6'
import { Session } from 'next-auth'
import { ephesis } from '@/lib/fonts'

const navigation = [{ name: 'Dashboard', href: '/', current: true }]

export default function Navbar() {
  const { status, data } = useSession()
  const { theme, switchTheme } = useThemeContext()

  return (
    <>
      <div className='h-[64px]' />
      <div className='fixed top-0 z-[10000] w-full bg-white bg-opacity-75 transition-all dark:bg-black dark:bg-opacity-50'>
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
                    <h2 className={`text-4xl text-pink-500 ${ephesis.className}`}>Alexy</h2>
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
                  <Switch theme={theme} switchTheme={switchTheme} />
                  {status === 'authenticated' ? (
                    <ProfileDropDown data={data} switchTheme={switchTheme} />
                  ) : (
                    <button
                      className='rounded-md bg-pink-400 px-3 py-2 text-sm font-medium text-white transition-all hover:scale-125 hover:bg-pink-300'
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
        <ScrollProgressBar />
      </div>
    </>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed left-0 right-0 top-[calc(64px-8px)] h-2 bg-pink-400 shadow-[0_10px_30px_1px_pink]`}
      style={{ scaleX }}
    />
  )
}

const ProfileDropDown = ({ data, switchTheme }: { data: Session; switchTheme: () => void }) => (
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
      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black'>
        <Menu.Item>
          <button
            onClick={switchTheme}
            className='block w-full px-4 py-2 text-left text-sm font-semibold transition-all hover:text-base'
          >
            <span className='text-black dark:hidden'>Dark mode</span>
            <span className='hidden text-cyan-400 dark:inline-block'>Light mode</span>
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={() => signOut()}
            className='block w-full px-4 py-2 text-left text-sm font-semibold text-red-500 transition-all hover:text-base'
          >
            Sign out
          </button>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
)

const Switch = ({ theme, switchTheme }: ThemeContextProps) => (
  <Hswitch
    checked={theme === 'dark'}
    onChange={switchTheme}
    className='relative mr-4 inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer
       rounded-full border-2 border-transparent bg-cyan-300 transition-colors duration-200 ease-in-out focus:outline-none
        focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-opacity-75 dark:bg-pink-500'
  >
    <span className='sr-only'>Use setting</span>
    <span
      aria-hidden='true'
      className='pointer-events-none inline-block h-[34px] w-[34px] translate-x-0 transform rounded-full bg-white shadow-lg
         ring-0 transition duration-200 ease-in-out dark:translate-x-9 dark:bg-white'
    />
  </Hswitch>
)
