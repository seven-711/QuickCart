import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '../../context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <div className="relative w-20 h-16 lg:w-40 lg:h-20 cursor-pointer" onClick={()=>router.push('/')}>
        <Image 
          src={assets.logo} 
          alt="Logo"
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 1024px) 20rem, 20rem"
          priority
        />
      </div>
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar