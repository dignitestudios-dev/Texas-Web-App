'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Caregiver } from '../types/leaderboard.types';
import CaregiverProfileSidebar from './caregiver-profile-sidebar';

interface CaregiverProfileDetailsProps {
  caregiver: Caregiver;
}

export default function CaregiverProfileDetails({ caregiver }: CaregiverProfileDetailsProps) {
  const router = useRouter();

  // Mock list of services for the caregiver
  const services = [
    {
      title: 'Get Cleaning Services',
      description: 'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.',
      featured: true,
      price: '$10',
      image: '/images/avatar.webp',
    },
    {
      title: 'Window Cleaning Service',
      description: 'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.',
      featured: false,
      price: '$10',
      image: '/images/giver.webp',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF6F0] flex flex-col relative w-full overflow-x-hidden">
      {/* Main content container */}
      <div className="relative z-20 w-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[30px] pb-[100px]">

        {/* Breadcrumb & Navigation Section */}
        <div className="w-full max-w-7xl flex flex-col gap-[20px]">
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-[16px] h-[48px]">
            <button
              onClick={() => router.back()}
              className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none"
            >
              <ArrowLeft className="text-white w-6 h-6" />
            </button>
            <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
              <Link href="/" className="hover:text-[#F36922] transition">Home</Link>
              <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
              <Link href="/leaderboard" className="hover:text-[#F36922] transition">Leaderboard</Link>
              <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
              <span className="font-normal text-[#121111]">{caregiver.name}</span>
            </div>
          </div>

          {/* Profile Main Header Layout */}
          <div className="flex items-center gap-6 w-full py-4 border-b border-[#0A0A6E]/10 shrink-0">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-[4px] border-[#F36922] shadow-md shrink-0 bg-white">
              <Image
                src={caregiver.avatar}
                alt={caregiver.name}
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="font-rubik font-semibold text-[28px] leading-tight text-[#121111] tracking-[-0.005em]">
                  {caregiver.name}
                </h1>
                {caregiver.verified && (
                  <span className="w-5 h-5 rounded-full bg-[#4253F0] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">✓</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-sans font-medium text-[15px] text-black">Elderly Care Specialist</span>
                <span className="text-black/30">|</span>
                <div className="flex items-center gap-1 font-rubik font-light text-[14px] text-black">
                  <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                  <span>{caregiver.rating.toFixed(1)} ({caregiver.reviewsCount})</span>
                  <span className="text-black/30 mx-1">|</span>
                  <span>{caregiver.servicesCount} Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Details Layout */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 items-start justify-between">

          {/* Left Column - Main Details (About, Services, Qualifications) */}
          <div className="flex-1 flex flex-col gap-8 w-full max-w-[700px] shrink-0">

            {/* My Services section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-semibold text-[16px] text-[#121111]">My Services</h3>
              <div className="flex flex-col gap-4">
                {services.map((svc, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-b border-[#EFEFEF]/86 p-[15px] rounded-xl  flex flex-col gap-[12px] w-full"
                  >
                    {/* Row 1 (Image + Details) */}
                    <div className="flex flex-row items-center gap-[15px] w-full">
                      {/* Service Image */}
                      <div className="w-[130px] h-[86px] rounded-lg overflow-hidden shrink-0 relative bg-neutral-100 border border-neutral-100">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info Stack */}
                      <div className="flex flex-col gap-[8px] flex-1">
                        {/* Title & Featured Badge */}
                        <div className="flex flex-row justify-between items-center w-full">
                          <h4 className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                            {svc.title}
                          </h4>
                          {svc.featured && (
                            <div className="h-[32px] px-[15px] bg-[#F36922]/20 border border-[#F36922] rounded-lg flex items-center justify-center gap-[3px] shrink-0">
                              <Star className="w-4 h-4 fill-[#F36922] text-[#F36922] stroke-none" />
                              <span className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#F36922]">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Description */}
                        <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111] w-full text-left">
                          {svc.description}
                        </p>
                      </div>
                    </div>

                    {/* Row 2 (Price + View Button) */}
                    <div className="flex flex-row justify-between items-center w-full">
                      {/* Price info */}
                      <div className="flex flex-col gap-[5px]">
                        <span className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                          From
                        </span>
                        <div className="flex items-baseline">
                          <span className="font-rubik font-medium text-[20px] leading-[24px] tracking-[-0.005em] text-[#121111]">
                            {svc.price}
                          </span>
                          <span className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]/70">
                            /Hour
                          </span>
                        </div>
                      </div>

                      {/* View Button */}
                      <button
                        type="button"
                        onClick={() => router.push(`/leaderboard/${caregiver.id ?? 'john-doe'}/service`)}
                        className="h-[32px] px-[15px] border border-[#E4E4E7] hover:bg-neutral-50 rounded-lg font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] cursor-pointer transition outline-none flex items-center justify-center"
                      >
                        View Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About section */}
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-semibold text-[16px] text-[#121111]">About</h3>

              {/* Bio details card */}
              <div className="  flex flex-col gap-2 ">
                <div className="flex flex-col gap-2 bg-white rounded-xl border border-[#EFEFEF]/85  p-5">
                  <span className="font-sans font-semibold text-[14px] text-[#121111]">Bio</span>
                  <p className="font-sans font-normal text-[14px] leading-relaxed text-[#121111]/80">
                    {caregiver.message}
                  </p>
                  <div className="flex flex-col gap-1.5 mt-2 text-[14px] text-[#121111]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#24CC1B] font-bold">✓</span>
                      <span>45+ Jobs Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#24CC1B] font-bold">✓</span>
                      <span>98% Satisfaction Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#24CC1B] font-bold">✓</span>
                      <span>30% Repeat Clients</span>
                    </div>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                {/* Technical fields grid layout */}
                <div className="grid grid-cols-1   gap-2">
                  <div className="flex flex-col gap-1 p-5 rounded-xl border border-[#EFEFEF]/85 bg-white">
                    <span className="font-sans font-semibold text-[14px] text-[#121111]">Years of Experience</span>
                    <span className="font-sans text-[14px] text-[#121111]/70">5 years of Experience</span>
                  </div>
                  <div className="flex flex-col gap-1 p-5 rounded-xl border border-[#EFEFEF]/85 bg-white">
                    <span className="font-sans font-semibold text-[14px] text-[#121111]">Languages</span>
                    <span className="font-sans text-[14px] text-[#121111]/70">English, Spanish, French</span>
                  </div>
                  <div className="flex flex-col gap-1 p-5 rounded-xl border border-[#EFEFEF]/85 bg-white">
                    <span className="font-sans font-semibold text-[14px] text-[#121111]">Religion</span>
                    <span className="font-sans text-[14px] text-[#121111]/70">Christianity</span>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                {/* Education / Qualifications list */}
                <div className="flex flex-col gap-3 p-5 rounded-xl border border-[#EFEFEF]/85 bg-white">
                  <span className="font-sans font-semibold text-[14px] text-[#121111]">Education & Education list</span>
                  <div className="flex gap-4 relative pl-2">
                    {/* Vertical connector timeline */}
                    <div className="w-[2px] bg-[#E4E4E7] absolute left-[15px] top-[10px] bottom-[10px] pointer-events-none" />

                    <div className="flex flex-col gap-6 w-full">
                      {/* Item 1 */}
                      <div className="flex gap-3 items-start relative">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#121111] border-2 border-white ring-4 ring-neutral-100 shrink-0 mt-1 z-10" />
                        <div className="flex flex-col">
                          <span className="font-sans font-medium text-[14px] text-[#121111]">Texas Medical Institute, 2022</span>
                          <span className="font-sans font-light text-[13px] text-neutral-500">Diploma in Nursing</span>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex gap-3 items-start relative">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#121111] border-2 border-white ring-4 ring-neutral-100 shrink-0 mt-1 z-10" />
                        <div className="flex flex-col">
                          <span className="font-sans font-medium text-[14px] text-[#121111]">University of Texas, 2020</span>
                          <span className="font-sans font-light text-[13px] text-neutral-500">Bachelor of Health Sciences</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Certificates section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-semibold text-[16px] text-[#121111]">Certificates</h3>

              <div className="flex flex-col gap-4">
                {/* Cert 1 */}
                <div className="bg-white p-[12px_14px] rounded-[14px] flex flex-col gap-[6px] shadow-sm w-full">
                  {/* Title and Date Row */}
                  <div className="flex flex-row justify-between items-start w-full">
                    <h4 className="font-poppins font-medium text-[17px] text-[#121111] leading-[23px]">
                      CPR & First Aid Certified
                    </h4>
                    <span className="font-poppins font-medium text-[14px] text-[#121111] leading-[19px] text-right">
                      20/10/2025
                    </span>
                  </div>
                  {/* Issued by */}
                  <span className="font-poppins font-medium text-[14px] text-[#121111] leading-[19px] text-left">
                    Issued by American Red Cross
                  </span>
                  {/* Description */}
                  <p className="font-poppins font-normal text-[14px] text-[#121111] leading-[19px] text-left">
                    Trained to respond effectively to medical emergencies, including cardiac arrest, choking, injuries, and basic life-threatening situations, ensuring immediate and safe care until professional help arrives.
                  </p>
                  {/* PDF Icon Box */}
                  <div className="w-[60px] h-[60px] bg-[#FEF0E9] rounded-[4px] flex items-center justify-center shrink-0 mt-1.5">
                    <div className="relative w-[35px] h-[34px]">
                      <svg className="w-full h-full" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2C5 0.9 5.9 0 7 0H25L32 7V32C32 33.1 31.1 34 30 34H7C5.9 34 5 33.1 5 32V2Z"
                          fill="#FFFFFF"
                          stroke="#D2D2D2"
                          strokeWidth="1"
                        />
                        <path d="M25 0V7H32L25 0Z" fill="#E2E2E2" />
                        <rect x="7" y="11" width="16" height="7" rx="1" fill="#DD2025" />
                        <text x="15" y="16.5" fill="#FFFFFF" fontSize="5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.3">
                          PDF
                        </text>
                        <path
                          d="M13 26.5C14.2 22.5 17.5 20.5 18.2 23C19 25.5 17 28 19 29.5C21 31 23 27 21.5 25.5"
                          stroke="#DD2025"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Cert 2 */}
                <div className="bg-white p-[12px_14px] rounded-[14px] flex flex-col gap-[6px] shadow-sm w-full">
                  {/* Title and Date Row */}
                  <div className="flex flex-row justify-between items-start w-full">
                    <h4 className="font-poppins font-medium text-[17px] text-[#121111] leading-[23px]">
                      Certified Nursing Assistant (CNA)
                    </h4>
                    <span className="font-poppins font-medium text-[14px] text-[#121111] leading-[19px] text-right">
                      10/02/2021
                    </span>
                  </div>
                  {/* Issued by */}
                  <span className="font-poppins font-medium text-[14px] text-[#121111] leading-[19px] text-left">
                    Issued by Texas Medical Institute
                  </span>
                  {/* Description */}
                  <p className="font-poppins font-normal text-[14px] text-[#121111] leading-[19px] text-left">
                    Certified in providing essential patient care, including mobility assistance, hygiene support, vital sign monitoring, and compassionate daily living assistance in home and clinical settings.
                  </p>
                  {/* PDF Icon Box */}
                  <div className="w-[60px] h-[60px] bg-[#FEF0E9] rounded-[4px] flex items-center justify-center shrink-0 mt-1.5">
                    <div className="relative w-[35px] h-[34px]">
                      <svg className="w-full h-full" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2C5 0.9 5.9 0 7 0H25L32 7V32C32 33.1 31.1 34 30 34H7C5.9 34 5 33.1 5 32V2Z"
                          fill="#FFFFFF"
                          stroke="#D2D2D2"
                          strokeWidth="1"
                        />
                        <path d="M25 0V7H32L25 0Z" fill="#E2E2E2" />
                        <rect x="7" y="11" width="16" height="7" rx="1" fill="#DD2025" />
                        <text x="15" y="16.5" fill="#FFFFFF" fontSize="5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.3">
                          PDF
                        </text>
                        <path
                          d="M13 26.5C14.2 22.5 17.5 20.5 18.2 23C19 25.5 17 28 19 29.5C21 31 23 27 21.5 25.5"
                          stroke="#DD2025"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Status Card & Ratings Breakdown (Sidebar Component) */}
          <CaregiverProfileSidebar caregiver={caregiver} />

        </div>

      </div>
    </div>
  );
}
