'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface BlockedUser {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  servicesCount: number;
}

const INITIAL_BLOCKED_USERS: BlockedUser[] = [
  {
    id: '1',
    name: 'Renee Packer',
    avatar: '/images/home/search.webp',
    rating: 4.8,
    reviewsCount: 32,
    servicesCount: 75,
  },
  {
    id: '2',
    name: 'Marcus Lee',
    avatar: '/images/avatar.webp',
    rating: 4.5,
    reviewsCount: 28,
    servicesCount: 50,
  },
  {
    id: '3',
    name: 'Sophia Chang',
    avatar: '/images/home/find.webp',
    rating: 4.9,
    reviewsCount: 45,
    servicesCount: 60,
  },
  {
    id: '4',
    name: 'Oliver Smith',
    avatar: '/images/home/search.webp',
    rating: 4.7,
    reviewsCount: 30,
    servicesCount: 80,
  },
  {
    id: '5',
    name: 'Emma Johnson',
    avatar: '/images/avatar.webp',
    rating: 4.6,
    reviewsCount: 26,
    servicesCount: 70,
  },
  {
    id: '6',
    name: 'Liam Martinez',
    avatar: '/images/home/find.webp',
    rating: 4.8,
    reviewsCount: 37,
    servicesCount: 90,
  },
  {
    id: '7',
    name: 'Ava Brown',
    avatar: '/images/home/search.webp',
    rating: 4.9,
    reviewsCount: 50,
    servicesCount: 65,
  },
];

export default function BlockedUsersTab() {
  const [users, setUsers] = useState<BlockedUser[]>(INITIAL_BLOCKED_USERS);

  const handleUnblock = (id: string, userName: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success(`${userName} has been unblocked`);
  };

  return (
    <div className="w-full max-w-[980px] flex flex-col gap-3.5 select-none">
      {users.length === 0 ? (
        <div className="w-full bg-white rounded-[16px] p-8 flex flex-col items-center justify-center text-center shadow-xs border border-[#EFEFEF]">
          <p className="font-rubik font-semibold text-[16px] text-[#121111]">No Blocked Users</p>
          <p className="font-rubik font-normal text-[14px] text-[#565656] mt-1">You currently have no blocked users on your list.</p>
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="w-full bg-white rounded-[16px] px-6 py-3.5 flex items-center justify-between shadow-xs border border-[#EFEFEF]/60 transition hover:shadow-sm"
          >
            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200 relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <h3 className="font-rubik font-semibold text-[16px] leading-tight text-[#121111]">
                  {user.name}
                </h3>
                <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107] stroke-none shrink-0" />
                  <span className="font-medium text-[#121111]">
                    {user.rating.toFixed(1)}
                  </span>
                  <span>({user.reviewsCount})</span>
                  <span className="text-black/30 mx-0.5">|</span>
                  <span>{user.servicesCount} Services</span>
                </div>
              </div>
            </div>

            {/* Right: Unblock Button (Solid #C81E1E) */}
            <button
              type="button"
              onClick={() => handleUnblock(user.id, user.name)}
              className="h-[38px] px-6 bg-[#C81E1E] hover:bg-[#b01717] text-white rounded-[8px] font-rubik font-medium text-[14px] leading-none flex items-center justify-center cursor-pointer border-none transition shrink-0 shadow-2xs"
            >
              Unblock
            </button>
          </div>
        ))
      )}
    </div>
  );
}
