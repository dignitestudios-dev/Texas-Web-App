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
  Users,
  MessageSquare,
  Globe,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ImageCarouselModal } from './image-carousel-modal';

interface ApplicantDetailsPageProps {
  applicationId?: string;
}

const APPLICANTS_LIST = [
  {
    id: 'john-doe',
    name: 'John Doe',
    avatar: '/images/avatar.webp',
    title: 'Elderly Care Specialist',
    rating: 5.0,
    reviews: 48,
    proposedRate: '$ 250',
    proposal:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 'smith',
    name: 'Smith',
    avatar: '/images/giver.webp',
    title: 'Elderly Care Specialist',
    rating: 5.0,
    reviews: 48,
    proposedRate: '$ 250',
    proposal:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

const APPLICANT_JOB_PHOTOS = [
  '/images/home/search.webp',
  '/images/avatar.webp',
  '/images/giver.webp',
  '/images/home/banner.webp',
];

export function ApplicantDetailsPage({ applicationId }: ApplicantDetailsPageProps) {
  const router = useRouter();
  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(null);
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [carouselState, setCarouselState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0,
  });

  const handleConfirmAssign = () => {
    setAssignSuccess(true);
    setTimeout(() => {
      setSelectedCaregiver(null);
      router.push('/my-jobs');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF6F0]/20 flex flex-col relative w-full pb-16">
      {/* Peach Background Wrapper */}
      <div className="absolute inset-0 bg-[#F36922]/10 pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 flex flex-col gap-8">

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
            <Link href="/my-jobs" className="hover:text-[#F36922] transition">Applicants</Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#3D3D3D]">Applications</span>
          </div>
        </div>

        {/* Top Job Details Card */}
        <div className="w-full bg-white rounded-[16px] border border-[#EFEFEF]/86 p-6 sm:p-8 shadow-sm flex flex-col gap-5">
          {/* Header Row */}
          <div className="flex flex-row justify-between items-start w-full border-b border-[#EFEFEF]/86 pb-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-rubik font-medium text-[16px] text-[#121111]">
                Elderly Care Assistant Seeking Job
              </h1>
              <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                Category: Elderly Care
              </span>
              <span className="font-rubik text-[13px] text-[#121111]/70 underline cursor-pointer">
                Apr 20, 4:00
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Featured Badge */}
              <div className="h-[48px] px-5 bg-[#FEF0E9] border border-[#F36922] text-[#F36922] rounded-full flex items-center justify-center gap-1.5 font-rubik text-[14px]">
                <Star className="w-4 h-4 fill-[#F36922] text-[#F36922]" />
                <span>Featured</span>
              </div>

              {/* Price Tag */}
              <div className="h-[48px] px-5 bg-[#F1F5F9] rounded-full flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5 text-[#121111]" />
                <span className="font-rubik font-medium text-[24px] text-[#121111]">
                  $35-$50
                </span>
              </div>
            </div>
          </div>

          {/* Applicants Count Row */}
          <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[16px]">
            <div className="w-8 h-8 rounded-full bg-[#FEF0E9] flex items-center justify-center text-[#121111]">
              <Users className="w-4 h-4 text-[#121111]" />
            </div>
            <span>2 Applicants</span>
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-2">
            <h3 className="font-general-sans font-semibold text-[16px] text-[#181818]">
              Job Description
            </h3>
            <h4 className="font-general-sans font-semibold text-[14px] text-[#181818]">
              About the Job
            </h4>
            <p className="font-general-sans font-medium text-[14px] text-[#181818] leading-[19px]">
              I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
            </p>
          </div>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-6 text-[14px] font-medium text-[#181818]">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#181818]" />
              <span>$200</span>
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

          {/* Experience & Language Badges */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#FEF0E9] rounded-[4px] flex items-center gap-2 text-[14px] font-medium font-general-sans text-[#181818]">
              <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
              <span>5 years of experience</span>
            </div>
            <div className="px-4 py-2 bg-[#FEF0E9] rounded-[4px] flex items-center gap-2 text-[14px] font-medium font-general-sans text-[#181818]">
              <Globe className="w-4 h-4 text-black" />
              <span>English</span>
            </div>
          </div>

          {/* Images Section */}
          <div className="flex flex-col gap-3 pt-2">
            <h4 className="font-general-sans font-semibold text-[14px] text-[#181818]">
              Images Section
            </h4>
            <div className="flex items-center gap-3">
              {APPLICANT_JOB_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setCarouselState({
                      isOpen: true,
                      images: APPLICANT_JOB_PHOTOS,
                      index: idx,
                    })
                  }
                  className="w-[110px] h-[110px] rounded-[13px] overflow-hidden relative border border-neutral-100 cursor-pointer hover:opacity-90 transition group"
                >
                  <Image
                    src={photo}
                    alt={`Job Image ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applicant Rows Section Header */}
        <div className="flex flex-col gap-2 w-full pt-4">
          <h2 className="font-general-sans font-semibold text-[24px] text-[#181818]">
            Applicant rows
          </h2>
          <div className="flex items-center gap-1 font-poppins font-medium text-[18px] text-black">
            <span>Sorted: Highest → Lowest Rate</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* Applicant Cards List */}
        <div className="flex flex-col gap-6 w-full">
          {APPLICANTS_LIST.map((applicant) => (
            <div
              key={applicant.id}
              className="w-full bg-white rounded-[12px] p-6 border border-[#EFEFEF]/86 shadow-sm flex flex-col gap-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                    <Image src={applicant.avatar} alt={applicant.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-poppins font-bold text-[18px] text-[#333333] leading-tight">
                      {applicant.name}
                    </h3>
                    <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111]">
                      <span className="border-r border-[#121111] pr-2 font-light">{applicant.title}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
                        <span className="font-light">{applicant.rating} ({applicant.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Button */}
                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="h-[48px] px-5 bg-[#F36922] hover:bg-[#e05813] text-white rounded-[4px] flex items-center justify-center gap-2 font-poppins font-medium text-[13px] cursor-pointer transition border-none shadow-sm"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                  <span>Chat</span>
                </button>
              </div>

              {/* Proposed Rate */}
              <div className="flex flex-col gap-1">
                <span className="font-general-sans font-medium text-[14px] text-[#181818]">
                  Proposed Rate
                </span>
                <span className="font-general-sans text-[13px] text-[#6D6D6D]">
                  {applicant.proposedRate}
                </span>
              </div>

              {/* Proposal */}
              <div className="flex flex-col gap-1">
                <span className="font-general-sans font-medium text-[14px] text-[#181818]">
                  Proposal
                </span>
                <p className="font-general-sans text-[13px] text-[#6D6D6D] leading-relaxed">
                  {applicant.proposal}
                </p>
              </div>

              {/* Assign Job Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCaregiver(applicant.name)}
                  className="h-[48px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white rounded-[4px] font-poppins font-medium text-[13px] cursor-pointer transition border-none shadow-sm"
                >
                  Assign Job
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Assign Caregiver Confirmation Dialog */}
      <Dialog
        open={Boolean(selectedCaregiver)}
        onOpenChange={(val) => {
          if (!val) setSelectedCaregiver(null);
        }}
      >
        <DialogContent className="sm:max-w-[380px] bg-white rounded-[24px] p-6 border-none shadow-2xl flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F36922] flex items-center justify-center text-white shadow-sm mb-1">
            <LogOut className="w-7 h-7 text-white" />
          </div>

          <DialogTitle className="font-rubik font-bold text-[24px] text-[#121111] leading-tight">
            Assign This Caregiver?
          </DialogTitle>
          <DialogDescription className="font-rubik font-normal text-[15px] text-[#3D3D3D]">
            {assignSuccess
              ? 'Job assigned successfully!'
              : 'Are you sure you want to Assign Job?'}
          </DialogDescription>

          {!assignSuccess && (
            <div className="flex gap-3 w-full mt-4">
              <button
                type="button"
                onClick={() => setSelectedCaregiver(null)}
                className="flex-1 h-[52px] bg-[#FFF4ED] hover:bg-[#ffe8d9] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[16px] transition cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAssign}
                className="flex-1 h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[15px] rounded-[16px] transition cursor-pointer border-none shadow-sm"
              >
                Confirm
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
