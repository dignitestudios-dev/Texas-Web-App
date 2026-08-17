'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  MapPin,
  Locate,
  Clock,
  Calendar as CalendarIcon,
  DollarSign,
} from 'lucide-react';
import { ImageCarouselModal } from './image-carousel-modal';

type RequestStatus = 'Pending' | 'Completed' | 'Cancelled';

interface RequestsTabProps {
  requestStatus: RequestStatus;
  onCancelClick: () => void;
  onResetRequest: () => void;
}

const REQUEST_IMAGES = [
  '/images/home/search.webp',
  '/images/home/profile.webp',
  '/images/home/find.webp',
  '/images/home/position.webp',
];

export function RequestsTab({ requestStatus, onCancelClick, onResetRequest }: RequestsTabProps) {
  const router = useRouter();
  const [carouselState, setCarouselState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0,
  });

  return (
    <div className="w-full h-full overflow-y-auto pr-2 pb-8 scrollbar-thin">
      {requestStatus !== 'Cancelled' ? (
        <div className="w-full max-w-[1080px] mx-auto bg-white rounded-xl shadow-lg border border-[#EFEFEF]/86 p-[15px] flex flex-col gap-[16px] animate-in fade-in duration-300">
          {/* Row 1: Header Row (Avatar, Name, Badges) */}
          <div className="flex flex-row justify-between items-center w-full border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex flex-row items-center gap-[12px]">
              {/* Avatar */}
              <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                <Image
                  src="/images/avatar.webp"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title Stack */}
              <div className="flex flex-col justify-center items-start gap-[6px]">
                <span className="font-poppins font-bold text-[18px] text-[#333333] leading-[24px] tracking-tight">
                  John Doe
                </span>
                {/* Rating block */}
                <div className="flex flex-row items-center gap-[8px]">
                  <span className="font-rubik font-light text-[14px] text-[#121111] border-r border-[#121111] pr-2 leading-[17px]">
                    Elderly Care Specialist
                  </span>
                  <div className="flex items-center gap-[2px]">
                    <Star className="w-[16px] h-[16px] fill-[#FFC107] stroke-none" />
                    <span className="font-rubik font-light text-[14px] text-[#121111] leading-[17px]">
                      5.0 (48)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat & Status Badges */}
            <div className="flex flex-row items-center gap-[12px]">
              {/* Open Chat Button */}
              <button
                onClick={() => router.push('/chat')}
                className="w-[150px] h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none"
              >
                Open chat
              </button>

              {/* Pending/Completed Status */}
              <div className={`w-[150px] h-[48px] rounded-full flex items-center justify-center border font-poppins font-medium text-[13px] select-none ${requestStatus === 'Completed'
                  ? 'bg-green-50 border-green-500 text-green-600'
                  : 'bg-[#F1F5F9] border-[#F36922] text-[#F36922]'
                }`}>
                {requestStatus}
              </div>
            </div>
          </div>

          {/* Row 2: Title & Price Tag */}
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
              Elderly Care Assistant Seeking Job
            </span>
            {/* Price Rate Tag */}
            <div className="w-[171px] h-[48px] bg-[#F1F5F9] rounded-full flex items-center justify-center gap-2 border border-transparent">
              <DollarSign className="w-5 h-5 text-[#121111] shrink-0" />
              <span className="font-rubik font-medium text-[24px] text-[#121111] leading-[28px] tracking-tight">
                $35-$50
              </span>
            </div>
          </div>

          {/* Row 3: Description */}
          <p className="font-sans font-medium text-[14px] text-[#181818] leading-[19px] text-left">
            I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
          </p>

          {/* Row 4: Meta Info Row */}
          <div className="flex flex-row flex-wrap items-center gap-[24px] text-[#181818] text-[14px] font-medium leading-[19px] border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#181818] shrink-0" />
              <span>09:00 AM - 10:00 AM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#181818] shrink-0" />
              <span>12 Dec 26</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#181818] shrink-0" />
              <span>San Juan, Texas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Locate className="w-4 h-4 text-[#181818] shrink-0" />
              <span>14 miles away</span>
            </div>
          </div>

          {/* Row 5: Uploaded Images */}
          <div className="flex flex-row flex-wrap gap-[14px] w-full">
            {REQUEST_IMAGES.map((img, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setCarouselState({
                    isOpen: true,
                    images: REQUEST_IMAGES,
                    index: idx,
                  })
                }
                className="w-[110px] h-[110px] bg-[#F1F1F1] rounded-[13px] overflow-hidden shrink-0 border border-neutral-200 relative cursor-pointer hover:opacity-90 transition group"
              >
                <Image
                  src={img}
                  alt={`Uploaded Care Context ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-200"
                />
              </div>
            ))}
          </div>

          {/* Row 6: Bottom Action Buttons */}
          <div className="flex flex-row gap-[16px] w-full mt-2">
            {/* Cancel Job Button */}
            <button
              onClick={onCancelClick}
              className="w-[147px] h-[48px] bg-[#FEF0E9] hover:bg-[#fde4d5] text-black rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none"
            >
              Cancel Job
            </button>
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/50 rounded-2xl border border-dashed border-[#F36922]/20 w-full max-w-[1080px] mx-auto">
          <span className="text-[48px] mb-2">🗑️</span>
          <h3 className="font-rubik font-semibold text-[20px] text-[#0A0A6E]">Job Request Cancelled</h3>
          <p className="font-rubik font-light text-[14px] text-neutral-500 max-w-sm mt-1">
            You have successfully cancelled this job request. Feel free to explore other care services.
          </p>
          <button
            onClick={onResetRequest}
            className="mt-4 px-4 py-2 bg-[#F36922] hover:bg-[#e05813] text-white rounded-lg text-[14px] cursor-pointer transition border-none font-medium"
          >
            Reset Request
          </button>
        </div>
      )}

      {/* Image Carousel Modal */}
      <ImageCarouselModal
        isOpen={carouselState.isOpen}
        onClose={() => setCarouselState((prev) => ({ ...prev, isOpen: false }))}
        images={carouselState.images}
        initialIndex={carouselState.index}
      />
    </div>
  );
}
