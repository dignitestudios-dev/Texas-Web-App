import { Suspense } from 'react';
import { VerificationForm, VerificationSkeleton } from '@/features/auth';

export default function VerificationPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-full w-full">
      <Suspense fallback={<VerificationSkeleton />}>
        <VerificationForm />
      </Suspense>
    </div>
  );
}
