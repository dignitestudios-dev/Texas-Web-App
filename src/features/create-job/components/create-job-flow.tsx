'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Locate,
  DollarSign,
  Rocket,
  Check,
  ChevronDown,
  Upload,
  Globe,
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { createJobSchema, CreateJobFormValues } from '../types/create-job.types';

const CATEGORIES = [
  { id: 'Senior Care', label: 'Senior Care' },
  { id: 'Child Care', label: 'Child Care' },
  { id: 'Post-Hospital & Recovery Care', label: 'Post-Hospital & Recovery Care' },
  { id: 'Special Needs & Disability Support', label: 'Special Needs & Disability Support' },
  { id: 'Companion Care', label: 'Companion Care' },
  { id: 'Respite Care', label: 'Respite Care' },
];

const TIME_SLOTS = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM',
];

const PLANS = [
  {
    id: '1-day',
    title: '1 Day',
    price: '$2/day',
    saveBadge: null,
    isPopular: false,
    features: ['Top of search for 24h', 'Featured badge on post', 'Priority notifications'],
  },
  {
    id: '7-days',
    title: '7 Days',
    price: '$9/week',
    saveBadge: 'Save 35%',
    isPopular: true,
    features: ['Top of search for 24h', 'Featured badge on post', 'Priority notifications'],
  },
  {
    id: '30-days',
    title: '30 Days',
    price: '$25/mo',
    saveBadge: 'Save 58%',
    isPopular: false,
    features: ['Top of search for 24h', 'Featured badge on post', 'Priority notifications'],
  },
];

export function CreateJobFlow() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<string>('7-days');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [datePickerDate, setDatePickerDate] = useState<Date | undefined>(new Date());

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      category: '',
      subCategory: '',
      images: [],
      serviceTitle: '',
      location: 'San Juan, Texas(TX)',
      description: '',
      date: '2026-12-12',
      startTime: '12:00 PM',
      endTime: '05:00 PM',
      minPrice: '35',
      maxPrice: '50',
      experience: '3-5 years',
      language: 'English',
      radius: 15,
      certificates: '',
    },
  });

  const selectedCategory = watch('category');
  const watchRadius = watch('radius') || 15;
  const formValues = watch();

  // Handler for Step 1 Continue
  const handleStep1Continue = () => {
    if (!selectedCategory) {
      setCategoryError('Please select a category to continue');
      return;
    }
    setCategoryError(null);
    setStep(2);
  };

  // Handler for Step 2 Form Submit (Shows Job Created Dialog first, then auto redirects to Step 3 after 1.5s)
  const onStep2Submit = (data: CreateJobFormValues) => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setStep(3);
    }, 1500);
  };

  // Move from Success Modal to Step 3 (Feature Your Post)
  const handleProceedToStep3 = () => {
    setShowSuccessModal(false);
    setStep(3);
  };

  // Finalize Job Creation (Step 3 Submit or Skip -> Redirects to /my-jobs)
  const handleFinalizeJob = () => {
    router.push('/my-jobs');
  };

  return (
    <div className="min-h-screen bg-[#FFF6F0]/20 flex flex-col relative w-full pb-16">
      {/* ── HERO BANNER (Step 1 Banner) ── */}
      {step === 1 && (
        <div className="absolute -top-44 z-10 w-full">
          <Image src="/images/home/banner.webp" unoptimized alt="heading-line" width={2000} height={200} className="" />
          <div className="absolute top-[70%] text-white left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[760px] mx-auto flex flex-col items-center gap-4">
            <h1 className="font-rubik font-semibold text-[36px] sm:text-[56px] leading-[1.1] tracking-tight">
              Create Job
            </h1>
            <p className="font-rubik font-light text-[18px] sm:text-[24px] leading-[1.3] opacity-90 text-center">
              Explore qualified professionals, check their specialties and availability, and hire with confidence through Texas Caregiver.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 flex flex-col items-center">

        {/* ── STEP 1: CATEGORY SELECTION ── */}
        {step === 1 && (
          <div className="w-full max-w-[710px] pt-60 mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm text-white shrink-0"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Select Category Block */}
            <div className="flex flex-col gap-4 w-full">
              <h2 className="font-rubik font-medium text-[16px] text-[#121111]">
                Select Category
              </h2>

              {categoryError && (
                <p className="text-red-500 font-rubik text-[14px]">{categoryError}</p>
              )}

              {/* Grid of 6 Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setValue('category', cat.id);
                        setCategoryError(null);
                      }}
                      className={`box-sizing-border-box h-[44px] px-3 bg-white border rounded-[6px] flex items-center gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'border-[#F36922] shadow-sm bg-orange-50/20'
                          : 'border-[#ECF0FF] hover:border-neutral-300'
                      }`}
                    >
                      {/* Radio dot indicator */}
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border transition shrink-0 ${
                          isSelected
                            ? 'bg-[#192030] border-[#192030]'
                            : 'bg-[#ECF0FF] border-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="font-poppins font-normal text-[14px] text-[#000000] truncate">
                        {cat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#D5D5D5] my-2" />

            {/* Mention Sub Category */}
            <div className="flex flex-col gap-3 w-full">
              <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                Mention Sub Category
              </h3>
              <Input
                type="text"
                placeholder="Enter you sub category"
                {...register('subCategory')}
                className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#3D3D3D] placeholder-[#3D3D3D]/60 focus-visible:ring-[#F36922]"
              />
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleStep1Continue}
              className="w-full h-[48px] mt-4 bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-rubik font-medium text-[15px] flex items-center justify-center cursor-pointer transition border-none shadow-sm"
            >
              Continue
            </button>
          </div>
        )}

        {/* ── STEP 2: JOB DETAILS FORM (SHADCN INPUTS & DATEPICKER) ── */}
        {step === 2 && (
          <form
            onSubmit={handleSubmit(onStep2Submit)}
            className="w-full max-w-[710px] mx-auto flex flex-col gap-6 animate-in fade-in duration-300"
          >
            {/* Title & Back Row */}
            <div className="flex items-center gap-6 w-full">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm text-white shrink-0"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="font-rubik font-medium text-[26px] text-[#121111]">
                Create Job
              </h2>
            </div>

            {/* Upload Images Box */}
            <div className="w-full border-2 border-dashed border-[#D0DBEE] bg-[#F8FAFF] rounded-[12px] p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50/50 transition">
              <Upload className="w-8 h-8 text-[#0A0A6E]" />
              <span className="font-rubik font-medium text-[16px] text-[#121111]">
                Upload Images
              </span>
              <span className="font-rubik font-light text-[13px] text-[#6D6D6D]">
                Upto 20mbs JPG, PNG
              </span>
            </div>

            {/* Row: Service Title & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* Service Title */}
              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Service Title *
                </label>
                <Input
                  type="text"
                  placeholder="Enter service title"
                  {...register('serviceTitle')}
                  className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus-visible:ring-[#F36922]"
                />
                {errors.serviceTitle && (
                  <span className="text-red-500 text-[12px] font-rubik">
                    {errors.serviceTitle.message}
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Location *
                </label>
                <Input
                  type="text"
                  placeholder="San Juan, Texas(TX)"
                  {...register('location')}
                  className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus-visible:ring-[#F36922]"
                />
                {errors.location && (
                  <span className="text-red-500 text-[12px] font-rubik">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Description *
              </label>
              <Textarea
                rows={4}
                placeholder="Description"
                {...register('description')}
                className="w-full bg-white border border-[#ECF0FF] rounded-[6px] p-3 font-poppins text-[14px] text-[#121111] focus-visible:ring-[#F36922] resize-none"
              />
              {errors.description && (
                <span className="text-red-500 text-[12px] font-rubik">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Row: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* Date with Shadcn Popover & Calendar */}
              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Date *
                </label>
                <Popover>
                  <PopoverTrigger>
                    <div className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 flex items-center justify-between cursor-pointer">
                      <span className="font-poppins text-[14px] text-[#121111]">
                        {datePickerDate ? format(datePickerDate, 'PPP') : 'Select Date'}
                      </span>
                      <CalendarIcon className="w-4 h-4 text-[#6D6D6D] shrink-0" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={datePickerDate}
                      onSelect={(d) => {
                        setDatePickerDate(d);
                        if (d) setValue('date', format(d, 'yyyy-MM-dd'));
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <span className="text-red-500 text-[12px] font-rubik">
                    {errors.date.message}
                  </span>
                )}
              </div>

              {/* Time with Shadcn Select Time Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Time *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full !h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus:outline-none focus:ring-1 focus:ring-[#F36922]">
                          <div className="flex items-center gap-1.5 truncate">
                            <Clock className="w-4 h-4 text-[#6D6D6D] shrink-0" />
                            <SelectValue placeholder="Start Time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} className="bg-white max-h-48 z-50">
                          {TIME_SLOTS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full !h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus:outline-none focus:ring-1 focus:ring-[#F36922]">
                          <div className="flex items-center gap-1.5 truncate">
                            <Clock className="w-4 h-4 text-[#6D6D6D] shrink-0" />
                            <SelectValue placeholder="End Time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} className="bg-white max-h-48 z-50">
                          {TIME_SLOTS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Row: Pay Range */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Pay Range *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Min Price"
                  {...register('minPrice')}
                  className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus-visible:ring-[#F36922]"
                />
                <Input
                  type="text"
                  placeholder="Max Price"
                  {...register('maxPrice')}
                  className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus-visible:ring-[#F36922]"
                />
              </div>
            </div>

            {/* Row: Experience & Language with Shadcn Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Experience
                </label>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full !h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111]">
                        <SelectValue placeholder="Select Experience" />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} className="bg-white z-50">
                        <SelectItem value="1-2 years">1-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5+ years">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Language
                </label>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full !h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111]">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} className="bg-white z-50">
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Radius Slider with Floating Badge */}
            <div className="flex flex-col gap-2 w-full mt-2">
              <div className="flex justify-between items-center">
                <label className="font-rubik font-medium text-[14px] text-[#121111]">
                  Radius
                </label>
              </div>

              <div className="relative w-full pt-6 pb-2">
                {/* Floating Miles Badge */}
                <div
                  className="absolute top-0 px-2.5 py-0.5 bg-[#FFFFFF] border border-[#EFEFEF] rounded-full shadow-sm font-rubik text-[12px] text-[#121111] font-medium transform -translate-x-1/2 transition-all"
                  style={{ left: `${(watchRadius / 50) * 100}%` }}
                >
                  {watchRadius} Miles
                </div>

                <input
                  type="range"
                  min="0"
                  max="50"
                  value={watchRadius}
                  onChange={(e) => setValue('radius', Number(e.target.value))}
                  className="w-full accent-[#F36922] cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[12px] font-rubik text-[#6D6D6D] mt-1">
                  <span>0</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-rubik font-medium text-[14px] text-[#121111]">
                Certificates
              </label>
              <Input
                type="text"
                placeholder="Enter Certificate"
                {...register('certificates')}
                className="w-full h-[44px] bg-white border border-[#ECF0FF] rounded-[6px] px-3 font-poppins text-[14px] text-[#121111] focus-visible:ring-[#F36922]"
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full h-[48px] mt-4 bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-rubik font-medium text-[15px] flex items-center justify-center cursor-pointer transition border-none shadow-sm"
            >
              Continue
            </button>
          </form>
        )}

        {/* ── STEP 3: FEATURE YOUR POST / PLAN SELECTION ── */}
        {step === 3 && (
          <div className="w-full max-w-[710px] mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex items-center gap-6 w-full">
              <button
                type="button"
                onClick={handleFinalizeJob}
                className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer border-none shadow-sm text-white shrink-0"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex flex-col text-center flex-1 pr-12">
                <h2 className="font-rubik font-medium text-[26px] text-[#121111]">
                  Feature Your Post
                </h2>
                <p className="font-rubik font-normal text-[16px] text-[#3D3D3D]">
                  Boost visibility and find the right caregiver faster
                </p>
              </div>
            </div>

            {/* Job Summary Card */}
            <div className="w-full bg-white rounded-[12px] border border-[#EFEFEF]/86 p-5 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                    {formValues.serviceTitle || 'Elderly Care Assistant Seeking'}
                  </h3>
                  <span className="font-rubik font-normal text-[13px] text-[#121111]/70">
                    {formValues.category || 'Elderly Care'}
                  </span>
                </div>
                <div className="h-[48px] px-4 bg-[#F8F9FF] rounded-[8px] flex items-center justify-center gap-1.5 font-rubik font-medium text-[24px] text-[#121111]">
                  <DollarSign className="w-5 h-5 text-[#121111]" />
                  <span>${formValues.minPrice || '35'}-${formValues.maxPrice || '50'}</span>
                </div>
              </div>

              <p className="font-sans font-medium text-[14px] text-[#181818] leading-[19px]">
                {formValues.description || "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic."}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[14px] text-[#181818] font-medium border-t border-[#EFEFEF]/86">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#181818]" />
                    <span>{formValues.date || '12 Dec 23'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#181818]" />
                    <span>{formValues.location || 'San Juan, Texas'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Locate className="w-4 h-4 text-[#181818]" />
                    <span>{watchRadius} miles away</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#181818]" />
                    <span>{formValues.language || 'English'}</span>
                  </div>
                </div>

                <div className="bg-[#EAFFED] text-[#00A313] font-rubik font-medium text-[15px] px-3 py-1 rounded-[8px] flex items-center gap-1">
                  <span>Post Ready</span>
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Dark Blue Rocket Banner */}
            <div className="w-full bg-[#0A0A6E] rounded-[14px] p-6 text-white flex items-center gap-4 relative overflow-hidden h-[120px] shadow-md">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 text-[#F36922]" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-rubik font-medium text-[22px] text-white leading-tight">
                  Featured posts get 5× more caregiver responses
                </h4>
                <p className="font-rubik font-normal text-[14px] text-white/90">
                  Move to the top of search results and get discovered by verified caregivers in your area faster.
                </p>
              </div>
            </div>

            {/* Key Benefits Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {/* Stat Card 1 */}
              <div className="bg-white rounded-[14px] p-4 border border-[#EFEFEF] text-center flex flex-col items-center justify-center relative overflow-hidden h-[103px] shadow-sm">
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-2 border-[#0A0A6E]/30 pointer-events-none" />
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-[#0A0A6E]/30 pointer-events-none" />
                <span className="font-rubik font-medium text-[24px] text-[#F36922]">5×</span>
                <span className="font-rubik font-normal text-[14px] text-[#737373] mt-1">More responses vs regular posts</span>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white rounded-[14px] p-4 border border-[#EFEFEF] text-center flex flex-col items-center justify-center relative overflow-hidden h-[103px] shadow-sm">
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-2 border-[#0A0A6E]/30 pointer-events-none" />
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-[#0A0A6E]/30 pointer-events-none" />
                <span className="font-rubik font-medium text-[24px] text-[#F36922]">Top</span>
                <span className="font-rubik font-normal text-[14px] text-[#737373] mt-1">Pinned in caregiver search</span>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white rounded-[14px] p-4 border border-[#EFEFEF] text-center flex flex-col items-center justify-center relative overflow-hidden h-[103px] shadow-sm">
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-2 border-[#0A0A6E]/30 pointer-events-none" />
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-[#0A0A6E]/30 pointer-events-none" />
                <span className="font-rubik font-medium text-[24px] text-[#F36922]">48h</span>
                <span className="font-rubik font-normal text-[14px] text-[#737373] mt-1">Avg. match time when featured</span>
              </div>
            </div>

            {/* Choose a Plan */}
            <div className="flex flex-col gap-4 w-full mt-2">
              <h3 className="font-rubik font-medium text-[16px] text-[#121111]">
                Choose a Plan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-stretch">
                {/* 1 Day Plan */}
                <div
                  onClick={() => setSelectedPlan('1-day')}
                  className={`bg-white border rounded-[16px] p-5 flex flex-col justify-between items-center text-center gap-3 cursor-pointer transition shadow-sm ${
                    selectedPlan === '1-day' ? 'border-[#F36922] ring-2 ring-[#F36922]/20' : 'border-[#EFEFEF]'
                  }`}
                >
                  <span className="font-rubik font-normal text-[14px] text-[#121111]">1 Day</span>
                  <span className="font-rubik font-bold text-[24px] text-[#121111]">$2/day</span>
                  
                  <div className="flex flex-col gap-2 pt-3 border-t border-neutral-100 text-[12px] text-[#3D3D3D] w-full text-left">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                      <span>Top of search for 24h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                      <span>Featured badge on post</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                      <span>Priority notifications</span>
                    </div>
                  </div>
                </div>

                {/* 7 Days Plan (Most Popular) */}
                <div
                  onClick={() => setSelectedPlan('7-days')}
                  className={`relative rounded-[16px] p-5 flex flex-col justify-between items-center text-center gap-3 cursor-pointer transition shadow-lg bg-gradient-to-b from-[#F36922] via-[#0A0A6E] to-[#0A0A6E] text-white ${
                    selectedPlan === '7-days' ? 'ring-4 ring-[#F36922]/40 scale-105' : ''
                  }`}
                >
                  <div className="absolute -top-3 bg-[#FF9F00] text-white font-rubik font-medium text-[11px] px-3 py-1 rounded-full shadow-sm">
                    ★ Most Popular
                  </div>
                  <span className="font-rubik font-normal text-[14px] text-white mt-1">7 Days</span>
                  <span className="font-rubik font-bold text-[28px] text-white">$9/week</span>
                  <span className="bg-white/20 text-white font-rubik text-[12px] font-medium px-3 py-0.5 rounded-full">
                    Save 35%
                  </span>

                  <div className="flex flex-col gap-2 pt-3 border-t border-white/20 text-[12px] text-white/90 w-full text-left">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>Top of search for 24h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>Featured badge on post</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>Priority notifications</span>
                    </div>
                  </div>
                </div>

                {/* 30 Days Plan */}
                <div
                  onClick={() => setSelectedPlan('30-days')}
                  className={`bg-white border rounded-[16px] p-5 flex flex-col justify-between items-center text-center gap-3 cursor-pointer transition shadow-sm ${
                    selectedPlan === '30-days' ? 'border-[#F36922] ring-2 ring-[#F36922]/20' : 'border-[#EFEFEF]'
                  }`}
                >
                  <span className="font-rubik font-normal text-[14px] text-[#121111]">30 Days</span>
                  <span className="font-rubik font-bold text-[24px] text-[#121111]">$25/mo</span>
                  <span className="bg-[#FEF0E9] text-[#F36922] font-rubik text-[12px] font-medium px-3 py-0.5 rounded-full">
                    Save 58%
                  </span>

                  <div className="flex flex-col gap-2 pt-3 border-t border-neutral-100 text-[12px] text-[#3D3D3D] w-full text-left">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                      <span>Top of search for 24h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                      <span>Featured badge on post</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F36922] shrink-0" />
                      <span>Priority notifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skip Button / Link */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleFinalizeJob}
                className="font-rubik font-medium text-[15px] text-[#121111] hover:text-[#F36922] transition cursor-pointer underline underline-offset-4 border-none bg-transparent"
              >
                Skip
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── SUCCESS MODAL (Job Created!) ── */}
      <Dialog
        open={showSuccessModal}
        onOpenChange={(open) => {
          if (!open) handleProceedToStep3();
          else setShowSuccessModal(open);
        }}
      >
        <DialogContent className="sm:max-w-[400px] bg-white rounded-3xl p-8 border-none shadow-2xl flex flex-col items-center text-center gap-4">
          {/* Orange Checkmark Box */}
          <div className="w-16 h-16 rounded-2xl bg-[#F36922] flex items-center justify-center text-white shadow-md">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <h2 className="font-rubik font-bold text-[26px] text-[#121111] leading-tight">
            Job Created!
          </h2>
          <p className="font-rubik font-light text-[15px] text-[#3D3D3D]">
            Your job has been created successfully.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
