'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Navigation, DollarSign } from 'lucide-react';

export interface FreelanceJobCardProps {
  id: string;
  category: string;
  isNew?: boolean;
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
  onViewDetails?: (id: string) => void;
}

export const FreelanceJobCard: React.FC<FreelanceJobCardProps> = ({
  id,
  category,
  isNew = false,
  title,
  postedTime,
  description,
  payRange,
  distance,
  duration,
  posterName,
  posterAvatar,
  posterRating,
  posterReviews,
  posterServices,
  onViewDetails,
}) => {
  return (
    <Link
      href={`/freelance-jobs/${id}`}
      onClick={() => onViewDetails?.(id)}
      className="w-full max-w-[413.33px] h-[319px] bg-white rounded-[12px] p-[15px] flex flex-col justify-between gap-[14px] shadow-xs border border-[#EFEFEF]/86 select-none mx-auto hover:shadow-md transition cursor-pointer"
    >
      {/* Top Badges Row */}
      <div className="flex items-center gap-[12px] w-full h-[28px]">
        {/* Category Badge */}
        <div className="bg-[#FEF0E9] rounded-[8px] px-[12px] py-[5px] flex items-center justify-center gap-[10px] shrink-0">
          <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
            {category}
          </span>
        </div>

        {/* NEW Badge */}
        {isNew && (
          <div className="bg-[#FEF0E9] rounded-[8px] px-[12px] py-[5px] flex items-center justify-center gap-[10px] shrink-0">
            <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
              NEW
            </span>
          </div>
        )}
      </div>

      {/* Middle Info Section */}
      <div className="flex flex-col gap-[8px] w-full pb-[12px] border-b border-[#EFEFEF]/86">
        <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111] line-clamp-1">
          {title}
        </h3>
        <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#121111]">
          {postedTime}
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#3D3D3D] line-clamp-2">
            {description}
          </p>
          <span
            className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] underline w-fit hover:opacity-80 transition"
          >
            View Details
          </span>
        </div>
      </div>

      {/* Metadata Badges Row */}
      <div className="flex items-center gap-[8px] w-full pb-[12px] border-b border-[#EFEFEF]/86">
        {/* Pay Range Badge */}
        <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-[5px] shrink-0">
          <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
            <DollarSign className="w-3.5 h-3.5 text-[#0A0A6E]" />
          </div>
          <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#0A0A6E]">
            {payRange}
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
            {distance}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-[5px] shrink-0">
          <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
          </div>
          <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#0A0A6E]">
            {duration}
          </span>
        </div>
      </div>

      {/* Footer / Poster Profile Row */}
      <div className="flex items-center gap-[5px] w-full h-[43px]">
        {/* Avatar */}
        <div className="w-[43px] h-[43px] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
          <Image src={posterAvatar} alt={posterName} fill className="object-cover" />
        </div>

        {/* Name and Rating */}
        <div className="flex flex-col justify-end gap-[5px] h-[41px]">
          <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111] line-clamp-1">
            {posterName}
          </span>
          <div className="flex items-center gap-[8px] h-[17px]">
            {/* Star & Rating */}
            <div className="flex items-center gap-[2px] pr-[8px] border-r border-[#121111] h-[17px]">
              <Star className="w-[16px] h-[16px] fill-[#FFC107] stroke-none shrink-0" />
              <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] text-center">
                {posterRating.toFixed(1)} ({posterReviews})
              </span>
            </div>
            {/* Services */}
            <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] text-center">
              {posterServices} Services
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
