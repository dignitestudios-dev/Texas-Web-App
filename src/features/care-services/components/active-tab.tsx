'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  Info,
  DollarSign,
  Star,
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

const PHOTOS = [
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&auto=format&fit=crop&q=80',
];

export function ActiveTab({
  activeSubTab,
  onSubTabChange,
  onCancelOngoingClick,
  onMarkDoneClick,
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
    <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
      <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto text-left">

        {/* Info Banner Row */}
        <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[20px]">
          <Info className="w-4 h-4 text-[#121111] shrink-0" />
          <span>View and manage your current care services.</span>
        </div>

        {/* Subtab Segmented Control (Matching Provided Image Pixel-Perfect) */}
        <div className="flex items-center h-[52px] w-[290px] bg-white border border-[#D1D5DB] rounded-full overflow-hidden shrink-0 shadow-xs">
          <button
            type="button"
            onClick={() => onSubTabChange('ongoing')}
            className={`flex-1 h-full flex items-center justify-center font-rubik text-[16px] transition cursor-pointer border-none ${
              activeSubTab === 'ongoing'
                ? 'bg-[#050854] text-white font-bold'
                : 'bg-white text-[#121111] font-normal hover:bg-neutral-50'
            }`}
          >
            Ongoing
          </button>
          <button
            type="button"
            onClick={() => onSubTabChange('upcoming')}
            className={`flex-1 h-full flex items-center justify-center font-rubik text-[16px] transition cursor-pointer border-none ${
              activeSubTab === 'upcoming'
                ? 'bg-[#050854] text-white font-bold'
                : 'bg-white text-[#121111] font-normal hover:bg-neutral-50'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* ── ONGOING SUBTAB VIEW (Matching Screenshot Pixel-Perfect) ── */}
        {activeSubTab === 'ongoing' && (
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full bg-white rounded-[24px] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left shadow-xs">
              
              {/* Header: Caregiver Profile (Left) & Open Chat (Right) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden relative shrink-0 border border-neutral-100 bg-[#F8F9FF]">
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
                      alt="John Doe"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-rubik font-bold text-[18px] text-[#121111] leading-tight">
                      John Doe
                    </h3>
                    <div className="flex items-center gap-1.5 font-rubik text-[13.5px] text-[#565656] mt-0.5">
                      <span>Elderly Care Specialist</span>
                      <span className="text-neutral-300">|</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                        <span className="font-medium text-[#121111]">5.0 (48)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="h-[44px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-full transition cursor-pointer border-none shadow-xs shrink-0"
                >
                  Open chat
                </button>
              </div>

              {/* Title, Category & Budget */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full mt-1">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-rubik font-bold text-[18px] text-[#121111]">
                    Elderly Care Assistant Seeking Job
                  </h4>
                  <span className="text-[13.5px] font-rubik text-[#565656]">
                    Elderly Care
                  </span>
                </div>

                <div className="bg-[#F0F4FA] rounded-full px-4 py-1.5 flex items-center gap-1.5 font-rubik font-bold text-[18px] text-[#121111] shrink-0">
                  <div className="w-5 h-5 rounded-full border border-[#121111] flex items-center justify-center text-[12px] font-bold">
                    $
                  </div>
                  <span>$35-$50</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
                I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#565656] text-[13px] font-rubik">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>12:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>12 Dec 23</span>
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

              {/* Skill Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {['Child Care', 'Babysitting', 'Nursing'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1 bg-[#FEF0E9] text-[#121111] rounded-[6px] font-rubik text-[13px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-[#F0F0F0] my-1" />

              {/* 4 Photos Grid */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {PHOTOS.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      setCarouselState({
                        isOpen: true,
                        images: PHOTOS,
                        index: idx,
                      })
                    }
                    className="w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] rounded-[14px] overflow-hidden relative border border-[#EFEFEF] cursor-pointer hover:opacity-90 transition group shrink-0"
                  >
                    <Image
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-200"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Actions: Cancel Job & Mark Job As Done */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancelOngoingClick}
                  className="h-[44px] px-8 bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#121111] font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none"
                >
                  Cancel Job
                </button>
                <button
                  type="button"
                  onClick={onMarkDoneClick}
                  className="h-[44px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                >
                  Mark Job As Done
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ── UPCOMING SUBTAB VIEW ── */}
        {activeSubTab === 'upcoming' && (
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full bg-white rounded-[24px] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left shadow-xs">
              
              {/* Header: Caregiver Profile & Upcoming Badge */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden relative shrink-0 border border-neutral-100 bg-[#F8F9FF]">
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
                      alt="John Doe"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-rubik font-bold text-[18px] text-[#121111] leading-tight">
                      John Doe
                    </h3>
                    <div className="flex items-center gap-1.5 font-rubik text-[13.5px] text-[#565656] mt-0.5">
                      <span>Elderly Care Specialist</span>
                      <span className="text-neutral-300">|</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                        <span className="font-medium text-[#121111]">5.0 (48)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/chat')}
                    className="h-[44px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-full transition cursor-pointer border-none shadow-xs shrink-0"
                  >
                    Open chat
                  </button>

                  <span className="h-[40px] px-5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] font-rubik font-medium text-[13.5px] flex items-center justify-center shrink-0">
                    Upcoming
                  </span>
                </div>
              </div>

              {/* Title, Category & Budget */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full mt-1">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-rubik font-bold text-[18px] text-[#121111]">
                    Elderly Care Assistant Seeking Job
                  </h4>
                  <span className="text-[13.5px] font-rubik text-[#565656]">
                    Elderly Care
                  </span>
                </div>

                <div className="bg-[#F0F4FA] rounded-full px-4 py-1.5 flex items-center gap-1.5 font-rubik font-bold text-[18px] text-[#121111] shrink-0">
                  <div className="w-5 h-5 rounded-full border border-[#121111] flex items-center justify-center text-[12px] font-bold">
                    $
                  </div>
                  <span>$35-$50</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
                I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#565656] text-[13px] font-rubik">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>12:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>12 Dec 23</span>
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

              {/* Skill Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {['Child Care', 'Babysitting', 'Nursing'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1 bg-[#FEF0E9] text-[#121111] rounded-[6px] font-rubik text-[13px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-[#F0F0F0] my-1" />

              {/* 4 Photos Grid */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {PHOTOS.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      setCarouselState({
                        isOpen: true,
                        images: PHOTOS,
                        index: idx,
                      })
                    }
                    className="w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] rounded-[14px] overflow-hidden relative border border-[#EFEFEF] cursor-pointer hover:opacity-90 transition group shrink-0"
                  >
                    <Image
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-200"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Actions: Cancel Job ONLY */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancelOngoingClick}
                  className="h-[44px] px-8 bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#121111] font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none"
                >
                  Cancel Job
                </button>
              </div>

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
