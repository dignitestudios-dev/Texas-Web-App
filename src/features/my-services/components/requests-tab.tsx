'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, Clock, Calendar, MapPin } from 'lucide-react';
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

  const handleAcceptRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Accepted' } : r))
    );
    toast.success('Service request accepted!');
  };

  const handleDeclineRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Declined' } : r))
    );
    toast.error('Service request declined.');
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.seekerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 w-full">
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
              {/* Row 1: Seeker Profile Info & Actions (Open Chat & Pending Badge) */}
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
                  <div className="h-[38px] px-6 border border-[#F36922] text-[#F36922] font-rubik font-medium text-[13px] rounded-full flex items-center justify-center bg-transparent">
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
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.push(`/my-services/requests/${req.id}`)}
                  className="h-[42px] px-8 bg-[#E4E4E7]/60 hover:bg-[#E4E4E7] text-[#121111] font-rubik font-medium text-[14px] rounded-[10px] transition cursor-pointer border-none shadow-2xs"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => router.push(`/my-services/requests/${req.id}`)}
                  className="h-[42px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-[10px] transition cursor-pointer border-none shadow-2xs"
                >
                  Accept
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center text-[#565656] font-rubik text-[14px] border border-[#EFEFEF] shadow-xs">
            No service requests found.
          </div>
        )}
      </div>
    </div>
  );
}
