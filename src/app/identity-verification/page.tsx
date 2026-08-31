import { IdentityVerification } from '@/features/auth';
import Image from 'next/image';

export default function IdentityVerificationPage() {
  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col relative w-full overflow-x-hidden">
      {/* Top Left Logo */}
      <div className="absolute top-[20px] left-[20px] md:left-[150px] z-10">
        <Image
          src="/images/logo2.webp"
          alt="Texas Caregiver Alliance Logo"
          width={110}
          height={126}
          priority
          className="w-auto h-[60px] md:h-[85px] object-contain"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-[100px] md:pt-[120px] px-4">
        <IdentityVerification />
      </main>
    </div>
  );
}
