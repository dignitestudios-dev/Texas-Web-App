'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, Clock, Calendar, MapPin, Check, X, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { RequestItem } from '../types/my-services.types';

const MOCK_REQUESTS: RequestItem[] = [
  {
    id: 'req-1',
    seekerName: 'John Doe',
    seekerTitle: 'Elderly Care Specialist',
    seekerRating: 5.0,
    seekerRatingCount: 48,
    seekerAvatar: '/images/avatar.webp',
    jobTitle: 'Elderly Care Assistant Seeking Job',
    priceRange: '$35-$50',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '09:00 AM - 10:00 AM',
    date: '12 Dec 26',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    status: 'Pending',
    images: [
      '/images/home/search.webp',
      '/images/home/find.webp',
      '/images/home/search.webp',
      '/images/home/find.webp',
    ],
  },
  {
    id: 'req-2',
    seekerName: 'John Doe',
    seekerTitle: 'Elderly Care Specialist',
    seekerRating: 5.0,
    seekerRatingCount: 48,
    seekerAvatar: '/images/avatar.webp',
    jobTitle: 'Elderly Care Assistant Seeking Job',
    priceRange: '$35-$50',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '09:00 AM - 10:00 AM',
    date: '12 Dec 26',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    status: 'Pending',
    images: [
      '/images/home/search.webp',
      '/images/home/find.webp',
      '/images/home/search.webp',
      '/images/home/find.webp',
    ],
  },
];

interface RequestsTabProps {
  searchQuery?: string;
}

export function RequestsTab({ searchQuery = '' }: RequestsTabProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<RequestItem[]>(MOCK_REQUESTS);

  // Confirmation Dialog State
  const [pendingAction, setPendingAction] = useState<{
    type: 'accept' | 'decline';
    requestId: string;
    seekerName: string;
    jobTitle: string;
  } | null>(null);

  const handleOpenConfirmDialog = (
    type: 'accept' | 'decline',
    req: RequestItem
  ) => {
    setPendingAction({
      type,
      requestId: req.id,
      seekerName: req.seekerName,
      jobTitle: req.jobTitle,
    });
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    const { type, requestId, seekerName } = pendingAction;

    if (type === 'accept') {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: 'Accepted' } : r))
      );
      toast.success(`Service request from ${seekerName} accepted!`);
    } else {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: 'Declined' } : r))
      );
      toast.error(`Service request from ${seekerName} declined.`);
    }

    setPendingAction(null);
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.seekerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* Info Banner */}
      <div className="flex items-center gap-2 font-rubik font-semibold text-[15px] leading-[20px] text-[#121111]">
        <Info className="w-4 h-4 text-[#121111] shrink-0" />
        <span>Review and manage service requests from care seekers.</span>
      </div>

      {/* Request Cards List */}
      <div className="flex flex-col gap-4 w-full mt-2">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-[20px] p-6 shadow-sm border border-[#EFEFEF] flex flex-col gap-4 w-full hover:shadow-md transition-shadow"
            >
              {/* Row 1: Seeker Profile Info & Actions (Open Chat & Status Badge) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full relative overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200 shadow-2xs">
                    <Image
                      src={req.seekerAvatar}
                      alt={req.seekerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-rubik font-bold text-[16px] text-[#121111]">
                      {req.seekerName}
                    </h3>
                    <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                      <span>{req.seekerTitle}</span>
                      <span>|</span>
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-medium text-[#121111]">
                        {req.seekerRating.toFixed(1)} ({req.seekerRatingCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => router.push('/chat')}
                    className="h-[38px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[13px] rounded-full transition cursor-pointer border-none shadow-2xs"
                  >
                    Open chat
                  </button>
                  <div
                    className={`h-[38px] px-6 border font-rubik font-medium text-[13px] rounded-full flex items-center justify-center bg-transparent ${
                      req.status === 'Accepted'
                        ? 'border-[#046C4E] text-[#046C4E] bg-[#E6F4EA]'
                        : req.status === 'Declined'
                        ? 'border-[#C81E1E] text-[#C81E1E] bg-[#FEE2E2]'
                        : 'border-[#F36922] text-[#F36922]'
                    }`}
                  >
                    {req.status}
                  </div>
                </div>
              </div>

              {/* Row 2: Job Title & Price Range */}
              <div className="flex justify-between items-center gap-2 pt-1">
                <h4
                  onClick={() => router.push(`/my-services/requests/${req.id}`)}
                  className="font-rubik font-bold text-[16px] text-[#121111] hover:text-[#F36922] transition cursor-pointer"
                >
                  {req.jobTitle}
                </h4>
                <div className="bg-[#F8F9FF] border border-[#EFEFEF] rounded-[8px] px-3 py-1 font-rubik font-bold text-[16px] text-[#121111]">
                  {req.priceRange}
                </div>
              </div>

              {/* Row 3: Description */}
              <p className="font-rubik font-normal text-[13px] leading-[20px] text-[#565656]">
                {req.description}
              </p>

              {/* Row 4: Metadata Badges */}
              <div className="flex flex-wrap items-center gap-4 text-[13px] font-rubik text-[#565656]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#727272]" />
                  <span>{req.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#727272]" />
                  <span>{req.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#727272]" />
                  <span>{req.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#727272]" />
                  <span>{req.distance}</span>
                </div>
              </div>

              {/* Row 5: Image Thumbnails */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                {req.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-[95px] h-[75px] rounded-[12px] relative overflow-hidden border border-[#EFEFEF] bg-neutral-100 shadow-2xs"
                  >
                    <Image src={img} alt="Job reference photo" fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Row 6: Action Buttons (Decline / Accept) */}
              {req.status === 'Pending' ? (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenConfirmDialog('decline', req)}
                    className="h-[42px] px-8 bg-[#E4E4E7]/60 hover:bg-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[10px] transition cursor-pointer border-none shadow-2xs"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenConfirmDialog('accept', req)}
                    className="h-[42px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-[10px] transition cursor-pointer border-none shadow-2xs"
                  >
                    Accept
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2">
                  <span
                    className={`font-rubik font-medium text-[14px] ${
                      req.status === 'Accepted'
                        ? 'text-[#046C4E]'
                        : 'text-[#C81E1E]'
                    }`}
                  >
                    Request has been {req.status.toLowerCase()}.
                  </span>
                </div>
              )}

            </div>
          ))
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center text-[#565656] font-rubik text-[14px] border border-[#EFEFEF] shadow-xs">
            No service requests found.
          </div>
        )}
      </div>

      {/* Accept / Decline Confirmation Dialog */}
      <Dialog
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="w-[420px] max-w-[92vw] bg-white rounded-[24px] p-6 sm:p-7 flex flex-col items-center text-center shadow-xl border border-[#EFEFEF] outline-none select-none"
        >
          {/* Badge Icon */}
          <div
            className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 ${
              pendingAction?.type === 'accept'
                ? 'bg-[#E6F4EA] text-[#046C4E]'
                : 'bg-[#FEE2E2] text-[#C81E1E]'
            }`}
          >
            {pendingAction?.type === 'accept' ? (
              <Check className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
            )}
          </div>

          {/* Title */}
          <DialogTitle className="font-rubik font-bold text-[22px] leading-[28px] text-[#121111]">
            {pendingAction?.type === 'accept'
              ? 'Accept Service Request?'
              : 'Decline Service Request?'}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="font-rubik font-normal text-[14px] leading-[21px] text-[#565656] max-w-[330px] mt-2 mb-6">
            {pendingAction?.type === 'accept'
              ? `Are you sure you want to accept this service request for "${pendingAction?.jobTitle}" from ${pendingAction?.seekerName}? This will confirm your booking.`
              : `Are you sure you want to decline this request for "${pendingAction?.jobTitle}" from ${pendingAction?.seekerName}?`}
          </DialogDescription>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setPendingAction(null)}
              className="flex-1 h-[46px] bg-[#FEF0E9] hover:bg-[#FDE4D5] text-[#F36922] font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmAction}
              className={`flex-1 h-[46px] text-white font-rubik font-semibold text-[15px] rounded-[12px] transition cursor-pointer border-none shadow-xs flex items-center justify-center ${
                pendingAction?.type === 'accept'
                  ? 'bg-[#046C4E] hover:bg-[#03553d]'
                  : 'bg-[#C81E1E] hover:bg-[#b01717]'
              }`}
            >
              {pendingAction?.type === 'accept' ? 'Accept' : 'Decline'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
