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
  Info,
} from 'lucide-react';
import { ImageCarouselModal } from './image-carousel-modal';

type RequestStatus = 'Pending' | 'Completed' | 'Cancelled';

interface RequestsTabProps {
  requestStatus: RequestStatus;
  onCancelClick: () => void;
  onResetRequest: () => void;
}

const CARE_PHOTOS = [
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&auto=format&fit=crop&q=80',
];

export function RequestsTab({
  requestStatus,
  onCancelClick,
  onResetRequest,
}: RequestsTabProps) {
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
    <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
      <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto">
        
        {/* Information Banner matching screenshot */}
        <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[20px]">
          <Info className="w-4 h-4 text-[#121111] shrink-0" />
          <span>Track your requests sent to caregivers.</span>
        </div>

        {requestStatus !== 'Cancelled' ? (
          <div className="w-full bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-5 text-left">
            
            {/* Header Row: Avatar, Name & Rating (Left), Open chat & Status Pill (Right) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full border-b border-[#F0F0F0] pb-5">
              <div className="flex items-center gap-3.5">
                {/* Caregiver Avatar */}
                <div className="w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 border border-neutral-200 relative bg-[#F8F9FF]">
                  <Image
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
                    alt="John Doe"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Name & Specialization */}
                <div className="flex flex-col">
                  <h3 className="font-rubik font-bold text-[18px] sm:text-[19px] text-[#121111]">
                    John Doe
                  </h3>
                  <div className="flex items-center gap-2 text-[#565656] text-[13.5px] font-rubik">
                    <span>Elderly Care Specialist</span>
                    <span>|</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-medium text-[#121111]">5.0</span>
                      <span>(48)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Pills */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="h-[40px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                >
                  Open chat
                </button>
                <div className="h-[40px] px-6 bg-white border border-[#F36922] text-[#F36922] font-rubik font-medium text-[13.5px] rounded-full flex items-center justify-center">
                  Pending
                </div>
              </div>
            </div>

            {/* Title & Price Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
              <h4 className="font-rubik font-semibold text-[17px] text-[#121111]">
                Elderly Care Assistant Seeking Job
              </h4>
              <div className="bg-[#F0F4FA] rounded-[10px] px-3.5 py-1.5 flex items-center gap-1 font-rubik font-bold text-[18px] text-[#121111]">
                <span className="text-[15px] font-medium text-[#565656]">$</span>
                <span>$35-$50</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
              I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
            </p>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#565656] text-[13px] font-rubik">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#565656] shrink-0" />
                <span>09:00 AM - 10:00 AM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#565656] shrink-0" />
                <span>12 Dec 26</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#565656] shrink-0" />
                <span>San Juan, Texas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Locate className="w-4 h-4 text-[#565656] shrink-0" />
                <span>14 miles away</span>
              </div>
            </div>

            {/* Photo Thumbnails */}
            <div className="flex flex-wrap gap-3.5 w-full pt-1">
              {CARE_PHOTOS.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setCarouselState({
                      isOpen: true,
                      images: CARE_PHOTOS,
                      index: idx,
                    })
                  }
                  className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] rounded-[14px] overflow-hidden relative border border-neutral-200 cursor-pointer hover:opacity-90 transition group shadow-2xs"
                >
                  <Image
                    src={img}
                    alt={`Care Photo ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons: Cancel Service */}
            <div className="flex flex-wrap items-center gap-3.5 w-full pt-2">
              <button
                type="button"
                onClick={onCancelClick}
                className="h-[42px] px-6 bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#121111] font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none"
              >
                Cancel Service
              </button>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-[#F36922]/30 w-full">
            <span className="text-[44px] mb-2">🗑️</span>
            <h3 className="font-rubik font-semibold text-[20px] text-[#0A0A6E]">
              Job Request Cancelled
            </h3>
            <p className="font-rubik text-[14px] text-neutral-500 max-w-sm mt-1">
              You have cancelled this job request. You can explore caregivers and create new requests at any time.
            </p>
            <button
              type="button"
              onClick={onResetRequest}
              className="mt-4 px-5 py-2.5 bg-[#F36922] hover:bg-[#e05813] text-white rounded-full text-[14px] font-rubik font-medium cursor-pointer transition border-none shadow-xs"
            >
              Reset Request
            </button>
          </div>
        )}

      </div>

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
