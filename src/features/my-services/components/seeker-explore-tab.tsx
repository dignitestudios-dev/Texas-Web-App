'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, MapPin, Locate, Heart, ArrowLeft } from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  imageSrc: string;
}

interface CaregiverCardItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewsCount: number;
  servicesCount: number;
  location: string;
  distance: string;
  price: number;
  isFeatured?: boolean;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'senior-care',
    title: 'Senior Care',
    imageSrc: '/images/sc.png',
  },
  {
    id: 'post-hospital',
    title: 'Post-Hospital & Recovery Care',
    imageSrc: '/images/hop.png',
  },
  {
    id: 'child-care',
    title: 'Child Care',
    imageSrc: '/images/cc.png',
  },
  {
    id: 'respite-care',
    title: 'Respite Care',
    imageSrc: '/images/rs.png',
  },
  {
    id: 'companion-care',
    title: 'Companion Care',
    imageSrc: '/images/com.png',
  },
  {
    id: 'special-needs',
    title: 'Special Needs & Disability Support',
    imageSrc: '/images/need.png',
  },
];

const RECOMMENDED_CAREGIVERS: CaregiverCardItem[] = [
  {
    id: 'john-doe-1',
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    price: 10,
    isFeatured: true,
  },
  {
    id: 'olivia-james-1',
    name: 'Olivia James',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    price: 10,
    isFeatured: true,
  },
  {
    id: 'john-doe-2',
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    price: 10,
    isFeatured: true,
  },
];

const ALL_CAREGIVERS: CaregiverCardItem[] = [
  {
    id: 'john-doe-3',
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    price: 10,
  },
  {
    id: 'olivia-james-2',
    name: 'Olivia James',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    location: 'San Juan, Texas(TX)',
    distance: '500 miles',
    price: 10,
  },
  {
    id: 'liam-smith',
    name: 'Liam Smith',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 35,
    servicesCount: 76,
    location: 'Austin, Texas(TX)',
    distance: '450 miles',
    price: 12,
  },
  {
    id: 'emma-johnson',
    name: 'Emma Johnson',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 52,
    servicesCount: 120,
    location: 'Houston, Texas(TX)',
    distance: '520 miles',
    price: 15,
  },
  {
    id: 'noah-williams',
    name: 'Noah Williams',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 40,
    servicesCount: 85,
    location: 'Dallas, Texas(TX)',
    distance: '480 miles',
    price: 11,
  },
  {
    id: 'ava-brown',
    name: 'Ava Brown',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 60,
    servicesCount: 110,
    location: 'San Antonio, Texas(TX)',
    distance: '510 miles',
    price: 14,
  },
];

export function SeekerExploreTab({ searchQuery = '' }: { searchQuery?: string }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterCaregivers = (list: CaregiverCardItem[]) => {
    if (!searchQuery) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  };

  // Card renderer component
  const renderCaregiverCard = (item: CaregiverCardItem) => {
    const isFav = favorites[item.id];

    return (
      <div
        key={item.id}
        className="bg-white rounded-[22px] p-3.5 sm:p-4 shadow-[0_2px_14px_rgba(0,0,0,0.06)] border border-[#EFEFEF] flex flex-col gap-3 relative transition duration-200 hover:shadow-md group"
      >
        {/* Caregiver Portrait Image */}
        <div className="w-full h-[180px] sm:h-[190px] rounded-[16px] overflow-hidden relative bg-[#F8F9FF]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          {/* Favorite Heart Button */}
          <button
            type="button"
            onClick={(e) => toggleFavorite(item.id, e)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/25 backdrop-blur-xs flex items-center justify-center text-white hover:text-[#F36922] transition cursor-pointer border-none"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFav ? 'fill-[#F36922] text-[#F36922]' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Info Stack */}
        <div className="flex flex-col gap-1.5 w-full">
          {/* Name & Featured Badge */}
          <div className="flex items-center justify-between w-full">
            <h4 className="font-rubik font-semibold text-[17px] sm:text-[18px] text-[#121111] leading-tight">
              {item.name}
            </h4>
            {item.isFeatured && (
              <div className="bg-[#0A0A6E] text-white text-[11px] font-rubik font-medium px-2.5 py-1 rounded-[6px] flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
                <span>Featured</span>
              </div>
            )}
          </div>

          {/* Rating, Reviews & Services Count */}
          <div className="flex items-center gap-1.5 text-[#121111] text-[13px] font-rubik flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
              <span className="font-medium text-[#121111]">{item.rating.toFixed(1)}</span>
              <span className="text-[#565656]">({item.reviewsCount})</span>
            </div>
            <span className="text-[#565656] mx-0.5">|</span>
            <span className="text-[#565656]">{item.servicesCount} Services</span>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center gap-3 text-[#565656] text-[12.5px] font-rubik">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#565656] shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Locate className="w-3.5 h-3.5 text-[#565656] shrink-0" />
              <span>{item.distance}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-rubik font-bold text-[19px] sm:text-[20px] text-[#121111]">
              ${item.price}
            </span>
            <span className="font-rubik text-[13px] text-[#565656]">
              /Hour
            </span>
          </div>
        </div>

        {/* View Service Button */}
        <button
          type="button"
          onClick={() => router.push(`/leaderboard/${item.id}`)}
          className="w-full h-[38px] bg-white hover:bg-neutral-50 border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[13.5px] rounded-full transition flex items-center justify-center cursor-pointer shadow-2xs mt-0.5"
        >
          View Service
        </button>
      </div>
    );
  };

  // 1. If NO category is selected -> Show the 6 Category Cards
  if (!selectedCategory) {
    return (
      <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
        <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto">
          {/* Information Banner */}
          <div className="flex items-center gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[20px]">
            <Info className="w-4 h-4 text-[#121111] shrink-0" />
            <span>Choose a service category to find qualified caregivers who match your needs.</span>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className="bg-white rounded-[24px] border border-[#EFEFEF] shadow-sm hover:shadow-lg hover:border-[#F36922]/50 hover:-translate-y-1 transition-all duration-200 p-6 sm:p-8 flex flex-col items-center justify-between text-center cursor-pointer group h-[280px] sm:h-[310px] relative overflow-hidden"
              >
                {/* Image Area */}
                <div className="w-full flex-1 flex items-center justify-center relative">
                  <div className="w-[150px] h-[140px] sm:w-[170px] sm:h-[155px] relative flex items-center justify-center">
                    <Image
                      src={cat.imageSrc}
                      alt={cat.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-rubik font-semibold text-[17px] sm:text-[19px] leading-[23px] text-[#0A0A6E] group-hover:text-[#F36922] transition-colors mt-2">
                  {cat.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. If a Category IS selected -> Show the Caregiver Cards Grid (Matching the Screenshot)
  const recommendedList = filterCaregivers(RECOMMENDED_CAREGIVERS);
  const allList = filterCaregivers(ALL_CAREGIVERS);

  return (
    <div className="w-full h-full overflow-y-auto pr-1 pb-10 scrollbar-thin select-none">
      <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto">
        
        {/* Back to Categories button + Category Title */}
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1.5 text-[14px] font-rubik font-medium text-[#0A0A6E] hover:text-[#F36922] transition cursor-pointer bg-white px-3.5 py-1.5 rounded-full border border-[#EFEFEF] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>
          <span className="font-rubik font-semibold text-[15px] text-[#F36922]">
            Category: {selectedCategory.title}
          </span>
        </div>

        {/* Dynamic Category Information Banner */}
        <div className="flex items-start gap-2 text-[#121111] font-rubik font-medium text-[14px] sm:text-[15px] leading-[22px]">
          <Info className="w-4 h-4 text-[#121111] shrink-0 mt-1" />
          <span>
            Browse available caregivers offering [{selectedCategory.title}] services. Review their profiles, experience and availability to find the right match for your needs.
          </span>
        </div>

        {/* Section 1: Recommended Caregivers */}
        {recommendedList.length > 0 && (
          <div className="flex flex-col gap-3 w-full">
            <h3 className="font-rubik font-semibold text-[16px] sm:text-[18px] text-[#121111]">
              Recommended Caregivers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
              {recommendedList.map((item) => renderCaregiverCard(item))}
            </div>
          </div>
        )}

        {/* Section 2: All Caregivers */}
        {allList.length > 0 && (
          <div className="flex flex-col gap-3 w-full mt-2">
            <h3 className="font-rubik font-semibold text-[16px] sm:text-[18px] text-[#121111]">
              All Caregivers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
              {allList.map((item) => renderCaregiverCard(item))}
            </div>
          </div>
        )}

        {recommendedList.length === 0 && allList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-[#F36922]/30 w-full">
            <span className="text-[40px] mb-2">🔍</span>
            <h4 className="font-rubik font-semibold text-[18px] text-[#0A0A6E]">
              No caregivers found
            </h4>
            <p className="font-rubik text-[14px] text-neutral-500 max-w-sm mt-1">
              Try adjusting your search query to find available caregivers.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
