'use client';

import React from 'react';
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
  Info,
} from 'lucide-react';

type HistorySubTab = 'completed' | 'cancelled';

interface HistoryTabProps {
  historySubTab: HistorySubTab;
  onSubTabChange: (tab: HistorySubTab) => void;
  showCalendarButton?: boolean;
}

const CANCELLED_JOBS = [
  {
    id: 'cancel-1',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    cancelledBy: 'Cancelled by Caregiver',
    reason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    caregiverName: 'John Doe',
    caregiverRole: 'Elderly Care Specialis',
    caregiverDate: '12 Dec 2025',
    caregiverAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cancel-2',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    cancelledBy: 'Cancelled by You',
    reason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    caregiverName: 'John Doe',
    caregiverRole: 'Elderly Care Specialis',
    caregiverDate: '12 Dec 2025',
    caregiverAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cancel-3',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    cancelledBy: 'Cancelled by Caregiver',
    reason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    caregiverName: 'John Doe',
    caregiverRole: 'Elderly Care Specialis',
    caregiverDate: '12 Dec 2025',
    caregiverAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
  },
];

export function HistoryTab({
  historySubTab,
  onSubTabChange,
  showCalendarButton = false,
}: HistoryTabProps) {
  const router = useRouter();

  return (
    <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
      <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto text-left">

        {/* Info Banner Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
          <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[20px]">
            <Info className="w-4 h-4 text-[#121111] shrink-0" />
            <span>View your completed and past care requests.</span>
          </div>

          {showCalendarButton && (
            <button
              type="button"
              onClick={() => router.push('/my-jobs/calendar')}
              className="box-sizing-border-box flex flex-row justify-center items-center py-3 px-[18px] gap-2 h-[48px] rounded-[10px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border-none shadow-sm shrink-0"
            >
              <span>View Your Calendar</span>
              <CalendarIcon className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Subtab Segmented Control (Matching Provided Image Pixel-Perfect) */}
        <div className="flex items-center h-[52px] w-[290px] bg-white border border-[#D1D5DB] rounded-full overflow-hidden shrink-0 shadow-xs">
          <button
            type="button"
            onClick={() => onSubTabChange('completed')}
            className={`flex-1 h-full flex items-center justify-center font-rubik text-[16px] transition cursor-pointer border-none ${historySubTab === 'completed'
              ? 'bg-[#050854] text-white font-bold'
              : 'bg-white text-[#121111] font-normal hover:bg-neutral-50'
              }`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => onSubTabChange('cancelled')}
            className={`flex-1 h-full flex items-center justify-center font-rubik text-[16px] transition cursor-pointer border-none ${historySubTab === 'cancelled'
              ? 'bg-[#050854] text-white font-bold'
              : 'bg-white text-[#121111] font-normal hover:bg-neutral-50'
              }`}
          >
            Cancelled
          </button>
        </div>

        {/* Subtab Views */}
        {historySubTab === 'completed' ? (
          <div className="flex flex-col gap-6 w-full">

            {/* ── CARD 1: Instant Job with Existing Review ── */}
            <div className="w-full bg-white rounded-[20px]  border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left">
              {/* Header: Caregiver + Badges */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full border-b border-[#F0F0F0] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 border border-neutral-200 relative bg-[#F8F9FF]">
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
                      alt="John Doe"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-rubik font-bold text-[17px] sm:text-[18px] text-[#121111]">
                      John Doe
                    </h3>
                    <div className="flex items-center gap-2 text-[#565656] text-[13px] font-rubik">
                      <span>Elderly Care Specialis</span>
                      <span>|</span>
                      <span>12 Dec 2025</span>
                    </div>
                  </div>
                </div>

                {/* Right Badges: Instant Job & Completed */}
                <div className="flex items-center gap-2">
                  <span className="bg-[#257CFF] text-white font-rubik font-medium text-[13px] px-4 py-1 rounded-full">
                    Instant Job
                  </span>
                  <span className="bg-[#E8F8F0] text-[#138A52] font-rubik font-medium text-[13px] px-4 py-1.5 rounded-full">
                    Completed
                  </span>
                </div>
              </div>

              {/* Category */}
              <span className="text-[13.5px] font-rubik text-[#565656] -mt-1">
                Elderly Care
              </span>

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

              {/* Dual Action Row: Rehire (Left) & View Details (Right) */}
              <div className="flex items-center justify-between w-full pt-1">
                <button
                  type="button"
                  onClick={() => router.push('/leaderboard/john-doe-1/service')}
                  className="h-[42px] px-7 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                >
                  Rehire caregiver
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/my-jobs/history/1')}
                  className="h-[42px] px-6 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs flex items-center gap-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Review Card */}
              <div className="w-full bg-[#F2F6FA] rounded-[16px] p-4 sm:p-5 flex flex-col gap-2 text-left mt-1">
                <div className="flex items-center justify-between w-full">
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= 4 ? 'fill-[#FFC107] text-[#FFC107]' : 'text-neutral-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="font-rubik text-[12.5px] text-[#8E8E93]">
                    21 Feb
                  </span>
                </div>

                <p className="font-rubik text-[14px] leading-[20px] text-[#121111]">
                  John was incredibly patient and caring with my father. Highly recommended!
                </p>

                <div className="flex items-center gap-2.5 pt-1">
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden relative bg-neutral-200 border border-neutral-100">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
                      alt="Sarah M."
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="font-rubik font-medium text-[13px] text-[#121111]">
                    Sarah M.
                  </span>
                </div>
              </div>
            </div>

            {/* ── CARD 2: Standard Job with Review & Rehire + View Details ── */}
            <div className="w-full bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-4 text-left">
              {/* Header: Caregiver + Completed Badge */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full border-b border-[#F0F0F0] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 border border-neutral-200 relative bg-[#F8F9FF]">
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
                      alt="John Doe"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-rubik font-bold text-[17px] sm:text-[18px] text-[#121111]">
                      John Doe
                    </h3>
                    <div className="flex items-center gap-2 text-[#565656] text-[13px] font-rubik">
                      <span>Elderly Care Specialis</span>
                      <span>|</span>
                      <span>12 Dec 2025</span>
                    </div>
                  </div>
                </div>

                {/* Completed Badge */}
                <div className="bg-[#E8F8F0] text-[#138A52] font-rubik font-medium text-[13px] px-4 py-1.5 rounded-full flex items-center justify-center">
                  Completed
                </div>
              </div>

              {/* Title & Category */}
              <div className="flex flex-col gap-0.5">
                <h4 className="font-rubik font-semibold text-[17px] text-[#121111]">
                  Elderly Care Assistant Seeking Job
                </h4>
                <span className="text-[13.5px] font-rubik text-[#565656]">
                  Elderly Care
                </span>
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

              {/* Dual Action Buttons: Review & Rehire (Left) + View Details (Right) */}
              <div className="flex items-center justify-between w-full pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/review/1')}
                    className="h-[42px] px-8 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                  >
                    Review
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/leaderboard/john-doe-1/service')}
                    className="h-[42px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs"
                  >
                    Rehire caregiver
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/my-jobs/history/1')}
                  className="h-[42px] px-6 bg-[#0A0A6E] hover:bg-[#06064B] text-white font-rubik font-medium text-[14px] rounded-full transition cursor-pointer border-none shadow-xs flex items-center gap-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* ── CANCELLED SUBTAB VIEW (Matching Provided Screenshot Pixel-Perfect) ── */
          <div className="flex flex-col gap-6 w-full">
            {CANCELLED_JOBS.map((job) => (
              <div
                key={job.id}
                className="w-full bg-white rounded-[20px]  border border-[#EFEFEF] p-6 sm:p-7 flex flex-col gap-3 text-left"
              >
                {/* Title & Cancelled Badge */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-rubik font-semibold text-[17px] sm:text-[18px] text-[#121111]">
                      {job.title}
                    </h4>
                    <span className="text-[13.5px] font-rubik text-[#565656]">
                      {job.category}
                    </span>
                  </div>

                  {/* Cancelled Badge */}
                  <span className="bg-[#FEE2E2] text-[#DC2626] font-rubik font-medium text-[13px] px-4 py-1.5 rounded-full">
                    Cancelled
                  </span>
                </div>

                {/* Cancelled by heading */}
                <h5 className="font-rubik font-semibold text-[14.5px] text-[#DC2626] pt-1">
                  {job.cancelledBy}
                </h5>

                {/* Reason description */}
                <p className="font-rubik font-normal text-[13.5px] sm:text-[14px] leading-[22px] text-[#565656]">
                  {job.reason}
                </p>

                {/* Caregiver Snippet Row */}
                <div className="flex items-center gap-3 w-full border-t border-[#F0F0F0] pt-4 mt-1">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative shrink-0 border border-neutral-200 bg-[#F8F9FF]">
                    <Image
                      src={job.caregiverAvatar}
                      alt={job.caregiverName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-rubik text-[#565656]">
                    <span className="font-bold text-[#121111]">{job.caregiverName}</span>
                    <span>|</span>
                    <span>{job.caregiverRole}</span>
                    <span>|</span>
                    <span>{job.caregiverDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
