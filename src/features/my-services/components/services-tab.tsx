'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, Link as LinkIcon } from 'lucide-react';
import { ActiveToggleBox } from '@/components/common/active-toggle-box';
import { toast } from 'sonner';
import { ServiceItem, ServicesSubTab } from '../types/my-services.types';

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Get Cleaning Services',
    isFeatured: true,
    image: '/images/home/search.webp',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
    priceHourly: 10,
    isActive: true,
  },
  {
    id: '2',
    title: 'Window Cleaning Service',
    isFeatured: false,
    image: '/images/home/find.webp',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
    priceHourly: 10,
    isActive: true,
  },
  {
    id: '3',
    title: 'Window Cleaning Service',
    isFeatured: false,
    image: '/images/home/find.webp',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
    priceHourly: 10,
    isActive: true,
  },
];

interface ServicesTabProps {
  subTab: ServicesSubTab;
  onSubTabChange: (subTab: ServicesSubTab) => void;
  searchQuery?: string;
}

export function ServicesTab({
  subTab,
  onSubTabChange,
  searchQuery = '',
}: ServicesTabProps) {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const toggleServiceStatus = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = !s.isActive;
          toast.success(`Service status updated to ${updated ? 'Active' : 'Inactive'}`);
          return { ...s, isActive: updated };
        }
        return s;
      })
    );
  };

  const handleCopyLink = (id: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/my-services/${id}` : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success('Service link copied to clipboard!');
    }
  };

  const filteredServices = services
    .filter((s) => (subTab === 'active' ? s.isActive : !s.isActive))
    .filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Info Banner */}
      <div className="flex items-center gap-2 font-rubik font-semibold text-[15px] leading-[20px] text-[#121111]">
        <Info className="w-4 h-4 text-[#121111] shrink-0" />
        <span>Manage the services you offer and control their availability.</span>
      </div>

      {/* Sub-Tab Switcher (Active / Inactive) */}
      <div className="flex items-center gap-3.5 mt-1">
        <button
          type="button"
          onClick={() => onSubTabChange('active')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none shadow-xs ${
            subTab === 'active'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange('inactive')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none shadow-xs ${
            subTab === 'inactive'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Inactive
        </button>
      </div>

      {/* Service Cards List (Matches Exact Figma CSS and Screenshot) */}
      <div className="flex flex-col gap-4 w-full mt-2">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-[12px] p-[15px] border-b border-[#EFEFEF]/86 shadow-[2px_2px_50px_rgba(0,0,0,0.1)] flex flex-col gap-3 w-full transition-all"
            >
              {/* Top Part: Thumbnail + Title/Featured/Toggle + Description */}
              <div className="flex flex-col sm:flex-row items-start gap-[15px] w-full">
                
                {/* Image Thumbnail (130px x 86px) */}
                <div className="w-full sm:w-[130px] h-[86px] rounded-[8px] overflow-hidden relative shrink-0 bg-neutral-100 border border-neutral-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col gap-2 w-full">
                  
                  {/* Row: Title + Featured Badge (Left) & Active/Inactive Toggle Box (Right) */}
                  <div className="flex flex-row justify-between items-center w-full gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                        {service.title}
                      </h3>
                      {service.isFeatured && (
                        <div className="box-border flex flex-row items-center px-3.5 h-[32px] gap-1 bg-[#0A0A6E] border border-[#F8F8FF]/50 rounded-[8px]">
                          <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107] shrink-0" />
                          <span className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#F8F8FF]">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Active / Inactive Toggle Pill Box (Matches Figma CSS Frame 2147227556) */}
                    <ActiveToggleBox
                      isActive={service.isActive}
                      onToggle={() => toggleServiceStatus(service.id)}
                      className="shrink-0"
                    />
                  </div>

                  {/* Description */}
                  <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                    {service.description}
                  </p>
                </div>

              </div>

              {/* Bottom Part: Pricing (Left) + Action Buttons (Right) */}
              <div className="flex flex-row justify-between items-center gap-4 pt-1 w-full">
                
                {/* Pricing: From $10/Hour */}
                <div className="flex flex-col">
                  <span className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                    From
                  </span>
                  <div className="flex items-baseline">
                    <span className="font-rubik font-medium text-[20px] leading-[24px] tracking-[-0.005em] text-[#121111]">
                      ${service.priceHourly}
                    </span>
                    <span className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                      /Hour
                    </span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(service.id)}
                    className="box-border flex flex-row items-center justify-center px-4 h-[32px] gap-1.5 bg-white border border-[#E4E4E7] rounded-[8px] font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer shadow-2xs"
                  >
                    <LinkIcon className="w-4 h-4 text-[#3D3D3D]" />
                    <span>Copy Service link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push(`/my-services/${service.id}`)}
                    className="box-border flex flex-row items-center justify-center px-3 h-[32px] bg-white border border-[#E4E4E7] rounded-[8px] font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer shadow-2xs"
                  >
                    View Service
                  </button>
                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center text-[#565656] font-rubik text-[14px] border border-[#EFEFEF] shadow-xs">
            No {subTab} services found.
          </div>
        )}
      </div>
    </div>
  );
}
