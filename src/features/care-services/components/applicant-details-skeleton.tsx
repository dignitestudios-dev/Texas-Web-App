import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ApplicantDetailsSkeleton() {
  return (
    <div className="min-h-[calc(100vh-0px)] bg-[#FFF6F0]/20 flex flex-col relative w-full pb-16 select-none animate-pulse">
      <div className="absolute inset-0 bg-[#F36922]/5 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 flex flex-col gap-6 text-left">
        
        {/* Breadcrumb Navigation Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full bg-neutral-200/80" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-14 rounded bg-neutral-200/70" />
            <span className="text-neutral-300">/</span>
            <Skeleton className="h-4 w-16 rounded bg-neutral-200/70" />
            <span className="text-neutral-300">/</span>
            <Skeleton className="h-4 w-32 rounded bg-neutral-200/70" />
          </div>
        </div>

        {/* Main Card Skeleton */}
        <div className="w-full bg-white rounded-[24px] border border-[#EFEFEF] p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
          
          {/* Applicant Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#F5F5F5]">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full bg-neutral-200/80 shrink-0" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-40 rounded-md bg-neutral-200/80" />
                <Skeleton className="h-4 w-52 rounded bg-neutral-200/60" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-28 rounded-full bg-neutral-200/70" />
              <Skeleton className="h-10 w-32 rounded-full bg-neutral-200/80" />
            </div>
          </div>

          {/* Proposal / Cover Note Skeleton */}
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-36 rounded bg-neutral-200/70" />
            <Skeleton className="h-4 w-full rounded bg-neutral-200/60" />
            <Skeleton className="h-4 w-11/12 rounded bg-neutral-200/60" />
            <Skeleton className="h-4 w-4/5 rounded bg-neutral-200/60" />
          </div>

          {/* Job Details Skeleton */}
          <div className="flex flex-col gap-4 pt-4 border-t border-[#F5F5F5]">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-64 rounded bg-neutral-200/80" />
              <Skeleton className="h-8 w-24 rounded-full bg-neutral-200/70" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-4 w-24 rounded bg-neutral-200/60" />
              <Skeleton className="h-4 w-24 rounded bg-neutral-200/60" />
              <Skeleton className="h-4 w-32 rounded bg-neutral-200/60" />
            </div>
          </div>

          {/* Bottom Actions Skeleton */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#F5F5F5]">
            <Skeleton className="h-12 w-36 rounded-[14px] bg-neutral-200/70" />
            <Skeleton className="h-12 w-44 rounded-[14px] bg-neutral-200/80" />
          </div>

        </div>

      </div>
    </div>
  );
}
