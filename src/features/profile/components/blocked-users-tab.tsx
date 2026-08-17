'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

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
    avatar: '/images/avatar.webp',
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
    avatar: '/images/avatar.webp',
    rating: 4.9,
    reviewsCount: 45,
    servicesCount: 60,
  },
  {
    id: '4',
    name: 'Oliver Smith',
    avatar: '/images/avatar.webp',
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
    avatar: '/images/avatar.webp',
    rating: 4.8,
    reviewsCount: 37,
    servicesCount: 90,
  },
  {
    id: '7',
    name: 'Ava Brown',
    avatar: '/images/avatar.webp',
    rating: 4.9,
    reviewsCount: 50,
    servicesCount: 65,
  },
];

export default function BlockedUsersTab() {
  const [users, setUsers] = useState<BlockedUser[]>(INITIAL_BLOCKED_USERS);

  const handleUnblock = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-[15px]">
      {users.length === 0 ? (
        <div className="w-full bg-white rounded-[16px] p-[30px] flex flex-col items-center justify-center text-center shadow-sm">
          <p className="font-rubik font-medium text-[16px] text-[#121111]">No blocked users</p>
          <p className="font-rubik font-light text-[14px] text-[#3D3D3D] mt-1">You currently have no blocked users on your list.</p>
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="w-full bg-white rounded-[16px] p-[16px_20px] flex items-center justify-between shadow-sm transition hover:shadow-md"
          >
            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-[15px]">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0 bg-[#F8F9FF] border border-neutral-100 relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-[4px]">
                <h3 className="font-rubik font-semibold text-[16px] leading-[19px] text-[#121111]">
                  {user.name}
                </h3>
                <div className="flex items-center gap-[6px] font-rubik font-light text-[13px] text-[#3D3D3D]">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107] stroke-none shrink-0" />
                  <span>
                    {user.rating.toFixed(1)} ({user.reviewsCount})
                  </span>
                  <span className="text-black/20">|</span>
                  <span>{user.servicesCount} Services</span>
                </div>
              </div>
            </div>

            {/* Right: Unblock Button */}
            <button
              type="button"
              onClick={() => handleUnblock(user.id)}
              className="w-[86px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[14px] leading-[135%] capitalize cursor-pointer border-none transition flex items-center justify-center shrink-0 shadow-sm"
            >
              Unblock
            </button>
          </div>
        ))
      )}
    </div>
  );
}
