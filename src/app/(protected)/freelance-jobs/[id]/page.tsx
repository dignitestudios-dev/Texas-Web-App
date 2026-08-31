'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Star,
  Clock,
  DollarSign,
  FileText,
  ArrowLeft,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface JobDetailData {
  id: string;
  category: string;
  isNew: boolean;
  proposalsCount: number;
  title: string;
  postedTime: string;
  descriptionParagraphs: string[];
  payRange: string;
  distance: string;
  duration: string;
  posterName: string;
  posterAvatar: string;
  posterRating: number;
  posterReviews: number;
  posterServices: number;
  isVerified: boolean;
  attachedImages: string[];
}

const DEFAULT_JOB: JobDetailData = {
  id: '1',
  category: 'House Cleaning',
  isNew: true,
  proposalsCount: 21,
  title: 'I need house cleaning service.',
  postedTime: 'Posted 2 hours ago',
  descriptionParagraphs: [
    'Meet Jake, a dedicated professional who has recently settled into a charming new apartment in the heart of the city. With a demanding job that keeps him on his toes, Jake often finds himself overwhelmed by the daily tasks of maintaining his living space. Between meetings, deadlines, and social commitments, he struggles to find the time to keep his home as tidy as he would like.',
    'Understanding the importance of a clean and organized environment, Jake has decided to seek out a reliable house cleaning service. He knows that a clean home not only enhances his mood but also allows him to unwind after a long day at work. Jake is looking for a service that can provide thorough cleaning, ensuring that every corner of his apartment sparkles and feels inviting.',
    'In his search, Jake is particularly interested in finding a company that offers flexible scheduling to accommodate his busy lifestyle. He values professionalism and attention to detail, as he wants to ensure that his home is not just clean, but also a reflection of his personal style. With the right cleaning service, Jake hopes to create a welcoming sanctuary where he can relax and recharge.',
  ],
  payRange: '$200 -$300',
  distance: '500 miles',
  duration: '1 day',
  posterName: 'Nandi Bolard',
  posterAvatar: '/images/avatar.webp',
  posterRating: 5.0,
  posterReviews: 48,
  posterServices: 98,
  isVerified: true,
  attachedImages: ['/images/home/clean.webp', '/images/home/search.webp'],
};

const SAMPLE_JOB_DETAILS: Record<string, JobDetailData> = {
  '1': DEFAULT_JOB,
  'req-1': {
    ...DEFAULT_JOB,
    id: 'req-1',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
  },
  'req-2': {
    ...DEFAULT_JOB,
    id: 'req-2',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
  },
  'req-3': {
    ...DEFAULT_JOB,
    id: 'req-3',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
  },
  '2': {
    id: '2',
    category: 'Meal Prep Service',
    isNew: true,
    proposalsCount: 15,
    title: "I'm searching for a meal prep service.",
    postedTime: 'Posted 1 hour ago',
    descriptionParagraphs: [
      'Meet Sarah, a health-conscious individual who spends long hours at work. She wants to eat healthy without the hassle of cooking daily. She is looking for a meal prep service that can deliver fresh, nutritious meals on a weekly basis.',
      'Sarah prefers customized options suited for high-protein diets and dietary preferences. Reliable delivery and dietary transparency are high priorities for her.',
    ],
    payRange: '$150 - $250',
    distance: '30 miles',
    duration: '3 days',
    posterName: 'Evan Chen',
    posterAvatar: '/images/avatar.webp',
    posterRating: 4.9,
    posterReviews: 32,
    posterServices: 75,
    isVerified: true,
    attachedImages: ['/images/home/food.webp'],
  },
  '3': {
    id: '3',
    category: 'Pet Sitting',
    isNew: true,
    proposalsCount: 18,
    title: 'I need a pet sitting service.',
    postedTime: 'Posted 3 hours ago',
    descriptionParagraphs: [
      'Meet Lisa, a devoted pet owner who has to travel for work. She is searching for a trustworthy pet sitter who can take care of her two dogs while she is away, ensuring they receive daily care, feeding, and walks.',
      'She is seeking someone experienced with energetic dogs and willing to send daily updates and photos.',
    ],
    payRange: '$50 - $100',
    distance: '20 miles',
    duration: '1 week',
    posterName: 'Mark Taylor',
    posterAvatar: '/images/avatar.webp',
    posterRating: 4.8,
    posterReviews: 22,
    posterServices: 50,
    isVerified: true,
    attachedImages: ['/images/home/pet.webp'],
  },
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = (params?.id as string) || '1';

  const job = SAMPLE_JOB_DETAILS[jobId] || {
    ...DEFAULT_JOB,
    id: jobId,
  };

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full">
      {/* Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[80px] py-8 lg:py-12 flex flex-col gap-6">
        
        {/* Breadcrumbs Row (Home > Job) */}
        <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
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
          <span className="font-normal text-[#121111]">Job</span>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 w-full">
          
          {/* Left Column (Job Info & Paragraphs) */}
          <div className="flex-1 lg:max-w-[800px] w-full flex flex-col gap-6 lg:pr-10 lg:border-r lg:border-[#EFEFEF]/86">
            
            {/* Title & Posted Time */}
            <div className="flex flex-col gap-1">
              <h1 className="font-rubik font-medium text-[24px] md:text-[28px] leading-[34px] tracking-[-0.005em] text-[#121111]">
                {job.title}
              </h1>
              <span className="font-rubik font-normal text-[15px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                {job.postedTime}
              </span>
            </div>

            {/* Badges Row */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-[#FEF0E9] border border-[#EFEFEF] rounded-[8px] px-3 py-1 flex items-center justify-center">
                <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                  {job.category}
                </span>
              </div>
              {job.isNew && (
                <div className="bg-[#FEF0E9] border border-[#EFEFEF] rounded-[8px] px-3 py-1 flex items-center justify-center">
                  <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                    NEW
                  </span>
                </div>
              )}
              <div className="rounded-[8px] px-3 py-1 flex items-center justify-center">
                <span className="font-inter font-light text-[12px] leading-[18px] tracking-[-0.005em] text-[#121111]">
                  Proposals: {job.proposalsCount}
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-3 pt-2">
              <h2 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#3D3D3D]">
                Description
              </h2>
              <div className="flex flex-col gap-4 font-rubik font-light text-[15px] leading-[22px] tracking-[-0.005em] text-[#3D3D3D]">
                {job.descriptionParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Attached Images Section */}
            {job.attachedImages && job.attachedImages.length > 0 && (
              <div className="flex flex-col gap-3 pt-4">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#3D3D3D]">
                  Attached Images
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  {job.attachedImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="w-[80px] h-[80px] rounded-[12px] overflow-hidden border border-[#EFEFEF] relative bg-white shadow-xs"
                    >
                      <Image src={imgSrc} alt={`Attachment ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar Actions & Poster Info) */}
          <div className="w-full lg:w-[460px] flex flex-col gap-4 shrink-0">
            
            {/* Location Pill */}
            <div className="w-full h-[40px] bg-[#F8F9FF] rounded-[8px] flex items-center justify-center gap-2 font-rubik font-normal text-[15px] text-[#121111]">
              <Compass className="w-4 h-4 text-[#0A0A6E] shrink-0" />
              <span>{job.distance}</span>
            </div>

            {/* Time Slot & Price Cards */}
            <div className="w-full h-[63px] flex items-center rounded-[12px] overflow-hidden bg-[#F8F9FF]">
              {/* Time Slot */}
              <div className="w-1/2 h-full border-r border-[#EFEFEF] p-[10px_20px] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 font-rubik font-normal text-[15px] text-[#121111]">
                  <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
                  <span>Time Slot</span>
                </div>
                <span className="font-rubik font-medium text-[16px] text-[#121111]">
                  {job.duration}
                </span>
              </div>

              {/* Price */}
              <div className="w-1/2 h-full p-[10px_20px] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 font-rubik font-normal text-[15px] text-[#121111]">
                  <DollarSign className="w-3.5 h-3.5 text-[#0A0A6E]" />
                  <span>Price</span>
                </div>
                <span className="font-rubik font-medium text-[16px] text-[#121111]">
                  {job.payRange}
                </span>
              </div>
            </div>

            {/* Send Proposal Button */}
            <button
              type="button"
              onClick={() => router.push(`/freelance-jobs/${job.id}/submit-proposal`)}
              className="w-full h-[54px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] flex items-center justify-center gap-2.5 font-rubik font-medium text-[15px] leading-[24px] cursor-pointer shadow-xs transition border-none outline-none"
            >
              <FileText className="w-5 h-5 text-white" />
              <span>Send Proposal</span>
            </button>

            {/* Poster Info Card */}
            <div
              onClick={() => router.push(`/freelance-jobs/${job.id}/profile`)}
              className="w-full h-[83px] bg-white border border-[#121111] rounded-[12px] p-[20px] flex items-center gap-3 cursor-pointer hover:border-[#F36922] transition shadow-xs"
            >
              {/* Avatar */}
              <div className="w-[43px] h-[43px] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                <Image src={job.posterAvatar} alt={job.posterName} fill className="object-cover" />
              </div>

              {/* Poster Details */}
              <div className="flex flex-col justify-between h-[43px] flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                    {job.posterName}
                  </span>
                  {job.isVerified && (
                    <svg className="w-[18px] h-[18px] text-[#4253F0] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7l-3.61.81.34 3.69L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2 3.4-1.47 3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-2 font-rubik font-light text-[14px] text-[#121111]">
                  <div className="flex items-center gap-1 pr-2 border-r border-[#121111]">
                    <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                    <span>
                      {job.posterRating.toFixed(1)} ({job.posterReviews})
                    </span>
                  </div>
                  <span>{job.posterServices} Services</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
