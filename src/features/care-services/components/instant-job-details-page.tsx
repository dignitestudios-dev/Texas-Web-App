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
  Star,
} from 'lucide-react';
import { toast } from 'sonner';
import { MarkAsDoneModal } from './job-action-modals';

interface InstantJobDetailsPageProps {
  jobId?: string;
}

export function InstantJobDetailsPage({ jobId = '1' }: InstantJobDetailsPageProps) {
  const router = useRouter();
  const [isMarkDoneOpen, setIsMarkDoneOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleConfirmDone = () => {
    setIsMarkDoneOpen(false);
    setIsCompleted(true);
    toast.success('Job marked as completed successfully! Redirecting to review...');
    setTimeout(() => {
      router.push(`/review/${jobId}`);
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-162px)] bg-[#FFF6F0]/20 flex flex-col relative w-full pb-20 select-none">
      {/* Peach Background subtle tint */}
      <div className="absolute inset-0 bg-[#F36922]/10 pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 flex flex-col gap-6">

        {/* Top Header Row: Back button & Breadcrumbs */}
        <div className="flex items-center gap-4 h-[48px] w-full">
          <button
            type="button"
            onClick={() => router.push('/my-jobs?tab=active&subTab=ongoing')}
            className="w-[48px] h-[48px] bg-[#0A0A6E] hover:bg-[#080856] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none shadow-sm"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 font-rubik text-[16px] text-[#3D3D3D] flex-wrap">
            <Link href="/" className="hover:text-[#F36922] transition">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <Link href="/my-jobs?tab=active&subTab=ongoing" className="hover:text-[#F36922] transition">
              Active Job
            </Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#3D3D3D]">
              Instant Job Application
            </span>
          </div>
        </div>

        {/* Main Instant Job Card */}
        <div className="w-full bg-white rounded-[16px] md:rounded-[20px] border border-[#EFEFEF] p-6 sm:p-8 shadow-xs flex flex-col gap-6 text-left">

          {/* Top Pill Badge: Instant Job */}
          <div>
            <span className="inline-flex items-center justify-center bg-[#257CFF] text-[#F1F5F9] font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] px-5 py-2.5 rounded-full">
              Instant Job
            </span>
          </div>

          {/* Caregiver Profile Info & Top Actions Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full border-b border-[#F0F0F0] pb-5">
            {/* Left: Caregiver Profile */}
            <div className="flex items-center gap-3.5">
              <div className="w-[43px] h-[43px] rounded-full overflow-hidden relative border border-neutral-100 shrink-0 bg-[#F8F9FF]">
                <Image
                  src="/images/avatar.webp"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-poppins font-bold text-[18px] leading-[24px] text-[#333333]">
                  John Doe
                </h2>
                <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111]">
                  <span className="font-light">Elderly Care Specialist</span>
                  <span className="text-neutral-300">|</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                    <span className="font-light">5.0 (48)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="h-[48px] px-7 bg-[#F36922] hover:bg-[#e05813] text-white font-poppins font-medium text-[15px] rounded-full flex items-center justify-center transition cursor-pointer border-none shadow-xs"
              >
                Open chat
              </button>

              <div
                className={`h-[48px] px-6 rounded-full flex items-center justify-center font-poppins font-medium text-[13px] border ${
                  isCompleted
                    ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]'
                    : 'bg-[#F8F9FF] border-[#046C4E] text-[#046C4E]'
                }`}
              >
                {isCompleted ? 'Completed' : 'Ongoing'}
              </div>
            </div>
          </div>

          {/* Metadata Row: Time, Date, City, Distance */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-[#6D6D6D] font-rubik font-medium text-[14px] sm:text-[15px]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#181818] shrink-0" />
              <span>12:00 PM - 06:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#181818] shrink-0" />
              <span>12 Dec - 16 Jan 23</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#181818] shrink-0" />
              <span>San Juan, Texas</span>
            </div>
            <div className="flex items-center gap-2">
              <Locate className="w-4 h-4 text-[#181818] shrink-0" />
              <span>14 miles away</span>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="font-rubik text-[13.5px] leading-[22px] text-[#6D6D6D]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>

          {/* Bottom Action: Mark Job As Done */}
          {!isCompleted && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsMarkDoneOpen(true)}
                className="h-[48px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-poppins font-medium text-[16px] rounded-full flex items-center justify-center transition cursor-pointer border-none shadow-sm"
              >
                Mark Job As Done
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mark Job As Done Modal */}
      <MarkAsDoneModal
        open={isMarkDoneOpen}
        onOpenChange={setIsMarkDoneOpen}
        onConfirm={handleConfirmDone}
      />
    </div>
  );
}
