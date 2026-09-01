'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, Link as LinkIcon, AlertTriangle, Check } from 'lucide-react';
import { ActiveToggleBox } from '@/components/common/active-toggle-box';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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

  // Status Change Confirmation Dialog state
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    serviceId: string;
    newStatus: boolean;
    serviceTitle: string;
  } | null>(null);

  const handleRequestToggle = (service: ServiceItem) => {
    setPendingStatusChange({
      serviceId: service.id,
      newStatus: !service.isActive,
      serviceTitle: service.title,
    });
  };

  const handleConfirmStatusChange = () => {
    if (!pendingStatusChange) return;
    const { serviceId, newStatus } = pendingStatusChange;
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isActive: newStatus } : s))
    );
    toast.success(`Service status updated to ${newStatus ? 'Active' : 'Inactive'}`);
    setPendingStatusChange(null);
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
    <div className="flex flex-col gap-4 w-full select-none">
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

                    {/* Active / Inactive Toggle Pill Box */}
                    <ActiveToggleBox
                      isActive={service.isActive}
                      onToggle={() => handleRequestToggle(service)}
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

      {/* Confirmation Dialog for Active / Inactive Toggle (Shadcn Dialog) */}
      <Dialog
        open={!!pendingStatusChange}
        onOpenChange={(open) => !open && setPendingStatusChange(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="w-[400px] max-w-[92vw] bg-white rounded-[24px] p-6 sm:p-7 flex flex-col items-center text-center shadow-xl border border-[#EFEFEF] outline-none select-none"
        >
          {/* Status Badge Icon */}
          <div
            className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 ${
              pendingStatusChange?.newStatus
                ? 'bg-[#E6F4EA] text-[#046C4E]'
                : 'bg-[#FEF0E9] text-[#F36922]'
            }`}
          >
            {pendingStatusChange?.newStatus ? (
              <Check className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
            )}
          </div>

          {/* Title */}
          <DialogTitle className="font-rubik font-bold text-[22px] leading-[28px] text-[#121111]">
            {pendingStatusChange?.newStatus
              ? 'Activate Service?'
              : 'Deactivate Service?'}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="font-rubik font-normal text-[14px] leading-[21px] text-[#565656] max-w-[310px] mt-2 mb-6">
            {pendingStatusChange?.newStatus
              ? `Are you sure you want to set "${pendingStatusChange?.serviceTitle}" to Active? It will become visible to care seekers.`
              : `Are you sure you want to set "${pendingStatusChange?.serviceTitle}" to Inactive? It will no longer appear in search results.`}
          </DialogDescription>

          {/* Action Buttons: Cancel & Confirm */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setPendingStatusChange(null)}
              className="flex-1 h-[46px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmStatusChange}
              className={`flex-1 h-[46px] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-xs flex items-center justify-center ${
                pendingStatusChange?.newStatus
                  ? 'bg-[#046C4E] hover:bg-[#03553d]'
                  : 'bg-[#F36922] hover:bg-[#e05813]'
              }`}
            >
              {pendingStatusChange?.newStatus ? 'Activate' : 'Deactivate'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
