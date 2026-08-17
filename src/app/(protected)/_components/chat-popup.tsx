'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus sit urna gravida at erat ipsum. Caregivers and care seekers can connect quickly and manage schedules with full flexibility.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "Our platform provides transparent profiles, verified background reviews, and real-time chat tools to ensure a safe and trustworthy caregiving environment.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "You can post care requests, set custom hourly rates, state specific medical or non-medical needs, and receive responses from qualified caregivers nearby.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "Care seekers can save top caregiver profiles to their Favorites list and compare qualifications before sending booking invitations.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "Users can switch seamlessly between Care Seeker and Caregiver accounts at any time from a single unified profile.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "All care logs, job details, messaging, and review history are stored securely and accessible directly within your user dashboard.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet Consectetur. Purus Sit Urna Gravida At Erat Ipsum.",
    answer: "For instant support or emergency care arrangements, use our 'Find Care Fast' feature to alert active caregivers in your immediate vicinity.",
  },
];

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open FAQ Chatbot"
        className="fixed bottom-[40px] right-[40px] lg:bottom-[120px] lg:right-[120px] w-[90px] h-[90px] lg:w-[100px] lg:h-[100px] bg-[#0A0A6E] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform z-40 select-none outline-none border-none"
      >
        <Image src="/images/home/float-chat.webp" alt="Chat" width={51} height={51} />
      </button>

      {/* Centered Dialog Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100vw-32px)] sm:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1080px] max-h-[85vh] bg-white border border-[#EFEFEF]/86 rounded-[24px] p-6 lg:p-[48px_64px] flex flex-col gap-6 lg:gap-8 shadow-2xl overflow-y-auto no-scrollbar outline-none">
          {/* Header */}
          <div className="w-full flex justify-center items-center shrink-0">
            <h2 className="font-rubik font-semibold text-[24px] lg:text-[32px] leading-[38px] tracking-[-0.408px] text-black text-center capitalize">
              Frequently Asked questions
            </h2>
          </div>

          {/* FAQ List */}
          <div className="flex flex-col gap-[14px] lg:gap-[18px] w-full flex-1">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggleItem(idx)}
                  className={`w-full flex flex-col justify-between py-[14px] px-[18px] lg:py-[18px] lg:px-[32px] rounded-[12px] transition-all duration-300 cursor-pointer shrink-0 border ${
                    isOpen
                      ? 'bg-[#0A0A6E] text-white border-[#0A0A6E] shadow-md'
                      : 'bg-[#FEF5F1] text-black border-[#F36922]/10 hover:bg-[#FDF1EB]'
                  }`}
                >
                  {/* Top Bar: Icon + Question + Action Button */}
                  <div className="flex items-center justify-between gap-[12px]">
                    <div className="flex items-center gap-[10px] lg:gap-[14px] flex-1">
                      {/* Question Icon */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-rubik font-bold text-[13px] shrink-0 select-none transition-colors ${
                          isOpen
                            ? 'bg-white text-[#0A0A6E]'
                            : 'bg-[#F36922] text-white'
                        }`}
                      >
                        ?
                      </div>

                      {/* Question Text */}
                      <span
                        className={`font-rubik font-semibold text-[13px] lg:text-[15px] leading-[22px] lg:leading-[25px] text-left capitalize transition-colors ${
                          isOpen ? 'text-white' : 'text-black'
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    {/* Plus / Minus Icon */}
                    {isOpen ? (
                      <Minus className="w-5 h-5 lg:w-6 lg:h-6 text-white stroke-[2.7] shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 lg:w-6 lg:h-6 text-[#F36922] stroke-[2.7] shrink-0" />
                    )}
                  </div>

                  {/* Answer Section */}
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-white/20 animate-in fade-in-50 duration-200">
                      <p className="font-rubik font-normal text-[13px] lg:text-[14px] leading-relaxed text-white/90">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

