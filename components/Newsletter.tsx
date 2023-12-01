import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiOutlineHandRaised } from 'react-icons/hi2'

export default async function Newsletter() {
  const userSession = await getServerSession(authOptions)

  return (
    <div
      className='relative isolate mx-auto mb-12 w-full overflow-hidden rounded-2xl
     bg-pink-200 py-16 shadow-[0_0_70px_20px_white,_inset_0_0_200px_100px_white] sm:max-w-5xl sm:py-24 lg:py-32'
    >
      <div className='mx-auto max-w-7xl px-6 text-indigo-700 lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
          <div className='mx-auto max-w-md lg:max-w-lg'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Subscribe to our newsletter.</h2>
            <p className='mt-4 text-lg leading-8'>
              Have The latest beauty/health tips and tricks all directly sent to your email!
            </p>
            <div className='mt-6 flex max-w-md gap-x-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='focus: min-w-0 flex-auto rounded-md border-0 border-x-2 bg-white/5 px-3.5 py-2 shadow-2xl
                 transition-all focus:shadow-[0_0_20px_5px_black] focus:outline-offset-0 focus:outline-pink-300 sm:text-sm sm:leading-6'
                placeholder='Enter your email'
                defaultValue={userSession?.user?.email || undefined}
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
                 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl
            className='grid cursor-default grid-cols-1 gap-x-8 gap-y-10 text-center c:flex c:flex-col c:items-start
           c:rounded-lg c:p-2 c:shadow-[-7px_7px_20px_0_rgba(0,0,0,0.3)] c:transition-all sm:grid-cols-2 lg:pt-2'
          >
            <div className='mx-auto max-w-xs p-4 hover:scale-105 hover:shadow-[-7px_7px_20px_0_rgba(0,0,0,0.5)]'>
              <FaCalendarAlt className='mx-auto mt-2 h-6 w-6' aria-hidden='true' />
              <dt className='mx-auto mt-4 font-semibold'>Weekly articles</dt>
              <dd className='mt-3 font-medium leading-[22px]'>
                Dates may vary based on current trends and tricks, only providing the best!
              </dd>
            </div>
            <div className=' mx-auto max-w-xs p-4 hover:scale-105 hover:shadow-[-7px_7px_20px_0_rgba(0,0,0,0.5)]'>
              <HiOutlineHandRaised className='mx-auto mt-2 h-6 w-6' aria-hidden='true' />
              <dt className='mx-auto mt-4 font-semibold '>No spam</dt>
              <dd className='mt-3 font-medium leading-[22px]'>
                Our system works to never &quot;spam&quot; or send filler or low-effort content.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <svg
        className='absolute left-1/2 top-0 -z-10 h-[42.375rem] -translate-x-1/2 blur-3xl xl:-top-6'
        viewBox='0 0 1155 678'
        fill='none'
      >
        <path
          fill='url(#09dbde42-e95c-4b47-a4d6-0c523c2fca9a)'
          fillOpacity='.3'
          d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
        />
        <defs>
          <linearGradient
            id='09dbde42-e95c-4b47-a4d6-0c523c2fca9a'
            x1='1155.49'
            x2='-78.208'
            y1='.177'
            y2='474.645'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#00FFFF' />
            <stop offset={1} stopColor='#00FFFF' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
