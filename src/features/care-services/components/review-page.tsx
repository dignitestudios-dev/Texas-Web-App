'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Bell,
  ChevronDown,
  AlertTriangle,
  Check,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const CAREGIVERS_DATA: Record<
  string,
  { name: string; avatar: string; rating: number; reviews: number; specialty: string }
> = {
  'john-doe': {
    name: 'John Doe',
    avatar: '/images/avatar.webp',
    rating: 5.0,
    reviews: 48,
    specialty: 'Elderly Care Specialist',
  },
  'nandi-bolard': {
    name: 'Nandi Bolard',
    avatar: '/images/avatar.webp',
    rating: 5.0,
    reviews: 48,
    specialty: 'Nursing Care Specialist',
  },
  'mark-taylor': {
    name: 'Mark Taylor',
    avatar: '/images/avatar.webp',
    rating: 5.0,
    reviews: 48,
    specialty: 'Elderly Care Specialist',
  },
  'james-brown': {
    name: 'James Brown',
    avatar: '/images/giver.webp',
    rating: 5.0,
    reviews: 48,
    specialty: 'Child Care Specialist',
  },
  'sara-wilson': {
    name: 'Sara Wilson',
    avatar: '/images/avatar.webp',
    rating: 5.0,
    reviews: 48,
    specialty: 'Hospice Support Specialist',
  },
  'maria-garcia': {
    name: 'Maria Garcia',
    avatar: '/images/giver.webp',
    rating: 5.0,
    reviews: 48,
    specialty: 'Homework Assistance Specialist',
  },
};

export default function ReviewPage({ id }: { id: string }) {
  const router = useRouter();
  const caregiver = CAREGIVERS_DATA[id] || CAREGIVERS_DATA['john-doe'];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState('');

  // Modals / Feedback state
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isReportSuccess, setIsReportSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      router.push('/care-services');
    }, 2000);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setIsReportSuccess(true);
    setTimeout(() => {
      setIsReportSuccess(false);
      router.push('/care-services');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative w-full overflow-x-hidden">


      {/* Main Review Section wrapper */}
      <main className="flex-1 bg-[#FFF6F0]/20 relative z-10 w-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[20px] pb-[100px]">
        {/* Absolute Peach Gradient Backdrop */}
        <div className="absolute inset-0 bg-[#F36922]/10 pointer-events-none z-0" />

        {/* Back Button Row (Left Aligned) */}
        <div className="w-full max-w-[1280px] flex items-center justify-start z-10">
          <button
            onClick={() => router.back()}
            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Main Review Feedback Card */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-[1280px] bg-white border border-neutral-100 p-[32px] rounded-[12px] shadow-lg flex flex-col gap-[24px] text-left animate-in fade-in duration-300"
        >
          {/* Header Row: Caregiver Avatar and Rating info */}
          <div className="flex flex-row items-center gap-[13px] w-full">
            {/* Avatar */}
            <div className="w-[43px] h-[43px] bg-[#F8F9FF] rounded-full overflow-hidden shrink-0 border border-neutral-100 relative">
              <Image
                src={caregiver.avatar}
                alt={caregiver.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Title Column */}
            <div className="flex flex-col justify-center items-start gap-[6px]">
              <span className="font-poppins font-bold text-[18px] text-[#333333] leading-[24px] tracking-tight">
                {caregiver.name}
              </span>
              <div className="flex flex-row items-center gap-[8px]">
                <span className="font-rubik font-light text-[14px] text-[#121111] border-r border-[#121111] pr-2 leading-[17px]">
                  {caregiver.specialty}
                </span>
                <div className="flex items-center gap-[2px]">
                  <Star className="w-[16px] h-[16px] fill-[#FFC107] stroke-none" />
                  <span className="font-rubik font-light text-[14px] text-[#121111] leading-[17px]">
                    {caregiver.rating.toFixed(1)} ({caregiver.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line 508 */}
          <div className="w-full h-px bg-[#DBDBDB]" />

          {/* Feedback section title */}
          <div className="flex flex-col gap-2 w-full">
            <h3 className="font-sans font-medium text-[16px] text-[#181818] leading-[19px]">
              How was the Service giver?
            </h3>
            <p className="font-sans font-normal text-[16px] text-[#565656] leading-[19px]">
              We value your feedback! It will help us to improve our service. Thank you.
            </p>
          </div>

          {/* Divider Line 509 */}
          <div className="w-full h-px bg-[#DBDBDB]" />

          {/* Stars selector row */}
          <div className="flex flex-col gap-3 w-full">
            <span className="font-sans font-medium text-[16px] text-[#181818] leading-[19px]">
              Your Rating
            </span>
            <div className="flex flex-row items-center gap-1.5 h-[42px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="cursor-pointer border-none bg-transparent p-0 outline-none transition hover:scale-105"
                >
                  <Star
                    className={`w-[28px] h-[28px] ${star <= (hoverRating || rating)
                        ? 'fill-[#FFC107] text-[#FFC107]'
                        : 'text-[#D2D2D2]'
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Description Textarea */}
          <div className="w-full h-[131px] bg-white border border-[#ECECEC] rounded-[12px] p-[15px_16px] flex items-stretch">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none resize-none font-poppins text-[16px] text-[#181818] placeholder-[#A3A3A3] leading-[120%]"
            />
          </div>

          {/* Bottom Action buttons */}
          <div className="flex flex-row items-center gap-4 mt-2">
            {/* Submit Button */}
            <button
              type="submit"
              disabled={rating === 0}
              className={`w-[102px] h-[48px] text-white rounded-[4px] flex items-center justify-center font-poppins font-medium text-[16px] transition border-none outline-none shadow-sm ${rating === 0
                  ? 'bg-neutral-300 cursor-not-allowed'
                  : 'bg-[#F36922] hover:bg-[#e05813] cursor-pointer'
                }`}
            >
              Submit
            </button>

            {/* Report Caregiver */}
            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="w-[181px] h-[48px] bg-white border border-[#F36922] text-[#F36922] rounded-[4px] flex items-center justify-center font-poppins font-medium text-[16px] cursor-pointer transition hover:bg-neutral-50 outline-none shadow-sm"
            >
              Report Caregiver
            </button>
          </div>
        </form>
      </main>

      {/* Styled Footer Block */}
      <footer className="w-full bg-[#0A0A6E] py-[50px] px-8 lg:px-[180px] shrink-0 text-white flex flex-col gap-[50px]">
        {/* Top Info section */}
        <div className="w-full max-w-[1080px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-[40px] text-center sm:text-left">
          {/* Logo element */}
          <div className="flex items-center gap-3">
            <div className="w-[110px] h-[125px] relative">
              <Image
                src="/images/logo.png"
                alt="Texas Caregiver Alliance Logo"
                fill
                className="object-contain filter brightness-0 invert"
              />
            </div>
            <span className="font-rubik font-bold text-[24px] tracking-tight">
              Texas Caregiver Alliance
            </span>
          </div>

          {/* Quick links block */}
          <div className="flex flex-wrap items-center justify-center gap-x-[38px] gap-y-2 text-[15px] font-rubik text-white/80">
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition font-sans">Contact Us</Link>
            <Link href="/about" className="hover:text-white transition font-sans">About Us</Link>
            <Link href="/welcome" className="hover:text-white transition font-sans">Your Account</Link>
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full max-w-[1080px] mx-auto h-px bg-white/20" />

        {/* Copyright notice */}
        <div className="text-center font-rubik text-[18px] text-white/90">
          © 2026 Texas Caregiver | All Rights Reserved
        </div>
      </footer>

      {/* Submit Feedback Success Dialog */}
      <Dialog open={isSubmitSuccess} onOpenChange={setIsSubmitSuccess}>
        <DialogContent showCloseButton={false} className="w-[360px] max-w-full p-[32px] bg-white border-none shadow-2xl rounded-[16px] overflow-hidden flex flex-col items-center gap-[16px] text-center animate-in fade-in duration-200">
          <div className="sr-only">
            <DialogTitle>Feedback Submitted</DialogTitle>
            <DialogDescription>Your rating and comments have been recorded</DialogDescription>
          </div>
          <div className="w-[48px] h-[48px] bg-[#F36922]! rounded-[12px] flex items-center justify-center text-white shrink-0 shadow-md">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <h4 className="font-sans font-semibold text-[20px] text-[#181818]">
            Feedback Submitted
          </h4>
          <p className="font-sans font-normal text-[14px] leading-[19px] text-[#565656]">
            Thank you! Your feedback has been submitted successfully.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent showCloseButton={false} className="w-[471px] max-w-full p-[14px_16px] bg-[#FEF0E9] border-none shadow-2xl rounded-[10px] overflow-hidden flex flex-col gap-[24px] animate-in fade-in duration-200">
          <div className="flex flex-row justify-between items-center w-full">
            <DialogTitle className="font-sans font-medium text-[20px] text-[#181818] leading-[24px]">
              Report Reason
            </DialogTitle>
            <button
              type="button"
              onClick={() => setIsReportOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center cursor-pointer border-none transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#181818" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="sr-only">
            <DialogDescription>Input reasons for reporting this caregiver</DialogDescription>
          </div>

          {/* Textarea container Frame 2085663286 */}
          <div className="w-full h-[131px] bg-white border border-[#ECECEC] rounded-[12px] p-[15px_16px] flex items-stretch">
            <textarea
              placeholder="Reason"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none resize-none font-sans text-[14px] text-[#181818] placeholder-[#A3A3A3] leading-[120%]"
            />
          </div>

          {/* Submit Button Frame 2085663287 */}
          <button
            type="button"
            disabled={!reportReason.trim()}
            onClick={handleReportSubmit}
            className={`w-full h-[48px] text-white rounded-[14px] flex items-center justify-center font-sans font-semibold text-[14px] leading-[17px] text-center capitalize transition border-none outline-none shadow-sm ${!reportReason.trim()
                ? 'bg-neutral-300 cursor-not-allowed'
                : 'bg-[#F36922] hover:bg-[#e05813] cursor-pointer'
              }`}
          >
            Submit
          </button>
        </DialogContent>
      </Dialog>

      {/* Report Success Notification */}
      <Dialog open={isReportSuccess} onOpenChange={setIsReportSuccess}>
        <DialogContent showCloseButton={false} className="w-[360px] max-w-full p-[32px] bg-white border-none shadow-2xl rounded-[16px] overflow-hidden flex flex-col items-center gap-[16px] text-center animate-in fade-in duration-200">
          <div className="sr-only">
            <DialogTitle>Report Submitted</DialogTitle>
            <DialogDescription>Issue report has been logged</DialogDescription>
          </div>
          {/* Orange Checkmark Badge */}
          <div className="w-[48px] h-[48px] bg-[#F36922]! rounded-[12px] flex items-center justify-center text-white shrink-0 shadow-md">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <h4 className="font-sans font-semibold text-[20px] text-[#181818]">
            Report Submitted
          </h4>
          <p className="font-sans font-normal text-[14px] leading-[19px] text-[#565656]">
            Your report has been submitted. We’ll investigate the issue!
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
