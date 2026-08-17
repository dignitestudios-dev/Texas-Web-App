'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AlertTriangle,
  MapPin,
  Star,
  Clock,
  PartyPopper,
  ArrowRight,
} from 'lucide-react';

export default function GiverInstantJobPage() {
  const router = useRouter();

  // Step state: 'list' | 'proposal' | 'waiting' | 'accepted'
  const [step, setStep] = useState<'list' | 'proposal' | 'waiting' | 'accepted'>('list');

  // Proposal Form state
  const [payRate, setPayRate] = useState('');
  const [proposalText, setProposalText] = useState('');

  // Timer state (60s countdown)
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
    setStep('waiting');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col w-full items-center pb-16">
      {/* Top Header Title & Banner Container */}
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-[30px] flex flex-col gap-5">
        {/* Main Heading & Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="font-rubik font-semibold text-[36px] sm:text-[56px] leading-[44px] sm:leading-[66px] tracking-[-0.408px] text-[#121111]">
            Instant Job
          </h1>
          <p className="font-rubik font-light text-[16px] leading-[19px] tracking-[-0.408px] text-[#121111]">
            Find the perfect homecare job in Texas. We connect caregivers with families seeking support.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="flex items-center gap-2 font-rubik text-[14px] text-[#121111] leading-[17px] tracking-[-0.408px] flex-wrap">
          <AlertTriangle className="w-5 h-5 text-[#F36922] shrink-0" />
          <span className="font-medium text-[#000000]">
            Your First Instant Job Request is Free
          </span>
          <span className="text-[#3D3D3D]">
            Starting from your second instant request, a service fee of $10 per request will apply to connect you with nearby caregivers faster.
          </span>
        </div>
      </div>

      {/* Main Interactive Grid Container */}
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-6 flex flex-col lg:flex-row gap-[16px] items-start">
        {/* Left Orange Dashed Sidebar (362px) */}
        <div className="w-full lg:w-[362px] min-h-[664px] max-h-[664px] bg-white border border-dashed border-[#F36922] rounded-[24px] p-5 flex flex-col gap-4 shadow-xs overflow-y-auto shrink-0">
          
          {/* STEP 1: JOB LISTINGS */}
          {step === 'list' && (
            <div className="flex flex-col gap-4 w-full">
              {/* Location Bar */}
              <div className="flex items-center gap-2 pb-3 border-b border-[#E4E4E7]">
                <MapPin className="w-5 h-5 text-[#F36922] fill-[#F36922] text-white shrink-0" />
                <span className="font-general-sans font-medium text-[14px] text-[#000000] underline">
                  1610 Durgan Union
                </span>
              </div>

              {/* Card 1 */}
              <div className="bg-[#F8F9FF] rounded-[12px] p-4 flex flex-col gap-3 border border-[#EFEFEF] shadow-xs">
                <div className="flex flex-col gap-2 border-b border-[#EFEFEF] pb-3">
                  <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                    I need house cleaning service.
                  </h3>
                  <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
                    Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-[43px] h-[43px] rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
                    <Image src="/images/avatar.webp" alt="Nandi Bolard" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-rubik font-medium text-[16px] text-[#121111]">
                      Nandi Bolard
                    </span>
                    <div className="flex items-center gap-1.5 font-rubik text-[14px] text-[#121111]">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-light border-r border-[#121111] pr-2">5.0 (48)</span>
                      <span className="font-light pl-1">98 Services</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('proposal')}
                  className="w-full h-[34px] bg-white border border-[#FEF0E9] hover:bg-[#FEF0E9] text-[#F36922] font-inter font-medium text-[14px] rounded-[10px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none shadow-xs mt-1"
                >
                  <span>Send Proposal</span>
                  <ArrowRight className="w-4 h-4 text-[#F36922]" />
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F8F9FF] rounded-[12px] p-4 flex flex-col gap-3 border border-[#EFEFEF] shadow-xs">
                <div className="flex flex-col gap-2 border-b border-[#EFEFEF] pb-3">
                  <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                    I need house cleaning service.
                  </h3>
                  <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
                    Meet Jake, a busy professional who just moved into a new apartment. With his hectic schedule, he finds it challenging to keep his place tidy. That's why he's looking for a reliable house cleaning service to help him maintain a clean and welcoming home.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-[43px] h-[43px] rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
                    <Image src="/images/avatar.webp" alt="Nandi Bolard" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-rubik font-medium text-[16px] text-[#121111]">
                      Nandi Bolard
                    </span>
                    <div className="flex items-center gap-1.5 font-rubik text-[14px] text-[#121111]">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-light border-r border-[#121111] pr-2">5.0 (48)</span>
                      <span className="font-light pl-1">98 Services</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('proposal')}
                  className="w-full h-[34px] bg-white border border-[#FEF0E9] hover:bg-[#FEF0E9] text-[#F36922] font-inter font-medium text-[14px] rounded-[10px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none shadow-xs mt-1"
                >
                  <span>Send Proposal</span>
                  <ArrowRight className="w-4 h-4 text-[#F36922]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SEND PROPOSAL FORM */}
          {step === 'proposal' && (
            <form onSubmit={handleSendProposal} className="flex flex-col gap-4 w-full">
              <button
                type="button"
                onClick={() => setStep('list')}
                className="flex items-center gap-2 font-rubik font-normal text-[16px] text-[#121111] hover:text-[#F36922] transition border-b border-[#EFEFEF] pb-3 mb-1 w-full text-left bg-transparent border-none p-0 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Send Proposal</span>
              </button>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-rubik font-normal text-[14px] text-[#121111]">
                  Pay Rate
                </label>
                <input
                  type="text"
                  value={payRate}
                  onChange={(e) => setPayRate(e.target.value)}
                  placeholder="Rate here"
                  className="w-full bg-[#F8F9FF] rounded-[8px] border-none px-4 py-3 text-[14px] text-[#121111] placeholder:text-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#F36922]"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-rubik font-normal text-[14px] text-[#121111]">
                  Proposal
                </label>
                <textarea
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  maxLength={1000}
                  placeholder="Description here"
                  className="w-full bg-[#F8F9FF] rounded-[8px] border-none p-4 text-[14px] text-[#121111] placeholder:text-[#8E8E93] min-h-[140px] resize-none focus:outline-none focus:ring-1 focus:ring-[#F36922]"
                />
                <span className="font-rubik font-light text-[12px] text-[#8E8E93] text-right">
                  {proposalText.length}/1000
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-[44px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[8px] flex items-center justify-center transition cursor-pointer border-none shadow-xs mt-3"
              >
                Send
              </button>
            </form>
          )}

          {/* STEP 3: WAITING TIMER */}
          {step === 'waiting' && (
            <div className="flex flex-col gap-4 w-full">
              <h2 className="font-rubik font-normal text-[16px] text-[#121111] border-b border-[#EFEFEF] pb-3">
                Waiting for job acceptance
              </h2>

              <div className="flex flex-col items-center py-4">
                <div className="w-[80px] h-[80px] rounded-full bg-[#FEF0E9] flex items-center justify-center shadow-xs">
                  <Clock className="w-8 h-8 text-[#F36922]" />
                </div>
                <span className="font-rubik font-medium text-[24px] text-[#121111] mt-3">
                  {formatTimer(timeLeft)}
                </span>
                <span className="font-rubik font-light text-[14px] text-[#121111] mt-1">
                  Waiting to accept
                </span>

                {/* Progress Line */}
                <div className="w-full h-1.5 bg-[#F8F9FF] rounded-full overflow-hidden my-4">
                  <div
                    className="h-full bg-[#F36922] transition-all duration-1000"
                    style={{ width: `${(timeLeft / 60) * 100}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep('accepted')}
                  className="text-[12px] font-rubik text-[#F36922] underline cursor-pointer bg-transparent border-none"
                >
                  (Fast-forward to Job Accepted)
                </button>
              </div>

              {/* Preview Card */}
              <div className="bg-[#F8F9FF] rounded-[12px] p-4 flex flex-col gap-3 border border-[#EFEFEF] shadow-xs">
                <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                  I need house cleaning service.
                </h3>
                <p className="font-rubik font-light text-[14px] leading-[17px] text-[#3D3D3D]">
                  Meet Jake, a busy professional who just moved into a new apartment...
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-8 h-8 rounded-full relative overflow-hidden bg-neutral-100 shrink-0">
                    <Image src="/images/avatar.webp" alt="Nandi Bolard" fill className="object-cover" />
                  </div>
                  <span className="font-rubik font-medium text-[14px] text-[#121111]">
                    Nandi Bolard
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: JOB ACCEPTED CELEBRATION */}
          {step === 'accepted' && (
            <div className="flex flex-col gap-4 w-full">
              <h2 className="font-rubik font-normal text-[16px] text-[#121111] border-b border-[#EFEFEF] pb-3">
                Waiting for job acceptance
              </h2>

              <div className="flex flex-col items-center py-6 gap-3">
                <div className="w-[80px] h-[80px] rounded-full bg-[#F8F9FF] flex items-center justify-center shadow-xs">
                  <PartyPopper className="w-8 h-8 text-[#F36922]" />
                </div>
                <h3 className="font-rubik font-bold text-[24px] text-[#121111]">
                  Job Accepted
                </h3>

                <button
                  type="button"
                  onClick={() => router.push('/my-jobs')}
                  className="w-full h-[42px] bg-white border border-[#EFEFEF] hover:bg-[#F8F9FF] text-[#121111] font-rubik font-medium text-[15px] rounded-[8px] flex items-center justify-center transition cursor-pointer shadow-xs mt-2"
                >
                  View Job
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Interactive Texas Map Container (906px) */}
        <div className="w-full lg:w-[906px] min-h-[664px] max-h-[664px] bg-white rounded-[24px] border border-[#EFEFEF] overflow-hidden relative shadow-xs shrink-0 flex flex-col">
          {/* Map Vector Mockup Canvas */}
          <div className="w-full h-full bg-[#E5F3E5] relative flex items-center justify-center overflow-hidden">
            {/* Map Background Grid/SVG */}
            <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url('/images/home/search.webp')` }} />
            <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[1px]" />

            {/* Texas City Pins */}
            {[
              { name: 'Dallas', top: '22%', left: '68%' },
              { name: 'Fort Worth', top: '24%', left: '62%' },
              { name: 'Austin', top: '56%', left: '54%' },
              { name: 'San Antonio', top: '68%', left: '48%' },
              { name: 'Houston', top: '65%', left: '80%' },
              { name: 'Waco', top: '42%', left: '60%' },
              { name: 'Abilene', top: '35%', left: '38%' },
            ].map((city, idx) => (
              <div
                key={idx}
                style={{ top: city.top, left: city.left }}
                className="absolute flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-md z-10 hover:scale-110 transition cursor-pointer"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#F36922] animate-pulse" />
                <span className="font-rubik font-medium text-[12px] text-[#121111]">
                  {city.name}
                </span>
              </div>
            ))}

            {/* Central Texas Watermark */}
            <div className="absolute bottom-6 right-8 font-rubik font-semibold text-[32px] text-[#F36922]/30 select-none pointer-events-none">
              TEXAS CAREGIVER MAP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
