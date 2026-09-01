'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronRight,
  ArrowLeft,
  ChevronLeft,
  Pencil,
  Link as LinkIcon,
  Star,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { ActiveToggleBox } from '@/components/common/active-toggle-box';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function MyServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = (params?.id as string) || '1';

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(false);

  const images = [
    '/images/home/search.webp',
    '/images/home/find.webp',
    '/images/home/find.webp',
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
      toast.success('Service link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-24">
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-8 flex flex-col gap-6 items-center">
        
        {/* Top Share Service Banner */}
        <div className="w-full max-w-[1280px] bg-[#ECF3FF] border border-[#D0E2FF] rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24  rounded-xl flex items-center justify-center shrink-0 ">
              <Image
                src="/giver/ser.webp"
                alt="Texas Caregiver"
                width={336}
                height={336}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-rubik font-semibold text-[16px] sm:text-[18px] text-[#121111]">
                Share your service to other to bring in more clients.
              </h3>
              <p className="font-rubik font-normal text-[13px] text-[#565656]">
                Share your service with others via link sharing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="h-[42px] px-5 bg-white border border-[#EFEFEF] hover:bg-neutral-50 rounded-[10px] font-rubik font-medium text-[14px] text-[#121111] flex items-center gap-2 transition cursor-pointer shrink-0 shadow-xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4 text-[#565656]" />
                <span>Copy Service Link</span>
              </>
            )}
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-[1280px] flex items-center gap-2 font-rubik text-[15px] text-[#565656]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[36px] h-[36px] bg-white text-[#121111] border border-[#EFEFEF] rounded-full flex items-center justify-center hover:bg-neutral-50 transition cursor-pointer shadow-xs mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <Link href="/" className="hover:text-[#F36922] transition text-[#565656]">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-[#727272]" />
          <Link href="/my-services" className="hover:text-[#F36922] transition text-[#565656]">
            My Services
          </Link>
          <ChevronRight className="w-4 h-4 text-[#727272]" />
          <span className="font-medium text-[#121111]">My Services Details</span>
        </div>

        {/* Service Header Row */}
        <div className="w-full max-w-[1280px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="font-rubik font-semibold text-[22px] sm:text-[26px] leading-tight tracking-[-0.408px] text-[#121111] max-w-[850px]">
            Professional Home Cleaning Services Making Your Home Sparkle
          </h1>

          <Link
            href={`/create-job?edit=${serviceId}`}
            className="h-[42px] px-5 bg-white border border-[#EFEFEF] hover:bg-neutral-50 rounded-[10px] font-rubik font-medium text-[14px] text-[#0A0A6E] flex items-center gap-2 transition cursor-pointer shrink-0 shadow-xs"
          >
            <Pencil className="w-4 h-4 text-[#0A0A6E]" />
            <span>Edit your Service</span>
          </Link>
        </div>

        {/* Caregiver Info & Active Switch */}
        <div className="w-full max-w-[1280px] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full relative overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100 shadow-xs">
              <Image
                src="/images/avatar.webp"
                alt="Nandi Bolard"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-rubik font-semibold text-[15px] text-[#121111]">
                Nandi Bolard
              </span>
              <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                <Star className="w-3.5 h-3.5 fill-[#F36922] text-[#F36922]" />
                <span className="font-semibold text-[#121111]">5.0 (48)</span>
                <span>| 98 Services</span>
              </div>
            </div>
          </div>

          <ActiveToggleBox
            isActive={isActive}
            onToggle={(checked) => {
              setPendingStatus(checked);
              setShowStatusDialog(true);
            }}
          />
        </div>

        {/* 2-Column Section */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Gallery Carousel & Description */}
          <div className="lg:col-span-2 flex flex-col gap-6 w-full">
            
            {/* Main Image Slider Viewport */}
            <div className="w-full h-[360px] sm:h-[460px] rounded-[18px] relative overflow-hidden bg-white shadow-sm border border-[#EFEFEF] group">
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
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Floating Arrows */}
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/95 hover:bg-white text-[#121111] rounded-full flex items-center justify-center transition cursor-pointer shadow-md border-none z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/95 hover:bg-white text-[#121111] rounded-full flex items-center justify-center transition cursor-pointer shadow-md border-none z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollPrev}
                className="w-8 h-8 rounded-full bg-white border border-[#EFEFEF] flex items-center justify-center text-[#565656] hover:bg-neutral-50 transition cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`w-[110px] h-[75px] rounded-[12px] relative overflow-hidden cursor-pointer transition border-2 ${
                    activeImgIdx === idx
                      ? 'border-[#F36922] opacity-100 shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}

              <button
                type="button"
                onClick={scrollNext}
                className="w-8 h-8 rounded-full bg-white border border-[#EFEFEF] flex items-center justify-center text-[#565656] hover:bg-neutral-50 transition cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Description Section */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <h2 className="font-rubik font-semibold text-[18px] text-[#121111]">
                Description
              </h2>
              <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                Grasping the importance of your cleaning service title is essential for
              </h3>
              <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
                Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it&apos;s residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.
              </p>
              <p className="font-rubik font-normal text-[14px] leading-[22px] text-[#565656]">
                Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it&apos;s residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.
              </p>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar Cards */}
          <div className="flex flex-col gap-5 w-full">
            
            {/* Card 1: Price & Availability Combined */}
            <div className="w-full bg-white border border-[#EFEFEF] rounded-[20px] p-6 flex flex-col gap-5 shadow-sm">
              
              {/* Price Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F5]">
                <div className="flex items-baseline gap-1">
                  <span className="font-rubik font-bold text-[28px] text-[#121111]">$10</span>
                  <span className="font-rubik font-normal text-[14px] text-[#565656]">/Hr</span>
                </div>
                <span className="font-rubik font-medium text-[14px] text-[#565656]">
                  Price
                </span>
              </div>

              {/* Availability Sub-section */}
              <div className="flex flex-col gap-3">
                <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                  Availability
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#ECF1FC] rounded-[10px] p-3 flex flex-col">
                    <span className="font-rubik font-medium text-[13px] text-[#121111]">
                      Monday
                    </span>
                    <span className="font-rubik font-normal text-[12px] text-[#565656] mt-0.5">
                      11Am- 05:30pm
                    </span>
                  </div>

                  <div className="bg-[#ECF1FC] rounded-[10px] p-3 flex flex-col">
                    <span className="font-rubik font-medium text-[13px] text-[#121111]">
                      Tuesday
                    </span>
                    <span className="font-rubik font-normal text-[12px] text-[#565656] mt-0.5">
                      11Am- 05:30pm
                    </span>
                  </div>

                  <div className="bg-[#ECF1FC] rounded-[10px] p-3 flex flex-col">
                    <span className="font-rubik font-medium text-[13px] text-[#121111]">
                      Wednesday
                    </span>
                    <span className="font-rubik font-normal text-[12px] text-[#565656] mt-0.5">
                      11Am- 06:30pm
                    </span>
                  </div>

                  <div className="bg-[#ECF1FC] rounded-[10px] p-3 flex flex-col">
                    <span className="font-rubik font-medium text-[13px] text-[#121111]">
                      Thursday
                    </span>
                    <span className="font-rubik font-normal text-[12px] text-[#565656] mt-0.5">
                      11Am- 06:30pm
                    </span>
                  </div>

                  <div className="bg-[#ECF1FC] rounded-[10px] p-3 flex flex-col col-span-2">
                    <span className="font-rubik font-medium text-[13px] text-[#121111]">
                      Friday
                    </span>
                    <span className="font-rubik font-normal text-[12px] text-[#565656] mt-0.5">
                      11Am- 05:30pm
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 2: Reviews */}
            <div className="w-full bg-white border border-[#EFEFEF] rounded-[20px] p-6 flex flex-col gap-2 shadow-sm">
              <h3 className="font-rubik font-semibold text-[15px] text-[#121111]">
                Reviews
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-rubik font-bold text-[28px] text-[#121111]">
                  0.0
                </span>
                <Star className="w-5 h-5 fill-[#F36922] text-[#F36922]" />
              </div>
              <span className="font-rubik font-normal text-[13px] text-[#565656]">
                0 Reviews
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Dialog for Active / Inactive Toggle (Shadcn Dialog) */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent
          showCloseButton={false}
          className="w-[400px] max-w-[92vw] bg-white rounded-[24px] p-6 sm:p-7 flex flex-col items-center text-center shadow-xl border border-[#EFEFEF] outline-none select-none"
        >
          {/* Status Badge Icon */}
          <div
            className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 ${
              pendingStatus
                ? 'bg-[#E6F4EA] text-[#046C4E]'
                : 'bg-[#FEF0E9] text-[#F36922]'
            }`}
          >
            {pendingStatus ? (
              <Check className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
            )}
          </div>

          {/* Title */}
          <DialogTitle className="font-rubik font-bold text-[22px] leading-[28px] text-[#121111]">
            {pendingStatus ? 'Activate Service?' : 'Deactivate Service?'}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="font-rubik font-normal text-[14px] leading-[21px] text-[#565656] max-w-[310px] mt-2 mb-6">
            {pendingStatus
              ? 'Are you sure you want to set this service to Active? It will become visible to care seekers.'
              : 'Are you sure you want to set this service to Inactive? It will no longer appear in search results.'}
          </DialogDescription>

          {/* Action Buttons: Cancel & Confirm */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setShowStatusDialog(false)}
              className="flex-1 h-[46px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                setIsActive(pendingStatus);
                setShowStatusDialog(false);
                toast.success(`Service status updated to ${pendingStatus ? 'Active' : 'Inactive'}`);
              }}
              className={`flex-1 h-[46px] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-xs flex items-center justify-center ${
                pendingStatus
                  ? 'bg-[#046C4E] hover:bg-[#03553d]'
                  : 'bg-[#F36922] hover:bg-[#e05813]'
              }`}
            >
              {pendingStatus ? 'Activate' : 'Deactivate'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
