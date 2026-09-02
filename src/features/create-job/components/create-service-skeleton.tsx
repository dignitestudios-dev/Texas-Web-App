import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function CreateServiceSkeleton() {
  return (
    <div className="min-h-screen bg-white w-full py-8 px-4 sm:px-8 select-none animate-pulse">
      <div className="max-w-[840px] mx-auto flex flex-col gap-8 text-left">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-11 h-11 rounded-full bg-neutral-200/80 shrink-0" />
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-7 w-48 rounded-md bg-neutral-200/80" />
            <Skeleton className="h-4 w-72 rounded bg-neutral-200/60" />
          </div>
          <div className="w-11 shrink-0" />
        </div>

        {/* Stepper Skeleton */}
        <div className="flex items-center justify-center gap-3 w-full py-2">
          <Skeleton className="w-8 h-8 rounded-full bg-neutral-200/80" />
          <Skeleton className="w-20 h-1 rounded bg-neutral-200/60" />
          <Skeleton className="w-8 h-8 rounded-full bg-neutral-200/60" />
          <Skeleton className="w-20 h-1 rounded bg-neutral-200/60" />
          <Skeleton className="w-8 h-8 rounded-full bg-neutral-200/60" />
        </div>

        {/* Content Form Skeleton */}
        <div className="w-full bg-white rounded-[24px] border border-[#EFEFEF] p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-28 rounded-2xl bg-neutral-200/70" />
            <Skeleton className="h-28 rounded-2xl bg-neutral-200/70" />
            <Skeleton className="h-28 rounded-2xl bg-neutral-200/70" />
            <Skeleton className="h-28 rounded-2xl bg-neutral-200/70" />
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Skeleton className="h-4 w-28 rounded bg-neutral-200/70" />
            <Skeleton className="h-11 w-full rounded-xl bg-neutral-200/70" />
          </div>

          <div className="flex justify-end pt-4">
            <Skeleton className="h-12 w-36 rounded-full bg-neutral-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
