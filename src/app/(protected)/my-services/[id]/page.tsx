'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronRight,
  ArrowLeft,
  ChevronLeft,
  Edit,
  Copy,
  Star,
  Check,
} from 'lucide-react';

export default function MyServiceDetailPage() {
  const router = useRouter();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = [
    '/images/home/search.webp',
    '/images/home/search.webp',
    '/images/home/search.webp',
  ];

  // Embla Carousel Integration
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveImgIdx(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center">
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] pb-[80px] flex flex-col gap-[24px] items-center">
        {/* Top Share Service Banner */}
        <div className="w-full max-w-[1280px] bg-[#ECF0FF] border border-[#D0E2FF] rounded-[12px] p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">

            <Image src={"/giver/ser.webp"} alt="services" width={100} height={100} />
            <div className="flex flex-col gap-4 ml-8">
              <h3 className="font-rubik font-medium text-[20px] text-[#121111]">
                Share your service to other to bring in more clients.
              </h3>
              <p className="font-rubik font-light text-[13px] text-[#565656]">
                Share your service with others via link sharing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="h-[40px] px-4 bg-white border border-[#E4E4E7] hover:bg-neutral-50 rounded-[8px] font-rubik font-medium text-[14px] text-[#121111] flex items-center gap-2 transition cursor-pointer shrink-0 shadow-xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#121111]" />
                <span>Copy Service Link</span>
              </>
            )}
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-[1280px] flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[24px] h-[24px] flex items-center justify-center text-[#121111] hover:opacity-80 transition cursor-pointer border-none bg-transparent mr-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Link href="/" className="hover:text-[#F36922] transition text-[#3D3D3D]">
            Home
          </Link>
          <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
          <span className="font-normal text-[#121111]">My Services Details</span>
        </div>

        {/* Service Header Row */}
        <div className="w-full max-w-[1280px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="font-rubik font-semibold text-[22px] sm:text-[24px] leading-tight tracking-[-0.408px] text-[#121111] max-w-[800px]">
            Professional Home Cleaning Services Making Your Home Sparkle
          </h1>

          <Link
            href="/create-job?edit=1"
            className="h-[40px] px-4 bg-white border border-[#E4E4E7] hover:bg-neutral-50 rounded-[8px] font-rubik font-medium text-[14px] text-[#0A0A6E] flex items-center gap-2 transition cursor-pointer shrink-0 shadow-xs border-none"
          >
            <Edit className="w-4 h-4 text-[#0A0A6E]" />
            <span>Edit your Service</span>
          </Link>
        </div>

        {/* Caregiver Info */}
        <div className="w-full max-w-[1280px] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full relative overflow-hidden bg-neutral-200 shrink-0">
            <Image
              src="/images/avatar.webp"
              alt="Nandi Bolard"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-rubik font-medium text-[15px] text-[#121111]">
              Nandi Bolard
            </span>
            <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
              <Star className="w-3.5 h-3.5 fill-[#F36922] text-[#F36922]" />
              <span className="font-semibold text-[#121111]">5.0 (48)</span>
              <span>| 98 Services</span>
            </div>
          </div>
        </div>

        {/* 2-Column Section */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Left Content: Embla Gallery Carousel & Description */}
          <div className="lg:col-span-2 flex flex-col gap-6 w-full">
            {/* Embla Carousel Main Viewport */}
            <div className="w-full h-[360px] sm:h-[500px] rounded-[16px] relative overflow-hidden bg-white shadow-xs border border-[#E4E4E7] group">
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex-[0_0_100%] min-w-0 h-full relative"
                    >
                      <Image
                        src={img}
                        alt={`Service Image ${idx + 1}`}
                        fill
                        className="object-contain"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-[#121111] rounded-full flex items-center justify-center transition cursor-pointer shadow-md border-none z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-[#121111] rounded-full flex items-center justify-center transition cursor-pointer shadow-md border-none z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Row linked with Embla Carousel */}
            <div className="flex items-center gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`w-[110px] h-[70px] bg-white rounded-[10px] relative overflow-hidden cursor-pointer transition border-2 ${activeImgIdx === idx
                    ? 'border-[#F36922] opacity-100'
                    : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>

            {/* Description Section */}
            <div className="w-full flex flex-col gap-3 pt-4">
              <h2 className="font-rubik font-semibold text-[18px] text-[#121111]">
                Description
              </h2>
              <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                Grasping the importance of your cleaning service title is essential for
              </h3>
              <p className="font-rubik font-light text-[14px] leading-[22px] text-[#121111]/80">
                Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it's residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.
              </p>
              <p className="font-rubik font-light text-[14px] leading-[22px] text-[#121111]/80">
                Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it's residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.
              </p>
            </div>
          </div>

          {/* Right Sidebar Cards */}
          <div className="flex flex-col gap-4 w-full">
            {/* Card 1: Price */}
            <div className="w-full bg-white border border-[#E4E4E7] rounded-[12px] p-5 flex items-center justify-between shadow-xs">
              <span className="font-rubik font-bold text-[24px] text-[#121111]">
                $10 <span className="text-[14px] font-normal text-gray-500">/Hr</span>
              </span>
              <span className="font-rubik font-normal text-[14px] text-[#565656]">
                Price
              </span>
            </div>

            {/* Card 2: Availability */}
            <div className="w-full bg-white border border-[#E4E4E7] rounded-[12px] p-5 flex flex-col gap-3 shadow-xs">
              <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                Availability
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div
                    key={day}
                    className="bg-[#ECF0FF] rounded-[8px] p-2.5 flex flex-col"
                  >
                    <span className="font-rubik font-medium text-[13px] text-[#121111]">
                      {day}
                    </span>
                    <span className="font-rubik font-light text-[12px] text-[#565656]">
                      11Am- 05:30pm
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Reviews */}
            <div className="w-full bg-white border border-[#E4E4E7] rounded-[12px] p-5 flex flex-col gap-2 shadow-xs">
              <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                Reviews
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-rubik font-bold text-[24px] text-[#121111]">
                  0.0
                </span>
                <Star className="w-5 h-5 fill-[#F36922] text-[#F36922]" />
              </div>
              <span className="font-rubik font-light text-[13px] text-[#565656]">
                0 Reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
