'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  Info,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

type ActiveSubTab = 'ongoing' | 'upcoming';

interface MyJobsActiveTabProps {
  activeSubTab: ActiveSubTab;
  onSubTabChange: (tab: ActiveSubTab) => void;
  ongoingStatus?: string;
  onCancelOngoingClick?: () => void;
}

export function MyJobsActiveTab({
  activeSubTab,
  onSubTabChange,
  onCancelOngoingClick,
}: MyJobsActiveTabProps) {
  const router = useRouter();

  return (
    <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
      <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto text-left">
        
        {/* Info Banner Row */}
        <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[20px]">
          <Info className="w-4 h-4 text-[#121111] shrink-0" />
          <span>Manage active engagements and schedule appointments.</span>
        </div>

        {/* Subtab Segmented Control */}
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

        {/* ── ONGOING SUBTAB VIEW ── */}
        {activeSubTab === 'ongoing' && (
          <div className="flex flex-col gap-6 w-full">
            
            {/* CARD 1: Standard Ongoing Job */}
            <div className="w-full bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left">
              {/* Title & Budget */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-rubik font-semibold text-[17px] sm:text-[18px] text-[#121111]">
                    Elderly Care Assistant Seeking Job
                  </h4>
                  <span className="text-[13.5px] font-rubik text-[#565656]">
                    Elderly Care
                  </span>
                </div>
                <div className="bg-[#F0F4FA] rounded-full px-3.5 py-1.5 flex items-center gap-1 font-rubik font-bold text-[18px] text-[#121111]">
                  <span className="text-[15px] font-medium text-[#565656]">$</span>
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
                  <DollarSign className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>$200 - $300</span>
                </div>
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

              {/* Caregiver Snippet Row */}
              <div className="flex items-center gap-3 w-full border-t border-[#F0F0F0] pt-4">
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative shrink-0 border border-neutral-200 bg-[#F8F9FF]">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
                    alt="Nandi Bolard"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[13px] font-rubik text-[#565656]">
                  <span className="font-bold text-[#121111]">Nandi Bolard</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Elderly Care Specialist</span>
                  <span className="hidden sm:inline">|</span>
                  <span>12 Dec - 16 Jan 23</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Agreed pay : 30$</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between w-full pt-1">
                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="h-[42px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                >
                  Open chat
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/my-jobs/1')}
                  className="h-[42px] px-6 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs flex items-center gap-2"
                >
                  <span>View Job Details</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* CARD 2: Instant Job */}
            <div className="w-full bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left">
              {/* Badge + Subtitle + Budget */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                <div className="flex flex-col gap-1 items-start">
                  <span className="bg-[#257CFF] text-white font-rubik font-medium text-[13px] px-4 py-1 rounded-full">
                    Instant Job
                  </span>
                  <span className="text-[13.5px] font-rubik text-[#565656]">
                    Elderly Care
                  </span>
                </div>
                <div className="bg-[#F0F4FA] rounded-full px-3.5 py-1.5 flex items-center gap-1 font-rubik font-bold text-[18px] text-[#121111]">
                  <span className="text-[15px] font-medium text-[#565656]">$</span>
                  <span>$50</span>
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

              {/* Caregiver Snippet Row */}
              <div className="flex items-center gap-3 w-full border-t border-[#F0F0F0] pt-4">
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative shrink-0 border border-neutral-200 bg-[#F8F9FF]">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
                    alt="Nandi Bolard"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[13px] font-rubik text-[#565656]">
                  <span className="font-bold text-[#121111]">Nandi Bolard</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Elderly Care Specialist</span>
                  <span className="hidden sm:inline">|</span>
                  <span>12 Dec - 16 Jan 23</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Agreed pay : 30$</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between w-full pt-1">
                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="h-[42px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                >
                  Open chat
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/my-jobs/instant-job/1')}
                  className="h-[42px] px-6 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs flex items-center gap-2"
                >
                  <span>View Job Details</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ── UPCOMING SUBTAB VIEW ── */}
        {activeSubTab === 'upcoming' && (
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left">
              {/* Title & Budget */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-rubik font-semibold text-[17px] sm:text-[18px] text-[#121111]">
                    Elderly Care Assistant Seeking Job
                  </h4>
                  <span className="text-[13.5px] font-rubik text-[#565656]">
                    Elderly Care
                  </span>
                </div>
                <div className="bg-[#F0F4FA] rounded-full px-3.5 py-1.5 flex items-center gap-1 font-rubik font-bold text-[18px] text-[#121111]">
                  <span className="text-[15px] font-medium text-[#565656]">$</span>
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
                  <DollarSign className="w-4 h-4 text-[#565656] shrink-0" />
                  <span>$200 - $300</span>
                </div>
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

              {/* Caregiver Snippet Row */}
              <div className="flex items-center gap-3 w-full border-t border-[#F0F0F0] pt-4">
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative shrink-0 border border-neutral-200 bg-[#F8F9FF]">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
                    alt="Nandi Bolard"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[13px] font-rubik text-[#565656]">
                  <span className="font-bold text-[#121111]">Nandi Bolard</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Elderly Care Specialist</span>
                  <span className="hidden sm:inline">|</span>
                  <span>12 Dec - 16 Jan 23</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Agreed pay : 30$</span>
                </div>
              </div>

              {/* Bottom Actions: Open chat & Cancel Job (Left) and View Job Details (Right) */}
              <div className="flex items-center justify-between w-full pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/chat')}
                    className="h-[42px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                  >
                    Open chat
                  </button>
                  <button
                    type="button"
                    onClick={onCancelOngoingClick}
                    className="h-[42px] px-6 bg-[#FFF0E8] hover:bg-[#FFE5D8] text-[#121111] font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none"
                  >
                    Cancel Job
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/my-jobs/1?status=upcoming')}
                  className="h-[42px] px-6 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs flex items-center gap-2"
                >
                  <span>View Job Details</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
