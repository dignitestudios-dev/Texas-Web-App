import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FEF0E9] font-sans">
      
      {/* Navbar */}
      {/* <nav className="flex items-center px-6 md:px-20 h-[90px] bg-white border-b border-[#EFEFEF] shrink-0">
        <Link href="/" className="flex items-center gap-10">
          <Image
            src="/images/logo.webp"
            alt="Texas Caregiver Alliance Logo"
            width={58}
            height={66}
            priority
          />
        </Link>
      </nav> */}

      {/* Main Content */}
      <main className="flex flex-1 relative overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden lg:block w-[577px] relative shrink-0">
          <Image
            src="/images/left.webp"
            alt="Caregivers looking at the sea"
            fill
            className="object-cover"
            priority
          />
          {/* Logo Overlay */}
          <div className="absolute left-[213px] top-[37px]">
            <Image
              src="/images/logo2.webp"
              alt="Texas Caregiver Alliance Logo"
              width={151}
              height={173}
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* Right Side - Dynamic Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden p-8 overflow-y-auto">
          <Image src={"/images/bg2.webp"} alt='bg1' width={1200} height={800} className='object-cover absolute top-0 opacity-5 scale-110 left-0 h-full overflow-hidden w-full z-0' />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
