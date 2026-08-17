import { SubscriptionsList } from '@/features/subscriptions';
import Image from 'next/image';

export default function SubscriptionsPage() {
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
      <main className="flex-1 flex flex-col items-center justify-center pt-[150px] px-4 md:px-8">
        <SubscriptionsList />
      </main>
    </div>
  );
}
