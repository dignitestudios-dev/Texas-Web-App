'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ChevronRight,
  Info,
  Trash2,
  Image as ImageIcon,
  Check,
  List,
  Bold,
  Italic,
  Rocket,
  MapPin,
  Calendar,
  Globe,
  Sparkles,
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createServiceSchema,
  CreateServiceFormValues,
} from '../types/create-service.types';
import { PaymentCheckoutDialog } from '@/components/common/payment-checkout-dialog';
import { ActiveToggleBox } from '@/components/common/active-toggle-box';
import { toast } from 'sonner';

const CATEGORY_OPTIONS = [
  'Senior Care',
  'House Cleaning Service',
  'Child Care',
  'Disability Support',
  'Nursing Care',
];

const SUB_CATEGORY_OPTIONS = [
  'Home Cleaning Service',
  'Elderly Care',
  'Babysitting & Childcare',
  'Pet Care',
  'Special Needs Support',
];

function CreateServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditMode = Boolean(editId);

  const [showFeaturedPost, setShowFeaturedPost] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'1day' | '7days' | '30days'>('7days');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    '/images/home/search.webp',
    '/images/home/find.webp',
  ]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      serviceTitle: 'Professional Home Cleaning ServicesMaking Your Home Sparkle',
      category: 'Senior Care',
      subCategory: 'Home Cleaning Service',
      payRate: '10',
      description:
        "Grasping the importance of your cleaning service title is essential for\n\nDrawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it's residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.\n\nDrawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it's residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.",
      isActive: true,
      images: ['/images/home/search.webp', '/images/home/find.webp'],
    },
  });

  const serviceTitleVal = watch('serviceTitle') || '';
  const descriptionVal = watch('description') || '';

  const onSubmit = (data: CreateServiceFormValues) => {
    console.log('Saved service data:', data);
    toast.success(isEditMode ? 'Service updated successfully!' : 'Service created successfully!');
    setShowFeaturedPost(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      if (uploadedImages.length < 3) {
        const newImgs = [...uploadedImages, url];
        setUploadedImages(newImgs);
        setValue('images', newImgs);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImgs = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImgs);
    setValue('images', newImgs);
  };

  // Text formatting helpers for rich description
  const appendFormat = (prefix: string, suffix: string = '') => {
    setValue('description', `${descriptionVal}\n${prefix}${suffix}`);
  };

  // ================= VIEW 2: FEATURED YOUR POST VIEW (IMAGE 3) =================
  if (showFeaturedPost) {
    return (
      <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-24 px-4 pt-10">
        <div className="w-full max-w-[800px] flex flex-col items-center gap-6">
          
          {/* Header */}
          <div className="relative w-full flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => setShowFeaturedPost(false)}
              className="absolute left-0 top-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#EFEFEF] shadow-xs hover:bg-neutral-50 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#121111]" />
            </button>
            <h1 className="font-rubik font-semibold text-[26px] md:text-[30px] leading-[36px] text-[#121111]">
              Featured Your Post
            </h1>
            <p className="font-rubik font-normal text-[14px] text-[#565656] mt-1">
              Boost visibility and find the right caregiver faster
            </p>
          </div>

          {/* Job Preview Card */}
          <div className="w-full bg-white rounded-[20px] p-6 shadow-sm border border-[#EFEFEF] flex flex-col gap-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-rubik font-semibold text-[18px] text-[#121111]">
                  Elderly Care Assistant Seeking
                </h2>
                <span className="font-rubik text-[13px] text-[#565656]">Elderly Care</span>
              </div>
              <div className="bg-[#F8F9FF] border border-[#EFEFEF] rounded-[8px] px-3 py-1.5 font-rubik font-bold text-[16px] text-[#121111]">
                $35-$50
              </div>
            </div>

            <p className="font-rubik font-normal text-[13px] leading-[20px] text-[#565656]">
              I&apos;m looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F4F4F5]">
              <div className="flex flex-wrap items-center gap-4 text-[13px] font-rubik text-[#565656]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#727272]" />
                  <span>12 Dec 23</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#727272]" />
                  <span>San Juan, Texas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#727272]" />
                  <span>14 miles away</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#727272]" />
                  <span>English</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-[#E8F8F0] text-[#0E7048] font-rubik font-medium text-[13px] px-3 py-1 rounded-full">
                <span>Post Ready</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Rocket Hero Banner */}
          <div className="w-full rounded-[20px] bg-gradient-to-r from-[#0A0A6E] via-[#0D0D7E] to-[#12128E] p-6 text-white flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 text-[#F36922]" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-rubik font-semibold text-[17px] leading-[22px]">
                Featured posts get 5x more caregiver responses
              </h3>
              <p className="font-rubik font-normal text-[13px] text-white/80 leading-[18px]">
                Move to the top of search results and get discovered by verified caregivers in your area faster.
              </p>
            </div>
          </div>

          {/* 3 Metric Stat Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="bg-white rounded-[16px] p-4 text-center border border-[#EFEFEF] shadow-2xs flex flex-col items-center">
              <span className="font-rubik font-bold text-[24px] text-[#F36922]">5x</span>
              <span className="font-rubik text-[12px] text-[#565656] mt-0.5">
                More responses vs regular posts
              </span>
            </div>
            <div className="bg-white rounded-[16px] p-4 text-center border border-[#EFEFEF] shadow-2xs flex flex-col items-center">
              <span className="font-rubik font-bold text-[24px] text-[#F36922]">Top</span>
              <span className="font-rubik text-[12px] text-[#565656] mt-0.5">
                Pinned in caregiver search
              </span>
            </div>
            <div className="bg-white rounded-[16px] p-4 text-center border border-[#EFEFEF] shadow-2xs flex flex-col items-center">
              <span className="font-rubik font-bold text-[24px] text-[#F36922]">48h</span>
              <span className="font-rubik text-[12px] text-[#565656] mt-0.5">
                Avg. match time when featured
              </span>
            </div>
          </div>

          {/* Choose A Plan Heading */}
          <div className="w-full text-left">
            <h3 className="font-rubik font-semibold text-[18px] text-[#121111]">
              Choose a Plan
            </h3>
          </div>

          {/* 3 Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-stretch">
            
            {/* 1 Day Plan */}
            <div
              onClick={() => {
                setSelectedPlan('1day');
                setIsCheckoutOpen(true);
              }}
              className={`rounded-[20px] p-6 border flex flex-col items-center text-center cursor-pointer transition relative hover:scale-[1.02] ${
                selectedPlan === '1day'
                  ? 'bg-white border-[#0A0A6E] ring-2 ring-[#0A0A6E] shadow-md'
                  : 'bg-white border-[#EFEFEF] shadow-2xs hover:border-neutral-300'
              }`}
            >
              <span className="font-rubik font-medium text-[14px] text-[#565656]">1 Day</span>
              <div className="font-rubik font-bold text-[24px] text-[#121111] my-2">$2/day</div>
              
              <div className="flex flex-col gap-2 text-left w-full mt-4">
                <div className="flex items-center gap-2 font-rubik text-[12px] text-[#121111]">
                  <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                  <span>Top of search for 24h</span>
                </div>
                <div className="flex items-center gap-2 font-rubik text-[12px] text-[#121111]">
                  <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                  <span>Featured badge on post</span>
                </div>
                <div className="flex items-center gap-2 font-rubik text-[12px] text-[#121111]">
                  <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                  <span>Priority notifications</span>
                </div>
              </div>
            </div>

            {/* 7 Days Plan (Most Popular Highlighted) */}
            <div
              onClick={() => {
                setSelectedPlan('7days');
                setIsCheckoutOpen(true);
              }}
              className="rounded-[20px] p-6 bg-gradient-to-br from-[#D24B17] via-[#9B373E] to-[#1E1B6B] text-white flex flex-col items-center text-center cursor-pointer transition relative shadow-lg hover:scale-[1.02]"
            >
              <div className="absolute -top-3 bg-[#F36922] text-white text-[11px] font-rubik font-semibold px-3 py-0.5 rounded-full shadow-xs">
                ★ Most Popular
              </div>
              <span className="font-rubik font-medium text-[14px] text-white/90">7 Days</span>
              <div className="font-rubik font-bold text-[24px] text-white my-1">$9/week</div>
              <div className="bg-white/20 text-white text-[11px] font-rubik font-medium px-2 py-0.5 rounded-full mb-3">
                Save 35%
              </div>

              <div className="flex flex-col gap-2 text-left w-full mt-1">
                <div className="flex items-center gap-2 font-rubik text-[12px] text-white">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Top of search for 24h</span>
                </div>
                <div className="flex items-center gap-2 font-rubik text-[12px] text-white">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Featured badge on post</span>
                </div>
                <div className="flex items-center gap-2 font-rubik text-[12px] text-white">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Priority notifications</span>
                </div>
              </div>
            </div>

            {/* 30 Days Plan */}
            <div
              onClick={() => {
                setSelectedPlan('30days');
                setIsCheckoutOpen(true);
              }}
              className={`rounded-[20px] p-6 border flex flex-col items-center text-center cursor-pointer transition relative hover:scale-[1.02] ${
                selectedPlan === '30days'
                  ? 'bg-white border-[#0A0A6E] ring-2 ring-[#0A0A6E] shadow-md'
                  : 'bg-white border-[#EFEFEF] shadow-2xs hover:border-neutral-300'
              }`}
            >
              <span className="font-rubik font-medium text-[14px] text-[#565656]">30 Days</span>
              <div className="font-rubik font-bold text-[24px] text-[#121111] my-1">$25/mo</div>
              <div className="bg-[#FFEFE8] text-[#F36922] text-[11px] font-rubik font-medium px-2 py-0.5 rounded-full mb-3">
                Save 58%
              </div>

              <div className="flex flex-col gap-2 text-left w-full mt-1">
                <div className="flex items-center gap-2 font-rubik text-[12px] text-[#121111]">
                  <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                  <span>Top of search for 24h</span>
                </div>
                <div className="flex items-center gap-2 font-rubik text-[12px] text-[#121111]">
                  <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                  <span>Featured badge on post</span>
                </div>
                <div className="flex items-center gap-2 font-rubik text-[12px] text-[#121111]">
                  <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                  <span>Priority notifications</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action CTA & Skip Button */}
          <div className="flex flex-col items-center gap-3 w-full mt-4">
            {/* <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="h-[48px] px-10 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[16px] rounded-[10px] transition cursor-pointer shadow-md border-none"
            >
              Featured Your Post
            </button> */}

            <button
              type="button"
              onClick={() => router.push('/')}
              className="font-rubik font-medium text-[15px] text-[#121111] hover:underline cursor-pointer border-none bg-transparent"
            >
              Skip
            </button>
          </div>

          {/* Payment Checkout Modal Dialog */}
          <PaymentCheckoutDialog
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            title="Featured Service"
            subtitle="Do More With Our Featured Service"
            planName={
              selectedPlan === '1day'
                ? '1 Day Featured Plan'
                : selectedPlan === '30days'
                ? '30 Days Featured Plan'
                : '7 Days Featured Plan'
            }
            amount={selectedPlan === '1day' ? 2 : selectedPlan === '30days' ? 25 : 9}
            onSuccessRedirect={() => router.push('/')}
          />

        </div>
      </div>
    );
  }

  // ================= VIEW 1: SINGLE ALL-IN-ONE EDIT / CREATE PAGE (IMAGE 2) =================
  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center pb-24">
      <div className="w-full max-w-[1440px] px-4 sm:px-[80px] pt-8 flex flex-col gap-6 items-center">
        
        {/* Breadcrumbs Row */}
        <div className="w-full max-w-[1280px] flex items-center gap-2 font-rubik text-[15px] text-[#565656]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[36px] h-[36px] bg-white text-[#121111] border border-[#EFEFEF] rounded-full flex items-center justify-center hover:bg-neutral-50 transition cursor-pointer shadow-xs mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <Link href="/" className="hover:text-[#F36922] transition text-[#565656]">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-[#727272]" />
          <Link href="/my-services" className="hover:text-[#F36922] transition text-[#565656]">
            {isEditMode ? 'My Services Details' : 'Manage Your Services'}
          </Link>
          <ChevronRight className="w-4 h-4 text-[#727272]" />
          <span className="font-medium text-[#121111]">
            {isEditMode ? 'Edit Service Details' : 'Create Service'}
          </span>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[1280px] flex flex-col gap-6"
        >
          {/* ================= CARD 1: OVERVIEW ================= */}
          <div className="w-full bg-white rounded-[20px] p-6 sm:p-8 border border-[#EFEFEF] shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="font-rubik font-semibold text-[18px] text-[#121111]">
                Overview
              </h2>
              <ActiveToggleBox
                isActive={Boolean(watch('isActive'))}
                onToggle={(val) => {
                  setValue('isActive', val);
                  toast.success(`Service status set to ${val ? 'Active' : 'Inactive'}`);
                }}
              />
            </div>

            <div className="flex flex-col gap-6">
              {/* Row 1: Service Title */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-1 max-w-[360px] w-full">
                  <span className="font-rubik font-medium text-[15px] text-[#121111]">
                    Service Title
                  </span>
                  <p className="font-rubik text-[13px] text-[#565656] leading-[18px]">
                    Understanding the significance of your service title is crucial for attracting clients and conveying the essence of what you offer.
                  </p>
                </div>

                <div className="flex-1 w-full max-w-[760px] flex flex-col">
                  <textarea
                    rows={2}
                    maxLength={120}
                    {...register('serviceTitle')}
                    className="w-full p-3.5 bg-white border border-[#EFEFEF] rounded-[12px] font-rubik font-medium text-[14px] text-[#121111] outline-none focus:border-[#F36922] resize-none shadow-xs"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.serviceTitle ? (
                      <span className="text-red-500 text-xs font-rubik">{errors.serviceTitle.message}</span>
                    ) : <div />}
                    <span className="text-[12px] text-[#727272] font-rubik ml-auto">
                      {serviceTitleVal.length}/120 max
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Category */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-1 max-w-[360px] w-full">
                  <span className="font-rubik font-medium text-[15px] text-[#121111]">
                    Category
                  </span>
                  <p className="font-rubik text-[13px] text-[#565656] leading-[18px]">
                    Choose the category most suitable for your service.
                  </p>
                </div>

                <div className="flex-1 w-full max-w-[760px] flex flex-col">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-[48px]! bg-white border border-[#EFEFEF] rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] shadow-xs">
                          <SelectValue placeholder="Choose category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                          {CATEGORY_OPTIONS.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <span className="text-red-500 text-xs font-rubik mt-1">{errors.category.message}</span>
                  )}
                </div>
              </div>

              {/* Row 3: Sub Category */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-1 max-w-[360px] w-full">
                  <span className="font-rubik font-medium text-[15px] text-[#121111]">
                    Sub category
                  </span>
                  <p className="font-rubik text-[13px] text-[#565656] leading-[18px]">
                    Choose the sub category most suitable for your category.
                  </p>
                </div>

                <div className="flex-1 w-full max-w-[760px] flex flex-col">
                  <Controller
                    name="subCategory"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-[48px]! bg-white border border-[#EFEFEF] rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] shadow-xs">
                          <SelectValue placeholder="Choose sub category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                          {SUB_CATEGORY_OPTIONS.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <span className="text-red-500 text-xs font-rubik mt-1">{errors.subCategory.message}</span>
                  )}
                </div>
              </div>

              {/* Row 4: Hourly Rate */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-1 max-w-[360px] w-full">
                  <span className="font-rubik font-medium text-[15px] text-[#121111]">
                    Hourly Rate
                  </span>
                  <p className="font-rubik text-[13px] text-[#565656] leading-[18px]">
                    The client will see this amount on your profile.
                  </p>
                </div>

                <div className="flex-1 w-full max-w-[760px] flex flex-col">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Pay Rate"
                      {...register('payRate')}
                      className="w-full h-[48px] bg-white border border-[#EFEFEF] rounded-[12px] px-4 pr-12 font-rubik text-[14px] text-[#121111] shadow-xs outline-none focus:border-[#F36922]"
                    />
                    <span className="absolute right-4 font-rubik text-[14px] text-[#727272]">
                      /Hr
                    </span>
                  </div>
                  {errors.payRate && (
                    <span className="text-red-500 text-xs font-rubik mt-1">{errors.payRate.message}</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ================= CARD 2: BRIEFLY DESCRIBE YOUR SERVICE ================= */}
          <div className="w-full bg-white rounded-[20px] p-6 sm:p-8 border border-[#EFEFEF] shadow-sm flex flex-col gap-4">
            <h2 className="font-rubik font-semibold text-[18px] text-[#121111]">
              Briefly Describe your service
            </h2>

            {/* Formatting Toolbar */}
            <div className="flex items-center gap-1 pb-2 border-b border-[#F4F4F5]">
              <button
                type="button"
                onClick={() => appendFormat('• ')}
                className="w-8 h-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#565656] transition cursor-pointer border-none bg-transparent"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => appendFormat('**', '**')}
                className="w-8 h-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#565656] transition cursor-pointer border-none bg-transparent"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => appendFormat('*', '*')}
                className="w-8 h-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#565656] transition cursor-pointer border-none bg-transparent"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              rows={8}
              {...register('description')}
              placeholder="Grasping the importance of your cleaning service title is essential for..."
              className="w-full p-4 bg-white border border-[#EFEFEF] rounded-[12px] font-rubik text-[14px] leading-[22px] text-[#121111] outline-none focus:border-[#F36922] resize-none shadow-xs"
            />
            {errors.description && (
              <span className="text-red-500 text-xs font-rubik">{errors.description.message}</span>
            )}
          </div>

          {/* ================= CARD 3: SHOWCASE YOUR SERVICES IN A GALLERY ================= */}
          <div className="w-full bg-white rounded-[20px] p-6 sm:p-8 border border-[#EFEFEF] shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="font-rubik font-semibold text-[18px] text-[#121111] mb-3">
                Showcase Your Services In A Gallery
              </h2>

              {/* Info Alert Box */}
              <div className="w-full bg-[#ECF3FF] border border-[#D0E2FF] rounded-[12px] p-3.5 flex items-center gap-3 text-[#121111] font-rubik text-[13px]">
                <Info className="w-4 h-4 text-[#0A0A6E] shrink-0" />
                <span>
                  To comply with our terms of service. Upload only content that you either own or have the permission to use
                </span>
              </div>
            </div>

            {/* Upload Section Header */}
            <div>
              <h3 className="font-rubik font-medium text-[15px] text-[#121111]">
                Service Images (up to 3)
              </h3>
              <p className="font-rubik text-[13px] text-[#565656] mt-0.5">
                Get noticed by the right buyers with visual examples of your services.
              </p>
            </div>

            {/* Uploaded Thumbnails & Dropzone */}
            <div className="flex items-center gap-4 flex-wrap">
              {uploadedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="w-[170px] h-[115px] rounded-[14px] relative overflow-hidden border border-[#EFEFEF] shadow-xs group"
                >
                  <Image src={img} alt="Uploaded Service preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white text-gray-700 rounded-md flex items-center justify-center transition cursor-pointer border-none shadow-xs"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}

              {uploadedImages.length < 3 && (
                <label className="w-[190px] h-[115px] border border-dashed border-[#D0D5DD] rounded-[14px] bg-[#F9FAFB] hover:bg-neutral-100 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition shadow-2xs">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="font-rubik text-[12px] text-[#121111]">
                    Drag &amp; drop a Photo or
                  </span>
                  <span className="font-rubik text-[12px] text-[#F36922] font-medium underline">
                    Upload
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Bottom Action CTAs */}
          <div className="flex justify-between items-center w-full pt-2">
            <button
              type="button"
              onClick={() => router.push('/my-services')}
              className="h-[44px] px-6 bg-white border border-[#EFEFEF] hover:bg-neutral-50 text-[#121111] font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer shadow-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-[44px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[10px] transition cursor-pointer shadow-xs border-none"
            >
              {isEditMode ? 'Save' : 'Create'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export function CreateServiceFlow() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-rubik">Loading...</div>}>
      <CreateServiceContent />
    </Suspense>
  );
}
