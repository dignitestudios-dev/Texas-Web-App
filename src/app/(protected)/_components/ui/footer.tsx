import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
     <footer className="w-full bg-[#0A0A6E] flex flex-col items-center pt-[50px] pb-[60px] px-8 lg:px-[180px] gap-[50px] relative z-20 mt-auto">
        <div className="w-full max-w-[1080px] flex flex-col gap-[50px]">
          {/* Footer Top */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-[40px] lg:gap-[247px]">
            {/* Logo */}
            <div className="w-[110px] h-[126px] relative shrink-0">
              <Image src="/images/logo2.webp" alt="Logo" fill className="object-contain" />
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-between w-full gap-6 lg:gap-0">
              <Link href="#" className="font-rubik text-[15px] text-white tracking-[-0.05em] hover:opacity-80">Terms & Conditions</Link>
              <Link href="#" className="font-rubik text-[15px] text-white tracking-[-0.05em] hover:opacity-80">Privacy Policy</Link>
              <Link href="#" className="font-josefin text-[15px] text-white tracking-[-0.05em] hover:opacity-80">Contact Us</Link>
              <Link href="#" className="font-josefin text-[15px] text-white tracking-[-0.05em] hover:opacity-80">About Us</Link>
              <Link href="#" className="font-josefin text-[15px] text-white tracking-[-0.05em] hover:opacity-80">Your Account</Link>
            </div>
          </div>

          {/* Footer Divider */}
          <div className="w-full h-[1px] bg-white/20"></div>

          {/* Footer Bottom */}
          <div className="flex justify-center w-full">
            <span className="font-rubik text-[18px] text-white text-center">
              © 2026 Texas Caregiver | All Rights Reserved
            </span>
          </div>
        </div>
      </footer>
  )
}

export default Footer