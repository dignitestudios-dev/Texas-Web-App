'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  DollarSign,
  Navigation,
  Clock,
  MessageSquare,
} from 'lucide-react';

interface SeekerProfilePageProps {
  jobId?: string;
}

export function SeekerProfilePage({ jobId }: SeekerProfilePageProps) {
  const router = useRouter();
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const previousJobs = [
    {
      id: 'pj-1',
      title: 'I need house cleaning service.',
      postedTime: 'Posted 2 hours ago',
      description:
        "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
      payRange: '$200 -$300',
      distance: '500 miles',
      duration: '1 day',
      posterName: 'Nandi Bolard',
      posterAvatar: '/images/avatar.webp',
      rating: 5.0,
      reviewsCount: 48,
      servicesCount: 98,
    },
    {
      id: 'pj-2',
      title: 'I want to hire a personal chef.',
      postedTime: 'Posted 3 hours ago',
      description:
        "Meet Sarah, a food enthusiast who loves hosting dinner parties but struggles with meal preparation. She's seeking a personal chef to create gourmet meals and impress her guests with delicious, beautifully presented dishes.",
      payRange: '$500 - $700',
      distance: '30 miles',
      duration: '2 days',
      posterName: 'Nandi Bolard',
      posterAvatar: '/images/avatar.webp',
      rating: 5.0,
      reviewsCount: 48,
      servicesCount: 98,
    },
    {
      id: 'pj-3',
      title: 'I amlooking for a dog walker.',
      postedTime: 'Posted 1 hour ago',
      description:
        "Meet Tom, a dog owner who works long hours and wants to ensure his furry friend gets enough exercise. He's looking for a trustworthy dog walker who can take his Labrador for daily walks and playtime at the park.",
      payRange: '$15 - $25 per walk',
      distance: '10 miles',
      duration: '1 day',
      posterName: 'Nandi Bolard',
      posterAvatar: '/images/avatar.webp',
      rating: 5.0,
      reviewsCount: 48,
      servicesCount: 98,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-16">
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] flex flex-col gap-6 items-center">
        {/* Breadcrumbs Row */}
        <div className="w-full max-w-[1280px] flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
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
          <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
          <Link href="/freelance-jobs" className="hover:text-[#F36922] transition text-[#3D3D3D]">
            Job
          </Link>
          <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
          <span className="font-normal text-[#121111]">Profile</span>
        </div>

        {/* Profile Header Header Box */}
        <div className="w-full max-w-[1280px] flex items-center gap-5 pt-2">
          <div className="w-[100px] h-[100px] rounded-full relative overflow-hidden bg-neutral-100 shrink-0 shadow-xs">
            <Image
              src="/images/avatar.webp"
              alt="Nandi Bolard"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="font-rubik font-medium text-[20px] text-[#121111]">
                Nandi Bolard
              </h1>
              <CheckCircle2 className="w-[18px] h-[18px] text-[#4253F0] fill-[#4253F0] text-white" />
            </div>
            <div className="flex items-center gap-2 font-rubik text-[16px] text-[#121111]">
              <span className="flex items-center gap-1 border-r border-[#121111] pr-3">
                <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                <span className="font-light">5.0 (48)</span>
              </span>
              <span className="font-light">98 Services</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Left Column: Previous Jobs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <div className="w-full bg-white rounded-[12px] p-6 shadow-xs flex flex-col gap-6">
              <h2 className="font-rubik font-medium text-[18px] text-[#121111] pb-3 border-b border-[#EFEFEF]">
                Previous Jobs
              </h2>

              <div className="flex flex-col gap-6">
                {previousJobs.map((job, idx) => (
                  <div
                    key={job.id}
                    className={`flex flex-col gap-3.5 ${
                      idx !== previousJobs.length - 1 ? 'border-b border-[#EFEFEF] pb-6' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                        {job.title}
                      </h3>
                      <span className="font-rubik font-normal text-[13px] text-[#121111]">
                        {job.postedTime}
                      </span>
                    </div>

                    <p className="font-rubik font-light text-[14px] leading-[20px] text-[#3D3D3D]">
                      {job.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => router.push(`/freelance-jobs/${jobId || '1'}`)}
                      className="font-rubik font-normal text-[14px] text-[#121111] underline hover:text-[#F36922] transition text-left cursor-pointer border-none bg-transparent p-0 w-fit"
                    >
                      View Details
                    </button>

                    {/* Attribute Badges Row */}
                    <div className="flex items-center gap-2.5 flex-wrap pt-1">
                      <div className="bg-[#FEF0E9] rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-normal text-[13px] text-[#121111]">
                          {job.payRange}
                        </span>
                      </div>

                      <div className="bg-[#FEF0E9] rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-normal text-[13px] text-[#121111]">
                          {job.distance}
                        </span>
                      </div>

                      <div className="bg-[#FEF0E9] rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-normal text-[13px] text-[#121111]">
                          {job.duration}
                        </span>
                      </div>
                    </div>

                    {/* Poster Sub Card */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-[43px] h-[43px] rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
                        <Image
                          src={job.posterAvatar}
                          alt={job.posterName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-rubik font-medium text-[16px] text-[#121111]">
                          {job.posterName}
                        </span>
                        <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111]">
                          <span className="flex items-center gap-1 border-r border-[#121111] pr-2">
                            <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                            <span className="font-light">{job.rating.toFixed(1)} ({job.reviewsCount})</span>
                          </span>
                          <span className="font-light">{job.servicesCount} Services</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Rating & Reviews Sidebar (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Top Quick Profile Card */}
            <div className="w-full bg-white border border-[#121111] rounded-[12px] p-4 flex items-center justify-between shadow-xs">
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
                    <CheckCircle2 className="w-4 h-4 text-[#4253F0] fill-[#4253F0] text-white" />
                  </div>
                  <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111]">
                    <span className="flex items-center gap-1 border-r border-[#121111] pr-2">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-light">5.0 (48)</span>
                    </span>
                    <span className="font-light">98 Services</span>
                  </div>
                </div>
              </div>

              {/* Chat Icon Button */}
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="w-[43px] h-[43px] bg-[#FEF0E9] rounded-full flex items-center justify-center relative hover:bg-[#FDE2D4] transition cursor-pointer border-none shadow-xs"
              >
                <MessageSquare className="w-5 h-5 text-[#121111]" />
                <div className="w-2 h-2 bg-[#F15A25] rounded-full absolute top-1 right-1" />
              </button>
            </div>

            {/* Main Rating and Reviews Card */}
            <div className="w-full bg-white rounded-[12px] p-6 shadow-xs flex flex-col gap-6">
              <h2 className="font-rubik font-medium text-[18px] text-[#121111] pb-3 border-b border-[#EFEFEF]">
                Rating and Reviews
              </h2>

              {/* Big Score Summary */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-rubik font-medium text-[54px] leading-none tracking-[-0.05em] text-[#121111]">
                    4.5
                  </span>
                  <Star className="w-8 h-8 fill-[#FFC107] text-[#FFC107] mb-1" />
                </div>
                <span className="font-rubik font-light text-[16px] text-[#121111]">
                  419 Reviews
                </span>
              </div>

              {/* Breakdown Bars */}
              <div className="flex flex-col gap-3">
                {[
                  { star: 5, pct: '85%' },
                  { star: 4, pct: '10%' },
                  { star: 3, pct: '3%' },
                  { star: 2, pct: '2%' },
                  { star: 1, pct: '0%' },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-3 w-full">
                    <span className="font-rubik font-medium text-[16px] text-[#121111] w-3">
                      {item.star}
                    </span>
                    <div className="flex-1 h-2.5 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFC107] rounded-full"
                        style={{ width: item.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviews List */}
              <div className="flex flex-col gap-4 border-t border-[#EFEFEF] pt-4">
                <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                  Reviews
                </h3>

                {[1, 2].map((rIdx) => (
                  <div key={rIdx} className="flex flex-col gap-2 border-b border-[#EFEFEF] pb-4 last:border-none">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <span className="font-rubik font-medium text-[14px] text-[#121111]">
                      Anonymous - 4 days ago
                    </span>
                    <p className="font-rubik font-light text-[14px] leading-[20px] text-[#3D3D3D]">
                      Lorem Ipsum Dolor Sit Amet Consectetur. Sed Consequat Suspendisse Diamnibh Habitant Urna Purus Sollicitudin. Ultrices Tristique Nunc Adipiscing Et Eget Est Ullamcorper Commodo Donec.
                    </p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setIsReviewsOpen(true)}
                  className="w-fit border border-[#E4E4E7] rounded-[8px] px-6 py-2 bg-white text-[#121111] font-rubik font-medium text-[14px] hover:bg-neutral-50 transition cursor-pointer shadow-xs mt-2"
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Dialog */}
      <Dialog open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
        <DialogContent className="w-full h-[90%] sm:max-w-[600px] p-0 bg-white border-none shadow-xl rounded-xl overflow-y-scroll no-scrollbar [&>button]:hidden">
          <div className="sr-only">
            <DialogTitle>Rating and Reviews</DialogTitle>
            <DialogDescription>Full rating breakdown and list of all reviews</DialogDescription>
          </div>

          <div className="flex flex-col items-start w-full bg-white relative">
            <div className="box-sizing-border-box flex flex-row justify-between items-center py-[15px] px-[30px] w-full h-[70px] border-b border-[#EFEFEF]/86">
              <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] tracking-[-0.005em]">
                Rating and Reviews
              </span>
              <button
                type="button"
                onClick={() => setIsReviewsOpen(false)}
                className="w-[40px] h-[40px] bg-[#F8F9FF] hover:bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer border-none transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#121111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-row items-start py-[15px] px-[30px] w-full h-[713px] overflow-hidden">
              <div className="flex flex-col items-start p-0 gap-[30px] w-full h-full">
                <div className="flex flex-col items-start p-0 gap-[30px] w-full shrink-0">
                  <div className="flex flex-col items-start p-0 gap-[5px] w-[122px]">
                    <div className="flex flex-row items-center p-0 gap-[8px] w-full h-[64px]">
                      <span className="font-rubik font-medium text-[54px] leading-[64px] tracking-[-0.05em] text-[#121111] uppercase">
                        4.5
                      </span>
                      <Star className="w-[30px] h-[30px] fill-[#FFC107] stroke-none shrink-0" />
                    </div>
                    <span className="font-rubik font-light text-[16px] text-[#121111] leading-[19px] capitalize">
                      419 Reviews
                    </span>
                  </div>

                  <div className="flex flex-col gap-[15px] w-full">
                    {[
                      { stars: 5, width: '85%' },
                      { stars: 4, width: '10%' },
                      { stars: 3, width: '3%' },
                      { stars: 2, width: '2%' },
                      { stars: 1, width: '0%' },
                    ].map((bar) => (
                      <div key={bar.stars} className="flex flex-row items-center gap-[8px] w-full">
                        <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.05em] w-[10px] text-right">
                          {bar.stars}
                        </span>
                        <div className="flex-1 h-[10px] bg-[#F7F7F7] rounded-[10px] relative overflow-hidden">
                          <div
                            className="h-full bg-[#FFC107] rounded-[10px]"
                            style={{ width: bar.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start p-0 gap-[20px] w-full flex-1 min-h-0">
                  <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] opacity-80 uppercase shrink-0">
                    Reviews
                  </span>

                  <div className="flex flex-col items-start p-0 w-full flex-1 overflow-y-auto no-scrollbar gap-0">
                    {[
                      {
                        stars: 5,
                        author: 'Anonymous - 4 days ago',
                        text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin. Ultrices tristique nunc adipiscing et eget est ullamcorper commodo donec.'
                      },
                      {
                        stars: 5,
                        author: 'Anonymous - 4 days ago',
                        text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin. Ultrices tristique nunc adipiscing et eget est ullamcorper commodo donec.'
                      },
                      {
                        stars: 5,
                        author: 'Anonymous - 4 days ago',
                        text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin. Ultrices tristique nunc adipiscing et eget est ullamcorper commodo donec.'
                      },
                      {
                        stars: 5,
                        author: 'Anonymous - 4 days ago',
                        text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin. Ultrices tristique nunc adipiscing et eget est ullamcorper commodo donec.'
                      }
                    ].map((mRev, idx) => (
                      <div
                        key={idx}
                        className="box-sizing-border-box flex flex-col items-start py-[20px] px-0 gap-[15px] w-full border-b border-[#E3E3E3] last:border-b-0"
                      >
                        <div className="flex flex-col items-start p-0 gap-[5px] w-full">
                          <div className="flex flex-row items-center gap-[5px]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className="w-[24px] h-[24px] fill-[#FFC107] stroke-none shrink-0"
                              />
                            ))}
                          </div>
                          <span className="font-rubik font-medium text-[15px] text-[#121111] leading-[18px]">
                            {mRev.author}
                          </span>
                        </div>
                        <p className="font-rubik font-light text-[14px] text-[#121111] leading-[25px] normal-case text-left">
                          {mRev.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
