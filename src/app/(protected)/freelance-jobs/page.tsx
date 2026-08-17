'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { FreelanceJobCard } from './_components/freelance-job-card';
import { FeaturedJobsCarousel } from './_components/featured-jobs-carousel';
import { getToken } from '@/lib/cookies';

import { JobFilterBar, FilterState } from './_components/job-filter-bar';

interface JobListing {
  id: string;
  category: string;
  isNew: boolean;
  title: string;
  postedTime: string;
  description: string;
  payRange: string;
  distance: string;
  duration: string;
  posterName: string;
  posterAvatar: string;
  posterRating: number;
  posterReviews: number;
  posterServices: number;
}

const JOBS_DATA: JobListing[] = [
  {
    id: '1',
    category: 'House Cleaning',
    isNew: true,
    title: 'I need house cleaning service.',
    postedTime: 'Posted 2 hours ago',
    description: "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaner.",
    payRange: '$200 -$300',
    distance: '500 miles',
    duration: '1 day',
    posterName: 'Nandi Bolard',
    posterAvatar: '/images/avatar.webp',
    posterRating: 5.0,
    posterReviews: 48,
    posterServices: 98,
  },
  {
    id: '2',
    category: 'Meal Prep Service',
    isNew: true,
    title: "I'm searching for a meal prep service.",
    postedTime: 'Posted 1 hour ago',
    description: "Meet Sarah, a health-conscious individual who spends long hours at work. She wants to eat healthy without the hassle of cooking daily. She's looking for a meal prep service that can deliver fresh meals.",
    payRange: '$150 - $250',
    distance: '30 miles',
    duration: '3 days',
    posterName: 'Evan Chen',
    posterAvatar: '/images/avatar.webp',
    posterRating: 4.9,
    posterReviews: 32,
    posterServices: 75,
  },
  {
    id: '3',
    category: 'Pet Sitting',
    isNew: true,
    title: 'I need a pet sitting service.',
    postedTime: 'Posted 3 hours ago',
    description: "Meet Lisa, a devoted pet owner who has to travel for work. She is searching for a trustworthy pet sitter who can take care of her two dogs while she's away, ensuring they receive daily care.",
    payRange: '$50 - $100',
    distance: '20 miles',
    duration: '1 week',
    posterName: 'Mark Taylor',
    posterAvatar: '/images/avatar.webp',
    posterRating: 4.8,
    posterReviews: 22,
    posterServices: 50,
  },
  {
    id: '4',
    category: 'Elderly Care',
    isNew: true,
    title: 'Seeking part-time senior caregiver.',
    postedTime: 'Posted 4 hours ago',
    description: "Looking for an experienced caregiver to assist an elderly family member with daily routines, light housekeeping, and companionship 3 times a week.",
    payRange: '$180 - $280',
    distance: '15 miles',
    duration: '2 weeks',
    posterName: 'Sarah Jenkins',
    posterAvatar: '/images/avatar.webp',
    posterRating: 4.9,
    posterReviews: 64,
    posterServices: 110,
  },
  {
    id: '5',
    category: 'Babysitting',
    isNew: false,
    title: 'Weekend childcare & homework helper.',
    postedTime: 'Posted 5 hours ago',
    description: "We are seeking a responsible and caring babysitter for two children (ages 6 and 9) during weekend afternoons. Light meal prep and engaging activities required.",
    payRange: '$120 - $200',
    distance: '8 miles',
    duration: 'Weekend',
    posterName: 'David Miller',
    posterAvatar: '/images/avatar.webp',
    posterRating: 5.0,
    posterReviews: 19,
    posterServices: 42,
  },
  {
    id: '6',
    category: 'House Cleaning',
    isNew: false,
    title: 'Deep cleaning for 3-bedroom home.',
    postedTime: 'Posted 6 hours ago',
    description: "Need thorough deep cleaning service for a 3-bedroom, 2-bathroom home before moving in. All cleaning supplies will be provided on site.",
    payRange: '$250 - $350',
    distance: '25 miles',
    duration: '1 day',
    posterName: 'Amanda Ross',
    posterAvatar: '/images/avatar.webp',
    posterRating: 4.7,
    posterReviews: 53,
    posterServices: 84,
  },
];

export default function FreelanceJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    radius: '',
    religion: [],
    gender: [],
    payRange: [0, 500],
    datePosted: 'Anytime',
    location: '',
  });

  const token = !!getToken();

  const tags = ['Homecare', 'Cleaning', 'Web Design', 'App Design'];

  const filteredJobs = JOBS_DATA.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag
      ? job.category.toLowerCase().includes(selectedTag.toLowerCase()) ||
        job.title.toLowerCase().includes(selectedTag.toLowerCase())
      : true;

    const matchesCategoryFilter =
      filters.categories.length === 0 ||
      filters.categories.some(
        (cat) =>
          job.category.toLowerCase().includes(cat.toLowerCase()) ||
          job.title.toLowerCase().includes(cat.toLowerCase())
      );

    return matchesSearch && matchesTag && matchesCategoryFilter;
  });

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Header Section */}
      <div className="max-w-screen-2xl mx-auto w-[80%] py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden">
          {/* Left Text & Search Box */}
          <div className="flex flex-col gap-6 max-w-[540px] w-full z-10">
            <div className="flex flex-col gap-3">
              <h1 className="font-rubik font-semibold text-[38px] sm:text-[48px] lg:text-[56px] leading-tight tracking-[-0.408px] text-[#121111]">
                Freelance Jobs
              </h1>
              <p className="font-rubik font-light text-[15px] sm:text-[16px] leading-[22px] tracking-[-0.408px] text-[#121111]/80 max-w-[460px]">
                Looking for freelance jobs and project work in texas? Texas Caregiver has you covered.
              </p>
            </div>

            {/* Search Bar Container */}
            <div className="flex flex-col gap-3.5 w-full">
              <div className="w-full h-[48px] bg-white border border-[#EFEFEF]/86 rounded-[12px] p-[5px_5px_5px_15px] flex items-center justify-between shadow-xs">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-rubik font-light text-[14px] text-[#1A2E35] placeholder:text-[#1A2E35]/60 outline-none border-none bg-transparent flex-1 pr-2"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="w-[38px] h-[38px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer transition border-none outline-none"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Tag Filters */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {tags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`h-[32px] px-3.5 rounded-[8px] font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] transition cursor-pointer border-none outline-none ${
                        isSelected
                          ? 'bg-[#0A0A6E] text-white'
                          : 'bg-white text-[#121111] hover:bg-neutral-50 shadow-xs'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <Image src="/giver/freelance.webp" alt="Freelance Jobs" width={800} height={800} className="object-contain absolute right-0" priority />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-screen-2xl mx-auto w-[80%] py-10 flex flex-col gap-8">
        {/* Latest Jobs Filter Header */}
        <div className="flex flex-col gap-4">
          <h2 className="font-rubik font-semibold text-[22px] md:text-[24px] leading-tight text-[#121111]">
            Latest Jobs
          </h2>

          {/* Filter Bar Dropdowns */}
          <JobFilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Featured Jobs Embla Carousel */}
        {token && <FeaturedJobsCarousel jobs={JOBS_DATA} />}

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {filteredJobs.map((job) => (
              <FreelanceJobCard key={job.id} {...job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-[#F36922]/20 w-full">
            <span className="text-[40px] mb-2">🔍</span>
            <h3 className="font-rubik font-semibold text-[18px] text-[#0A0A6E]">No jobs found</h3>
            <p className="font-rubik font-light text-[14px] text-neutral-500 max-w-sm mt-1">
              Try adjusting your search terms or clearing tag filters to see available opportunities.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
