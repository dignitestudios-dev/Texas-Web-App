'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, Clock, Navigation, DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';

export interface FeaturedJobItem {
  id: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  title: string;
  postedTime: string;
  description: string;
  payRange: string;
  distance: string;
  duration: string;
  posterName: string;
  posterAvatar: string;
  posterRating: number;
  posterReviews: number;
  posterServices: number;
}

interface FeaturedJobsCarouselProps {
  jobs: FeaturedJobItem[];
  onViewDetails?: (id: string) => void;
}

export function FeaturedJobsCarousel({ jobs, onViewDetails }: FeaturedJobsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-4 select-none group overflow-hidden">
      {/* Previous Button (Left Arrow) */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-[5vw] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0px_4px_20px_rgba(0,0,0,0.15)] border border-neutral-100 flex items-center justify-center z-30 cursor-pointer hover:bg-neutral-50 hover:scale-105 transition-all outline-none"
      >
        <ArrowLeft className="w-5 h-5 text-[#121111]" />
      </button>

      {/* Next Button (Right Arrow) */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next Slide"
        className="absolute right-4 md:right-[5vw] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0px_4px_20px_rgba(0,0,0,0.15)] border border-neutral-100 flex items-center justify-center z-30 cursor-pointer hover:bg-neutral-50 hover:scale-105 transition-all outline-none"
      >
        <ArrowRight className="w-5 h-5 text-[#121111]" />
      </button>

      {/* Embla Viewport */}
      <div className="overflow-hidden w-full py-4 pl-4 md:pl-[10vw] pr-4" ref={emblaRef}>
        <div className="flex gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex-[0_0_340px] sm:flex-[0_0_380px] lg:flex-[0_0_413px] min-w-0"
            >
              {/* Featured Job Card */}
              <Link
                href={`/freelance-jobs/${job.id}`}
                onClick={() => onViewDetails?.(job.id)}
                className="w-full h-[319px] bg-white rounded-[12px] p-[15px] flex flex-col justify-between gap-[14px] shadow-sm border border-[#EFEFEF] hover:shadow-md transition cursor-pointer"
              >
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-[8px] w-full h-[28px]">
                  {/* Left Badges Group */}
                  <div className="flex items-center gap-[8px]">
                    {/* Category Badge */}
                    <div className="bg-[#FEF0E9] rounded-[8px] px-[12px] py-[5px] flex items-center justify-center shrink-0">
                      <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                        {job.category}
                      </span>
                    </div>

                    {/* NEW Badge */}
                    {job.isNew && (
                      <div className="bg-[#FEF0E9] rounded-[8px] px-[12px] py-[5px] flex items-center justify-center shrink-0">
                        <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Featured Badge */}
                  <div className="bg-[#FEF0E9] border border-[#F36922]/20 rounded-[8px] px-[10px] py-[4px] flex items-center gap-[4px] shrink-0">
                    <Star className="w-3.5 h-3.5 fill-[#F36922] text-[#F36922]" />
                    <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#F36922]">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Middle Info Section */}
                <div className="flex flex-col gap-[8px] w-full pb-[12px] border-b border-[#EFEFEF]">
                  <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111] line-clamp-1">
                    {job.title}
                  </h3>
                  <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#121111]">
                    {job.postedTime}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#3D3D3D] line-clamp-2">
                      {job.description}
                    </p>
                    <span
                      className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] underline w-fit hover:opacity-80 transition"
                    >
                      View Details
                    </span>
                  </div>
                </div>

                {/* Metadata Badges Row */}
                <div className="flex items-center gap-[8px] w-full pb-[12px] border-b border-[#EFEFEF]">
                  {/* Pay Range Badge */}
                  <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-[5px] shrink-0">
                    <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
                      <DollarSign className="w-3.5 h-3.5 text-[#0A0A6E]" />
                    </div>
                    <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#0A0A6E]">
                      {job.payRange}
                    </span>
                  </div>

                  {/* Radius Badge */}
                  <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-[5px] shrink-0">
                    <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#0A0A6E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="7" />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#0A0A6E]">
                      {job.distance}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-[5px] shrink-0">
                    <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
                    </div>
                    <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#0A0A6E]">
                      {job.duration}
                    </span>
                  </div>
                </div>

                {/* Footer / Poster Profile Row */}
                <div className="flex items-center gap-[5px] w-full h-[43px]">
                  {/* Avatar */}
                  <div className="w-[43px] h-[43px] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                    <Image src={job.posterAvatar} alt={job.posterName} fill className="object-cover" />
                  </div>

                  {/* Name and Rating */}
                  <div className="flex flex-col justify-end gap-[5px] h-[41px]">
                    <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111] line-clamp-1">
                      {job.posterName}
                    </span>
                    <div className="flex items-center gap-[8px] h-[17px]">
                      {/* Star & Rating */}
                      <div className="flex items-center gap-[2px] pr-[8px] border-r border-[#121111] h-[17px]">
                        <Star className="w-[16px] h-[16px] fill-[#FFC107] stroke-none shrink-0" />
                        <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] text-center">
                          {job.posterRating.toFixed(1)} ({job.posterReviews})
                        </span>
                      </div>
                      {/* Services */}
                      <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] text-center">
                        {job.posterServices} Services
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
