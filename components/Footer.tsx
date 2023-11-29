import { BsYoutube, BsInstagram } from 'react-icons/bs'
export default function Footer() {
  return (
    <footer className='bg-gray-800 py-12 text-white'>
      <div className='container mx-auto flex flex-col items-center'>
        <div className='mb-8 flex items-center space-x-4'>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl transition duration-300 hover:text-gray-500'
          >
            <BsInstagram />
          </a>
          <a
            href='https://www.youtube.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl transition duration-300 hover:text-gray-500'
          >
            <BsYoutube />
          </a>
        </div>
        <p className='text-lg'>Contact on social medias</p>
        <div className='mt-8'>
          <p>&copy; 2023 Alexy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
