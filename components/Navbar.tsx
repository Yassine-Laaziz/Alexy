'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { classNames } from '../lib/headlessui'
import Image from 'next/image'
import { navVariants } from '@/lib/motion'
import { motion } from 'framer-motion'
import { Bars3Icon, BellIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Calendar', href: '/Calendar', current: false },
]
const dropDown = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
]

export default function Navbar() {
  const { status, data } = useSession()

  return (
    <motion.div variants={navVariants} initial='hidden' whileInView='show'>
      <Disclosure as='nav'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    className='inline-flex items-center justify-center rounded-md p-2 text-pink-400 transition-all
                    hover:bg-rose-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  >
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
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
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <button>
                    <span className='sr-only'>View notifications</span>
                    {status === 'authenticated' && (
                      <BellIcon
                        className='h-8 w-8 rounded-full p-1 text-pink-400 hover:text-pink-300
                      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-200'
                        aria-hidden='true'
                      />
                    )}
                  </button>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      {status === 'authenticated' ? (
                        <Menu.Button className='flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-200'>
                          <span className='sr-only'>Open user menu</span>
                          <button className='h-8 w-8 overflow-hidden rounded-full'>
                            {data.user?.image ? (
                              <img src={data.user.image} alt={`${data.user.name} image`} />
                            ) : (
                              <UserCircleIcon />
                            )}
                          </button>
                        </Menu.Button>
                      ) : (
                        <button
                          className='rounded-md bg-pink-400 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-pink-300 hover:px-4 hover:py-3'
                          onClick={() => signIn('google')}
                        >
                          SIGN IN
                        </button>
                      )}
                    </div>
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
                        {status === 'authenticated' && (
                          <>
                            {dropDown.map(item => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(active ? 'bg-rose-100' : '', 'block px-4 py-2 text-sm text-cyan-500')}
                                  >
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
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

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
  )
}
