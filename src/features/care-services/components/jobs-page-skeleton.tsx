import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function JobsPageSkeleton() {
  return (
    <div className="h-[calc(100vh-0px)] bg-[#FFF6F0]/20 flex flex-col relative w-full overflow-hidden select-none animate-pulse">
      {/* Peach background tint */}
      <div className="absolute inset-0 bg-[#F36922]/5 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[25px] pb-6 overflow-hidden">
        
        {/* Header Block Skeleton */}
        <div className="w-full max-w-[1280px] flex flex-col gap-4 shrink-0">
          
          {/* Breadcrumbs & Action Button */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Skeleton className="w-9 h-9 rounded-full bg-neutral-200/80" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16 rounded bg-neutral-200/70" />
                <span className="text-neutral-300">/</span>
                <Skeleton className="h-4 w-20 rounded bg-neutral-200/70" />
              </div>
            </div>
            <Skeleton className="h-10 w-36 rounded-[10px] bg-neutral-200/80" />
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-8 w-44 rounded-lg bg-neutral-200/80" />
            <Skeleton className="h-4 w-72 rounded-md bg-neutral-200/60" />
          </div>

          {/* Main 4-Tab Navigation Bar */}
          <div className="flex items-center gap-3 w-full border-b border-[#EFEFEF] pb-3 pt-2">
            <Skeleton className="h-10 w-28 rounded-full bg-neutral-200/80" />
            <Skeleton className="h-10 w-28 rounded-full bg-neutral-200/60" />
            <Skeleton className="h-10 w-28 rounded-full bg-neutral-200/60" />
            <Skeleton className="h-10 w-28 rounded-full bg-neutral-200/60" />
          </div>
        </div>

        {/* Subtabs & Content Skeleton */}
        <div className="w-full max-w-[1280px] flex flex-col gap-5 flex-1 overflow-hidden">
          
          {/* Info Banner & Subtab pill switcher */}
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-4 w-80 rounded bg-neutral-200/70" />
          </div>

          <Skeleton className="h-[52px] w-[290px] rounded-full bg-neutral-200/80" />

          {/* Job Card Skeletons */}
          <div className="flex flex-col gap-5 w-full overflow-y-auto pr-1">
            {[1, 2].map((cardIdx) => (
              <div
                key={cardIdx}
                className="w-full bg-white rounded-[24px] border border-[#EFEFEF] p-6 flex flex-col gap-4 shadow-2xs"
              >
                {/* Caregiver Top Row */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-3.5">
                    <Skeleton className="w-12 h-12 rounded-full bg-neutral-200/80" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-32 rounded bg-neutral-200/80" />
                      <Skeleton className="h-3.5 w-44 rounded bg-neutral-200/60" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-28 rounded-full bg-neutral-200/70" />
                </div>

                {/* Job Title & Price Pill */}
                <div className="flex justify-between items-center w-full pt-1">
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-64 rounded-md bg-neutral-200/80" />
                    <Skeleton className="h-3.5 w-24 rounded bg-neutral-200/60" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full bg-neutral-200/70" />
                </div>

                {/* Description Lines */}
                <div className="flex flex-col gap-1.5 w-full">
                  <Skeleton className="h-3.5 w-full rounded bg-neutral-200/60" />
                  <Skeleton className="h-3.5 w-4/5 rounded bg-neutral-200/60" />
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap gap-4 pt-1">
                  <Skeleton className="h-4 w-20 rounded bg-neutral-200/60" />
                  <Skeleton className="h-4 w-20 rounded bg-neutral-200/60" />
                  <Skeleton className="h-4 w-32 rounded bg-neutral-200/60" />
                  <Skeleton className="h-4 w-24 rounded bg-neutral-200/60" />
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#F5F5F5]">
                  <Skeleton className="h-11 w-32 rounded-full bg-neutral-200/70" />
                  <Skeleton className="h-11 w-40 rounded-full bg-neutral-200/80" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
