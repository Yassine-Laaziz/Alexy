import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { product } from '@/types'
import Calendar from 'react-calendar'
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/React-Calendar.css'
import { loadStripe } from '@stripe/stripe-js'
import { pay } from '@/lib/ServerFunctions/Stripe'

export default function Modal({ open, setOpen, product }: props) {
  const [step, setStep] = useState<number>(0)
  const [value, onChange] = useState<Value>(null)

  function handleNextStep() {
    if (step === 2) return
    if (step === 1 && !value) {
      return toast.info('Select the date first', {
        position: 'top-center',
        autoClose: 2500,
        toastId: 'No-duplicate',
        icon: <FaExclamationCircle className='text-pink-500' />,
        theme: 'light',
        style: { color: 'rgb(236 72 153)', fontSize: '18px' },
        closeButton: <FaXmark className='h-7 w-7 text-sky-300' />,
      })
    }
    setStep(prev => prev + 1)
  }

  function handleBackStep() {
    if (step === 0) return setOpen(false)
    setStep(prev => prev - 1)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <ToastContainer />

                {[
                  <Info product={product} />,
                  <CustomCalendar value={value} onChange={onChange} />,
                  <Payment value={value} />,
                ].map((Component, i) => (
                  <Transition
                    key={`slide-${i}`}
                    show={i === step}
                    enter='transition-all  duration-1000'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition-opacity duration-1000'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    {Component}
                  </Transition>
                ))}
                {/* Next Button */}
                <div className='bg-gray-50 px-4 py-3 c:focus:border-2 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    autoFocus
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-300 sm:ml-3 sm:w-auto'
                    onClick={handleNextStep}
                  >
                    {step === 0 && 'Have a session'}
                    {step === 1 && (
                      <>
                        <span className='ml-2'>Next</span>
                        {value ? <FaCheck className='h-6 w-6' /> : <FaXmark className='h-6 w-6' />}
                      </>
                    )}
                    {step === 2 && (
                      <span className='ml-2' onClick={() => pay(product._id)}>
                        Confirm
                      </span>
                    )}
                  </button>
                  {/* Prev Button */}
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-cyan-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                    onClick={handleBackStep}
                  >
                    {step === 0 ? 'Cancel' : 'Back'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function Info({ product }: { product: product }) {
  return (
    <>
      <div className='px-7 pb-5 pt-6 sm:p-6 sm:pb-4'>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-pink-400'>
            {product.name}
          </Dialog.Title>
          <p className='mt-2 pr-7 text-slate-500'>{product.description}</p>
        </div>
      </div>
      <p className='pr-6 text-right font-bold text-cyan-400'>{product.price}$</p>
    </>
  )
}

function CustomCalendar({ value, onChange }: { value: Value; onChange: Dispatch<SetStateAction<Value>> }) {
  // Calendar MinDate and MaxDate
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  // Calculate a month from now
  const oneMonthFromNow = new Date(today)
  oneMonthFromNow.setMonth(today.getMonth() + 1)
  return <Calendar value={value} onChange={onChange} maxDate={oneMonthFromNow} minDate={tomorrow} showNeighboringMonth={false} />
}

// @ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
function Payment({ value }: { value: Value }) {
  if (!value || Array.isArray(value)) value = null
  const datePart = value ? new Date(value).toLocaleDateString() : ''

  return (
    <div className='mx-auto mt-8 max-w-md rounded-md bg-gray-100 p-4 py-7 text-center shadow-md'>
      <h2 className='text-2xl font-bold'>Confirm Session and Checkout</h2>
      <p className='mx-auto inline-block rounded-xl bg-white px-4 py-2 text-lg font-bold text-blue-500 shadow-xl'>@{datePart}</p>
      <p className='mt-6 rounded-2xl px-2 py-4 font-semibold text-white shadow-[0_0_100px_5px_inset_black]'>
        We will contact you on E-mail and arrange with you an appropriate time and session, so if you have any questions you're
        free to ask!
      </p>
    </div>
  )
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

// types
interface props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  product: product
}
