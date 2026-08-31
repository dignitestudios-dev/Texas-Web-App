'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Navigation,
  MessageSquare,
  BadgeCheck,
  X,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

interface GiverJobDetailsPageProps {
  jobId?: string;
}

export function GiverJobDetailsPage({ jobId = '1' }: GiverJobDetailsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get('status');

  // Initial lifecycle state based on query param
  const initialStatus: 'upcoming' | 'ongoing' | 'completed' =
    rawStatus === 'ongoing'
      ? 'ongoing'
      : rawStatus === 'completed'
      ? 'completed'
      : 'upcoming';

  const [jobStatus, setJobStatus] = useState<'upcoming' | 'ongoing' | 'completed'>(initialStatus);
  const [isReviewView, setIsReviewView] = useState(false);
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showMessagesPopover, setShowMessagesPopover] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const sampleImages = ['/images/home/search.webp'];

  // If page loads with status=ongoing, transition to completed after 2 seconds
  useEffect(() => {
    if (jobStatus === 'ongoing') {
      const timer = setTimeout(() => {
        setJobStatus('completed');
        toast.success('Job completed! You can now leave a review.');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [jobStatus]);

  const handleStartJob = () => {
    setJobStatus('ongoing');
    toast.info('Job started! Processing ongoing care...');
  };

  const handleCancelJob = () => {
    toast.info('Job cancelled.');
    router.push('/my-services?tab=active');
  };

  const handleSendReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Review submitted successfully!');
    router.push('/my-services?tab=history&subTab=completed');
  };

  // ================= VIEW 2: LEAVE A REVIEW SCREEN (MATCHES IMAGE 2) =================
  if (isReviewView) {
    return (
      <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-24">
        <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-12 flex flex-col items-center">
          
          {/* Top Profile Capsule Card */}
          <div className="bg-white border border-[#121111] rounded-[16px] py-3.5 px-6 flex items-center gap-3.5 shadow-xs mb-8">
            <div className="w-10 h-10 rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
              <Image src="/images/avatar.webp" alt="Nandi Bolard" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-rubik font-medium text-[16px] text-[#121111]">
                  Nandi Bolard
                </span>
                <BadgeCheck className="w-4 h-4 text-[#1D9BF0] fill-[#1D9BF0] text-white shrink-0" />
              </div>
              <div className="flex items-center gap-1 font-rubik text-[12px] text-[#565656]">
                <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                <span className="font-light text-[#121111]">5.0 (48)</span>
                <span>| 98 Services</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-rubik font-bold text-[32px] text-[#121111] text-center mb-6">
            Leave a Review
          </h2>

          {/* Star Rating Selection */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="cursor-pointer border-none bg-transparent p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-9 h-9 ${
                    star <= (hoverRating || rating)
                      ? 'fill-[#FFC107] text-[#FFC107]'
                      : 'text-neutral-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Review Form */}
          <form onSubmit={handleSendReview} className="w-full max-w-[480px] flex flex-col gap-5 items-center">
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here"
              className="w-full p-4 bg-white border border-[#EFEFEF] rounded-[16px] font-rubik text-[14px] leading-[22px] text-[#121111] placeholder-[#565656]/60 outline-none focus:border-[#F36922] resize-none shadow-xs"
            />

            <button
              type="submit"
              className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[10px] transition cursor-pointer border-none shadow-md"
            >
              Send Review
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ================= VIEW 1: JOB DETAILS (UPCOMING, ONGOING -> AUTO-COMPLETED -> GIVE REVIEW) =================
  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-24">
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-8 flex flex-col gap-6 items-center">
        
        {/* Breadcrumbs Row */}
        <div className="w-full max-w-[1280px] flex items-center gap-2 font-rubik text-[16px] text-[#3D3D3D]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[24px] h-[24px] flex items-center justify-center text-[#121111] hover:opacity-80 transition cursor-pointer border-none bg-transparent mr-1"
          >
            <ArrowLeft className="w-5 h-5 text-[#121111]" />
          </button>
          <Link href="/" className="hover:text-[#F36922] transition text-[#3D3D3D]">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-[#3D3D3D]" />
          <Link href="/my-services" className="hover:text-[#F36922] transition text-[#3D3D3D]">
            My Services
          </Link>
          <ChevronRight className="w-4 h-4 text-[#3D3D3D]" />
          <span className="font-normal text-[#121111]">
            {jobStatus === 'completed' ? 'Service Request' : 'Job Details'}
          </span>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job Info Card + Contract (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Card 1: Job Info */}
            <div className="w-full bg-white rounded-[12px] shadow-sm border border-[#EFEFEF] overflow-hidden flex flex-col">
              
              {/* Header Row with Status Badge */}
              <div className="px-5 py-3.5 border-b border-[#EFEFEF] flex justify-between items-center">
                <h2 className="font-rubik font-medium text-[18px] text-[#121111]">
                  Job Info
                </h2>
                {jobStatus === 'completed' && (
                  <span className="bg-[#E8F8F0] text-[#0E7048] font-rubik font-medium text-[13px] px-3.5 py-0.5 rounded-full">
                    Completed
                  </span>
                )}
                {jobStatus === 'ongoing' && (
                  <span className="bg-[#FEF0E9] text-[#F36922] font-rubik font-medium text-[13px] px-3.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Ongoing</span>
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col gap-4">
                {/* Job Title */}
                <h3 className="font-rubik font-medium text-[16px] leading-[20px] text-[#121111]">
                  I need house cleaning service.
                </h3>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-3 text-[14px] leading-[22px] font-rubik text-[#3D3D3D] font-light">
                  <p>
                    Meet Jake, a dedicated professional who has recently settled into a charming new apartment in the heart of the city. With a demanding job that keeps him on his toes, Jake often finds himself overwhelmed by the daily tasks of maintaining his living space. Between meetings, deadlines, and social commitments, he struggles to find the time to keep his home as tidy as he would like.
                  </p>
                  <p>
                    Understanding the importance of a clean and organized environment, Jake has decided to seek out a reliable house cleaning service. He knows that a clean home not only enhances his mood but also allows him to unwind after a long day at work. Jake is looking for a service that can provide thorough cleaning, ensuring that every corner of his apartment sparkles and feels inviting.
                  </p>
                  <p>
                    In his search, Jake is particularly interested in finding a company that offers flexible scheduling to accommodate his busy lifestyle. He values professionalism and attention to detail, as he wants to ensure that his home is not just clean, but also a reflection of his personal style. With the right cleaning service, Jake hopes to create a welcoming sanctuary where he can relax and recharge.
                  </p>
                </div>

                {/* Attached Images */}
                <div className="flex flex-col gap-2 pt-2">
                  <h4 className="font-rubik font-medium text-[16px] text-[#3D3D3D]">
                    Attached Images
                  </h4>
                  <div className="flex items-center gap-3">
                    {sampleImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedPhoto(img)}
                        className="w-[80px] h-[80px] rounded-[12px] border border-[#EFEFEF] bg-[#F8F9FF] relative overflow-hidden cursor-pointer shadow-2xs group"
                      >
                        <Image src={img} alt="Attached Preview" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Card 2: Contract */}
            <div className="w-full bg-white rounded-[12px] shadow-sm border border-[#EFEFEF] overflow-hidden flex flex-col">
              <div className="px-5 py-3.5 border-b border-[#EFEFEF]">
                <h2 className="font-rubik font-medium text-[18px] text-[#121111]">
                  Contract
                </h2>
              </div>

              <div className="p-6 flex flex-col gap-4">
                {/* Row 1: Price */}
                <div className="flex justify-between items-center pb-4 border-b border-[#EFEFEF]">
                  <span className="font-rubik font-normal text-[14px] text-[#121111]">
                    Price
                  </span>
                  <div className="flex items-baseline">
                    <span className="font-rubik font-bold text-[32px] text-[#121111]">
                      $12
                    </span>
                    <span className="font-rubik font-normal text-[16px] text-[#121111]">
                      /Hr
                    </span>
                  </div>
                </div>

                {/* Row 2: Date Deliver */}
                <div className="flex justify-between items-center">
                  <span className="font-rubik font-normal text-[14px] text-[#121111]">
                    Date Deliver
                  </span>
                  <span className="font-rubik font-normal text-[18px] text-[#121111]">
                    12 march 2026
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full relative">
            
            {/* Caregiver Profile Card */}
            <div className="w-full bg-white border border-[#121111] rounded-[12px] p-4 flex items-center justify-between shadow-2xs relative">
              <div className="flex items-center gap-3">
                <div className="w-[43px] h-[43px] rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
                  <Image
                    src="/images/avatar.webp"
                    alt="Nandi Bolard"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-rubik font-medium text-[16px] text-[#121111]">
                      Nandi Bolard
                    </span>
                    {jobStatus === 'completed' && (
                      <BadgeCheck className="w-4 h-4 text-[#1D9BF0] fill-[#1D9BF0] text-white shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-rubik text-[13px] text-[#565656]">
                    <div className="flex items-center gap-1 pr-1.5 border-r border-[#121111]">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-light text-[#121111]">5.0 (48)</span>
                    </div>
                    <span className="font-light text-[#121111]">98 Services</span>
                  </div>
                </div>
              </div>

              {/* Chat Icon Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMessagesPopover(!showMessagesPopover)}
                  className="w-[43px] h-[43px] bg-[#FEF0E9] rounded-full flex items-center justify-center relative hover:bg-[#FDE2D4] transition cursor-pointer border-none shadow-2xs"
                >
                  <MessageSquare className="w-5 h-5 text-[#121111]" />
                  <div className="w-2 h-2 bg-[#F36922] rounded-full absolute top-1 right-1" />
                </button>

                {/* Floating Messages Popover Window */}
                {showMessagesPopover && (
                  <div className="absolute right-0 top-14 z-30 w-[300px] sm:w-[320px] bg-white rounded-[16px] p-4 shadow-xl border border-[#EFEFEF] animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-1">
                      <h4 className="font-rubik font-bold text-[15px] text-[#121111]">
                        Messages
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowMessagesPopover(false)}
                        className="text-neutral-400 hover:text-neutral-600 cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded-[10px] bg-[#F8F9FF] border border-[#EFEFEF]">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 relative overflow-hidden shrink-0">
                        <Image src="/images/avatar.webp" alt="Nandi" fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-rubik font-semibold text-[13px] text-[#121111]">
                            Nandi Bolard
                          </span>
                          <span className="text-[11px] font-rubik text-neutral-400">1min</span>
                        </div>
                        <span className="text-[12px] font-rubik text-[#565656]">
                          You got a booking request
                        </span>
                        <Link
                          href="/my-services/requests/1"
                          onClick={() => setShowMessagesPopover(false)}
                          className="mt-1 w-fit px-3 py-1 bg-white hover:bg-neutral-50 border border-[#EFEFEF] rounded-md font-rubik font-medium text-[11px] text-[#121111] shadow-2xs"
                        >
                          View Request
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location Container */}
            <div className="w-full bg-[#F1F5F9] rounded-[12px] p-4 flex flex-col gap-3 shadow-sm border border-neutral-200">
              <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                Location
              </h3>
              
              <div className="w-full bg-white border border-[#EFEFEF] rounded-[8px] px-3.5 py-3 flex items-center justify-between shadow-2xs">
                <span className="font-rubik font-normal text-[14px] text-[#121111]">
                  732 Amira Spring, New Hoseaville 49335-2723
                </span>
                <Navigation className="w-4 h-4 text-[#0A0A6E] shrink-0 ml-2" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 mt-2">
                {jobStatus === 'completed' ? (
                  <button
                    type="button"
                    onClick={() => setIsReviewView(true)}
                    className="w-full h-[44px] bg-[#046C4E] hover:bg-[#03543d] text-white rounded-[8px] font-rubik font-medium text-[15px] flex items-center justify-center transition cursor-pointer border-none shadow-xs"
                  >
                    Give Review
                  </button>
                ) : jobStatus === 'ongoing' ? (
                  <>
                    <button
                      type="button"
                      disabled
                      className="w-full h-[44px] bg-[#F8F9FF] border border-[#E4E4E7] text-[#121111] rounded-[8px] font-rubik font-medium text-[15px] flex items-center justify-center gap-2 shadow-xs cursor-wait"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-[#F36922]" />
                      <span>Job Ongoing...</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelJob}
                      className="w-full h-[44px] bg-white hover:bg-red-50 text-[#C81E1E] border border-[#E4E4E7] rounded-[8px] font-rubik font-normal text-[15px] flex items-center justify-center transition cursor-pointer shadow-xs"
                    >
                      Cancel Job
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleStartJob}
                      className="w-full h-[44px] bg-[#046C4E] hover:bg-[#03543d] text-white rounded-[8px] font-rubik font-medium text-[15px] flex items-center justify-center transition cursor-pointer border-none shadow-xs"
                    >
                      Start Job
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelJob}
                      className="w-full h-[44px] bg-white hover:bg-red-50 text-[#C81E1E] border border-[#E4E4E7] rounded-[8px] font-rubik font-normal text-[15px] flex items-center justify-center transition cursor-pointer shadow-xs"
                    >
                      Cancel Job
                    </button>
                  </>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
