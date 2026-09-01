'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Compass,
  ArrowRight,
  Clock,
  PartyPopper,
} from 'lucide-react';
import { toast } from 'sonner';
import { getToken } from '@/lib/cookies';
import { AuthGuardDialog } from '@/components/common/auth-guard-dialog';

export interface InstantJob {
  id: string;
  timeAgo: string;
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
    priceHourly: number;
    location: string;
    distance: string;
  };
}

const MOCK_JOBS: InstantJob[] = [
  {
    id: '1',
    timeAgo: '02:00 Mins ago',
    title: 'I need house cleaning service.',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
    user: {
      name: 'Nandi Bolard',
      avatar: '/images/avatar.webp',
      priceHourly: 10,
      location: 'San Juan, Texas(TX)',
      distance: '500 miles',
    },
  },
  {
    id: '2',
    timeAgo: '04:00 Mins ago',
    title: 'I need house cleaning service.',
    description:
      "Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.",
    user: {
      name: 'Nandi Bolard',
      avatar: '/images/avatar.webp',
      priceHourly: 10,
      location: 'San Juan, Texas(TX)',
      distance: '500 miles',
    },
  },
  {
    id: '3',
    timeAgo: '07:00 Mins ago',
    title: 'Elderly companionship and assistance.',
    description:
      "Seeking a compassionate and experienced caregiver for light housekeeping, meal preparation, and medication reminders for an elderly family member in a comfortable home setting.",
    user: {
      name: 'Nandi Bolard',
      avatar: '/images/avatar.webp',
      priceHourly: 15,
      location: 'San Juan, Texas(TX)',
      distance: '480 miles',
    },
  },
];

export default function GiverInstantJobPage() {
  const router = useRouter();

  // Availability switch
  const [isAvailable, setIsAvailable] = useState(true);

  // Auth Guard dialog state
  const [isAuthGuardOpen, setIsAuthGuardOpen] = useState(false);

  // Flow step state: 'list' | 'proposal' | 'waiting' | 'accepted'
  const [step, setStep] = useState<'list' | 'proposal' | 'waiting' | 'accepted'>('list');
  const [selectedJob, setSelectedJob] = useState<InstantJob>(MOCK_JOBS[0]);

  // Form states for proposal
  const [payRate, setPayRate] = useState('');
  const [proposalText, setProposalText] = useState('');

  // 60-second waiting timer
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'waiting') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStep('accepted');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(60);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!getToken()) {
      setIsAuthGuardOpen(true);
      return;
    }
    if (!payRate.trim()) {
      toast.error('Please enter a pay rate.');
      return;
    }
    toast.success('Proposal submitted successfully!');
    setStep('waiting');
  };

  const handleStartProposalClick = (job: InstantJob) => {
    if (!getToken()) {
      setIsAuthGuardOpen(true);
      return;
    }
    setSelectedJob(job);
    setPayRate('');
    setProposalText('');
    setStep('proposal');
  };

  const handleViewJob = () => {
    router.push('/my-services?tab=active&subTab=upcoming');
  };

  // Map Beacon dots (Figma coordinates)
  const mapBeacons = [
    { left: '31%', top: '55%' },
    { left: '60%', top: '33%' },
    { left: '34%', top: '85%' },
    { left: '14%', top: '34%' },
    { left: '72%', top: '63%' },
  ];

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-20">
      
      {/* Header Section (Matches Frame 2147228839 & Frame 2147227306) */}
      <div className="w-full max-w-[1280px] px-4 sm:px-0 pt-8 flex flex-col gap-5">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-6">
          
          {/* Left Title & Subtitle */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-50 transition cursor-pointer shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-[#121111]" />
              </button>
              <h1 className="font-rubik font-semibold text-[40px] sm:text-[56px] leading-[48px] sm:leading-[66px] tracking-[-0.408px] text-[#121111]">
                Instant Job
              </h1>
            </div>
            <p className="font-rubik font-light text-[15px] sm:text-[16px] leading-[19px] tracking-[-0.408px] text-[#121111] sm:ml-[54px]">
              Find the perfect homecare job in Texas. We connect caregivers with families seeking support.
            </p>
          </div>

          {/* Right Availability Info & Switch (Matches Frame 2147228964) */}
          <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
            <span className="font-rubik font-light text-[15px] sm:text-[16px] leading-[19px] text-right tracking-[-0.408px] text-[#121111] max-w-[275px] hidden sm:inline-block">
              Set your availability to receive Instant Job requests from care seekers.
            </span>

            {/* Component 61: Available Switch Box */}
            <div className="box-border flex flex-row justify-between items-center px-4 h-[38px] w-[168px] border border-[#E4E4E7] rounded-[8px] gap-2.5 shadow-2xs select-none shrink-0">
              <span className="font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
                {isAvailable ? 'Available' : 'Unavailable'}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isAvailable}
                onClick={() => {
                  const newVal = !isAvailable;
                  setIsAvailable(newVal);
                  toast.success(`Availability set to ${newVal ? 'Available' : 'Unavailable'}`);
                }}
                className={`relative inline-flex h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full p-[2px] transition-colors duration-200 ease-in-out border-none outline-none ${
                  isAvailable ? 'bg-[#046C4E]' : 'bg-[#E4E4E7]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.15),0px_3px_1px_rgba(0,0,0,0.06)] transition duration-200 ease-in-out ${
                    isAvailable ? 'translate-x-[18px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Main Content Grid (Matches Frame 2147228844: Sidebar 362px + Map 906px) */}
      <div className="w-full max-w-[1280px] px-4 sm:px-0 pt-6 flex flex-col lg:flex-row gap-3 items-start">
        
        {/* Left Column: Orange Dashed Border Container (Matches 362px x 698px) */}
        <div className="w-full lg:w-[362px] h-[698px] bg-white border border-dashed border-[#F36922] rounded-[24px] p-4 sm:p-[16px_20px] flex flex-col shadow-xs overflow-y-auto shrink-0 select-none">
          
          {/* ================= STEP 1: INITIAL JOB LISTINGS ================= */}
          {step === 'list' && (
            <div className="flex flex-col gap-4 w-full">
              
              {/* Location Header (Matches Frame 2147228802) */}
              <div className="flex items-center gap-2 pb-3 border-b border-[#E4E4E7]">
                <MapPin className="w-5 h-5 text-[#F36922] fill-[#F36922] shrink-0" />
                <span className="font-rubik font-medium text-[14px] leading-[19px] text-[#000000] underline capitalize cursor-pointer">
                  1610 Durgan Union
                </span>
              </div>

              {/* Job Cards */}
              {MOCK_JOBS.map((job) => (
                <div key={job.id} className="flex flex-col gap-1.5 w-full">
                  
                  {/* Timestamp Header */}
                  <span className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                    {job.timeAgo}
                  </span>

                  {/* Card Box (Matches Frame 2147227197) */}
                  <div className="bg-[#F8F9FF] rounded-[16px] p-4 flex flex-col gap-3.5 border border-[#EFEFEF] shadow-2xs">
                    
                    {/* Title & Description */}
                    <div className="flex flex-col gap-2 border-b border-[#EFEFEF] pb-3">
                      <h3 className="font-rubik font-semibold text-[16px] leading-[20px] text-[#121111]">
                        {job.title}
                      </h3>
                      <p className="font-rubik font-light text-[14px] leading-[20px] text-[#565656] line-clamp-4">
                        {job.description}
                      </p>
                    </div>

                    {/* Caregiver/User Row */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full relative overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100">
                        <Image
                          src={job.user.avatar}
                          alt={job.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1 gap-1">
                        <div className="flex justify-between items-center w-full">
                          <span className="font-rubik font-semibold text-[16px] text-[#121111]">
                            {job.user.name}
                          </span>
                          <span className="font-rubik font-semibold text-[20px] text-[#121111]">
                            ${job.user.priceHourly}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#121111]" />
                            <span className="font-rubik font-medium text-[13px] text-[#121111]">
                              {job.user.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Compass className="w-3.5 h-3.5 text-[#121111]" />
                            <span className="font-rubik font-medium text-[13px] text-[#121111]">
                              {job.user.distance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Send Proposal Button */}
                    <button
                      type="button"
                      onClick={() => handleStartProposalClick(job)}
                      className="w-full h-[36px] bg-white hover:bg-neutral-50 rounded-[10px] text-[#F36922] font-rubik font-medium text-[14px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none shadow-2xs"
                    >
                      <span>Send Proposal</span>
                      <ArrowRight className="w-4 h-4 text-[#F36922]" />
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

          {/* ================= STEP 2: SEND PROPOSAL FORM (Matches Screenshot 1) ================= */}
          {step === 'proposal' && (
            <div className="flex flex-col w-full">
              
              {/* Header with Back Arrow */}
              <div className="flex items-center gap-2 pb-3 border-b border-[#EFEFEF] mb-3">
                <button
                  type="button"
                  onClick={() => setStep('list')}
                  className="w-7 h-7 flex items-center justify-center text-[#121111] hover:text-[#F36922] transition cursor-pointer border-none bg-transparent p-0"
                  aria-label="Back to jobs"
                >
                  <ArrowLeft className="w-5 h-5 text-[#121111]" />
                </button>
                <h2 className="font-rubik font-semibold text-[18px] text-[#121111]">
                  Send Proposal
                </h2>
              </div>

              {/* Selected Job Card Preview (Matches Screenshot 1) */}
              <div className="bg-[#F8F9FF] rounded-[16px] p-4 flex flex-col gap-3 border border-[#EFEFEF] shadow-2xs mb-4">
                <div className="flex flex-col gap-1.5 border-b border-[#EFEFEF] pb-3">
                  <h3 className="font-rubik font-semibold text-[16px] leading-[20px] text-[#121111]">
                    {selectedJob.title}
                  </h3>
                  <p className="font-rubik font-normal text-[13px] leading-[19px] text-[#565656]">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full relative overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100">
                    <Image
                      src={selectedJob.user.avatar}
                      alt={selectedJob.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-rubik font-semibold text-[16px] text-[#121111]">
                        {selectedJob.user.name}
                      </span>
                      <span className="font-rubik font-semibold text-[22px] text-[#121111]">
                        ${selectedJob.user.priceHourly}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-medium text-[13px] text-[#121111]">
                          {selectedJob.user.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-medium text-[13px] text-[#121111]">
                          {selectedJob.user.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Inputs (Matches Screenshot 1) */}
              <form onSubmit={handleSendProposal} className="flex flex-col gap-3 w-full">
                
                {/* Pay Rate Input */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-rubik font-semibold text-[15px] text-[#121111]">
                    Pay Rate
                  </label>
                  <input
                    type="text"
                    value={payRate}
                    onChange={(e) => setPayRate(e.target.value)}
                    placeholder="Rate here"
                    required
                    className="w-full h-[48px] bg-[#F8F9FF] border border-[#EFEFEF] rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder:text-[#8E8E93] outline-none focus:border-[#F36922] transition shadow-2xs"
                  />
                </div>

                {/* Proposal Textarea */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-rubik font-semibold text-[15px] text-[#121111]">
                    Proposal
                  </label>
                  <textarea
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    maxLength={1000}
                    placeholder="Description here"
                    required
                    className="w-full h-[150px] bg-[#F8F9FF] border border-[#EFEFEF] rounded-[16px] p-4 font-rubik text-[14px] text-[#121111] placeholder:text-[#8E8E93] resize-none outline-none focus:border-[#F36922] transition shadow-2xs"
                  />
                  <span className="font-rubik font-normal text-[13px] text-[#727272] text-right">
                    {proposalText.length}/1000
                  </span>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[14px] flex items-center justify-center transition cursor-pointer border-none shadow-sm mt-2"
                >
                  Send
                </button>

              </form>

            </div>
          )}

          {/* ================= STEP 3: WAITING FOR ACCEPTANCE (Matches Screenshot 2) ================= */}
          {step === 'waiting' && (
            <div className="flex flex-col w-full">
              
              {/* Header (Matches Screenshot 2) */}
              <div className="pb-3 border-b border-[#EFEFEF] mb-6">
                <h2 className="font-rubik font-semibold text-[17px] text-[#121111]">
                  Waiting for job acceptance
                </h2>
              </div>

              {/* Countdown Circular Badge & Text */}
              <div className="flex flex-col items-center">
                {/* Light Blue Circle with Orange Clock */}
                <div className="w-[110px] h-[110px] rounded-full bg-[#F0F5FF] flex items-center justify-center mb-4 shadow-2xs">
                  <div className="w-12 h-12 rounded-full border-[3.5px] border-[#F36922] flex items-center justify-center relative">
                    <Clock className="w-6 h-6 text-[#F36922]" />
                  </div>
                </div>

                {/* Timer Digits */}
                <span className="font-rubik font-bold text-[28px] leading-[34px] text-[#121111]">
                  {formatTimer(timeLeft)}
                </span>

                <span className="font-rubik font-normal text-[15px] text-[#565656] mt-1 mb-5">
                  Waiting to accept
                </span>

                {/* Solid Orange Progress Bar (Matches Screenshot 2) */}
                <div className="w-full h-[5px] bg-[#F36922] rounded-full mb-6 relative overflow-hidden">
                  <div
                    className="h-full bg-orange-300 opacity-30 transition-all duration-1000"
                    style={{ width: `${100 - (timeLeft / 60) * 100}%` }}
                  />
                </div>
              </div>

              {/* Job Preview Card (Matches Screenshot 2) */}
              <div className="bg-white rounded-[16px] p-4 flex flex-col gap-3 border border-[#EFEFEF] shadow-xs">
                <div className="flex flex-col gap-1.5 border-b border-[#EFEFEF] pb-3">
                  <h3 className="font-rubik font-semibold text-[16px] leading-[20px] text-[#121111]">
                    {selectedJob.title}
                  </h3>
                  <p className="font-rubik font-normal text-[13px] leading-[19px] text-[#565656]">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full relative overflow-hidden bg-neutral-200 shrink-0 border border-neutral-100">
                    <Image
                      src={selectedJob.user.avatar}
                      alt={selectedJob.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-rubik font-semibold text-[16px] text-[#121111]">
                        {selectedJob.user.name}
                      </span>
                      <span className="font-rubik font-semibold text-[22px] text-[#121111]">
                        ${selectedJob.user.priceHourly}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-medium text-[13px] text-[#121111]">
                          {selectedJob.user.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[#121111]" />
                        <span className="font-rubik font-medium text-[13px] text-[#121111]">
                          {selectedJob.user.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast-Forward Simulation Link for Demo */}
              <button
                type="button"
                onClick={() => setStep('accepted')}
                className="text-[12px] font-rubik text-[#F36922] hover:underline cursor-pointer bg-transparent border-none mt-4 text-center mx-auto"
              >
                (Fast-forward to Job Accepted)
              </button>

            </div>
          )}

          {/* ================= STEP 4: JOB ACCEPTED (Matches Screenshot 3) ================= */}
          {step === 'accepted' && (
            <div className="flex flex-col w-full h-full">
              
              {/* Header (Matches Screenshot 3) */}
              <div className="pb-3 border-b border-[#EFEFEF] mb-10">
                <h2 className="font-rubik font-semibold text-[17px] text-[#121111]">
                  Waiting for job acceptance
                </h2>
              </div>

              {/* Party Popper Icon inside Light Blue Circle */}
              <div className="flex flex-col items-center">
                <div className="w-[110px] h-[110px] rounded-full bg-[#F0F5FF] flex items-center justify-center mb-6 shadow-2xs">
                  <PartyPopper className="w-12 h-12 text-[#F36922]" />
                </div>

                {/* Job Accepted Title */}
                <h2 className="font-rubik font-bold text-[24px] text-[#121111] text-center mb-8">
                  Job Accepted
                </h2>

                {/* View Job CTA Button (Matches Screenshot 3) */}
                <button
                  type="button"
                  onClick={handleViewJob}
                  className="w-full h-[52px] bg-white hover:bg-neutral-50 border border-[#E4E4E7] text-[#121111] font-rubik font-medium text-[16px] rounded-[14px] shadow-2xs transition cursor-pointer flex items-center justify-center"
                >
                  View Job
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: High-Fidelity Texas Road & Radar Map (Matches Frame 2147228843: 906px x 698px) */}
        <div className="w-full lg:w-[906px] h-[698px] bg-white rounded-[24px] overflow-hidden relative shadow-xs shrink-0 border border-[#EFEFEF] select-none">
          
          {/* Map Base Canvas */}
          <div className="relative w-full h-full">
            <Image
              src="/images/texas_central_map.jpg"
              alt="Texas Interactive Navigation Map"
              fill
              className="object-cover"
              priority
            />

            {/* Radar concentric circular scan at Copperas Cove / Killeen / Central Texas */}
            <div className="absolute top-[48%] left-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              {/* Concentric Outer Wave (187px x 187px) */}
              <div className="w-[187px] h-[187px] rounded-full bg-[#714D3B]/40 flex items-center justify-center animate-pulse">
                {/* Center Pulse (81px x 81px) */}
                <div className="w-[81px] h-[81px] rounded-full bg-[#D26229] flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-white animate-ping opacity-75" />
                </div>
              </div>
            </div>

            {/* Orange Beacon Dots Scattered on Texas Map (Figma Coordinates) */}
            {mapBeacons.map((beacon, idx) => (
              <div
                key={idx}
                style={{ left: beacon.left, top: beacon.top }}
                className="absolute w-4 h-4 rounded-[8px] bg-[rgba(243,105,34,0.15)] backdrop-blur-[2.5px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform z-10"
              >
                <div className="w-2 h-2 rounded-full bg-[#F36922] animate-pulse" />
              </div>
            ))}

            {/* Live GPS Coordinates Overlay Badge */}
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md rounded-[10px] px-3.5 py-1.5 border border-[#EFEFEF] shadow-xs flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full bg-[#046C4E] animate-pulse" />
              <span className="font-rubik font-medium text-[12px] text-[#121111]">
                Real-Time Caregiver Radar Active
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Auth Guard Dialog Modal */}
      <AuthGuardDialog
        isOpen={isAuthGuardOpen}
        onClose={() => setIsAuthGuardOpen(false)}
      />

    </div>
  );
}
