import { WelcomeSuccess } from '@/features/auth';
import Image from 'next/image';

export default function WelcomePage() {
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
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        <WelcomeSuccess />
      </main>
    </div>
  );
}
