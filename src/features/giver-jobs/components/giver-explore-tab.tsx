'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import {
  MapPin,
  Navigation,
  Clock,
  Calendar,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  BadgeDollarSign,
} from 'lucide-react';

export interface CareRequestItem {
  id: string;
  seekerId: string;
  seekerName: string;
  seekerAvatar: string;
  location: string;
  distance: string;
  price: string;
  time: string;
  date: string;
  title: string;
  category: string;
  description: string;
  featured?: boolean;
}

export const MOCK_CARE_REQUESTS: CareRequestItem[] = [
  {
    id: 'req-1',
    seekerId: 'john-doe-1',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '14 miles away',
    price: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
    description:
      'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.....',
    featured: true,
  },
  {
    id: 'req-2',
    seekerId: 'john-doe-2',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '14 miles away',
    price: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
    description:
      'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.....',
    featured: true,
  },
  {
    id: 'req-3',
    seekerId: 'john-doe-3',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '14 miles away',
    price: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
    description:
      'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.....',
    featured: true,
  },
  {
    id: 'req-4',
    seekerId: 'john-doe-4',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '14 miles away',
    price: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
    description:
      'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.....',
    featured: false,
  },
  {
    id: 'req-5',
    seekerId: 'john-doe-5',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '14 miles away',
    price: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
    description:
      'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.....',
    featured: false,
  },
  {
    id: 'req-6',
    seekerId: 'john-doe-6',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    location: 'San Juan, Texas(TX)',
    distance: '14 miles away',
    price: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    title: 'Get Senior Care',
    category: 'Errands & Shopping',
    description:
      'Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy.....',
    featured: false,
  },
];

interface GiverExploreTabProps {
  careRequests?: CareRequestItem[];
  searchQuery?: string;
  onOpenChat?: (seekerId: string) => void;
  onViewDetails?: (jobId: string) => void;
}

export function GiverExploreTab({
  careRequests = MOCK_CARE_REQUESTS,
  searchQuery = '',
  onOpenChat,
  onViewDetails,
}: GiverExploreTabProps) {
  const router = useRouter();

  // Embla Carousel Hook
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const filteredRequests = careRequests.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.seekerName.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const recommendedList =
    filteredRequests.filter((item) => item.featured).length > 0
      ? filteredRequests.filter((item) => item.featured)
      : filteredRequests.slice(0, 4);

  const handleOpenChat = (seekerId: string) => {
    if (onOpenChat) {
      onOpenChat(seekerId);
    } else {
      router.push('/chat');
    }
  };

  const handleViewDetails = (jobId: string) => {
    if (onViewDetails) {
      onViewDetails(jobId);
    } else {
      router.push(`/freelance-jobs/${jobId}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 items-start pb-8">
      {/* Top Information Banner */}
      <div className="flex items-center gap-2 font-rubik font-medium text-[16px] text-[#121111]">
        <Info className="w-6 h-6 text-[#121111]/70 shrink-0" />
        <span>Browse and search care requests from careseekers.</span>
      </div>

      {/* Section 1: Recommended Care Requests Carousel (Frame 2147228947) */}
      <div className="w-full flex flex-col items-start gap-[9px]">
        {/* Section Title */}
        <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
          Recommended Care Requests
        </h3>

        {/* Carousel Viewport Container */}
        <div className="relative w-full group">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous recommended requests"
            className={`absolute -left-4 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full shadow-[2px_2px_50px_rgba(0,0,0,0.1)] flex items-center justify-center transition z-20 border border-neutral-100 cursor-pointer hidden sm:flex ${
              !canScrollPrev ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-50 hover:scale-105'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-[#121111]" />
          </button>

          {/* Embla Viewport (Frame 2147227317) */}
          <div className="overflow-hidden w-full py-2" ref={emblaRef}>
            <div className="flex gap-5">
              {recommendedList.map((item) => (
                <div
                  key={`rec-${item.id}`}
                  className="flex-[0_0_100%] sm:flex-[0_0_480px] lg:flex-[0_0_528px] min-w-0"
                >
                  <CareRequestCard
                    item={item}
                    onOpenChat={() => handleOpenChat(item.seekerId)}
                    onViewDetails={() => handleViewDetails(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next recommended requests"
            className={`absolute -right-4 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full shadow-[2px_2px_50px_rgba(0,0,0,0.1)] flex items-center justify-center transition z-20 border border-neutral-100 cursor-pointer hidden sm:flex ${
              !canScrollNext ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-50 hover:scale-105'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-[#121111]" />
          </button>
        </div>
      </div>

      {/* Section 2: All Care Requests */}
      <div className="w-full flex flex-col gap-4 mt-2">
        <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
          All Care Requests
        </h3>

        {filteredRequests.length > 0 ? (
          <div className="flex flex-wrap gap-4 w-full">
            {filteredRequests.map((item) => (
              <CareRequestCard
                key={item.id}
                item={item}
                onOpenChat={() => handleOpenChat(item.seekerId)}
                onViewDetails={() => handleViewDetails(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white border border-[#EFEFEF] rounded-[12px] p-12 text-center flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">🔍</span>
            <h4 className="font-rubik font-medium text-[18px] text-[#121111]">
              No care requests found
            </h4>
            <p className="font-rubik font-light text-[14px] text-gray-500">
              Try adjusting your search criteria or checking back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface CareRequestCardProps {
  item: CareRequestItem;
  onOpenChat: () => void;
  onViewDetails: () => void;
}

export function CareRequestCard({
  item,
  onOpenChat,
  onViewDetails,
}: CareRequestCardProps) {
  return (
    <div className="w-full max-w-[528px] h-full min-h-[265px] bg-white border-b border-[#EFEFEF]/86 rounded-[12px] p-[15px]  flex flex-col justify-between gap-3 box-border">
      {/* Top Row: Seeker Avatar, Info, Pricing & Schedule (Frame 2147227592) */}
      <div className="flex flex-row justify-between items-start w-full">
        {/* Left Side: Avatar + Seeker Info (Frame 2147227483) */}
        <div className="flex flex-row items-center gap-3">
          <div className="w-[77px] h-[77px] rounded-[16px] overflow-hidden relative bg-[#F8F9FF] shrink-0 border border-neutral-100">
            <Image
              src={item.seekerAvatar}
              alt={item.seekerName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
              {item.seekerName}
            </span>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#121111]">
              <MapPin className="w-3.5 h-3.5 text-[#121111] shrink-0" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-[#121111] font-rubik">
              <Navigation className="w-3.5 h-3.5 text-[#181818] shrink-0" />
              <span>{item.distance}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Rate + Time & Date (Frame 2147228940) */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[#181818]">
            <BadgeDollarSign className="w-4 h-4 text-[#181818] shrink-0" />
            <span className="font-sans font-semibold text-[20px] leading-[27px] text-[#181818]">
              {item.price}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[14px] font-medium text-[#181818]">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{item.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#181818] shrink-0" />
              <span>{item.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider (Line 508) */}
      <div className="w-full h-px bg-[#0A0A6E]/20" />

      {/* Middle Row: Title, Subtitle, Featured Badge & Description (Frame 2147227534 / Frame 2147227533) */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-0.5">
            <h4 className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
              {item.title}
            </h4>
            <span className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#434343]">
              {item.category}
            </span>
          </div>

          {/* Featured Badge (Frame 2147227316) */}
          {item.featured && (
            <div className="h-[32px] px-3.5 bg-[#0A0A6E] border border-[#0A0A6E] rounded-[8px] flex items-center justify-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
              <span className="font-rubik font-normal text-[14px] leading-[17px] text-[#F8F8FF]">
                Featured
              </span>
            </div>
          )}
        </div>

        <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111] line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Bottom Action Row (Frame 2147227593) */}
      <div className="flex justify-end items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={onOpenChat}
          className="h-[32px] px-3.5 bg-[#F36922] hover:bg-[#e05813] text-white rounded-[100px] font-rubik font-medium text-[13px] leading-[18px] transition cursor-pointer flex items-center justify-center border-none shadow-xs"
        >
          Open Chat
        </button>
        <button
          type="button"
          onClick={onViewDetails}
          className="h-[32px] px-3.5 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-[100px] font-rubik font-medium text-[13px] leading-[18px] transition cursor-pointer flex items-center justify-center gap-1.5 border-none shadow-xs"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
}
