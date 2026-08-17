'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { ImageCarouselModal } from './image-carousel-modal';

type ActiveSubTab = 'ongoing' | 'upcoming';

interface ActiveTabProps {
  activeSubTab: ActiveSubTab;
  onSubTabChange: (tab: ActiveSubTab) => void;
  ongoingStatus?: string;
  onCancelOngoingClick?: () => void;
  onMarkDoneClick?: () => void;
}

export function ActiveTab({
  activeSubTab,
  onSubTabChange,
  onCancelOngoingClick,
}: ActiveTabProps) {
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
          {/* Ongoing Button */}
          <button
            onClick={() => onSubTabChange('ongoing')}
            className={`w-[130px] h-[47px] flex items-center justify-center font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px] transition cursor-pointer border-none outline-none ${activeSubTab === 'ongoing'
                ? 'bg-[#0A0A6E] text-white shadow-inner'
                : 'bg-white text-[#121111] hover:bg-neutral-50'
              }`}
          >
            Ongoing
          </button>
          {/* Upcoming Button */}
          <button
            onClick={() => onSubTabChange('upcoming')}
            className={`w-[130px] h-[47px] flex items-center justify-center font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px] transition cursor-pointer border-none outline-none ${activeSubTab === 'upcoming'
                ? 'bg-[#0A0A6E] text-white shadow-inner'
                : 'bg-white text-[#121111] hover:bg-neutral-50'
              }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Sub-tab Views (Scrollable cards block) */}
      <div className="w-full h-full overflow-y-auto pr-2 pb-8 scrollbar-thin flex flex-col gap-[20px]">
        {/* ── CARD 1: Standard Job Card ── */}
        <div className="w-full max-w-[1080px] mx-auto bg-white rounded-[12px] shadow-[2px_2px_50px_rgba(0,0,0,0.1)] border border-[#EFEFEF]/86 p-[20px] flex flex-col gap-[16px]">
          {/* Row 1: Title & Budget Tag */}
          <div className="flex flex-row justify-between items-start w-full border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-3">
                <h3 className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                  Elderly Care Assistant Seeking Job
                </h3>
                <span className="px-3 py-1 bg-[#F8F9FF] border border-[#0A0A6E] text-[#0A0A6E] rounded-full font-poppins font-medium text-[12px] capitalize">
                  {activeSubTab === 'ongoing' ? 'Ongoing' : 'Upcoming'}
                </span>
              </div>
              <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                Elderly Care
              </span>
            </div>

            {/* Price Tag */}
            <div className="h-[48px] px-[20px] bg-[#F8F9FF] rounded-[8px] flex items-center justify-center gap-2 border border-transparent">
              <DollarSign className="w-5 h-5 text-[#121111] shrink-0" />
              <span className="font-rubik font-medium text-[24px] text-[#121111] leading-[28px] tracking-tight">
                $35-$50
              </span>
            </div>
          </div>

          {/* Row 2: Description */}
          <p className="font-sans font-medium text-[14px] text-[#181818] leading-[19px] text-left">
            I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
          </p>

          {/* Row 3: Meta Info Row */}
          <div className="flex flex-row flex-wrap items-center gap-[24px] text-[#181818] text-[14px] font-medium leading-[19px] border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#181818] shrink-0" />
              <span>$200 - $300</span>
            </div>
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

          {/* Row 4: Caregiver Info */}
          <div className="flex flex-row items-center gap-[12px] border-b border-[#EFEFEF]/85 pb-[16px]">
            <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
              <Image
                src="/images/avatar.webp"
                alt="Nandi Bolard"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-[4px]">
              <span className="font-rubik font-medium text-[16px] text-[#121111]">
                Nandi Bolard
              </span>
              <div className="flex flex-row flex-wrap items-center gap-[8px] text-[14px] text-[#6D6D6D]">
                <span className="border-r border-[#121111] pr-2">Elderly Care Specialist</span>
                <span className="border-r border-[#121111] pr-2">12 Dec - 16 Jan 23</span>
                <span>Agreed pay : 30$</span>
              </div>
            </div>
          </div>

          {/* Row 5: Footer Actions */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="h-[48px] px-[24px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
              >
                Open chat
              </button>

              {/* Cancel Job Button for Upcoming Tab */}
              {activeSubTab === 'upcoming' && (
                <button
                  type="button"
                  onClick={onCancelOngoingClick}
                  className="h-[48px] px-[24px] bg-[#FEF0E9] hover:bg-[#fde2d3] text-[#000000] rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
                >
                  Cancel Job
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => router.push(`/my-jobs/svc-1?status=${activeSubTab}`)}
              className="h-[48px] px-[24px] bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full flex items-center justify-center gap-2 font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
            >
              <span>View Job Details</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* ── CARD 2: Instant Job Card ── */}
        <div className="w-full max-w-[1080px] mx-auto bg-white rounded-[12px] shadow-[2px_2px_50px_rgba(0,0,0,0.1)] border border-[#EFEFEF]/86 p-[20px] flex flex-col gap-[16px]">
          {/* Row 1: Instant Job Badge & Price */}
          <div className="flex flex-row justify-between items-start w-full border-b border-[#EFEFEF]/86 pb-[16px]">
            <div className="flex flex-col items-start gap-[8px]">
              <div className="flex items-center gap-3">
                <div className="h-[39px] px-[20px] bg-[#257CFF] rounded-full flex items-center justify-center">
                  <span className="font-rubik font-medium text-[16px] text-white">
                    Instant Job
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#F8F9FF] border border-[#0A0A6E] text-[#0A0A6E] rounded-full font-poppins font-medium text-[12px] capitalize">
                  {activeSubTab === 'ongoing' ? 'Ongoing' : 'Upcoming'}
                </span>
              </div>
              <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                Elderly Care
              </span>
            </div>

            {/* Price Tag */}
            <div className="h-[48px] px-[20px] bg-[#F8F9FF] rounded-[8px] flex items-center justify-center gap-2 border border-transparent">
              <DollarSign className="w-5 h-5 text-[#121111] shrink-0" />
              <span className="font-rubik font-medium text-[24px] text-[#121111] leading-[28px] tracking-tight">
                $50
              </span>
            </div>
          </div>

          {/* Row 2: Description */}
          <p className="font-sans font-medium text-[14px] text-[#181818] leading-[19px] text-left">
            I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
          </p>

          {/* Row 3: Meta Info Row */}
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

          {/* Row 4: Caregiver Info */}
          <div className="flex flex-row items-center gap-[12px] border-b border-[#EFEFEF]/85 pb-[16px]">
            <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
              <Image
                src="/images/avatar.webp"
                alt="Nandi Bolard"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-[4px]">
              <span className="font-rubik font-medium text-[16px] text-[#121111]">
                Nandi Bolard
              </span>
              <div className="flex flex-row flex-wrap items-center gap-[8px] text-[14px] text-[#6D6D6D]">
                <span className="border-r border-[#121111] pr-2">Elderly Care Specialist</span>
                <span className="border-r border-[#121111] pr-2">12 Dec - 16 Jan 23</span>
                <span>Agreed pay : 30$</span>
              </div>
            </div>
          </div>

          {/* Row 5: Footer Actions */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="h-[48px] px-[24px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
              >
                Open chat
              </button>

              {/* Cancel Job Button for Upcoming Tab */}
              {activeSubTab === 'upcoming' && (
                <button
                  type="button"
                  onClick={onCancelOngoingClick}
                  className="h-[48px] px-[24px] bg-[#FEF0E9] hover:bg-[#fde2d3] text-[#000000] rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
                >
                  Cancel Job
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => router.push(`/my-jobs/svc-2?status=${activeSubTab}`)}
              className="h-[48px] px-[24px] bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full flex items-center justify-center gap-2 font-poppins font-medium text-[15px] cursor-pointer transition border-none outline-none shadow-sm"
            >
              <span>View Job Details</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
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
