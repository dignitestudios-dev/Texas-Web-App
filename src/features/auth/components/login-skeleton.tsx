import { Skeleton } from '@/components/ui/skeleton';

export function LoginSkeleton() {
  return (
    <div className="flex flex-col items-center w-full max-w-[447px] mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center space-y-3 w-full">
        <Skeleton className="h-8 w-48 rounded-lg bg-neutral-200/80" />
        <Skeleton className="h-4 w-72 rounded-md bg-neutral-200/60" />
      </div>

      {/* Social Logins Skeleton */}
      <div className="flex flex-row justify-center items-center gap-5 w-full">
        <Skeleton className="flex-1 h-[50px] rounded-xl bg-neutral-200/70" />
        <Skeleton className="flex-1 h-[50px] rounded-xl bg-neutral-200/70" />
      </div>

      {/* Divider Skeleton */}
      <div className="flex flex-row items-center gap-[10px] w-full">
        <div className="flex-1 border-t border-[#EFEFEF]" />
        <Skeleton className="h-4 w-6 rounded bg-neutral-200/60" />
        <div className="flex-1 border-t border-[#EFEFEF]" />
      </div>

      {/* Form Skeleton */}
      <div className="flex flex-col w-full space-y-8">
        {/* Phone Input Row Skeleton */}
        <div className="flex flex-row items-center gap-2 w-full">
          <Skeleton className="w-[112px] h-[44px] rounded-xl bg-neutral-200/70" />
          <Skeleton className="flex-1 h-[44px] rounded-xl bg-neutral-200/70" />
        </div>

        {/* Continue Button Skeleton */}
        <Skeleton className="w-full h-[48px] rounded-xl bg-neutral-200/80" />
      </div>

      {/* Footer Text Skeleton */}
      <Skeleton className="h-4 w-52 rounded-md bg-neutral-200/60 pt-2" />
    </div>
  );
}
