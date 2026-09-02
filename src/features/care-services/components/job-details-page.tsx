'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Locate,
  DollarSign,
  Star,
} from 'lucide-react';
import { MarkAsDoneModal, CancelJobModal } from './job-action-modals';
import { ImageCarouselModal } from './image-carousel-modal';

interface JobDetailsPageProps {
  jobId?: string;
}

const JOB_PHOTOS = [
  '/images/home/search.webp',
  '/images/avatar.webp',
  '/images/giver.webp',
  '/images/home/banner.webp',
];

export function JobDetailsPage({ jobId }: JobDetailsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get('status');
  const isUpcoming = rawStatus === 'upcoming';
  const statusLabel = isUpcoming ? 'Upcoming' : 'Ongoing';

  // Modals state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isMarkDoneOpen, setIsMarkDoneOpen] = useState(false);
  const [jobCompleted, setJobCompleted] = useState(false);

  // Carousel state
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
    <div className="min-h-screen bg-[#FFF6F0]/20 flex flex-col relative w-full pb-16">
      {/* Peach Background Wrapper */}
      <div className="absolute inset-0 bg-[#F36922]/10 pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 flex flex-col gap-6">

        {/* Top Header Row: Back button & Breadcrumbs */}
        <div className="flex items-center gap-4 h-[48px] w-full">
          <button
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none shadow-sm"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 font-rubik text-[16px] text-[#3D3D3D]">
            <Link href="/" className="hover:text-[#F36922] transition">Home</Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <Link href="/my-jobs" className="hover:text-[#F36922] transition">Active Job</Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#3D3D3D]">Applications</span>
          </div>
        </div>

        {/* Booking Confirmation / Job Details Card Container */}
        <div className="w-full bg-white rounded-[16px] border border-[#EFEFEF]/86 p-6 sm:p-8 shadow-sm flex flex-col gap-6">

          {/* Header Row: Caregiver Profile & Top Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            {/* Caregiver Info */}
            <div className="flex items-center gap-3">
              <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                <Image
                  src="/images/avatar.webp"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h2 className="font-poppins font-bold text-[18px] text-[#333333] leading-tight">
                  John Doe
                </h2>
                <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111]">
                  <span className="border-r border-[#121111] pr-2 font-light">Elderly Care Specialist</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
                    <span className="font-light">5.0 (48)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Buttons: Open Chat & Status Badge */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="h-[48px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none shadow-sm"
              >
                Open chat
              </button>

              <div className="h-[48px] px-6 bg-[#F8F9FF] border border-[#0A0A6E] text-[#0A0A6E] rounded-full flex items-center justify-center font-poppins font-medium text-[13px] capitalize">
                {statusLabel}
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#EFEFEF]/86 my-1" />

          {/* Job Info Section */}
          <div className="flex flex-col gap-4 w-full">
            {/* Title & Price Row */}
            <div className="flex flex-row justify-between items-start w-full">
              <div className="flex flex-col gap-1">
                <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                  Elderly Care Assistant Seeking Job
                </h3>
                <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                  Elderly Care
                </span>
              </div>

              {/* Price Pill */}
              <div className="h-[48px] px-6 bg-[#F1F5F9] rounded-full flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5 text-[#121111]" />
                <span className="font-rubik font-medium text-[24px] text-[#121111]">
                  $35-$50
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans font-medium text-[14px] text-[#181818] leading-[19px]">
              I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
            </p>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-6 text-[14px] font-medium text-[#181818]">
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#181818]" />
                <span>$200 - $300</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#181818]" />
                <span>12:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#181818]" />
                <span>12 Dec 23</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#181818]" />
                <span>San Juan, Texas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Locate className="w-4 h-4 text-[#181818]" />
                <span>14 miles away</span>
              </div>
            </div>

            {/* Category Tags Row */}
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1.5 bg-[#FEF0E9] text-[#181818] rounded-[5.33px] font-general-sans font-medium text-[14px]">
                Child Care
              </span>
              <span className="px-3 py-1.5 bg-[#FEF0E9] text-[#181818] rounded-[5.33px] font-general-sans font-medium text-[14px]">
                Babysitting
              </span>
              <span className="px-3 py-1.5 bg-[#FEF0E9] text-[#181818] rounded-[5.33px] font-general-sans font-medium text-[14px]">
                Nursing
              </span>
            </div>

            {/* Contracted Details Section */}
            <div className="w-full bg-[#F8F9FF] rounded-[14px] p-5 border border-[#EFEFEF] flex flex-col gap-3 my-2">
              <h4 className="font-rubik font-semibold text-[16px] text-[#121111]">
                Contracted
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 border-t border-[#EFEFEF]">
                <div className="flex flex-col gap-0.5">
                  <span className="font-rubik text-[13px] text-[#565656]">Hourly Rate</span>
                  <span className="font-rubik font-bold text-[18px] text-[#121111]">$25.00 / hr</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-rubik text-[13px] text-[#565656]">Total Contracted Hours</span>
                  <span className="font-rubik font-semibold text-[18px] text-[#121111]">40 Hours</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-rubik text-[13px] text-[#565656]">Completion Date</span>
                  <span className="font-rubik font-medium text-[16px] text-[#121111]">12 March 2026</span>
                </div>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="flex items-center gap-3 pt-2">
              {JOB_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setCarouselState({
                      isOpen: true,
                      images: JOB_PHOTOS,
                      index: idx,
                    })
                  }
                  className="w-[110px] h-[110px] rounded-[13px] overflow-hidden relative border border-neutral-100 cursor-pointer hover:opacity-90 transition group"
                >
                  <Image
                    src={photo}
                    alt={`Job image ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-200"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Actions Row: Cancel Job & Mark Job As Done */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(true)}
                className="h-[48px] px-6 bg-[#FEF0E9] hover:bg-[#fde2d3] text-[#000000] rounded-full font-poppins font-medium text-[15px] cursor-pointer transition border-none shadow-sm"
              >
                Cancel Job
              </button>

              {/* Mark Job As Done Button: Disabled for Upcoming, Active for Ongoing */}
              <button
                type="button"
                disabled={isUpcoming || jobCompleted}
                onClick={() => setIsMarkDoneOpen(true)}
                className={`h-[48px] px-6 rounded-full font-poppins font-medium text-[16px] transition border-none shadow-sm ${isUpcoming
                    ? 'bg-[#D5D5D5] text-white cursor-not-allowed opacity-60'
                    : jobCompleted
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#F36922] hover:bg-[#e05813] text-white cursor-pointer'
                  }`}
              >
                {jobCompleted ? 'Job Completed ✓' : 'Mark Job As Done'}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Cancel Job Modal Flow */}
      <CancelJobModal
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onSuccessClose={() => router.push('/my-jobs')}
      />

      {/* Mark Job As Done Modal */}
      <MarkAsDoneModal
        open={isMarkDoneOpen}
        onOpenChange={setIsMarkDoneOpen}
        onConfirm={() => {
          setIsMarkDoneOpen(false);
          router.push('/review/1');
        }}
      />

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
