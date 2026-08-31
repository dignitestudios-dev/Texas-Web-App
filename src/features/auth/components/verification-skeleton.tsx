import { Skeleton } from '@/components/ui/skeleton';

export function VerificationSkeleton() {
  return (
    <div className="flex flex-col items-center max-w-[445px] w-full mx-auto animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-10 self-start w-full">
        <Skeleton className="w-12 h-12 rounded-full bg-neutral-200/70" />
      </div>

      <div className="flex flex-col items-center w-full mt-4 space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center space-y-3 mb-6 w-full">
          <Skeleton className="h-8 w-44 rounded-lg bg-neutral-200/80 mx-auto" />
          <Skeleton className="h-4 w-64 rounded-md bg-neutral-200/60 mx-auto" />
        </div>

        {/* OTP Inputs Skeleton */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-12 h-[52px] rounded-xl bg-neutral-200/70" />
          ))}
        </div>

        {/* Resend Link Skeleton */}
        <Skeleton className="h-4 w-48 rounded-md bg-neutral-200/60 mb-4" />

        {/* Continue Button Skeleton */}
        <Skeleton className="w-full h-[48px] rounded-xl bg-neutral-200/80" />
      </div>
    </div>
  );
}
