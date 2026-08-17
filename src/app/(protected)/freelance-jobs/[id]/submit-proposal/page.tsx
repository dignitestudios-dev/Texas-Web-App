'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Star, Clock, Navigation, DollarSign, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const proposalSchema = z.object({
  hourlyRate: z
    .string()
    .min(1, 'Hourly rate is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Please enter a valid positive rate',
    }),
  coverLetter: z
    .string()
    .min(10, 'Cover letter must be at least 10 characters')
    .max(200, 'Cover letter cannot exceed 200 characters'),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

interface JobDetailData {
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
  isVerified: boolean;
}

const SAMPLE_JOB_DETAILS: Record<string, JobDetailData> = {
  '1': {
    id: '1',
    category: 'House Cleaning',
    isNew: true,
    title: 'I need house cleaning service.',
    postedTime: 'Posted 2 hours ago',
    description: "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
    payRange: '$200 -$300',
    distance: '500 miles',
    duration: '1 day',
    posterName: 'Nandi Bolard',
    posterAvatar: '/images/avatar.webp',
    posterRating: 5.0,
    posterReviews: 48,
    posterServices: 98,
    isVerified: true,
  },
  '2': {
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
    isVerified: true,
  },
  '3': {
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
    isVerified: true,
  },
};

export default function SubmitProposalPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = (params?.id as string) || '1';

  const job = SAMPLE_JOB_DETAILS[jobId] || SAMPLE_JOB_DETAILS['1'];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      hourlyRate: '',
      coverLetter: '',
    },
  });

  const coverLetterValue = watch('coverLetter') || '';

  const onSubmit = (data: ProposalFormValues) => {
    console.log('Submitted proposal data:', data);
    toast.success('Proposal submitted successfully!');
    router.push(`/my-jobs`);
  };

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full">
      {/* Main Container */}
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-12 py-8 lg:py-12 flex flex-col gap-6">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 font-rubik text-[14px] text-[#121111] hover:text-[#F36922] transition w-fit outline-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Details</span>
        </button>

        {/* Page Heading */}
        <h1 className="font-rubik font-medium text-[24px] leading-[28px] tracking-[-0.005em] text-[#121111]">
          Submit a Proposal
        </h1>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
          
          {/* Card 1: Job Details */}
          <div className="w-full bg-white rounded-[12px] shadow-xs flex flex-col overflow-hidden border border-[#EFEFEF]/86">
            {/* Card Header */}
            <div className="w-full px-[15px] py-[12px] border-b border-[#EFEFEF]/86">
              <h2 className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
                Job Details
              </h2>
            </div>

            {/* Card Body */}
            <div className="w-full p-[15px] flex flex-col lg:flex-row items-start gap-5">
              {/* Left Column (Job Summary) */}
              <div className="flex-1 lg:max-w-[700px] flex flex-col gap-2 lg:pr-5 lg:border-r lg:border-[#EFEFEF]/86">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  {job.title}
                </h3>
                <span className="font-rubik font-normal text-[13px] leading-[15px] tracking-[-0.005em] text-[#121111]">
                  {job.postedTime}
                </span>
                <p className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.005em] text-[#3D3D3D] line-clamp-3 mt-1">
                  {job.description}
                </p>
                <Link
                  href={`/freelance-jobs/${job.id}`}
                  className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.005em] text-[#121111] underline w-fit hover:opacity-80 transition mt-1"
                >
                  View Details
                </Link>
              </div>

              {/* Right Column (Badges & Poster Info) */}
              <div className="w-full lg:w-[390px] flex flex-col gap-3.5 lg:pl-5 shrink-0">
                {/* Metadata Pills Row */}
                <div className="flex items-center gap-2 flex-wrap border-b border-[#EFEFEF]/86 pb-3">
                  <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#0A0A6E]" />
                    <span className="font-rubik font-normal text-[13px] text-[#0A0A6E]">
                      {job.payRange}
                    </span>
                  </div>
                  <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#0A0A6E] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="7" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                    </svg>
                    <span className="font-rubik font-normal text-[13px] text-[#0A0A6E]">
                      {job.distance}
                    </span>
                  </div>
                  <div className="bg-[#F8F9FF] rounded-[8px] px-[10px] py-[5px] flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0A0A6E]" />
                    <span className="font-rubik font-normal text-[13px] text-[#0A0A6E]">
                      {job.duration}
                    </span>
                  </div>
                </div>

                {/* Poster Info */}
                <div className="flex items-center gap-3">
                  <div className="w-[43px] h-[43px] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
                    <Image src={job.posterAvatar} alt={job.posterName} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                        {job.posterName}
                      </span>
                      {job.isVerified && (
                        <svg className="w-[18px] h-[18px] text-[#4253F0] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7l-3.61.81.34 3.69L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2 3.4-1.47 3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-rubik font-light text-[14px] text-[#121111]">
                      <div className="flex items-center gap-1 pr-2 border-r border-[#121111]">
                        <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                        <span>
                          {job.posterRating.toFixed(1)} ({job.posterReviews})
                        </span>
                      </div>
                      <span>{job.posterServices} Services</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Rates */}
          <div className="w-full bg-white rounded-[12px] shadow-xs flex flex-col overflow-hidden border border-[#EFEFEF]/86">
            {/* Header */}
            <div className="w-full px-[15px] py-[12px] border-b border-[#EFEFEF]/86">
              <h2 className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
                Rates
              </h2>
            </div>

            {/* Body */}
            <div className="w-full p-[15px] flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Hourly Rate
                </h3>
                <p className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
                  The client will see this amount on your proposal
                </p>
              </div>

              {/* Rate Input */}
              <div className="flex flex-col gap-1 w-full max-w-[345px]">
                <div className="w-full h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[15px] flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Pay Rate"
                    {...register('hourlyRate')}
                    className="font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#121111]/70 bg-transparent border-none outline-none w-full pr-2"
                  />
                  <span className="font-rubik font-normal text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] shrink-0">
                    /Hr
                  </span>
                </div>
                {errors.hourlyRate && (
                  <span className="font-rubik text-red-500 text-xs mt-0.5">
                    {errors.hourlyRate.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Proposal */}
          <div className="w-full bg-white rounded-[12px] shadow-xs flex flex-col overflow-hidden border border-[#EFEFEF]/86">
            {/* Header */}
            <div className="w-full px-[15px] py-[12px] border-b border-[#EFEFEF]/86">
              <h2 className="font-rubik font-medium text-[18px] leading-[21px] tracking-[-0.005em] text-[#121111]">
                Proposal
              </h2>
            </div>

            {/* Body */}
            <div className="w-full p-[15px] flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Cover letter
                </h3>

                {/* Textarea Box */}
                <div className="flex flex-col gap-1 w-full">
                  <div className="w-full min-h-[98px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] p-[12px_15px] relative flex flex-col justify-between">
                    <textarea
                      placeholder="Letter here"
                      {...register('coverLetter')}
                      rows={3}
                      className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111] placeholder:text-[#121111]/70 bg-transparent border-none outline-none resize-none w-full pr-2"
                    />
                    <div className="w-full text-right font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#3D3D3D] pt-2">
                      {coverLetterValue.length} / 200 Characters
                    </div>
                  </div>
                  {errors.coverLetter && (
                    <span className="font-rubik text-red-500 text-xs mt-0.5">
                      {errors.coverLetter.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="font-rubik font-light text-[15px] leading-[20px] text-[#121111]">
                By continuing you agree with our{' '}
                <Link href="#" className="font-rubik font-semibold text-[#121111] underline">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-rubik font-semibold text-[#121111] underline">
                  Privacy Policy
                </Link>
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-[10px] pt-2">
                <button
                  type="submit"
                  className="w-[145px] h-[54px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-normal text-[15px] leading-[24px] capitalize flex items-center justify-center transition cursor-pointer border-none outline-none shadow-xs"
                >
                  Submit Proposal
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-[85px] h-[54px] bg-[#F8F9FF] hover:bg-neutral-100 border border-[#EFEFEF] rounded-[8px] font-rubik font-normal text-[14px] leading-[17px] text-[#121111] flex items-center justify-center transition cursor-pointer outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
