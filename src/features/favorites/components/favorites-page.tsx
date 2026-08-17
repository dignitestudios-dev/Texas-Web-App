'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Star, Heart, MapPin, Briefcase } from 'lucide-react';

interface FavoriteCard {
  id: string;
  caregiverId: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  location: string;
  experience: string;
  biography: string;
}

const INITIAL_FAVORITES: FavoriteCard[] = [
  {
    id: '1',
    caregiverId: 'john-doe',
    name: 'John Doe',
    role: 'Plumber',
    rating: 4.9,
    avatar: '/images/avatar.webp',
    location: 'Florida, United States',
    experience: '5 yrs',
    biography: 'We are seeking a dedicated and customer-oriented Customer Support Agent to join our team. As a Customer Support Agent, you will be responsible for providing...',
  },
  {
    id: '2',
    caregiverId: 'nandi-bolard',
    name: 'Nandi Bolard',
    role: 'Elderly Care Specialist',
    rating: 5.0,
    avatar: '/images/avatar.webp',
    location: 'San Juan, Texas (TX)',
    experience: '7 yrs',
    biography: 'Passionate and certified companion specialist with over 7 years in social assistance, hobby facilitation, and transportation help for seniors.',
  },
  {
    id: '3',
    caregiverId: 'mark-taylor',
    name: 'Mark Taylor',
    role: 'Companion Assistant',
    rating: 4.8,
    avatar: '/images/avatar.webp',
    location: 'Austin, Texas (TX)',
    experience: '4 yrs',
    biography: 'Caring, friendly assistant providing conversational companionship, household chore support, and cognitive exercise games for elderly clients.',
  },
];

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteCard[]>(INITIAL_FAVORITES);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCardClick = (caregiverId: string) => {
    router.push(`/leaderboard/${caregiverId}`);
  };

  return (
    <div className="min-h-screen bg-[rgba(243,105,34,0.1)] flex flex-col w-full">
      {/* Container */}
      <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-[80px] pt-[30px] pb-[80px] gap-[30px]">
        
        {/* Top Header: Back Arrow & Breadcrumbs */}
        <div className="w-full max-w-[1280px] flex items-center gap-[16px] h-[48px]">
          <button
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none shadow-sm"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>

          <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
            <Link href="/" className="hover:text-[#F36922] transition">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
            <span className="font-normal text-[#3D3D3D]">Favorites</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="w-full max-w-[1280px]">
          <h1 className="font-rubik font-semibold text-[32px] leading-[38px] tracking-[-0.408px] text-[#121111]">
            Favorites
          </h1>
        </div>

        {/* Favorites List */}
        <div className="w-full max-w-[1280px] flex flex-col gap-[16px]">
          {favorites.length === 0 ? (
            <div className="w-full bg-white rounded-[12px] p-[40px] flex flex-col items-center justify-center text-center shadow-sm">
              <Heart className="w-12 h-12 text-[#F36922] mb-3 opacity-40" />
              <h3 className="font-rubik font-medium text-[18px] text-[#121111]">No Favorites Saved</h3>
              <p className="font-rubik font-light text-[14px] text-[#3D3D3D] mt-1">
                You haven&apos;t saved any favorites yet. Explore caregivers and click the heart icon to save them here!
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.caregiverId)}
                className="w-full bg-white rounded-[12px] border border-[rgba(239,239,239,0.86)] p-[16px_20px] flex flex-col gap-[16px] shadow-sm transition hover:shadow-md cursor-pointer group"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[42px] h-[42px] rounded-full overflow-hidden shrink-0 bg-[#EEEEEE] relative border border-neutral-100 group-hover:scale-105 transition-transform">
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-col justify-between gap-[4px]">
                      <h3 className="font-inter font-semibold text-[14px] leading-[17px] text-[#181818] group-hover:text-[#F36922] transition-colors capitalize">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-[8px]">
                        <span className="font-inter font-medium text-[12px] leading-[15px] text-black/50">
                          {item.role}
                        </span>
                        <div className="flex items-center gap-[4px] font-inter font-medium text-[12px] leading-[15px] text-[#181818]/50">
                          <Star className="w-[14px] h-[14px] fill-[#FFC107] text-[#FFC107] stroke-none shrink-0" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Heart Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="p-1 hover:scale-110 transition cursor-pointer border-none bg-transparent outline-none z-10"
                    title="Remove from favorites"
                  >
                    <Heart className="w-[24px] h-[24px] fill-[#F36922] text-[#F36922]" />
                  </button>
                </div>

                {/* Details Section */}
                <div className="flex flex-col gap-[12px] w-full">
                  {/* Location Row */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[8px]">
                      <MapPin className="w-4 h-4 text-[#464646]" />
                      <span className="font-inter font-medium text-[13px] text-[#464646]">Location</span>
                    </div>
                    <span className="font-inter font-medium text-[13px] text-[#575757]">
                      {item.location}
                    </span>
                  </div>

                  {/* Experience Row */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[8px]">
                      <Briefcase className="w-4 h-4 text-[#464646]" />
                      <span className="font-inter font-medium text-[13px] text-[#464646]">Experience</span>
                    </div>
                    <span className="font-inter font-medium text-[13px] text-[#575757]">
                      {item.experience}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#DFDFDF]" />

                {/* Biography */}
                <div className="flex flex-col gap-[8px] w-full">
                  <h4 className="font-inter font-semibold text-[14px] leading-[17px] tracking-[-0.2px] capitalize text-[#181818]">
                    Biography
                  </h4>
                  <p className="font-inter font-normal text-[12px] leading-[16px] text-[#181818]/70">
                    {item.biography}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
