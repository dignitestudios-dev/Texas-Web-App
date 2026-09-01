'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  MapPin,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Caregiver } from '../types/leaderboard.types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ImageCarouselModal } from '@/features/care-services/components/image-carousel-modal';
import { getToken } from '@/lib/cookies';

interface ServiceDetailPageProps {
  caregiver: Caregiver;
}

const CAROUSEL_IMAGES = [
  '/images/home/search.webp',
  '/images/home/profile.webp',
  '/images/home/find.webp',
  '/images/home/position.webp',
];

const RATING_BARS = [
  { label: '5 stars', count: 18, percent: 82 },
  { label: '4 stars', count: 8,  percent: 46 },
  { label: '3 stars', count: 9,  percent: 50 },
  { label: '2 stars', count: 6,  percent: 40 },
  { label: '1 stars', count: 2,  percent: 17 },
];

const REVIEWS = [
  { stars: 4, date: '21 Feb', text: 'John was incredibly patient and caring with my father. Highly recommended!', reviewer: 'Sarah M.', avatar: '/images/avatar.webp' },
  { stars: 5, date: '21 Feb', text: 'John was incredibly patient and caring with my father. Highly recommended!', reviewer: 'Sarah M.', avatar: '/images/avatar.webp' },
  { stars: 4, date: '21 Feb', text: 'John was incredibly patient and caring with my father. Highly recommended!', reviewer: 'Sarah M.', avatar: '/images/avatar.webp' },
];

export default function ServiceDetailPage({ caregiver }: ServiceDetailPageProps) {
  const router = useRouter();
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(!!getToken());
    };
    updateAuth();
    window.addEventListener('authChange', updateAuth);
    window.addEventListener('roleChange', updateAuth);
    return () => {
      window.removeEventListener('authChange', updateAuth);
      window.removeEventListener('roleChange', updateAuth);
    };
  }, []);

  // ── Embla: Main carousel ──────────────────────────────────────────────
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });

  // ── Embla: Thumbnail carousel ─────────────────────────────────────────
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: false,
    dragFree: false,
    align: 'center',
    loop: true,
  });

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const idx = mainApi.selectedScrollSnap();
    setSelectedThumb(idx);
    thumbApi?.scrollTo(idx);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
    return () => {
      mainApi.off('select', onSelect);
      mainApi.off('reInit', onSelect);
    };
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (mainApi) {
      mainApi.scrollPrev();
      const idx = mainApi.selectedScrollSnap();
      setSelectedThumb(idx);
      thumbApi?.scrollTo(idx);
    } else {
      setSelectedThumb((prev) => {
        const nextIdx = prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1;
        thumbApi?.scrollTo(nextIdx);
        return nextIdx;
      });
    }
  }, [mainApi, thumbApi]);

  const scrollNext = useCallback(() => {
    if (mainApi) {
      mainApi.scrollNext();
      const idx = mainApi.selectedScrollSnap();
      setSelectedThumb(idx);
      thumbApi?.scrollTo(idx);
    } else {
      setSelectedThumb((prev) => {
        const nextIdx = prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1;
        thumbApi?.scrollTo(nextIdx);
        return nextIdx;
      });
    }
  }, [mainApi, thumbApi]);

  const scrollToThumb = useCallback(
    (idx: number) => {
      mainApi?.scrollTo(idx);
      thumbApi?.scrollTo(idx);
      setSelectedThumb(idx);
    },
    [mainApi, thumbApi],
  );

  // Navigate to booking page
  const handleBookService = () => {
    router.push(`/leaderboard/${caregiver.id ?? 'john-doe'}/service/book`);
  };

  return (
    <div className="min-h-screen bg-[rgba(243,105,34,0.1)]/2 flex flex-col w-full">

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="w-full flex flex-col items-center px-8 lg:px-[80px] pt-[30px] pb-[60px] gap-[20px]">

        {/* Back Arrow + Title */}
        <div className="w-full max-w-[1280px] flex items-center gap-[32px]">
          <button
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>
          <h1 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.005em] text-[#121111]">
            Professional Home Cleaning Services Making Your Home Sparkle
          </h1>
        </div>

        {/* Two-Column Layout */}
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-start gap-[20px]">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-[20px] w-full lg:w-[678px] shrink-0">

            {/* ── Main Embla Carousel ─────────────────────────────────── */}
            <div className="flex flex-col gap-[20px] w-full">

              {/* Viewport */}
              <div className="relative w-full  rounded-[10px] p-[10px]" style={{ height: 420 }}>
                <div
                  className="overflow-hidden w-full h-full rounded-[8px] cursor-pointer"
                  ref={mainRef}
                  onClick={() => setIsCarouselModalOpen(true)}
                >
                  <div className="flex h-full">
                    {CAROUSEL_IMAGES.map((img, idx) => (
                      <div key={idx} className="relative bg-gray-100 flex-[0_0_100%] h-full rounded-[8px] overflow-hidden">
                        <Image src={img} alt={`Slide ${idx + 1}`} fill className="object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prev arrow */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full shadow-[6px_7px_12px_rgba(3,30,36,0.2)] flex items-center justify-center cursor-pointer border-none z-10 hover:scale-105 transition"
                >
                  <ChevronLeft className="w-4 h-4 text-[#121111]" />
                </button>

                {/* Next arrow */}
                <button
                  onClick={scrollNext}
                  className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full shadow-[6px_7px_12px_rgba(3,30,36,0.2)] flex items-center justify-center cursor-pointer border-none z-10 hover:scale-105 transition"
                >
                  <ChevronRight className="w-4 h-4 text-[#121111]" />
                </button>
              </div>

              {/* ── Thumbnail Embla Carousel ──────────────────────────── */}
              <div className="flex flex-row items-center gap-[10px] px-[10px]">
                {/* Thumb prev */}
                <button
                  onClick={scrollPrev}
                  className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer border-none shrink-0 hover:scale-105 transition shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-[#121111]" />
                </button>

                {/* Thumb viewport */}
                <div className="overflow-hidden flex-1" ref={thumbRef}>
                  <div className="flex gap-[10px]">
                    {CAROUSEL_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToThumb(idx)}
                        className={`relative flex-[0_0_155px] h-[100px] rounded-[8px] overflow-hidden border-2 cursor-pointer transition shrink-0 ${
                          selectedThumb === idx ? 'border-[#F36922]' : 'border-transparent'
                        }`}
                      >
                        <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-contain bg-gray-100" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thumb next */}
                <button
                  onClick={scrollNext}
                  className="w-[30px] h-[30px] bg-[#F36922] rounded-full flex items-center justify-center cursor-pointer border-none shrink-0 hover:bg-[#e05813] transition shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-[15px] w-full py-[10px]">
              <h2 className="font-rubik font-medium text-[20px] leading-[24px] tracking-[-0.005em] text-[#121111]">
                Description
              </h2>
              <p className="font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111]">
                Grasping the importance of your cleaning service title is essential for
              </p>
              <p className="font-rubik font-medium text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it&apos;s residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.
              </p>
              <p className="font-rubik font-medium text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it&apos;s residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-[12px] w-full lg:w-[582px] bg-white rounded-[12px] shrink-0">

            {/* 1. Caregiver Info Card */}
            <div className="flex flex-col gap-[15px] w-full border border-[#EFEFEF]/86 rounded-[12px] p-[20px]">
              <div className="flex flex-row justify-between items-center w-full">
                {/* Avatar + Details */}
                <div className="flex flex-row items-center gap-[5px]">
                  <div className="w-[43px] h-[43px] rounded-full overflow-hidden shrink-0 bg-[#F8F9FF] border border-neutral-100 relative">
                    <Image src={caregiver.avatar} alt={caregiver.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-[5px] pl-[5px]">
                    <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                      {caregiver.name}
                    </span>
                    <div className="flex flex-row flex-wrap items-center gap-[8px]">
                      <span className="font-poppins font-medium text-[14px] leading-[19px] tracking-[-0.0041em] text-[#121111]">
                        Elderly Care Specialist
                      </span>
                      <div className="flex items-center gap-[2px] border-r border-[#121111] pr-[8px]">
                        <Star className="w-4 h-4 fill-[#FFC107] stroke-none" />
                        <span className="font-rubik font-light text-[14px] text-[#121111] leading-[17px] tracking-[-0.005em]">
                          {caregiver.rating.toFixed(1)} ({caregiver.reviewsCount})
                        </span>
                      </div>
                      <span className="font-rubik font-light text-[14px] text-[#121111] leading-[17px] tracking-[-0.005em]">
                        {caregiver.servicesCount} Services
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-[8px]">
                      <div className="flex items-center gap-[8px] border-r border-black pr-[16px]">
                        <MapPin className="w-[14px] h-[14px] text-[#121111]" />
                        <span className="font-poppins font-medium text-[13px] leading-[18px] tracking-[-0.0041em] text-[#121111] border-b border-[#121111]">
                          San Juan, Texas(TX)
                        </span>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#121111]">
                        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
                        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                      </svg>
                      <span className="font-rubik font-normal text-[15px] text-[#121111] leading-[18px] tracking-[-0.005em]">
                        500 miles
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message button */}
                <button
                  onClick={() => router.push('/chat')}
                  className="w-[43px] h-[43px] bg-[#FEF0E9] hover:bg-[#fde4d5] rounded-full flex items-center justify-center cursor-pointer border-none shrink-0 relative transition"
                >
                  <MessageSquare className="w-5 h-5 text-[#121111] fill-none" />
                  <span className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-[#F36922] rounded-full" />
                </button>
              </div>

              {/* ── Book Service CTA (Only visible if logged in) ── */}
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleBookService}
                  className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[100px] flex items-center justify-center font-poppins font-semibold text-[14px] leading-[120%] capitalize cursor-pointer transition border-none shadow-sm"
                >
                  Book Service
                </button>
              )}
            </div>

            {/* 2. Availability */}
            <div className="flex flex-col gap-[5px] px-[15px] py-[15px] w-full">
              <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111] mb-2">
                Availability
              </span>
              {/* Mon & Tue */}
              <div className="flex flex-row w-full rounded-[12px] overflow-hidden">
                <div className="flex-1 flex flex-col justify-end items-start px-[20px] py-[10px] gap-[5px] border-r border-[#EFEFEF]/86 bg-[#F1F5F9]">
                  <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">Monday</span>
                  <span className="font-poppins font-medium text-[13px] leading-[18px] tracking-[-0.0041em] text-[#121111]">11Am - 05:30Pm</span>
                </div>
                <div className="flex-1 flex flex-col justify-end items-start px-[20px] py-[10px] gap-[5px] bg-[#F1F5F9]">
                  <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">Tuesday</span>
                  <span className="font-poppins font-medium text-[13px] leading-[18px] tracking-[-0.0041em] text-[#121111]">11Am - 06:30Pm</span>
                </div>
              </div>
              {/* Wed & Thu */}
              <div className="flex flex-row w-full rounded-[12px] overflow-hidden">
                <div className="flex-1 flex flex-col justify-end items-start px-[20px] py-[10px] gap-[5px] border-r border-[#EFEFEF]/86 bg-[#F1F5F9]">
                  <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">Wednesday</span>
                  <span className="font-poppins font-medium text-[13px] leading-[18px] tracking-[-0.0041em] text-[#121111]">11Am - 05:30Pm</span>
                </div>
                <div className="flex-1 flex flex-col justify-end items-start px-[20px] py-[10px] gap-[5px] bg-[#F1F5F9]">
                  <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">Thursday</span>
                  <span className="font-poppins font-medium text-[13px] leading-[18px] tracking-[-0.0041em] text-[#121111]">11Am - 06:30Pm</span>
                </div>
              </div>
              {/* Fri */}
              <div className="flex flex-row w-full rounded-[12px] overflow-hidden">
                <div className="w-full flex flex-col justify-end items-start px-[20px] py-[10px] gap-[5px] bg-[#F1F5F9]">
                  <span className="font-rubik font-normal text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">Friday</span>
                  <span className="font-poppins font-medium text-[13px] leading-[18px] tracking-[-0.0041em] text-[#121111]">11Am - 05:30Pm</span>
                </div>
              </div>
            </div>

            {/* 3. Customer Reviews */}
            <div className="flex flex-col gap-[14px] px-[15px] pb-[15px] w-full">
              {/* Header */}
              <div className="flex flex-col gap-[5px]">
                <span className="font-poppins font-medium text-[14px] leading-[22px] capitalize text-[#121111]">
                  customers reviews
                </span>
                <div className="flex flex-row items-center gap-[8px]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-[15px] h-[15px] ${s <= 4 ? 'fill-[#FFC107] stroke-none' : 'fill-white stroke-[#FFC107]'}`} />
                  ))}
                  <span className="font-poppins font-normal text-[14px] leading-[19px] capitalize text-[#121111]">(4)</span>
                  <span className="font-poppins font-normal text-[14px] leading-[19px] capitalize text-[#3D3D3D]">24</span>
                </div>
              </div>

              {/* Rating bars */}
              <div className="flex flex-col gap-[10px] w-full">
                {RATING_BARS.map((bar) => (
                  <div key={bar.label} className="flex flex-row justify-between items-center w-full gap-[10px]">
                    <div className="flex flex-row items-center gap-[10px] flex-1">
                      <span className="font-poppins font-normal text-[12px] leading-[16px] text-[#121111] whitespace-nowrap w-[40px]">
                        {bar.label}
                      </span>
                      <div className="flex-1 h-[6px] bg-white rounded-[200px] overflow-hidden">
                        <div className="h-full bg-[#FFC107] rounded-[200px]" style={{ width: `${bar.percent}%` }} />
                      </div>
                    </div>
                    <span className="font-poppins font-normal text-[12px] leading-[16px] text-[#121111] w-[12px] text-right">
                      {bar.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Review cards */}
              <div className="flex flex-col gap-[12px] w-full mt-2">
                {REVIEWS.map((rev, idx) => (
                  <div key={idx} className="w-full bg-[#F1F5F9] rounded-[4px] p-[16px_9px_12px_12px] flex flex-col gap-[13px]">
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex flex-row items-center gap-[6px]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-[16px] h-[15.2px] ${s <= rev.stars ? 'fill-[#FFC107] stroke-none' : 'fill-[#F8F9FF] stroke-none'}`} />
                        ))}
                      </div>
                      <span className="font-poppins font-normal text-[11px] leading-[15px] capitalize text-[#3D3D3D]">{rev.date}</span>
                    </div>
                    <p className="font-poppins font-normal text-[14px] leading-[19px] tracking-[-0.18px] text-[#121111]">{rev.text}</p>
                    <div className="flex flex-row items-center gap-[10px]">
                      <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0 bg-[#F8F9FF] border border-neutral-100 relative">
                        <Image src={rev.avatar} alt={rev.reviewer} fill className="object-cover" />
                      </div>
                      <span className="font-poppins font-medium text-[12px] leading-[16px] tracking-[-0.408px] capitalize text-[#121111]">{rev.reviewer}</span>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setIsReviewsOpen(true)}
                  className="w-[150px] h-[44px] border border-[#E3E3E3] hover:bg-neutral-50 transition rounded-[10px] font-poppins font-normal text-[16px] text-[#121111] leading-[24px] cursor-pointer outline-none flex items-center justify-center mt-2"
                >
                  Load More
                </button>
              </div>
            </div>

          </div>
          {/* ── END RIGHT SIDEBAR ── */}

        </div>
      </div>

      {/* Reviews Dialog */}
      <Dialog open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
        <DialogContent className="w-full h-[90%] sm:max-w-[600px] p-0 bg-white border-none shadow-xl rounded-xl overflow-y-scroll no-scrollbar [&>button]:hidden">
          <div className="sr-only">
            <DialogTitle>Rating and Reviews</DialogTitle>
            <DialogDescription>Full rating breakdown and list of all caregiver reviews</DialogDescription>
          </div>
          <div className="flex flex-col items-start w-full bg-white relative">
            <div className="flex flex-row justify-between items-center py-[15px] px-[30px] w-full h-[70px] border-b border-[#EFEFEF]/86">
              <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] tracking-[-0.005em]">Rating and Reviews</span>
              <button type="button" onClick={() => setIsReviewsOpen(false)} className="w-[40px] h-[40px] bg-[#F8F9FF] hover:bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer border-none transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#121111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-[30px] py-[15px] px-[30px] w-full">
              <div className="flex flex-col gap-[5px] w-[122px]">
                <div className="flex flex-row items-center gap-[8px] h-[64px]">
                  <span className="font-rubik font-medium text-[54px] leading-[64px] tracking-[-0.05em] text-[#121111]">{caregiver.rating.toFixed(1)}</span>
                  <Star className="w-[30px] h-[30px] fill-[#FFC107] stroke-none shrink-0" />
                </div>
                <span className="font-rubik font-light text-[16px] text-[#121111] leading-[19px] capitalize">419 Reviews</span>
              </div>
              <div className="flex flex-col gap-[15px] w-full">
                {RATING_BARS.map((bar) => (
                  <div key={bar.label} className="flex flex-row items-center gap-[8px] w-full">
                    <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.05em] w-[50px]">{bar.label}</span>
                    <div className="flex-1 h-[10px] bg-[#F7F7F7] rounded-[10px] overflow-hidden">
                      <div className="h-full bg-[#FFC107] rounded-[10px]" style={{ width: `${bar.percent}%` }} />
                    </div>
                    <span className="font-rubik font-normal text-[14px] text-[#121111] w-[20px] text-right">{bar.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[20px] w-full">
                <span className="font-rubik font-medium text-[18px] text-[#121111] leading-[21px] opacity-80 uppercase">Reviews</span>
                {[
                  { stars: 5, author: 'Anonymous - 4 days ago', text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin.' },
                  { stars: 5, author: 'Anonymous - 4 days ago', text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin.' },
                  { stars: 5, author: 'Anonymous - 4 days ago', text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin.' },
                  { stars: 5, author: 'Anonymous - 4 days ago', text: 'Lorem ipsum dolor sit amet consectetur. Sed consequat suspendisse diamnibh habitant urna purus sollicitudin.' },
                ].map((mRev, idx) => (
                  <div key={idx} className="flex flex-col gap-[15px] w-full border-b border-[#E3E3E3] pb-[20px] last:border-b-0">
                    <div className="flex flex-row items-center gap-[5px]">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-[24px] h-[24px] fill-[#FFC107] stroke-none shrink-0" />)}
                    </div>
                    <span className="font-rubik font-medium text-[15px] text-[#121111] leading-[18px]">{mRev.author}</span>
                    <p className="font-rubik font-light text-[14px] text-[#121111] leading-[25px] text-left">{mRev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Carousel Preview Modal */}
      <ImageCarouselModal
        isOpen={isCarouselModalOpen}
        onClose={() => setIsCarouselModalOpen(false)}
        images={CAROUSEL_IMAGES}
        initialIndex={selectedThumb}
      />
    </div>
  );
}
