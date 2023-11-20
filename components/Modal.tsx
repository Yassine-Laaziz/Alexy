import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { product } from '@/types'
import Calendar from 'react-calendar'
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/React-Calendar.css'

export default function Modal({ open, setOpen, product }: props) {
  const [step, setStep] = useState<number>(0)
  const [value, onChange] = useState<Value>(null)

  // Calendar MinDate and MaxDate
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  // Calculate a month from now
  const oneMonthFromNow = new Date(today)
  oneMonthFromNow.setMonth(today.getMonth() + 1)

  function handleNextStep() {
    if (step === 3) return
    if (step === 1 && !value) {
      return toast.info('Select the date first', {
        position: 'top-center',
        autoClose: 2500,
        toastId: 'No-duplicate',
        icon: <ExclamationCircleIcon className='text-pink-500' />,
        theme: 'light',
        style: { color: 'rgb(236 72 153)', fontSize: '18px' },
        closeButton: <XCircleIcon className='h-7 w-7 text-sky-300' />,
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
                {step === 0 && <Info product={product} />}
                {step === 1 && (
                  <Calendar
                    value={value}
                    onChange={onChange}
                    maxDate={oneMonthFromNow}
                    minDate={tomorrow}
                    showNeighboringMonth={false}
                  />
                )}
                {step === 2 && <Payment value={value} />}
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
                        {value ? <CheckCircleIcon className='h-6 w-6 text-green-400' /> : <XCircleIcon className='h-6 w-6' />}
                      </>
                    )}
                    {step === 2 && <span className='ml-2'>Confirm</span>}
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

function Info({ product }: Step1) {
  return (
    <>
      <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-pink-400'>
            {product.name}
          </Dialog.Title>
          <p className='mt-2 text-sm text-slate-500'>
            {/* {product.description} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui ratione animi inventore sit temporibus rem nisi ea
            repudiandae deleniti, aperiam voluptatum libero pariatur suscipit quam distinctio in. Perspiciatis, doloremque.
          </p>
        </div>
      </div>
      <p className='pr-6 text-right font-bold text-cyan-400'>{product.price}$</p>
    </>
  )
}

function Payment({ value }: Step3) {
  console.log(value, value?.toLocaleString())
  return <h1>{value?.toLocaleString()}</h1>
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

// types
interface props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  product: product
}

interface Step1 {
  product: product
}
// interface Step2 {
//   value: Value
//   onChange: Dispatch<SetStateAction<Value>>
// }
interface Step3 {
  value: Value
}

// import { Dispatch, Fragment, SetStateAction, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { product } from '@/types'
// import Calendar from 'react-calendar'
// import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

// export default function Modal({ open, setOpen, product }: props) {
//   const [step, setStep] = useState<number>(0)
//   const [value, onChange] = useState<Value>(null)

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as='div' className='relative z-10' onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter='ease-out duration-300'
//           enterFrom='opacity-0'
//           enterTo='opacity-100'
//           leave='ease-in duration-200'
//           leaveFrom='opacity-100'
//           leaveTo='opacity-0'
//         >
//           <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
//         </Transition.Child>

//         <div className='fixed inset-0 z-10 overflow-y-auto'>
//           <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
//             <Transition.Child
//               as={Fragment}
//               enter='ease-out duration-300'
//               enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
//               enterTo='opacity-100 translate-y-0 sm:scale-100'
//               leave='ease-in duration-200'
//               leaveFrom='opacity-100 translate-y-0 sm:scale-100'
//               leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
//             >
//               <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
//                 {step === 0 && <Info setOpen={setOpen} setStep={setStep} product={product} />}
//                 {step === 1 && <DateChooser setStep={setStep} value={value} onChange={onChange} />}
//                 {step === 2 && <Payment />}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   )
// }

// function Info({ setStep, setOpen, product }: Step1) {
//   return (
//     <>
//       <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
//         <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
//           <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-pink-400'>
//             {product.name}
//           </Dialog.Title>
//           <p className='mt-2 text-sm text-slate-500'>
//             {/* {product.description} */}
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui ratione animi inventore sit temporibus rem nisi ea
//             repudiandae deleniti, aperiam voluptatum libero pariatur suscipit quam distinctio in. Perspiciatis, doloremque.
//           </p>
//         </div>
//       </div>
//       <p className='pr-6 text-right font-bold text-cyan-400'>{product.price}$</p>
//       <div className='bg-gray-50 px-4 py-3 c:focus:border-2 sm:flex sm:flex-row-reverse sm:px-6'>
//         <button
//           autoFocus
//           type='button'
//           className='inline-flex w-full justify-center rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-300 sm:ml-3 sm:w-auto'
//           onClick={() => setStep(1)}
//         >
//           Have a session
//         </button>
//         <button
//           type='button'
//           className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-cyan-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
//           onClick={() => setOpen(false)}
//         >
//           Cancel
//         </button>
//       </div>
//     </>
//   )
// }

// function DateChooser({ value, onChange, setStep }: Step2) {
//   console.log(`DATE1: ${value}`)
//   return (
//     <>
//       <Calendar value={value} onChange={onChange} className='h-full w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4' view='month' />
//       <div className='bg-gray-50 px-4 py-3 c:focus:border-2 sm:flex sm:flex-row-reverse sm:px-6'>
//         <button
//           autoFocus
//           type='button'
//           className='inline-flex w-full items-center justify-center rounded-md border-2 border-pink-400 px-3 py-2
//             text-sm font-semibold text-pink-400 shadow-sm hover:bg-pink-100 sm:ml-3 sm:w-auto'
//           onClick={() => setStep(2)}
//           disabled={!value}
//         >
//           <span className='ml-2'>Finish</span>
//           {value ? <CheckCircleIcon className='h-6 w-6 text-green-400' /> : <XCircleIcon className='h-6 w-6 text-red-700' />}
//         </button>
//         <button
//           type='button'
//           className='mt-3 inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold
//             text-cyan-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
//           onClick={() => setStep(0)}
//         >
//           Back
//         </button>
//       </div>
//     </>
//   )
// }
// function Payment({}: Step3) {
//   return <h1>Payment</h1>
// }

// type ValuePiece = Date | null
// type Value = ValuePiece | [ValuePiece, ValuePiece]

// // types
// interface props {
//   open: boolean
//   setOpen: Dispatch<SetStateAction<boolean>>
//   product: product
// }

// interface Step1 {
//   setStep: Dispatch<SetStateAction<number>>
//   setOpen: Dispatch<SetStateAction<boolean>>
//   product: product
// }
// interface Step2 {
//   value: Value
//   onChange: Dispatch<SetStateAction<Value>>
//   setStep: Dispatch<SetStateAction<number>>
// }
// interface Step3 {}
