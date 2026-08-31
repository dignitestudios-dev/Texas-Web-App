import { SubscriptionsList } from '@/features/subscriptions';

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col relative w-full overflow-x-hidden">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-[60px] px-4 md:px-8">
        <SubscriptionsList />
      </main>
    </div>
  );
}
