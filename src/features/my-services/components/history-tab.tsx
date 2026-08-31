'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Info, Star, Clock, Calendar, MapPin, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { HistoryItem, HistorySubTab } from '../types/my-services.types';

const MOCK_HISTORY_COMPLETED: HistoryItem[] = [
  {
    id: 'hist-comp-1',
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
    status: 'Completed',
    review: {
      rating: 4,
      comment: 'John was incredibly patient and caring with my father. Highly recommended!',
      date: '21 Feb',
      reviewerName: 'Sarah M.',
      reviewerAvatar: '/images/avatar.webp',
    },
  },
  {
    id: 'hist-comp-2',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    description:
      "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
    budgetRange: '$200 - $300',
    time: '12:00 PM',
    date: '12 Dec 23',
    location: 'San Juan, Texas',
    distance: '14 miles away',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
    status: 'Completed',
  },
];

const MOCK_HISTORY_CANCELED: HistoryItem[] = [
  {
    id: 'hist-canc-1',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    status: 'Cancelled',
    cancellationReason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
  },
  {
    id: 'hist-canc-2',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    status: 'Cancelled',
    cancellationReason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
  },
  {
    id: 'hist-canc-3',
    title: 'Elderly Care Assistant Seeking Job',
    category: 'Elderly Care',
    status: 'Cancelled',
    cancellationReason:
      'Lorem ipsum dolor sit amet consectetur. Eros tellus viverra parturient porttitor rutrum quis viverra tortor mi. Elementum purus volutpat ornare pharetra rutrum magna lacinia neque proin.',
    seekerName: 'John Doe',
    seekerAvatar: '/images/avatar.webp',
    seekerRating: 5.0,
    seekerReviews: 48,
    seekerServices: 98,
  },
];

interface HistoryTabProps {
  subTab: HistorySubTab;
  onSubTabChange: (subTab: HistorySubTab) => void;
  searchQuery?: string;
}

export function HistoryTab({
  subTab,
  onSubTabChange,
  searchQuery = '',
}: HistoryTabProps) {
  const router = useRouter();
  const [completedHistory, setCompletedHistory] = useState<HistoryItem[]>(MOCK_HISTORY_COMPLETED);
  const [canceledHistory] = useState<HistoryItem[]>(MOCK_HISTORY_CANCELED);

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleOpenReviewDialog = () => {
    setIsReviewOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error('Please enter your review comments.');
      return;
    }

    setCompletedHistory((prev) => [
      {
        ...prev[1],
        review: {
          rating: reviewRating,
          comment: reviewComment,
          date: 'Today',
          reviewerName: 'Nandi Bolard',
          reviewerAvatar: '/images/avatar.webp',
        },
      },
      prev[0],
    ]);

    setIsReviewOpen(false);
    setReviewComment('');
    toast.success('Review submitted successfully!');
  };

  const filteredHistory = (
    subTab === 'completed' ? completedHistory : canceledHistory
  ).filter(
    (h) =>
      (h.title || h.category).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.cancellationReason || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.seekerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Info Banner */}
      <div className="flex items-center gap-2 font-rubik font-semibold text-[15px] leading-[20px] text-[#121111]">
        <Info className="w-4 h-4 text-[#121111] shrink-0" />
        <span>View your completed and canceled care services.</span>
      </div>

      {/* Sub-Tab Switcher (Completed / Canceled) */}
      <div className="flex items-center gap-3.5 mt-1">
        <button
          type="button"
          onClick={() => onSubTabChange('completed')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none shadow-xs ${
            subTab === 'completed'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Completed
        </button>
        <button
          type="button"
          onClick={() => onSubTabChange('canceled')}
          className={`h-[48px] px-8 rounded-full font-rubik font-medium text-[16px] transition cursor-pointer border-none shadow-xs ${
            subTab === 'canceled'
              ? 'bg-[#0A0A6E] text-white shadow-sm'
              : 'bg-white text-[#121111] hover:bg-[#F8F9FF]'
          }`}
        >
          Canceled
        </button>
      </div>

      {/* History Cards List */}
      <div className="flex flex-col gap-4 w-full mt-2">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[20px] p-6 shadow-sm border border-[#EFEFEF] flex flex-col gap-3.5 w-full hover:shadow-md transition-shadow"
            >
              {/* ================= COMPLETED CARD VIEW ================= */}
              {item.status === 'Completed' ? (
                <>
                  {/* Header Row: Seeker Info + Completed Status Badge */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full relative overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                        <Image
                          src={item.seekerAvatar}
                          alt={item.seekerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-rubik font-bold text-[15px] text-[#121111]">
                          {item.seekerName}
                        </span>
                        <div className="flex items-center gap-1.5 font-rubik text-[12px] text-[#565656]">
                          <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                          <span className="font-medium text-[#121111]">
                            {item.seekerRating.toFixed(1)} ({item.seekerReviews})
                          </span>
                          <span>| {item.seekerServices} Services</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#E8F8F0] text-[#0E7048] font-rubik font-medium text-[13px] px-4 py-1 rounded-full">
                      Completed
                    </div>
                  </div>

                  {/* Job Category / Title */}
                  <div>
                    {item.title ? (
                      <>
                        <h4 className="font-rubik font-bold text-[16px] text-[#121111]">
                          {item.title}
                        </h4>
                        <span className="font-rubik text-[13px] text-[#565656]">
                          {item.category}
                        </span>
                      </>
                    ) : (
                      <span className="font-rubik text-[13px] text-[#565656]">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="font-rubik font-normal text-[13px] leading-[20px] text-[#565656]">
                      {item.description}
                    </p>
                  )}

                  {/* Metadata Details Row */}
                  <div className="flex flex-wrap items-center gap-4 text-[13px] font-rubik text-[#565656]">
                    {item.budgetRange && (
                      <span className="font-rubik font-medium text-[#121111]">
                        {item.budgetRange}
                      </span>
                    )}
                    {item.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#727272]" />
                        <span>{item.time}</span>
                      </div>
                    )}
                    {item.date && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#727272]" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#727272]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.distance && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#727272]" />
                        <span>{item.distance}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="flex justify-between items-center gap-3 pt-2">
                    {!item.review && (
                      <button
                        type="button"
                        onClick={handleOpenReviewDialog}
                        className="h-[38px] px-8 bg-[#0A0A6E] hover:bg-[#080856] text-white font-rubik font-medium text-[13px] rounded-full transition cursor-pointer border-none shadow-2xs"
                      >
                        Review
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => router.push(`/my-jobs/${item.id}`)}
                      className="h-[38px] px-6 bg-[#0A0A6E] hover:bg-[#080856] text-white font-rubik font-medium text-[13px] rounded-full transition cursor-pointer border-none flex items-center gap-1.5 ml-auto shadow-2xs"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Embedded Review Box if present */}
                  {item.review && (
                    <div className="w-full bg-[#F8F9FF] border border-[#EFEFEF] rounded-[14px] p-4 flex flex-col gap-2 mt-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= item.review!.rating
                                  ? 'fill-[#FFC107] text-[#FFC107]'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-rubik text-[12px] text-[#727272]">
                          {item.review.date}
                        </span>
                      </div>

                      <p className="font-rubik text-[13px] leading-[19px] text-[#121111]">
                        {item.review.comment}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-6 h-6 rounded-full relative overflow-hidden bg-neutral-200">
                          <Image
                            src={item.review.reviewerAvatar}
                            alt={item.review.reviewerName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-rubik font-medium text-[12px] text-[#121111]">
                          {item.review.reviewerName}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* ================= CANCELED CARD VIEW ================= */
                <>
                  {/* Header Row: Title & Cancelled Status Badge */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-rubik font-bold text-[16px] text-[#121111]">
                        {item.title}
                      </h4>
                      <span className="font-rubik text-[13px] text-[#565656]">
                        {item.category}
                      </span>
                    </div>

                    <div className="bg-[#FDE8E8] text-[#C5221F] font-rubik font-medium text-[13px] px-4 py-1 rounded-full">
                      Cancelled
                    </div>
                  </div>

                  {/* Cancellation Reason */}
                  <div className="flex flex-col gap-1">
                    <span className="font-rubik font-semibold text-[14px] text-[#E02424]">
                      Cancellation reason
                    </span>
                    <p className="font-rubik font-normal text-[13px] leading-[18px] text-[#565656]">
                      {item.cancellationReason}
                    </p>
                  </div>

                  {/* Seeker Profile Row */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#F4F4F5]">
                    <div className="w-9 h-9 rounded-full relative overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image
                        src={item.seekerAvatar}
                        alt={item.seekerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-rubik font-semibold text-[14px] text-[#121111]">
                        {item.seekerName}
                      </span>
                      <div className="flex items-center gap-1.5 font-rubik text-[12px] text-[#565656]">
                        <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                        <span className="font-medium text-[#121111]">
                          {item.seekerRating.toFixed(1)} ({item.seekerReviews})
                        </span>
                        <span>| {item.seekerServices} Services</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center text-[#565656] font-rubik text-[14px] border border-[#EFEFEF] shadow-xs">
            No {subTab} services found.
          </div>
        )}
      </div>

      {/* Write Review Modal Dialog */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] p-6 max-w-[480px] w-full shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-[#EFEFEF]">
              <h3 className="font-rubik font-bold text-[18px] text-[#121111]">
                Leave a Review
              </h3>
              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition text-[#121111] cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer border-none bg-transparent p-0"
                    >
                      <Star
                        className={`w-6 h-6 transition ${
                          star <= reviewRating
                            ? 'fill-[#FFC107] text-[#FFC107]'
                            : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Feedback
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience working on this service..."
                  className="w-full p-3.5 bg-white border border-[#EFEFEF] rounded-[12px] font-rubik text-[14px] outline-none focus:border-[#F36922] resize-none shadow-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="h-[40px] px-5 bg-white border border-[#EFEFEF] hover:bg-neutral-50 rounded-[10px] font-rubik font-medium text-[14px] text-[#121111] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[40px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[14px] rounded-[10px] transition cursor-pointer border-none shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
