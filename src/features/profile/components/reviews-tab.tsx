'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface CaregiverReview {
  id: string;
  caregiverName: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  reviewDate: string;
  reviewStars: number;
  reviewText: string;
}

const REVIEWS_DATA: CaregiverReview[] = [
  {
    id: '1',
    caregiverName: 'John Doe',
    specialty: 'Elderly Care Specialist',
    rating: 5.0,
    reviewsCount: 48,
    avatar: '/images/avatar.webp',
    reviewDate: '21 Feb',
    reviewStars: 4,
    reviewText: 'John was incredibly patient and caring with my father. Highly recommended!',
  },
  {
    id: '2',
    caregiverName: 'John Doe',
    specialty: 'Elderly Care Specialist',
    rating: 5.0,
    reviewsCount: 48,
    avatar: '/images/avatar.webp',
    reviewDate: '21 Feb',
    reviewStars: 4,
    reviewText: 'John was incredibly patient and caring with my father. Highly recommended!',
  },
  {
    id: '3',
    caregiverName: 'John Doe',
    specialty: 'Elderly Care Specialist',
    rating: 5.0,
    reviewsCount: 48,
    avatar: '/images/avatar.webp',
    reviewDate: '21 Feb',
    reviewStars: 4,
    reviewText: 'John was incredibly patient and caring with my father. Highly recommended!',
  },
];

export default function ReviewsTab() {
  return (
    <div className="w-full flex flex-col gap-[20px]">
      {REVIEWS_DATA.map((rev) => (
        <div
          key={rev.id}
          className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[15px] shadow-sm"
        >
          {/* Top Header Row: Caregiver info */}
          <div className="flex items-center gap-[12px]">
            <div className="w-[44px] h-[44px] rounded-full overflow-hidden shrink-0 bg-[#F8F9FF] border border-neutral-100 relative">
              <Image
                src={rev.avatar}
                alt={rev.caregiverName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-[2px]">
              <h3 className="font-rubik font-semibold text-[16px] leading-[19px] text-[#121111]">
                {rev.caregiverName}
              </h3>
              <div className="flex items-center gap-[6px] font-rubik font-light text-[14px] text-[#3D3D3D]">
                <span>{rev.specialty}</span>
                <span className="text-black/20">|</span>
                <div className="flex items-center gap-[3px]">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107] stroke-none shrink-0" />
                  <span>
                    {rev.rating.toFixed(1)} ({rev.reviewsCount})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Content Card Box */}
          <div className="w-full bg-[#F1F5F9] rounded-[8px] p-[15px_20px] flex flex-col gap-[10px]">
            {/* Stars & Date row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-[4px]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= rev.reviewStars
                        ? 'fill-[#FFC107] text-[#FFC107] stroke-none'
                        : 'fill-[#CBD5E1] text-[#CBD5E1] stroke-none'
                    }`}
                  />
                ))}
              </div>
              <span className="font-poppins font-normal text-[13px] text-[#3D3D3D]">
                {rev.reviewDate}
              </span>
            </div>

            {/* Review text */}
            <p className="font-poppins font-normal text-[14px] leading-[20px] text-[#121111]">
              {rev.reviewText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
