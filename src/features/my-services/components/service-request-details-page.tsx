'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  MessageSquare,
  Navigation,
  Clock,
  BadgeDollarSign,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceRequestDetailsProps {
  requestId?: string;
}

export function ServiceRequestDetailsPage({ requestId = '1' }: ServiceRequestDetailsProps) {
  const router = useRouter();

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const sampleImages = [
    '/images/home/search.webp',
  ];

  const handleAcceptJob = () => {
    toast.success('Job request accepted successfully! Moved to Active jobs.');
    router.push('/my-services?tab=active&subTab=upcoming');
  };

  const handleDeclineJob = () => {
    toast.info('Job request declined.');
    router.push('/my-services?tab=requests');
  };

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
          <span className="font-normal text-[#121111]">Service Requests</span>
        </div>

        {/* Large Caregiver Profile Header */}
        <div className="w-full max-w-[1280px] flex items-center gap-5">
          <div className="w-[100px] h-[100px] rounded-full relative overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100 shadow-xs">
            <Image
              src="/images/avatar.webp"
              alt="Nandi Bolard"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-rubik font-medium text-[20px] leading-[24px] text-[#121111]">
              Nandi Bolard
            </h1>
            <div className="flex items-center gap-2 font-rubik text-[16px] text-[#121111]">
              <div className="flex items-center gap-1 pr-2 border-r border-[#121111]">
                <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                <span className="font-light">5.0 (48)</span>
              </div>
              <span className="font-light">98 Services</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job Info Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[12px] shadow-sm border border-[#EFEFEF] overflow-hidden flex flex-col">
            
            {/* Card Header */}
            <div className="px-5 py-3.5 border-b border-[#EFEFEF]">
              <h2 className="font-rubik font-medium text-[18px] text-[#121111]">
                Job Info
              </h2>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col gap-4">
              
              {/* Job Title & Timestamp */}
              <div className="flex flex-col gap-1">
                <h3 className="font-rubik font-medium text-[16px] leading-[20px] text-[#121111]">
                  I need house cleaning service.
                </h3>
                <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                  Posted 2 hours ago
                </span>
              </div>

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
              <div className="flex flex-col gap-2 pt-3">
                <h4 className="font-rubik font-medium text-[16px] text-[#3D3D3D]">
                  Attached Images
                </h4>
                <div className="flex items-center gap-3">
                  {sampleImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPhoto(img)}
                      className="w-[80px] h-[80px] rounded-[12px] border border-[#EFEFEF] bg-[#F8F9FF] relative overflow-hidden cursor-pointer shadow-2xs hover:opacity-90 transition"
                    >
                      <Image src={img} alt="Attached Job Preview" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Sticky Booking Action Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#F1F5F9] rounded-[12px] p-4 flex flex-col gap-3 shadow-sm border border-neutral-200">
            
            {/* Caregiver Row Card with Chat Button */}
            <div className="w-full bg-white border border-[#121111] rounded-[12px] p-4 flex items-center justify-between shadow-2xs">
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
                  <span className="font-rubik font-medium text-[16px] text-[#121111]">
                    Nandi Bolard
                  </span>
                  <div className="flex items-center gap-1.5 font-rubik text-[14px] text-[#121111]">
                    <div className="flex items-center gap-1 pr-1.5 border-r border-[#121111]">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-light text-[13px]">5.0 (48)</span>
                    </div>
                    <span className="font-light text-[13px]">98 Services</span>
                  </div>
                </div>
              </div>

              {/* Chat Icon Button with Notification Dot */}
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="w-[43px] h-[43px] bg-[#FEF0E9] rounded-full flex items-center justify-center relative hover:bg-[#FDE2D4] transition cursor-pointer border-none shadow-2xs shrink-0"
              >
                <MessageSquare className="w-5 h-5 text-[#121111]" />
                <div className="w-2 h-2 bg-[#F36922] rounded-full absolute top-1 right-1" />
              </button>
            </div>

            {/* Distance / Location Indicator */}
            <div className="w-full bg-white rounded-[8px] h-[40px] px-3 flex items-center justify-center gap-2 shadow-2xs font-rubik text-[15px] text-[#121111]">
              <Navigation className="w-4 h-4 text-[#0A0A6E]" />
              <span>500 miles</span>
            </div>

            {/* Date & Price Split Box */}
            <div className="w-full bg-white rounded-[12px] h-[63px] grid grid-cols-2 divide-x divide-[#EFEFEF] overflow-hidden shadow-2xs">
              
              {/* Date Column */}
              <div className="flex flex-col justify-center px-4 py-2">
                <div className="flex items-center gap-1.5 text-[13px] font-rubik text-[#121111]">
                  <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
                  <span>Date</span>
                </div>
                <span className="font-rubik font-medium text-[16px] text-[#121111] leading-tight mt-0.5">
                  25 March 2026
                </span>
              </div>

              {/* Price Column */}
              <div className="flex flex-col justify-center px-4 py-2">
                <div className="flex items-center gap-1.5 text-[13px] font-rubik text-[#121111]">
                  <BadgeDollarSign className="w-3.5 h-3.5 text-[#0A0A6E]" />
                  <span>Price</span>
                </div>
                <span className="font-rubik font-medium text-[16px] text-[#121111] leading-tight mt-0.5">
                  $300
                </span>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 mt-1">
              <button
                type="button"
                onClick={handleAcceptJob}
                className="w-full h-[42px] bg-[#046C4E] hover:bg-[#03543d] text-white font-rubik font-medium text-[15px] rounded-[8px] flex items-center justify-center transition cursor-pointer border-none shadow-xs"
              >
                Accept Job
              </button>

              <button
                type="button"
                onClick={handleDeclineJob}
                className="w-full h-[44px] bg-white hover:bg-red-50 text-[#C81E1E] border border-[#E4E4E7] font-rubik font-normal text-[15px] rounded-[8px] flex items-center justify-center transition cursor-pointer shadow-xs"
              >
                Decline Job
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
