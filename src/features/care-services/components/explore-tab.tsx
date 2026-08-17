'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Locate } from 'lucide-react';
import { ImageCarouselModal } from './image-carousel-modal';

interface ServiceItem {
  id: string;
  caregiverId: string;
  caregiverName: string;
  caregiverAvatar: string;
  caregiverRating: number;
  caregiverReviews: number;
  caregiverServices: number;
  location: string;
  distance: string;
  featured: boolean;
  serviceTitle: string;
  serviceDescription: string;
  serviceImage: string;
  price: string;
  category: string;
}

interface ExploreTabProps {
  filteredServices: ServiceItem[];
}

export function ExploreTab({ filteredServices }: ExploreTabProps) {
  const router = useRouter();
  const [carouselState, setCarouselState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0,
  });

  return (
    <div className="w-full h-full overflow-y-auto pr-2 pb-8 scrollbar-thin">
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full max-w-[1280px] mx-auto">
          {filteredServices.map((svc) => {
            const cardImages = [svc.serviceImage, svc.caregiverAvatar].filter(Boolean);

            return (
              <div
                key={svc.id}
                className="bg-white border-b border-[#EFEFEF]/86 p-[15px] rounded-[12px] shadow-[2px_2px_50px_rgba(0,0,0,0.1)] flex flex-col gap-[20px] w-full"
              >
                {/* Top Row: Avatar and Caregiver info */}
                <div className="flex flex-row justify-between items-start w-full">
                  <div className="flex flex-row items-start gap-[12px]">
                    {/* Caregiver Avatar */}
                    <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                      <Image
                        src={svc.caregiverAvatar}
                        alt={svc.caregiverName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Metadata stack */}
                    <div className="flex flex-col items-start gap-[5px]">
                      <span className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                        {svc.caregiverName}
                      </span>
                      {/* Rating and count row */}
                      <div className="flex flex-row items-center gap-[8px] flex-wrap text-[#121111] text-[14px]">
                        {/* Rating */}
                        <div className="flex items-center gap-[2px] border-r border-[#121111] pr-2 leading-[17px]">
                          <Star className="w-[16px] h-[16px] fill-[#FFC107] stroke-none" />
                          <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em]">
                            {svc.caregiverRating.toFixed(1)} ({svc.caregiverReviews})
                          </span>
                        </div>
                        {/* Services */}
                        <span className="font-rubik font-light pr-2 leading-[17px] tracking-[-0.005em]">
                          {svc.caregiverServices} Services
                        </span>
                      </div>
                      {/* Location */}
                      <div className="flex items-center gap-1 mt-0.5 text-[#121111] text-[13px] font-medium leading-[18px] tracking-[-0.0041em]">
                        <MapPin className="w-[14px] h-[14px] shrink-0" />
                        <span className="font-sans border-b border-[#121111] pb-px">
                          {svc.location}
                        </span>
                        <Locate className="w-4 h-4 ml-1 shrink-0 text-[#121111]/80" />
                        <span className="font-rubik font-normal text-[15px] text-[#121111]/70 ml-0.5">
                          | {svc.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {svc.featured && (
                    <div className="box-sizing-border-box flex flex-row justify-center items-center py-1 px-[15px] gap-[3px] w-[90px] h-[32px] bg-[#F36922]/20 border border-[0.5px] border-[#F36922] rounded-[8px] shrink-0">
                      <Star className="w-4 h-4 fill-[#F36922] text-[#F36922] stroke-none" />
                      <span className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#F36922]">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Middle Row: Service Image & Description */}
                <div className="flex flex-row items-center gap-[15px] w-full">
                  {/* Service Image */}
                  <div
                    onClick={() =>
                      setCarouselState({
                        isOpen: true,
                        images: [svc.serviceImage],
                        index: 0,
                      })
                    }
                    className="w-[130px] h-[86px] rounded-[8px] overflow-hidden shrink-0 relative bg-neutral-100 border border-neutral-100 cursor-pointer hover:opacity-90 transition group"
                  >
                    <Image
                      src={svc.serviceImage}
                      alt={svc.serviceTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-200"
                    />
                  </div>

                  {/* Info details */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h4 className="font-rubik font-medium text-[16px] text-[#121111] leading-[19px] tracking-[-0.005em]">
                      {svc.serviceTitle}
                    </h4>
                    <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111] text-left">
                      {svc.serviceDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Price & View CTA */}
                <div className="flex flex-row justify-between items-center w-full">
                  {/* Price stack */}
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

                  {/* View Service Button */}
                  <button
                    type="button"
                    onClick={() => router.push(`/leaderboard/${svc.caregiverId}`)}
                    className="h-[32px] px-[19px] border border-[#E4E4E7] hover:bg-neutral-50 rounded-[100px] font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] cursor-pointer transition outline-none flex items-center justify-center"
                  >
                    View Service
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/50 rounded-2xl border border-dashed border-[#F36922]/20 w-full max-w-[1080px] mx-auto">
          <span className="text-[48px] mb-2">🔍</span>
          <h3 className="font-rubik font-semibold text-[20px] text-[#0A0A6E]">No services matched</h3>
          <p className="font-rubik font-light text-[14px] text-neutral-500 max-w-sm mt-1">
            Try adjusting your search queries or clearing filters to see all available caregiver services.
          </p>
        </div>
      )}

      {/* Image Carousel Modal */}
      <ImageCarouselModal
        isOpen={carouselState.isOpen}
        onClose={() => setCarouselState((prev) => ({ ...prev, isOpen: false }))}
        images={carouselState.images}
        initialIndex={carouselState.index}
      />
    </div>
  );
}
