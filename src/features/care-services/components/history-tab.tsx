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
  ArrowRight,
} from 'lucide-react';
import { ImageCarouselModal } from './image-carousel-modal';

type HistorySubTab = 'completed' | 'cancelled';

interface HistoryTabProps {
  historySubTab: HistorySubTab;
  onSubTabChange: (tab: HistorySubTab) => void;
}

export function HistoryTab({ historySubTab, onSubTabChange }: HistoryTabProps) {
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
    <div className="flex flex-col gap-6 w-full items-center h-full overflow-hidden">
      {/* Sub-tabs Selector Row */}
      <div className="flex flex-row items-center justify-start w-full max-w-[1080px] shrink-0">
        <div className="flex flex-row items-start h-[47px] w-[260px] bg-white border border-[#EFEFEF]/86 rounded-full overflow-hidden shrink-0 shadow-sm">
          {/* Completed Button */}
          <button
            onClick={() => onSubTabChange('completed')}
            className={`w-[130px] h-[47px] flex items-center justify-center font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] transition cursor-pointer border-none outline-none ${
              historySubTab === 'completed'
                ? 'bg-[#0A0A6E] text-white shadow-inner font-semibold'
                : 'bg-white text-[#121111] hover:bg-neutral-50'
            }`}
          >
            Completed
          </button>
          {/* Cancelled Button */}
          <button
            onClick={() => onSubTabChange('cancelled')}
            className={`w-[130px] h-[47px] flex items-center justify-center gap-1.5 font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] transition cursor-pointer border-none outline-none ${
              historySubTab === 'cancelled'
                ? 'bg-[#0A0A6E] text-white shadow-inner font-semibold'
                : 'bg-white text-[#121111] hover:bg-neutral-50'
            }`}
          >
            <span>Cancelled</span>
            <div className="w-2 h-2 bg-[#C81E1E] rounded-full shrink-0" />
          </button>
        </div>
      </div>

      {/* History Cards Scroll Area */}
      <div className="w-full h-full overflow-y-auto pr-2 pb-8 scrollbar-thin flex flex-col gap-6">
        {historySubTab === 'completed' ? (
          <>
            {/* Card 1 (Completed with Review Box) */}
            <div className="w-full max-w-[1080px] mx-auto bg-white rounded-xl shadow-lg border border-[#EFEFEF]/86 p-[20px] flex flex-col gap-[16px] animate-in fade-in duration-300">
              {/* Row 1: Header */}
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

                {/* Instant Job & Completed Pill */}
                <div className="flex items-center gap-3">
                  <div className="h-[39px] px-[20px] bg-[#257CFF] rounded-full flex items-center justify-center">
                    <span className="font-rubik font-medium text-[16px] text-white">
                      Instant Job
                    </span>
                  </div>
                  <div className="flex flex-row justify-center items-center py-2 px-5 bg-[#046C4E]/10 rounded-full text-[#046C4E] font-rubik font-normal text-[16px] tracking-[-0.005em] select-none shrink-0">
                    Completed
                  </div>
                </div>
              </div>

              {/* Row 2: Title, Category, Price */}
              <div className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col gap-[6px]">
                  <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                    Elderly Care Assistant Seeking Job
                  </span>
                  <span className="font-rubik font-normal text-[13px] text-[#121111]">
                    Elderly Care
                  </span>
                </div>
                {/* Price Tag */}
                <div className="w-[171px] h-[48px] bg-[#F1F5F9] rounded-full flex items-center justify-center gap-2 border border-transparent shrink-0">
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
                  <span>12:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#181818] shrink-0" />
                  <span>12 Dec 23</span>
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

              {/* Row 5: Action Row with Rehire & View Details Buttons */}
              <div className="w-full flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => router.push('/find-care')}
                  className="h-[48px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
                >
                  Rehire caregiver
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/my-jobs/history/svc-1')}
                  className="h-[48px] px-6 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full flex items-center justify-center gap-2 font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Row 6: Review Feedback Box */}
              <div className="w-full bg-[#F1F5F9] rounded-[4px] p-5 flex flex-col gap-[13px] text-left">
                <div className="flex flex-row justify-between items-center w-full">
                  {/* Stars */}
                  <div className="flex flex-row items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-[15px] ${
                          star <= 4 ? 'fill-[#FFC107] text-[#FFC107]' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Date */}
                  <span className="font-sans font-medium text-[12px] text-[#3D3D3D]">
                    21 Feb
                  </span>
                </div>
                {/* Review comment */}
                <p className="font-sans font-normal text-[14px] leading-[19px] tracking-[-0.18px] text-[#121111]">
                  John was incredibly patient and caring with my father. Highly recommended!
                </p>
                {/* Seeker Profile details */}
                <div className="flex flex-row items-center gap-[10px]">
                  <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100 relative">
                    <Image
                      src="/images/avatar.webp"
                      alt="Sarah M."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-sans font-medium text-[12px] text-[#121111] capitalize">
                    Sarah M.
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Cancelled sub-tab */
          <div className="w-full max-w-[1080px] mx-auto bg-white rounded-xl shadow-lg border border-[#EFEFEF]/86 p-[20px] flex flex-col gap-[16px] animate-in fade-in duration-300">
            {/* Row 1: Header */}
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
                  <div className="flex flex-row items-center gap-[8px]">
                    <span className="font-rubik font-light text-[14px] text-[#121111] pr-2 leading-[17px]">
                      Elderly Care Specialist
                    </span>
                    <span className="font-rubik font-light text-[14px] text-neutral-400 border-l border-neutral-300 pl-2 leading-[17px]">
                      12 Dec 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Cancelled Pill */}
              <div className="flex flex-row justify-center items-center py-2 px-5 bg-red-100 rounded-full text-red-600 font-rubik font-normal text-[16px] tracking-[-0.005em] select-none shrink-0">
                Cancelled
              </div>
            </div>

            {/* Row 2: Title & Category */}
            <div className="flex flex-col gap-[6px] text-left">
              <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                Elderly Care Assistant Seeking Job
              </span>
              <span className="font-rubik font-normal text-[13px] text-[#121111]">
                Elderly Care
              </span>
            </div>

            {/* Row 3: Cancellation Reason container */}
            <div className="w-full flex flex-col gap-2 text-left mt-2 border-b border-[#EFEFEF]/86 pb-4">
              <h4 className="font-sans font-bold text-[16px] text-red-600 leading-[19px]">
                Cancellation reason
              </h4>
              <p className="font-sans font-normal text-[14px] leading-[19px] text-[#565656]">
                Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna.
              </p>
            </div>

            {/* Row 4: View Details Button */}
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/my-jobs/history/svc-2')}
                className="h-[48px] px-6 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full flex items-center justify-center gap-2 font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
              >
                <span>View Details</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
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
