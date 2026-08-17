'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Navigation,
  MessageSquare,
} from 'lucide-react';

interface GiverJobDetailsPageProps {
  jobId?: string;
}

export function GiverJobDetailsPage({ jobId }: GiverJobDetailsPageProps) {
  const router = useRouter();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const sampleImages = [
    '/images/home/search.webp',
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
          <Link href="/my-jobs" className="hover:text-[#F36922] transition text-[#3D3D3D]">
            My Jobs
          </Link>
          <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
          <span className="font-normal text-[#121111]">Job Details</span>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Main Area: Job Details & Contract */}
          <div className="lg:col-span-2 flex flex-col gap-6 w-full">
            {/* Card 1: Job Info */}
            <div className="w-full bg-white rounded-[12px] p-6 shadow-xs flex flex-col gap-4">
              {/* Header Row */}
              <div className="flex justify-between items-center pb-3 border-b border-[#EFEFEF]">
                <h2 className="font-rubik font-medium text-[18px] text-[#121111]">
                  Job Info
                </h2>
                <span className="bg-[#F8F9FF] text-[#F36922] font-rubik font-light text-[14px] rounded-full px-3 py-1">
                  Ongoing
                </span>
              </div>

              {/* Job Title */}
              <h3 className="font-rubik font-medium text-[16px] text-[#121111] mt-1">
                I need house cleaning service.
              </h3>

              {/* Description Paragraphs */}
              <p className="font-rubik font-light text-[14px] leading-[22px] text-[#121111]/80">
                Meet Jake, a dedicated professional who has recently settled into a charming new apartment in the heart of the city. With a demanding job that keeps him on his toes, Jake often finds himself overwhelmed by the daily tasks of maintaining his living space. Between meetings, deadlines, and social commitments, he struggles to find the time to keep his home as tidy as he would like.
              </p>
              <p className="font-rubik font-light text-[14px] leading-[22px] text-[#121111]/80">
                Understanding the importance of a clean and organized environment, Jake has decided to seek out a reliable house cleaning service. He knows that a clean home not only enhances his mood but also allows him to unwind after a long day at work. Jake is looking for a service that can provide thorough cleaning, ensuring that every corner of his apartment sparkles and feels inviting.
              </p>
              <p className="font-rubik font-light text-[14px] leading-[22px] text-[#121111]/80">
                In his search, Jake is particularly interested in finding a company that offers flexible scheduling to accommodate his busy lifestyle. He values professionalism and attention to detail, as he wants to ensure that his home is not just clean, but also a reflection of his personal style. With the right cleaning service, Jake hopes to create a welcoming sanctuary where he can relax and recharge.
              </p>

              {/* Attached Images Section */}
              <div className="flex flex-col gap-2 pt-2">
                <h4 className="font-rubik font-medium text-[16px] text-[#3D3D3D]">
                  Attached Images
                </h4>
                <div className="flex items-center gap-3">
                  {sampleImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPhoto(img)}
                      className="w-[80px] h-[80px] rounded-[12px] border border-[#EFEFEF] bg-[#F8F9FF] relative overflow-hidden cursor-pointer shadow-xs group"
                    >
                      <Image src={img} alt="Attached Preview" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Contract */}
            <div className="w-full bg-white rounded-[12px] p-6 shadow-xs flex flex-col gap-4">
              <h2 className="font-rubik font-medium text-[18px] text-[#121111] pb-3 border-b border-[#EFEFEF]">
                Contract
              </h2>

              <div className="flex flex-col gap-4 pt-1">
                {/* Row 1: Price */}
                <div className="flex justify-between items-center pb-3 border-b border-[#EFEFEF]">
                  <span className="font-rubik font-normal text-[14px] text-[#121111]">
                    Price
                  </span>
                  <span className="font-rubik font-medium text-[32px] text-[#121111]">
                    $12<span className="text-[16px] font-normal text-[#121111]">/Hr</span>
                  </span>
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

          {/* Right Sidebar Area */}
          <div className="flex flex-col gap-4 w-full">
            {/* Caregiver Profile Card */}
            <div className="w-full bg-white border border-[#121111] rounded-[12px] p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
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
                  <div className="flex items-center gap-1 font-rubik text-[12px] text-[#565656]">
                    <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
                    <span className="font-light text-[#121111]">5.0 (48)</span>
                    <span>| 98 Services</span>
                  </div>
                </div>
              </div>

              {/* Chat Icon Button with Notification Dot */}
              <button
                type="button"
                onClick={() => router.push('/chat')}
                className="w-[43px] h-[43px] bg-[#FEF0E9] rounded-full flex items-center justify-center relative hover:bg-[#FDE2D4] transition cursor-pointer border-none shadow-xs"
              >
                <MessageSquare className="w-5 h-5 text-[#121111]" />
                <div className="w-2 h-2 bg-[#F15A25] rounded-full absolute top-1 right-1" />
              </button>
            </div>

            {/* Location Container */}
            <div className="w-full bg-[#F1F5F9] border-r border-[#EFEFEF] rounded-[12px] p-4 flex flex-col gap-3">
              <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                Location
              </h3>
              <div className="w-full bg-white border border-[#EFEFEF] rounded-[12px] p-4 flex items-center justify-between shadow-xs">
                <span className="font-rubik font-normal text-[14px] text-[#121111]">
                  732 Amira Spring, New Hoseaville 49335-2723
                </span>
                <Navigation className="w-4 h-4 text-[#0A0A6E] shrink-0 ml-2" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 mt-2">
                <button
                  type="button"
                  className="w-full h-[42px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[8px] font-rubik font-medium text-[15px] text-[#121111] flex items-center justify-center cursor-default shadow-xs"
                >
                  Job Ongoing
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/my-jobs')}
                  className="w-full h-[42px] bg-[#F8F9FF] hover:bg-red-50 rounded-[8px] font-rubik font-medium text-[15px] text-[#C81E1E] flex items-center justify-center transition cursor-pointer border-none shadow-xs"
                >
                  Cancel Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
