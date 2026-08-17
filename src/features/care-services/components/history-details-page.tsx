'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
import { ImageCarouselModal } from './image-carousel-modal';

interface HistoryDetailsPageProps {
  jobId?: string;
}

const HISTORY_PHOTOS = [
  '/images/home/search.webp',
  '/images/avatar.webp',
  '/images/giver.webp',
  '/images/home/banner.webp',
];

export function HistoryDetailsPage({ jobId }: HistoryDetailsPageProps) {
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
    <div className="min-h-screen bg-[#FFF6F0]/20 flex flex-col relative w-full pb-16">
      {/* Peach Background Wrapper */}
      <div className="absolute inset-0 bg-[#F36922]/10 pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 flex flex-col gap-6">

        {/* Top Header Row: Back Button & Breadcrumbs */}
        <div className="flex items-center gap-4 h-[48px] w-full">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none shadow-sm"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 font-rubik text-[16px] text-[#3D3D3D]">
            <Link href="/" className="hover:text-[#F36922] transition">Home</Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <Link href="/my-jobs" className="hover:text-[#F36922] transition">Completed</Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#3D3D3D]">Applications</span>
          </div>
        </div>

        {/* Booking Confirmation / History Job Details Card Container */}
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

            {/* Right Action Buttons: Open Chat & Completed Status Badge */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="h-[48px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white rounded-full flex items-center justify-center font-poppins font-medium text-[15px] cursor-pointer transition border-none shadow-sm"
              >
                Open chat
              </button>

              <div className="h-[48px] px-6 bg-[#046C4E]/10 text-[#046C4E] rounded-full flex items-center justify-center font-poppins font-medium text-[13px]">
                Completed
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

              {/* Price Tag */}
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

            {/* Photo Gallery Grid */}
            <div className="flex items-center gap-3 pt-2">
              {HISTORY_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setCarouselState({
                      isOpen: true,
                      images: HISTORY_PHOTOS,
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

            {/* Review Feedback Card Box (No Cancel or Mark Job As Done buttons) */}
            <div className="w-full bg-[#F1F5F9] rounded-[4px] p-5 flex flex-col gap-3 text-left mt-2">
              <div className="flex justify-between items-center w-full">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
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
                <span className="font-general-sans font-medium text-[12px] text-[#3D3D3D]">
                  21 Feb
                </span>
              </div>
              {/* Review Comment */}
              <p className="font-general-sans text-[14px] leading-[19px] tracking-[-0.18px] text-[#121111]">
                John was incredibly patient and caring with my father. Highly recommended!
              </p>
              {/* Reviewer Details */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100 relative">
                  <Image src="/images/avatar.webp" alt="Sarah M." fill className="object-cover" />
                </div>
                <span className="font-general-sans font-medium text-[12px] text-[#121111] capitalize">
                  Sarah M.
                </span>
              </div>
            </div>

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
