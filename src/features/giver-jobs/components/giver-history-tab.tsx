'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Info,
  Clock,
  Calendar,
  MapPin,
  Navigation,
  Star,
  ArrowRight,
  BadgeDollarSign,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export interface HistoryItem {
  id: string;
  badge?: string;
  status: 'Completed' | 'Canceled';
  title?: string;
  category: string;
  budgetRange?: string;
  description?: string;
  time?: string;
  date?: string;
  location?: string;
  distance?: string;
  seekerName: string;
  seekerAvatar: string;
  seekerRating: number;
  seekerReviews: number;
  seekerServices: number;
  cancellationReason?: string;
  review?: {
    stars: number;
    date: string;
    text: string;
    reviewerName: string;
    reviewerAvatar: string;
  };
  hasReviewAction?: boolean;
}

const COMPLETED_HISTORY: HistoryItem[] = [
  {
    id: 'comp-1',
    badge: 'Instant Job',
    status: 'Completed',
    category: 'Elderly Care',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
    review: {
      stars: 4,
      date: '21 Feb',
      text: 'John was incredibly patient and caring with my father. Highly recommended!',
      reviewerName: 'Sarah M.',
      reviewerAvatar: '/images/giver.webp',
    },
  },
  {
    id: 'comp-2',
    status: 'Completed',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    budgetRange: '$200 - $300',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
    hasReviewAction: true,
  },
];

const CANCELED_HISTORY: HistoryItem[] = [
  {
    id: 'canc-1',
    status: 'Canceled',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    cancellationReason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
  },
  {
    id: 'canc-2',
    status: 'Canceled',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    cancellationReason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
  },
  {
    id: 'canc-3',
    status: 'Canceled',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    cancellationReason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
  },
];

export function GiverHistoryTab() {
  const router = useRouter();
  const [subTab, setSubTab] = useState<'completed' | 'canceled'>('completed');

  // Review Dialog State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const currentList = subTab === 'completed' ? COMPLETED_HISTORY : CANCELED_HISTORY;

  const handleOpenReview = () => {
    setReviewRating(5);
    setReviewText('');
    setReviewSubmitted(false);
    setIsReviewOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewOpen(false);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col gap-6 items-start pb-8">
      {/* Sub-tabs row */}
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => setSubTab('completed')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none outline-none shadow-xs ${
            subTab === 'completed'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Completed
        </button>
        <button
          type="button"
          onClick={() => setSubTab('canceled')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none outline-none shadow-xs ${
            subTab === 'canceled'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Canceled
        </button>
      </div>

      {/* Info Notice Banner */}
      <div className="flex items-center gap-2 font-rubik font-medium text-[16px] text-[#121111]">
        <Info className="w-5 h-5 text-[#121111]/70 shrink-0" />
        <span>View your completed and canceled care request.</span>
      </div>

      {/* History Items Container */}
      <div className="w-full flex flex-col gap-5">
        {currentList.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-[1080px] bg-white rounded-[16px] p-6 shadow-sm border border-[#EFEFEF]/86 flex flex-col gap-4"
          >
            {/* Completed Card View */}
            {item.status === 'Completed' ? (
              <>
                {/* Header Row: Seeker info / Title + Status Badges */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                  {/* Left: If no title, show Seeker Info top; if title exists, show title */}
                  {item.title ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative bg-neutral-100 shrink-0">
                          <Image src={item.seekerAvatar} alt={item.seekerName} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-rubik font-medium text-[15px] leading-[18px] text-[#121111]">
                            {item.seekerName}
                          </span>
                          <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                            <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                            <span className="font-normal text-[#121111]">{item.seekerRating.toFixed(1)}</span>
                            <span>({item.seekerReviews})</span>
                            <span>|</span>
                            <span>{item.seekerServices} Services</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-rubik font-semibold text-[17px] leading-[22px] tracking-[-0.005em] text-[#121111] mt-1">
                        {item.title}
                      </h3>
                      <span className="font-rubik font-normal text-[14px] leading-[17px] text-[#727272]">
                        {item.category}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative bg-neutral-100 shrink-0">
                          <Image src={item.seekerAvatar} alt={item.seekerName} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-rubik font-medium text-[15px] leading-[18px] text-[#121111]">
                            {item.seekerName}
                          </span>
                          <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                            <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                            <span className="font-normal text-[#121111]">{item.seekerRating.toFixed(1)}</span>
                            <span>({item.seekerReviews})</span>
                            <span>|</span>
                            <span>{item.seekerServices} Services</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-rubik font-normal text-[14px] leading-[17px] text-[#727272] mt-2">
                        {item.category}
                      </span>
                    </div>
                  )}

                  {/* Right: Badges */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {item.badge && (
                      <span className="bg-[#1D68FF] text-white text-[13px] font-medium font-rubik px-3.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <span className="bg-[#E6F4EA] text-[#137333] text-[13px] font-medium font-rubik px-3.5 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                    {item.description}
                  </p>
                )}

                {/* Metadata Row */}
                <div className="flex items-center gap-x-6 gap-y-2 flex-wrap font-rubik text-[13px] text-[#181818]">
                  {item.budgetRange && (
                    <div className="flex items-center gap-1.5">
                      <BadgeDollarSign className="w-4 h-4 text-[#181818] shrink-0" />
                      <span>{item.budgetRange}</span>
                    </div>
                  )}
                  {item.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#181818] shrink-0" />
                      <span>{item.time}</span>
                    </div>
                  )}
                  {item.date && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#181818] shrink-0" />
                      <span>{item.date}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#181818] shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.distance && (
                    <div className="flex items-center gap-1.5">
                      <Navigation className="w-4 h-4 text-[#181818] shrink-0" />
                      <span>{item.distance}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div className="flex justify-between items-center w-full pt-1">
                  {item.hasReviewAction ? (
                    <button
                      type="button"
                      onClick={handleOpenReview}
                      className="h-[40px] px-8 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border-none shadow-xs flex items-center justify-center"
                    >
                      Review
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={() => router.push(`/my-jobs/${item.id}`)}
                    className="h-[40px] px-6 bg-[#0A0A6E] hover:bg-[#080856] text-white rounded-full font-rubik font-medium text-[14px] leading-[18px] transition cursor-pointer border-none shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Embedded Review Box */}
                {item.review && (
                  <div className="mt-2 pt-4 border-t border-[#EFEFEF] flex flex-col gap-2.5">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= item.review!.stars
                                ? 'fill-[#FFC107] text-[#FFC107]'
                                : 'fill-neutral-200 text-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-rubik text-[13px] text-[#727272]">
                        {item.review.date}
                      </span>
                    </div>
                    <p className="font-rubik font-normal text-[14px] leading-[20px] text-[#121111]">
                      {item.review.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-[24px] h-[24px] rounded-full overflow-hidden relative bg-neutral-100 shrink-0">
                        <Image src={item.review.reviewerAvatar} alt={item.review.reviewerName} fill className="object-cover" />
                      </div>
                      <span className="font-rubik font-medium text-[13px] text-[#121111]">
                        {item.review.reviewerName}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Canceled Card View */
              <>
                {/* Top Row: Title & Subtitle + Canceled Badge */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-rubik font-semibold text-[17px] leading-[22px] tracking-[-0.005em] text-[#121111]">
                      {item.title}
                    </h3>
                    <span className="font-rubik font-normal text-[14px] leading-[17px] text-[#727272]">
                      {item.category}
                    </span>
                  </div>

                  <span className="bg-[#FCE8E6] text-[#C5221F] text-[13px] font-medium font-rubik px-3.5 py-1 rounded-full shrink-0">
                    Cancelled
                  </span>
                </div>

                {/* Cancellation Reason Section */}
                <div className="flex flex-col gap-1 mt-1">
                  <span className="font-rubik font-medium text-[14px] leading-[18px] text-[#C5221F]">
                    Cancellation reason
                  </span>
                  <p className="font-rubik font-normal text-[14px] leading-[22px] tracking-[-0.005em] text-[#3D3D3D]">
                    {item.cancellationReason}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#EFEFEF] my-1" />

                {/* Careseeker Info Row */}
                <div className="flex items-center gap-3">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative bg-neutral-100 shrink-0">
                    <Image src={item.seekerAvatar} alt={item.seekerName} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-rubik font-medium text-[15px] leading-[18px] text-[#121111]">
                      {item.seekerName}
                    </span>
                    <div className="flex items-center gap-1.5 font-rubik text-[13px] text-[#565656]">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                      <span className="font-normal text-[#121111]">{item.seekerRating.toFixed(1)}</span>
                      <span>({item.seekerReviews})</span>
                      <span>|</span>
                      <span>{item.seekerServices} Services</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white rounded-2xl p-6 border-none shadow-xl">
          <DialogTitle className="font-rubik font-semibold text-[20px] text-[#121111]">
            Rate &amp; Review Careseeker
          </DialogTitle>
          <DialogDescription className="font-rubik font-light text-[14px] text-[#565656] mt-1">
            Share your feedback regarding your completed care service.
          </DialogDescription>

          {reviewSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center gap-2">
              <span className="text-4xl">🎉</span>
              <h4 className="font-rubik font-medium text-[18px] text-[#121111]">
                Thank you for your review!
              </h4>
              <p className="font-rubik text-[14px] text-[#565656]">
                Your feedback has been published successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition ${
                          star <= reviewRating
                            ? 'fill-[#FFC107] text-[#FFC107]'
                            : 'fill-neutral-200 text-neutral-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Feedback / Comments
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Describe your experience working on this job..."
                  className="w-full bg-[#F8F9FF] border border-[#EFEFEF] rounded-xl p-3.5 font-rubik text-[14px] text-[#121111] outline-none focus:border-[#0A0A6E]"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 font-rubik text-[14px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0A0A6E] hover:bg-[#080856] text-white font-rubik font-medium text-[14px] transition cursor-pointer border-none shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
