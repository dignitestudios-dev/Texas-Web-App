'use client';

import { getRole } from '@/lib/cookies';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRole(getRole());
  }, [pathname]);

  const isCreateProfile = pathname?.includes('create-profile');
  // Profile creation pages use the full-screen layout with top-left logo
  const showSideImage = !isCreateProfile;

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-[#FEF0E9] font-sans">
      {/* Main Content */}
      <main className="flex flex-1 h-full overflow-hidden relative">
        {/* Left Side - Image */}
        {showSideImage && (
          <div className="hidden lg:block w-[577px] h-full relative shrink-0 overflow-hidden">
            <Image
              src="/images/left.webp"
              alt="Caregivers looking at the sea"
              fill
              className="object-cover"
              priority
            />
            {/* Logo Overlay - Centered horizontally at top */}
            <div className="absolute top-[37px] left-1/2 -translate-x-1/2">
              <Image
                src="/images/logo2.webp"
                alt="Texas Caregiver Alliance Logo"
                width={151}
                height={173}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Right Side - Dynamic Content (Scrollbars completely hidden) */}
        <div className="flex-1 flex flex-col h-full relative p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Contained Background Pattern */}
          {showSideImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <Image
                src="/images/bg2.webp"
                alt="bg1"
                fill
                className="object-cover opacity-5"
              />
            </div>
          )}

          <div className="relative z-10 flex-1 flex flex-col justify-center my-auto w-full max-w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
