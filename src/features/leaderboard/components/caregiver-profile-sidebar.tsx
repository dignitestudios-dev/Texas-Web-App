'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, MapPin, MessageSquare } from 'lucide-react';
import { Caregiver } from '../types/leaderboard.types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface CaregiverProfileSidebarProps {
  caregiver: Caregiver;
}

export default function CaregiverProfileSidebar({ caregiver }: CaregiverProfileSidebarProps) {
  const router = useRouter();
  const [activeTag, setActiveTag] = React.useState('All');
  const [isReviewsOpen, setIsReviewsOpen] = React.useState(false);

  // Mock review feed
  const reviews = [
    {
      stars: 4,
      date: '21 Feb',
      text: 'John was incredibly patient and caring with my father. Highly recommended!',
      reviewer: 'Sarah M.',
      avatar: '/images/avatar.webp',
    },
    {
      stars: 5,
      date: '21 Feb',
      text: 'John was incredibly patient and caring with my father. Highly recommended!',
      reviewer: 'Sarah M.',
      avatar: '/images/avatar.webp',
    },
    {
      stars: 4,
      date: '21 Feb',
      text: 'John was incredibly patient and caring with my father. Highly recommended!',
      reviewer: 'Sarah M.',
      avatar: '/images/avatar.webp',
    },
  ];

  return (
    <div className="w-full lg:w-[560px] bg-white p-5 rounded-xl flex flex-col gap-[12px] shrink-0 font-sans">
      {/* 1. Header Card (Frame 2147227176) */}
      <div className="bg-white border border-[#EFEFEF]/86 rounded-xl p-5 flex flex-col gap-[15px] w-full">
        <div className="flex justify-between items-center gap-4 w-full">
          {/* Avatar and Info Block */}
          <div className="flex items-center gap-[5px]">
            {/* Avatar */}
            <div className="w-[43px] h-[43px] rounded-full overflow-hidden shrink-0 bg-[#F8F9FF] border border-neutral-100 flex items-center justify-center">
              <Image
                src={caregiver.avatar}
                alt={caregiver.name}
                width={43}
                height={43}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Info Vertical Stack */}
            <div className="flex flex-col gap-[5px] pl-[5px]">
              {/* Name */}
              <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                {caregiver.name}
              </span>

              {/* Row 2: Specialty, Rating, Services */}
              <div className="flex flex-row flex-wrap items-center gap-[8px]">
                <span className="font-poppins font-medium text-[14px] text-[#121111] leading-[19px] tracking-[-0.0041em]">
                  Elderly Care Specialist
                </span>
                <div className="flex flex-row items-center gap-[2px] border-r border-[#121111] pr-[8px]">
                  <Star className="w-4 h-4 fill-[#FFC107] stroke-none" />
                  <span className="font-rubik font-light text-[14px] text-[#121111] leading-[17px] tracking-[-0.005em] text-center">
                    {caregiver.rating.toFixed(1)} ({caregiver.reviewsCount})
                  </span>
                </div>
                <span className="font-rubik font-light text-[14px] text-[#121111] leading-[17px] tracking-[-0.005em] text-center">
                  {caregiver.servicesCount} Services
                </span>
              </div>

              {/* Row 3: Location and Distance */}
              <div className="flex flex-row items-center gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] border-r border-black pr-[16px]">
                  <MapPin className="w-[14px] h-[14px] text-[#121111]" />
                  <span className="font-poppins font-medium text-[13px] text-[#121111] leading-[18px] tracking-[-0.0041em]">
                    San Juan, Texas(TX)
                  </span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  {/* Vuesax GPS crosshair Icon SVG */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px] text-[#121111]">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                  </svg>
                  <span className="font-rubik font-normal text-[15px] text-[#121111] leading-[18px] tracking-[-0.005em]">
                    500 miles
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Trigger button on right */}
          <button
            onClick={() => router.push('/chat')}
            className="w-[43px] h-[43px] bg-[#FEF0E9] hover:bg-[#FDE4D5] rounded-full flex items-center justify-center cursor-pointer border-none shrink-0 relative transition"
          >
            <MessageSquare className="w-5 h-5 text-[#121111] fill-none" />
            <span className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-[#F36922] rounded-full" />
          </button>
        </div>
      </div>

      {/* 2. Availability Section */}
      <div className="flex flex-col gap-[5px] w-full">
        <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em] mb-1 pl-1">
          Availability
        </span>
        
        {/* Row 1: Monday & Tuesday */}
        <div className="bg-[#F1F5F9] rounded-xl overflow-hidden flex w-full h-[62px]">
          <div className="flex-1 flex flex-col justify-center items-start px-5 py-[10px] gap-[5px] border-r border-[#EFEFEF]/86">
            <span className="font-rubik font-normal text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
              Monday
            </span>
            <span className="font-poppins font-medium text-[13px] text-[#121111] leading-[18px] tracking-[-0.0041em]">
              11Am - 05:30Pm
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start px-5 py-[10px] gap-[5px]">
            <span className="font-rubik font-normal text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
              Tuesday
            </span>
            <span className="font-poppins font-medium text-[13px] text-[#121111] leading-[18px] tracking-[-0.0041em]">
              11Am - 05:30Pm
            </span>
          </div>
        </div>

        {/* Row 2: Wednesday & Thursday */}
        <div className="bg-[#F1F5F9] rounded-xl overflow-hidden flex w-full h-[62px]">
          <div className="flex-1 flex flex-col justify-center items-start px-5 py-[10px] gap-[5px] border-r border-[#EFEFEF]/86">
            <span className="font-rubik font-normal text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
              Wednesday
            </span>
            <span className="font-poppins font-medium text-[13px] text-[#121111] leading-[18px] tracking-[-0.0041em]">
              11Am - 05:30Pm
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start px-5 py-[10px] gap-[5px]">
            <span className="font-rubik font-normal text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
              Thursday
            </span>
            <span className="font-poppins font-medium text-[13px] text-[#121111] leading-[18px] tracking-[-0.0041em]">
              11Am - 05:30Pm
            </span>
          </div>
        </div>

        {/* Row 3: Friday */}
        <div className="bg-[#F1F5F9] rounded-xl overflow-hidden flex w-full h-[62px]">
          <div className="w-full flex flex-col justify-center items-start px-5 py-[10px] gap-[5px]">
            <span className="font-rubik font-normal text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
              Friday
            </span>
            <span className="font-poppins font-medium text-[13px] text-[#121111] leading-[18px] tracking-[-0.0041em]">
              11Am - 05:30Pm
            </span>
          </div>
        </div>
      </div>

      {/* 3. Service Tags */}
      <div className="flex flex-row items-center gap-[8px] w-full mt-1">
        {['All', 'Cleaning', 'Elderly Care'].map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`h-[38px] px-[16px] rounded-[4px] font-sans font-semibold text-[16px] leading-[22px] tracking-[-0.005em] cursor-pointer transition flex items-center justify-center border-none ${
                isActive
                  ? 'bg-[#FEF0E9] text-black font-semibold'
                  : 'bg-white text-black border border-neutral-100 hover:bg-neutral-50 font-semibold'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* 4. Rating and Reviews Section */}
      <div className="bg-white rounded-xl flex flex-col gap-[20px] w-full mt-2">
        <div className="border-b border-[#EFEFEF]/86 pb-[12px] w-full">
          <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] tracking-[-0.005em]">
            Rating and Reviews
          </span>
        </div>

        {/* Star Distribution and Rating */}
        <div className="flex flex-col gap-[30px] w-full">
          {/* Large rating block */}
          <div className="flex flex-col gap-[5px] w-[122px]">
            <div className="flex flex-row items-center gap-[8px]">
              <span className="font-rubik font-medium text-[54px] leading-[64px] tracking-[-0.05em] text-[#121111] uppercase">
                {caregiver.rating.toFixed(1)}
              </span>
              {/* Big Star icon */}
              <Star className="w-[30px] h-[30px] fill-[#FFC107] stroke-none" />
            </div>
            <span className="font-rubik font-light text-[16px] text-[#121111] leading-[19px] capitalize">
              419 Reviews
            </span>
          </div>

          {/* Rating Bars Distribution */}
          <div className="flex flex-col gap-[15px] w-full">
            {[
              { stars: 5, width: '86.4%' },
              { stars: 4, width: '10.6%' },
              { stars: 3, width: '1.6%' },
              { stars: 2, width: '3.8%' },
              { stars: 1, width: '1.4%' },
            ].map((bar) => (
              <div key={bar.stars} className="flex flex-row items-center gap-[8px] w-full">
                <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.05em] w-[10px] text-right">
                  {bar.stars}
                </span>
                {/* Track background */}
                <div className="flex-1 h-[10px] bg-[#F7F7F7] rounded-[10px] relative overflow-hidden">
                  {/* Fill progress */}
                  <div
                    className="h-full bg-[#FFC107] rounded-[10px]"
                    style={{ width: bar.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Heading */}
        <div className="w-full mt-2">
          <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] opacity-80">
            Reviews
          </span>
        </div>

        {/* Review list */}
        <div className="flex flex-col gap-[20px] w-full">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#F1F5F9] rounded-[4px] p-[16px_12px_12px_12px] flex flex-col gap-[13px] w-full"
            >
              {/* Row 1: Stars and Date */}
              <div className="flex flex-row justify-between items-center w-full">
                {/* Star rating row */}
                <div className="flex flex-row items-center gap-[6px]">
                  {[1, 2, 3, 4, 5].map((s) => {
                    const isFilled = s <= rev.stars;
                    return (
                      <Star
                        key={s}
                        className={`w-[16px] h-[15.2px] ${
                          isFilled ? 'fill-[#FFC107] stroke-none' : 'fill-[#F8F9FF] stroke-none'
                        }`}
                      />
                    );
                  })}
                </div>
                {/* Date */}
                <span className="font-poppins font-normal text-[11px] text-[#3D3D3D] leading-[15px]">
                  {rev.date}
                </span>
              </div>

              {/* Row 2: Text */}
              <p className="font-poppins font-normal text-[14px] text-[#121111] leading-[19px] tracking-[-0.18px]">
                {rev.text}
              </p>

              {/* Row 3: User Info */}
              <div className="flex flex-row items-center gap-[10px]">
                {/* User avatar */}
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0 bg-[#F8F9FF] border border-neutral-100 flex items-center justify-center">
                  <Image
                    src={rev.avatar}
                    alt={rev.reviewer}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Reviewer Name */}
                <span className="font-poppins font-medium text-[12px] text-[#121111] leading-[16px] tracking-[-0.408px] capitalize">
                  {rev.reviewer}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <button
          type="button"
          onClick={() => setIsReviewsOpen(true)}
          className="w-[150px] h-[44px] border border-[#E3E3E3] hover:bg-neutral-50 transition rounded-[10px] font-poppins font-normal text-[16px] text-[#121111] leading-[24px] cursor-pointer outline-none flex items-center justify-center mt-2"
        >
          Load More
        </button>
      </div>

      <Dialog open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
        <DialogContent className="w-full h-[90%] sm:max-w-[600px] p-0 bg-white border-none shadow-xl rounded-xl overflow-y-scroll no-scrollbar [&>button]:hidden">
          <div className="sr-only">
            <DialogTitle>Rating and Reviews</DialogTitle>
            <DialogDescription>Full rating breakdown and list of all caregiver reviews</DialogDescription>
          </div>

          {/* Popup Container (Reviews) */}
          <div className="flex flex-col items-start w-full bg-white relative">
            {/* Header (Frame 2147227413) */}
            <div className="box-sizing-border-box flex flex-row justify-between items-center py-[15px] px-[30px] w-full h-[70px] border-b border-[#EFEFEF]/86">
              <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] tracking-[-0.005em]">
                Rating and Reviews
              </span>
              {/* Custom Close Button */}
              <button
                type="button"
                onClick={() => setIsReviewsOpen(false)}
                className="w-[40px] h-[40px] bg-[#F8F9FF] hover:bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer border-none transition"
              >
                {/* charm:cross icon */}
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

            {/* Body (Frame 2147227197) */}
            <div className="flex flex-row items-start py-[15px] px-[30px] w-full h-[713px] overflow-hidden">
              {/* Frame 545 */}
              <div className="flex flex-col items-start p-0 gap-[30px] w-full h-full">
                {/* Ratings summary (Frame 533) */}
                <div className="flex flex-col items-start p-0 gap-[30px] w-full shrink-0">
                  {/* Overall rating (Frame 524) */}
                  <div className="flex flex-col items-start p-0 gap-[5px] w-[122px]">
                    <div className="flex flex-row items-center p-0 gap-[8px] w-full h-[64px]">
                      <span className="font-rubik font-medium text-[54px] leading-[64px] tracking-[-0.05em] text-[#121111] uppercase">
                        {caregiver.rating.toFixed(1)}
                      </span>
                      {/* Big Star icon */}
                      <Star className="w-[30px] h-[30px] fill-[#FFC107] stroke-none shrink-0" />
                    </div>
                    <span className="font-rubik font-light text-[16px] text-[#121111] leading-[19px] capitalize">
                      419 Reviews
                    </span>
                  </div>

                  {/* Rating distribution (Frame 531) */}
                  <div className="flex flex-col gap-[15px] w-full">
                    {[
                      { stars: 5, width: '86.4%' },
                      { stars: 4, width: '10.6%' },
                      { stars: 3, width: '1.6%' },
                      { stars: 2, width: '3.8%' },
                      { stars: 1, width: '1.4%' },
                    ].map((bar) => (
                      <div key={bar.stars} className="flex flex-row items-center gap-[8px] w-full">
                        <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.05em] w-[10px] text-right">
                          {bar.stars}
                        </span>
                        {/* Track background */}
                        <div className="flex-1 h-[10px] bg-[#F7F7F7] rounded-[10px] relative overflow-hidden">
                          {/* Fill progress */}
                          <div
                            className="h-full bg-[#FFC107] rounded-[10px]"
                            style={{ width: bar.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews list Section (Frame 544) */}
                <div className="flex flex-col items-start p-0 gap-[20px] w-full flex-1 min-h-0">
                  <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] opacity-80 uppercase shrink-0">
                    Reviews
                  </span>

                  {/* Scrollable list (Frame 539) */}
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
                        {/* Frame 535 */}
                        <div className="flex flex-col items-start p-0 gap-[5px] w-full">
                          {/* Star Row */}
                          <div className="flex flex-row items-center gap-[5px]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className="w-[24px] h-[24px] fill-[#FFC107] stroke-none shrink-0"
                              />
                            ))}
                          </div>
                          {/* Author/Time */}
                          <span className="font-rubik font-medium text-[15px] text-[#121111] leading-[18px]">
                            {mRev.author}
                          </span>
                        </div>
                        {/* Review Body */}
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
