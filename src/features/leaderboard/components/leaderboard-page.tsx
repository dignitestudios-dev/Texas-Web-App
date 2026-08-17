'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Star, Award, Sparkles } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Caregiver, LeaderboardCategoryData } from '../types/leaderboard.types';
import CaregiverProfileSidebar from './caregiver-profile-sidebar';

const MOCK_DATA: Record<string, LeaderboardCategoryData> = {
  companion: {
    category: 'companion',
    podium: {
      first: {
        rank: 1,
        name: 'John Doe',
        avatar: '/images/avatar.webp',
        rating: 4.9,
        reviewsCount: 32,
        servicesCount: 75,
        completedServicesCount: 1250,
        verified: true,
        message: 'Experienced companion caregiver specializing in senior support, recreational activities, and personal care assistance. Committed to enabling independent living with warmth and patience.',
      },
      second: {
        rank: 2,
        name: 'Nandi Bolard',
        avatar: '/images/avatar.webp',
        rating: 5.0,
        reviewsCount: 48,
        servicesCount: 98,
        completedServicesCount: 1450,
        verified: true,
        message: 'Passionate and certified companion specialist with over 7 years in social assistance, hobby facilitation, and transportation help for seniors.',
      },
      third: {
        rank: 3,
        name: 'Mark Taylor',
        avatar: '/images/avatar.webp',
        rating: 4.8,
        reviewsCount: 22,
        servicesCount: 50,
        completedServicesCount: 980,
        verified: true,
        message: 'Caring, friendly assistant providing conversational companionship, household chore support, and cognitive exercise games for elderly clients.',
      },
    },
    table: [
      {
        rank: 4,
        name: 'James Brown',
        avatar: '/images/giver.webp',
        rating: 4.7,
        reviewsCount: 42,
        servicesCount: 65,
        completedServicesCount: 1090,
        verified: true,
        message: 'Reliable and punctual professional with extensive history in companion service care, meal prep, and appointment coordination.',
      },
      {
        rank: 5,
        name: 'Sara Wilson',
        avatar: '/images/avatar.webp',
        rating: 4.7,
        reviewsCount: 25,
        servicesCount: 38,
        completedServicesCount: 890,
        verified: true,
        message: 'Dedicated support caregiver focused on companion therapy, mobility support, and creating safe, joyful social environments.',
      },
      {
        rank: 6,
        name: 'Maria Garcia',
        avatar: '/images/giver.webp',
        rating: 4.5,
        reviewsCount: 19,
        servicesCount: 28,
        completedServicesCount: 850,
        verified: false,
        message: 'Attentive caregiver offering compassionate companion visits, memory reinforcement games, and light housework help.',
      },
      {
        rank: 7,
        name: 'Samuel Lee',
        avatar: '/images/seeker.webp',
        rating: 4.8,
        reviewsCount: 52,
        servicesCount: 115,
        completedServicesCount: 1200,
        verified: true,
        message: 'Experienced and high-rated care specialist focusing on senior companion care and interactive mental wellness support.',
      },
      {
        rank: 8,
        name: 'Anna Smith',
        avatar: '/images/giver.webp',
        rating: 4.9,
        reviewsCount: 30,
        servicesCount: 52,
        completedServicesCount: 950,
        verified: true,
        message: 'Focused companion assistant, trained in physical guidance assistance, cognitive support, and dietary needs helper.',
      },
      {
        rank: 9,
        name: 'Michael Johnson',
        avatar: '/images/avatar.webp',
        rating: 4.6,
        reviewsCount: 28,
        servicesCount: 45,
        completedServicesCount: 1150,
        verified: true,
        message: 'Certified assistant with a focus on senior social integration and mobility assistance in home care settings.',
      },
      {
        rank: 10,
        name: 'Laura Wilson',
        avatar: '/images/seeker.webp',
        rating: 4.4,
        reviewsCount: 15,
        servicesCount: 22,
        completedServicesCount: 780,
        verified: false,
        message: 'Friendly assistant providing supportive companion care, shopping trips assistance, and light household organization help.',
      },
    ],
  },
  personal: {
    category: 'personal',
    podium: {
      first: {
        rank: 1,
        name: 'Elena Torres',
        avatar: '/images/avatar.webp',
        rating: 4.95,
        reviewsCount: 56,
        servicesCount: 120,
        completedServicesCount: 1780,
        verified: true,
        message: 'Certified Nursing Assistant (CNA) offering top-tier personal hygiene, grooming, and mobility support. Patient and professional approach to home care.',
      },
      second: {
        rank: 2,
        name: 'Ava Hart',
        avatar: '/images/seeker.webp',
        rating: 4.9,
        reviewsCount: 40,
        servicesCount: 88,
        completedServicesCount: 1350,
        verified: true,
        message: 'Experienced care provider specializing in personal safety, transfers, and medical compliance routines in a home environment.',
      },
      third: {
        rank: 3,
        name: 'Lucas Grant',
        avatar: '/images/avatar.webp',
        rating: 4.8,
        reviewsCount: 30,
        servicesCount: 64,
        completedServicesCount: 1050,
        verified: true,
        message: 'Caring personal caregiver focused on dignity-preserving hygiene care, dressing help, and light physical therapy support.',
      },
    },
    table: [
      {
        rank: 4,
        name: 'Jamal Edwards',
        avatar: '/images/giver.webp',
        rating: 4.75,
        reviewsCount: 35,
        servicesCount: 72,
        completedServicesCount: 1180,
        verified: true,
        message: 'Attentive assistant trained in transfer protocols, bathing assistance, and post-operative home rehabilitation care.',
      },
      {
        rank: 5,
        name: 'Olivia James',
        avatar: '/images/seeker.webp',
        rating: 4.7,
        reviewsCount: 28,
        servicesCount: 50,
        completedServicesCount: 920,
        verified: true,
        message: 'Professional homecare practitioner providing consistent bathing support, meal prep, and grooming help.',
      },
    ],
  },
};

export default function LeaderboardPage() {
  const router = useRouter();
  const [category, setCategory] = useState<string>('companion');

  const activeData = MOCK_DATA[category] || MOCK_DATA.companion;

  const getCaregiverId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-[#FFF6F0] flex flex-col relative w-full overflow-x-hidden">
      {/* Main content container */}
      <div className="relative z-20 w-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[30px] pb-[100px]">
        
        {/* Breadcrumb & Title Section */}
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
              <span className="font-normal text-[#121111]">Leaderboard</span>
            </div>
          </div>

          {/* Title & Description Header Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
            <div className="flex flex-col gap-[5px] max-w-2xl">
              <h1 className="font-rubik font-semibold text-[32px] leading-[38px] tracking-[-0.408px] text-[#121111]">
                Leaderboard
              </h1>
              <p className="font-rubik font-light text-[16px] leading-[19px] tracking-[-0.408px] text-[#3D3D3D]">
                Explore the top-performing caregivers in each service category. Select a category to view the Top 15 caregivers, ranked based on ratings, reviews, and overall performance. The Top 3 caregivers are featured on the podium for their outstanding service.
              </p>
            </div>

            {/* Category Dropdown Selector */}
            <div className="shrink-0 w-[260px]">
              <Select value={category} onValueChange={(val) => { if (val) setCategory(val); }}>
                <SelectTrigger className="w-full h-[46px] bg-white border border-[#E4E4E7] px-4 text-[#121111] text-[14px] flex items-center justify-between rounded-full cursor-pointer shadow-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E4E4E7] rounded-xl shadow-md max-h-[200px] overflow-y-auto z-40">
                  <SelectItem value="companion">Companion Care</SelectItem>
                  <SelectItem value="personal">Personal Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Podiums Section (Top 3 Podiums Layout) */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-end justify-center gap-[30px] lg:gap-[50px] pt-12 pb-6 shrink-0 relative min-h-[600px] lg:h-[620px]">
          
          {/* Decorative blur glows behind podiums */}
          <div className="absolute w-[140px] h-[140px] bg-[#1E2D34]/30 filter blur-[75px] left-[15%] bottom-[40%] pointer-events-none" />
          <div className="absolute w-[140px] h-[140px] bg-[#F3AB4F]/30 filter blur-[75px] left-[50%] -translate-x-1/2 bottom-[50%] pointer-events-none" />
          <div className="absolute w-[140px] h-[140px] bg-[#AC7233]/20 filter blur-[75px] right-[15%] bottom-[40%] pointer-events-none" />

          {/* Rank 2 (Left Podium) */}
          <div className="w-full md:w-[320px] lg:w-[350px] flex flex-col items-center gap-[16px] z-10 shrink-0">
            {/* Caregiver Info Header */}
            <button
              onClick={() => router.push(`/leaderboard/${getCaregiverId(activeData.podium.second.name)}`)}
              className="flex flex-col items-center gap-[12px] bg-transparent border-none outline-none cursor-pointer hover:scale-102 transition duration-200"
            >
              {/* Profile Avatar Card */}
              <div className="relative">
                <div className="w-[140px] h-[140px] rounded-[24px] overflow-hidden border-2 border-[#F36922] shadow-md">
                  <Image
                    src={activeData.podium.second.avatar}
                    alt={activeData.podium.second.name}
                    width={140}
                    height={140}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Silver Diamond Sparkle Badge */}
                <div className="absolute -top-3 -right-3 w-[40px] h-[40px] bg-gradient-to-br from-[#CBD5E1] via-[#E2E8F0] to-[#94A3B8] border-2 border-white rounded-[10px] rotate-45 shadow-md flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white -rotate-45" />
                </div>
              </div>
              
              <div className="flex items-center gap-[6px]">
                <span className="font-rubik font-bold text-[18px] text-[#121111]">{activeData.podium.second.name}</span>
                {activeData.podium.second.verified && (
                  <span className="w-4.5 h-4.5 rounded-full bg-[#4253F0] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">✓</span>
                )}
              </div>
            </button>

            {/* Podium Block Base */}
            <div className="w-full h-[250px] flex flex-col items-center justify-between py-5 px-4 relative overflow-hidden">
              <Image
                src="/images/box.webp"
                alt="Podium Base"
                fill
                unoptimized
                className="object-contain z-0"
              />
              {/* Rank Number Badge */}
              <div className="relative z-10 mt-1 w-[46px] h-[46px] bg-[#E2E2E2] rounded-[14px] shadow-sm flex items-center justify-center font-rubik font-bold text-white text-[24px]">
                2
              </div>
              {/* Star Rating details pill */}
              <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-full px-5 py-2 flex items-center gap-2 shadow-md border border-neutral-100 mb-2">
                <Star className="w-[18px] h-[18px] fill-[#FFC107] text-[#FFC107]" />
                <span className="font-rubik font-bold text-[15px] text-[#121111]">
                  {activeData.podium.second.rating.toFixed(1)} ({activeData.podium.second.reviewsCount})
                </span>
                <span className="text-neutral-300">|</span>
                <span className="font-rubik font-normal text-[14px] text-[#555555]">
                  {activeData.podium.second.servicesCount} Services
                </span>
              </div>
            </div>
          </div>

          {/* Rank 1 (Center/Taller Podium) */}
          <div className="w-full md:w-[320px] lg:w-[350px] flex flex-col items-center gap-[16px] z-10 shrink-0">
            {/* Caregiver Info Header */}
            <button
              onClick={() => router.push(`/leaderboard/${getCaregiverId(activeData.podium.first.name)}`)}
              className="flex flex-col items-center gap-[12px] bg-transparent border-none outline-none cursor-pointer hover:scale-102 transition duration-200"
            >
              {/* Profile Avatar Card */}
              <div className="relative">
                <div className="w-[155px] h-[155px] rounded-[28px] overflow-hidden border-[3px] border-[#F36922] shadow-lg">
                  <Image
                    src={activeData.podium.first.avatar}
                    alt={activeData.podium.first.name}
                    width={155}
                    height={155}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Gold Diamond Sparkle Badge */}
                <div className="absolute -top-4 -right-4 w-[46px] h-[46px] bg-gradient-to-br from-[#FDE047] via-[#FEF08A] to-[#CA8A04] border-2 border-white rounded-[12px] rotate-45 shadow-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white -rotate-45" />
                </div>
              </div>
              
              <div className="flex items-center gap-[6px]">
                <span className="font-rubik font-bold text-[20px] text-[#121111]">{activeData.podium.first.name}</span>
                {activeData.podium.first.verified && (
                  <span className="w-5 h-5 rounded-full bg-[#4253F0] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">✓</span>
                )}
              </div>
            </button>

            {/* Podium Block Base */}
            <div className="w-full h-[300px] flex flex-col items-center justify-between py-6 px-4 relative overflow-hidden">
              <Image
                src="/images/box.webp"
                alt="Podium Base"
                fill
                unoptimized
                className="object-contain z-0"
              />
              {/* Rank Number Badge */}
              <div className="relative z-10 mt-1 w-[52px] h-[52px] bg-[#E2E2E2] rounded-[16px] shadow-sm flex items-center justify-center font-rubik font-bold text-white text-[28px]">
                1
              </div>
              {/* Star Rating details pill */}
              <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-full px-6 py-2.5 flex items-center gap-2 shadow-lg border border-neutral-100 mb-3">
                <Star className="w-[20px] h-[20px] fill-[#FFC107] text-[#FFC107]" />
                <span className="font-rubik font-bold text-[16px] text-[#121111]">
                  {activeData.podium.first.rating.toFixed(1)} ({activeData.podium.first.reviewsCount})
                </span>
                <span className="text-neutral-300">|</span>
                <span className="font-rubik font-normal text-[15px] text-[#555555]">
                  {activeData.podium.first.servicesCount} Services
                </span>
              </div>
            </div>
          </div>

          {/* Rank 3 (Right Podium) */}
          <div className="w-full md:w-[320px] lg:w-[350px] flex flex-col items-center gap-[16px] z-10 shrink-0">
            {/* Caregiver Info Header */}
            <button
              onClick={() => router.push(`/leaderboard/${getCaregiverId(activeData.podium.third.name)}`)}
              className="flex flex-col items-center gap-[12px] bg-transparent border-none outline-none cursor-pointer hover:scale-102 transition duration-200"
            >
              {/* Profile Avatar Card */}
              <div className="relative">
                <div className="w-[140px] h-[140px] rounded-[24px] overflow-hidden border-2 border-[#F36922] shadow-md">
                  <Image
                    src={activeData.podium.third.avatar}
                    alt={activeData.podium.third.name}
                    width={140}
                    height={140}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Bronze Diamond Sparkle Badge */}
                <div className="absolute -top-3 -right-3 w-[40px] h-[40px] bg-gradient-to-br from-[#FDBA74] via-[#FFEDD5] to-[#C2410C] border-2 border-white rounded-[10px] rotate-45 shadow-md flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white -rotate-45" />
                </div>
              </div>
              
              <div className="flex items-center gap-[6px]">
                <span className="font-rubik font-bold text-[18px] text-[#121111]">{activeData.podium.third.name}</span>
                {activeData.podium.third.verified && (
                  <span className="w-4.5 h-4.5 rounded-full bg-[#4253F0] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">✓</span>
                )}
              </div>
            </button>

            {/* Podium Block Base */}
            <div className="w-full h-[250px] flex flex-col items-center justify-between py-5 px-4 relative overflow-hidden">
              <Image
                src="/images/box.webp"
                alt="Podium Base"
                fill
                unoptimized
                className="object-contain z-0"
              />
              {/* Rank Number Badge */}
              <div className="relative z-10 mt-1 w-[46px] h-[46px] bg-[#E2E2E2] rounded-[14px] shadow-sm flex items-center justify-center font-rubik font-bold text-white text-[24px]">
                3
              </div>
              {/* Star Rating details pill */}
              <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-full px-5 py-2 flex items-center gap-2 shadow-md border border-neutral-100 mb-2">
                <Star className="w-[18px] h-[18px] fill-[#FFC107] text-[#FFC107]" />
                <span className="font-rubik font-bold text-[15px] text-[#121111]">
                  {activeData.podium.third.rating.toFixed(1)} ({activeData.podium.third.reviewsCount})
                </span>
                <span className="text-neutral-300">|</span>
                <span className="font-rubik font-normal text-[14px] text-[#555555]">
                  {activeData.podium.third.servicesCount} Services
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Leaderboard Table (Ranks 4-10) */}
        <div className="w-full max-w-7xl flex flex-col mt-4 shrink-0 overflow-hidden  p-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0A0A6E] text-white h-[50px] rounded-xl overflow-hidden font-rubik font-semibold text-[14px] text-center">
                  <th className="py-3 px-6 rounded-l-xl w-[100px]">Rank</th>
                  <th className="py-3 px-6 text-left">Caregivers</th>
                  <th className="py-3 px-6 w-[200px]">Rating</th>
                  <th className="py-3 px-6 w-[220px]">Completed Services</th>
                  <th className="py-3 px-6 rounded-r-xl w-[200px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeData.table.map((row, idx) => (
                  <tr
                    key={row.rank}
                    className={`h-[74px] rounded-xl border-b border-neutral-100 font-rubik text-[15px] transition hover:bg-neutral-50/50 ${
                      idx % 2 === 1 ? 'bg-[#0A0A6E1A]' : 'bg-[#F3F4F6]'
                    }`}
                  >
                    {/* Rank Circle badge */}
                    <td className="py-3 px-6 text-center">
                      <div className="w-[32px] h-[32px] rounded-full border border-black flex items-center justify-center font-bold text-[14px] text-[#121111] mx-auto select-none">
                        {row.rank}
                      </div>
                    </td>

                    {/* Caregiver profile and name details */}
                    <td className="py-3 px-6 text-left">
                      <div
                        className="flex items-center gap-3 cursor-pointer hover:underline"
                        onClick={() => router.push(`/leaderboard/${getCaregiverId(row.name)}`)}
                      >
                        <div className="w-[43px] h-[43px] rounded-full overflow-hidden border border-neutral-100 shrink-0 shadow-inner">
                          <Image
                            src={row.avatar}
                            alt={row.name}
                            width={43}
                            height={43}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#121111]">{row.name}</span>
                          {row.verified && (
                            <span className="w-4 h-4 rounded-full bg-[#4253F0] flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Star rating info */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-[18px] h-[18px] fill-[#FFC107] text-[#FFC107]" />
                        <span className="font-medium text-black">{row.rating.toFixed(1)}</span>
                      </div>
                    </td>

                    {/* Services Count */}
                    <td className="py-3 px-6 text-center text-[#121111] font-light">
                      {row.completedServicesCount.toLocaleString()}
                    </td>

                    {/* View Profile Action button */}
                    <td className="py-3 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => router.push(`/leaderboard/${getCaregiverId(row.name)}`)}
                        className="h-[36px] px-4 bg-white border border-[#E4E4E7] hover:bg-neutral-50 text-black rounded-lg text-[13px] font-medium transition cursor-pointer flex items-center gap-1.5 mx-auto outline-none"
                      >
                        <span className="text-[14px]">👤</span>
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
