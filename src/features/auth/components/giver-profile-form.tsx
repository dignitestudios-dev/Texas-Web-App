'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowLeft,
  Info,
  X,
  Plus,
  Clock,
  Check,
  FileText,
  ChevronDown,
  CheckSquare,
  Square,
} from 'lucide-react';
import { saveToken } from '@/lib/cookies';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Validation Schemas
const educationSchema = z.object({
  id: z.string(),
  level: z.string().min(1, 'Please select education level'),
  institute: z.string().min(1, 'Institute is required'),
  from: z.string().min(1, 'From year is required'),
  to: z.string().min(1, 'To year is required'),
});

const certificationSchema = z.object({
  id: z.string(),
  type: z.string().min(1, 'Please select certification type'),
  institution: z.string().min(1, 'Institution is required'),
  date: z.string().min(1, 'Completion date is required'),
  fileName: z.string().optional(),
});

const slotSchema = z.object({
  from: z.string().min(1, 'From time required'),
  to: z.string().min(1, 'To time required'),
});

const dayAvailabilitySchema = z.object({
  enabled: z.boolean(),
  slots: z.array(slotSchema),
});

const giverProfileSchema = z.object({
  avatarUrl: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  religion: z.string().min(1, 'Please select religion'),
  gender: z.string().min(1, 'Please select gender'),
  streetAddress: z.string().min(1, 'Street address is required'),
  aptSuite: z.string().optional(),
  city: z.string().min(1, 'Please select city'),
  bio: z.string().min(1, 'Bio is required').max(200, 'Max 200 characters'),

  experience: z.string().min(1, 'Years of experience is required'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  educations: z.array(educationSchema).min(1, 'At least 1 education required'),
  certifications: z.array(certificationSchema).min(1, 'At least 1 certification required').max(3, 'Max 3 certifications'),

  availability: z.record(z.string(), dayAvailabilitySchema),
});

type GiverProfileFormValues = z.infer<typeof giverProfileSchema>;

const DAYS_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AVAILABLE_LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'Arabic',
  'German',
  'Mandarin',
  'Hindi',
  'Portuguese',
  'Russian',
  'Italian',
  'Vietnamese',
  'Tagalog',
];

export const GiverProfileForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Avatar Upload State
  const [previewUrl, setPreviewUrl] = useState<string>('/images/avatar.webp');
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Cert File Upload Ref
  const certFileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GiverProfileFormValues>({
    resolver: zodResolver(giverProfileSchema),
    defaultValues: {
      avatarUrl: '/images/avatar.webp',
      firstName: '',
      lastName: '',
      email: '',
      religion: '',
      gender: '',
      streetAddress: '',
      aptSuite: '',
      city: '',
      bio: '',
      experience: '',
      languages: ['English'],
      educations: [
        { id: '1', level: '', institute: '', from: '', to: '' },
        { id: '2', level: '', institute: '', from: '', to: '' },
      ],
      certifications: [
        { id: '1', type: '', institution: '', date: '', fileName: 'Presentation.pdf' },
        { id: '2', type: '', institution: '', date: '', fileName: 'Presentation.pdf' },
      ],
      availability: {
        Monday: {
          enabled: true,
          slots: [
            { from: '09:00', to: '13:00' },
            { from: '14:00', to: '18:00' },
          ],
        },
        Tuesday: { enabled: false, slots: [{ from: '09:00', to: '17:00' }] },
        Wednesday: { enabled: false, slots: [{ from: '09:00', to: '17:00' }] },
        Thursday: { enabled: false, slots: [{ from: '09:00', to: '17:00' }] },
        Friday: { enabled: false, slots: [{ from: '09:00', to: '17:00' }] },
        Saturday: { enabled: false, slots: [{ from: '10:00', to: '16:00' }] },
        Sunday: { enabled: false, slots: [{ from: '10:00', to: '16:00' }] },
      },
    },
    mode: 'onTouched',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'educations',
  });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  const bioValue = watch('bio') || '';
  const availabilityValue = watch('availability');

  // Avatar Upload Handlers
  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatarError(null);
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setAvatarError('Only JPG, PNG, or WebP formats are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('File size must be less than 5MB.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setValue('avatarUrl', objectUrl);
  };

  // Certificate Document Upload Handler
  const handleCertFileClick = (id: string) => {
    certFileRefs.current[id]?.click();
  };

  const handleCertFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('Certification document must be under 20MB.');
      return;
    }

    setValue(`certifications.${index}.fileName`, file.name, { shouldValidate: true });
  };

  // Availability Helpers
  const toggleDay = (day: string) => {
    const current = availabilityValue[day];
    setValue(
      `availability.${day}`,
      {
        enabled: !current.enabled,
        slots: current.slots.length > 0 ? current.slots : [{ from: '09:00', to: '17:00' }],
      },
      { shouldValidate: true }
    );
  };

  const addTimeSlot = (day: string) => {
    const currentSlots = availabilityValue[day].slots;
    setValue(
      `availability.${day}.slots`,
      [...currentSlots, { from: '09:00', to: '17:00' }],
      { shouldValidate: true }
    );
  };

  const removeTimeSlot = (day: string, slotIdx: number) => {
    const currentSlots = availabilityValue[day].slots;
    if (currentSlots.length > 1) {
      setValue(
        `availability.${day}.slots`,
        currentSlots.filter((_, idx) => idx !== slotIdx),
        { shouldValidate: true }
      );
    }
  };

  // Multi-step Next / Submit Handlers
  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      const isValid = await trigger([
        'firstName',
        'lastName',
        'email',
        'religion',
        'gender',
        'streetAddress',
        'city',
        'bio',
      ]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger([
        'experience',
        'languages',
        'educations',
        'certifications',
      ]);
      if (isValid) setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
    else router.back();
  };

  const onSubmit = (data: GiverProfileFormValues) => {
    console.log('Caregiver Profile Submitted:', data);
    saveToken(`${Date.now()}`);
    router.replace('/subscriptions');
  };

  return (
    <div className="w-full min-h-screen bg-[#FEF0E9] flex flex-col items-center relative py-6 px-4">
      {/* Top Left Branding Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-14 z-20">
        <Image
          src="/images/logo2.webp"
          alt="Texas Caregiver Alliance"
          width={110}
          height={126}
          priority
          className="w-auto h-[60px] md:h-[85px] object-contain"
        />
      </div>

      {/* Main Multi-Step Form Wrapper */}
      <div className="w-full max-w-[700px] flex flex-col gap-6 mt-12 md:mt-4 z-10">
        {/* Top Progress Bar Component */}
        <div className="w-full flex items-center justify-between gap-4">
          {/* Circular Back Button */}
          <button
            type="button"
            onClick={handlePrevStep}
            className="w-[42px] h-[42px] bg-white rounded-full flex items-center justify-center border border-[#EFEFEF] shadow-xs hover:bg-neutral-50 transition cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-[#121111]" />
          </button>

          {/* 3-Segmented Progress Bar */}
          <div className="flex items-center gap-2 flex-1 max-w-[460px]">
            <div
              className={`h-[7px] flex-1 rounded-full transition-colors duration-300 ${
                step >= 1 ? 'bg-[#F36922]' : 'bg-[#E4E4E7]'
              }`}
            />
            <div
              className={`h-[7px] flex-1 rounded-full transition-colors duration-300 ${
                step >= 2 ? 'bg-[#F36922]' : 'bg-[#E4E4E7]'
              }`}
            />
            <div
              className={`h-[7px] flex-1 rounded-full transition-colors duration-300 ${
                step >= 3 ? 'bg-[#F36922]' : 'bg-[#E4E4E7]'
              }`}
            />
          </div>

          {/* Step Text */}
          <div className="font-rubik text-[14px] text-[#121111] shrink-0 font-medium">
            Step <span className="font-bold">{step}/3</span>
          </div>
        </div>

        {/* ================= STEP 1: CREATE YOUR PROFILE ================= */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="flex flex-col gap-5 w-full">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-1.5 my-1">
              <h1 className="font-rubik font-semibold text-[26px] md:text-[30px] leading-[36px] text-[#121111]">
                Create Your Profile
              </h1>
              <p className="font-rubik font-normal text-[13px] md:text-[14px] leading-[20px] text-[#565656] max-w-[500px]">
                Complete your profile information to help us personalize your experience and connect you with the right opportunities.
              </p>
            </div>

            {/* Profile Avatar Upload */}
            <div className="flex flex-col gap-1 py-1">
              <div className="flex items-center gap-4">
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden relative bg-neutral-200 border border-neutral-100 shadow-xs shrink-0">
                  <Image src={previewUrl} alt="Avatar Preview" fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="w-fit px-4 py-1.5 bg-white border border-[#EFEFEF] rounded-[8px] font-rubik font-normal text-[13px] text-[#121111] shadow-xs hover:bg-neutral-50 transition cursor-pointer"
                  >
                    Upload
                  </button>
                  <span className="font-rubik text-[12px] text-[#565656]">
                    Png, jpeg upto 5mb
                  </span>
                </div>
              </div>
              {avatarError && <span className="text-red-500 text-xs mt-1">{avatarError}</span>}
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-3.5 w-full">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="First name"
                    {...register('firstName')}
                    className={`h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border shadow-xs outline-none focus:border-[#F36922] ${
                      errors.firstName ? 'border-red-500' : 'border-[#EFEFEF]'
                    }`}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName')}
                    className={`h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border shadow-xs outline-none focus:border-[#F36922] ${
                      errors.lastName ? 'border-red-500' : 'border-[#EFEFEF]'
                    }`}
                  />
                  {errors.lastName && <span className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>}
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="flex flex-col w-full">
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={`w-full h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border shadow-xs outline-none focus:border-[#F36922] ${
                    errors.email ? 'border-red-500' : 'border-[#EFEFEF]'
                  }`}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
              </div>

              {/* Row 3: Religion & Gender (Shadcn Select) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="religion"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`w-full h-[48px]! bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] border shadow-xs outline-none focus:border-[#F36922] ${
                            errors.religion ? 'border-red-500' : 'border-[#EFEFEF]'
                          }`}
                        >
                          <SelectValue placeholder="Religion" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                          <SelectItem value="Christianity">Christianity</SelectItem>
                          <SelectItem value="Islam">Islam</SelectItem>
                          <SelectItem value="Judaism">Judaism</SelectItem>
                          <SelectItem value="Hinduism">Hinduism</SelectItem>
                          <SelectItem value="Buddhism">Buddhism</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.religion && <span className="text-red-500 text-xs mt-1">{errors.religion.message}</span>}
                </div>

                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`w-full h-[48px]! bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] border shadow-xs outline-none focus:border-[#F36922] ${
                            errors.gender ? 'border-red-500' : 'border-[#EFEFEF]'
                          }`}
                        >
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && <span className="text-red-500 text-xs mt-1">{errors.gender.message}</span>}
                </div>
              </div>

              {/* Row 4: Street Address */}
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="Street Address"
                  {...register('streetAddress')}
                  className={`w-full h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border shadow-xs outline-none focus:border-[#F36922] ${
                    errors.streetAddress ? 'border-red-500' : 'border-[#EFEFEF]'
                  }`}
                />
                {errors.streetAddress && <span className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</span>}
              </div>

              {/* Row 5: Apt, Suite, Unit */}
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="Apt, Suite, Unit (Optional)"
                  {...register('aptSuite')}
                  className="w-full h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]"
                />
              </div>

              {/* Row 6: Texas & City (Shadcn Select) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                <div className="h-[48px] bg-[#D1D5DB]/80 rounded-[12px] px-4 flex items-center justify-between font-rubik text-[14px] text-[#121111] shadow-xs border border-neutral-300">
                  <span>Texas</span>
                  <Info className="w-4 h-4 text-[#F36922]" />
                </div>

                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`w-full h-[48px]! bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] border shadow-xs outline-none focus:border-[#F36922] ${
                            errors.city ? 'border-red-500' : 'border-[#EFEFEF]'
                          }`}
                        >
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                          <SelectItem value="San Juan">San Juan</SelectItem>
                          <SelectItem value="Dallas">Dallas</SelectItem>
                          <SelectItem value="Houston">Houston</SelectItem>
                          <SelectItem value="Austin">Austin</SelectItem>
                          <SelectItem value="San Antonio">San Antonio</SelectItem>
                          <SelectItem value="Fort Worth">Fort Worth</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                </div>
              </div>

              {/* Row 7: Bio */}
              <div className="flex flex-col w-full">
                <div
                  className={`flex flex-col bg-white rounded-[12px] border shadow-xs p-3.5 relative ${
                    errors.bio ? 'border-red-500' : 'border-[#EFEFEF]'
                  }`}
                >
                  <textarea
                    rows={4}
                    maxLength={200}
                    placeholder="Bio"
                    {...register('bio')}
                    className="w-full bg-transparent font-rubik text-[14px] text-[#121111] placeholder-[#727272] outline-none resize-none"
                  />
                  <span className="font-rubik text-[12px] text-[#727272] text-right self-end mt-1">
                    {200 - bioValue.length} Characters
                  </span>
                </div>
                {errors.bio && <span className="text-red-500 text-xs mt-1">{errors.bio.message}</span>}
              </div>
            </div>

            {/* Action CTA */}
            <div className="w-full flex justify-center mt-2">
              <button
                type="submit"
                className="w-full max-w-[340px] h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-rubik font-medium text-[15px] transition cursor-pointer border-none shadow-sm flex items-center justify-center"
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 2: ABOUT / EDUCATION / CERTIFICATION ================= */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="flex flex-col gap-6 w-full pb-8">
            {/* Section 1: About */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="font-rubik font-semibold text-[16px] text-[#121111]">
                About
              </h2>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="Years of experience"
                  {...register('experience')}
                  className={`w-full h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border shadow-xs outline-none focus:border-[#F36922] ${
                    errors.experience ? 'border-red-500' : 'border-[#EFEFEF]'
                  }`}
                />
                {errors.experience && <span className="text-red-500 text-xs mt-1">{errors.experience.message}</span>}
              </div>

              {/* Languages (Multi-Select Popover) */}
              <div className="flex flex-col w-full">
                <Controller
                  control={control}
                  name="languages"
                  render={({ field }) => {
                    const selectedLangs: string[] = Array.isArray(field.value) ? field.value : [];

                    const toggleLang = (lang: string) => {
                      if (selectedLangs.includes(lang)) {
                        field.onChange(selectedLangs.filter((l) => l !== lang));
                      } else {
                        field.onChange([...selectedLangs, lang]);
                      }
                    };

                    return (
                      <Popover>
                        <PopoverTrigger
                          type="button"
                          className={`w-full min-h-[48px] bg-white rounded-[12px] px-3.5 py-2 font-rubik text-[14px] text-[#121111] border shadow-xs outline-none flex items-center justify-between gap-2 flex-wrap cursor-pointer text-left ${
                            errors.languages ? 'border-red-500' : 'border-[#EFEFEF]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 flex-wrap flex-1">
                            {selectedLangs.length > 0 ? (
                              selectedLangs.map((lang) => (
                                <span
                                  key={lang}
                                  className="bg-[#FEF0E9] text-[#F36922] font-rubik font-medium text-[12px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"
                                >
                                  {lang}
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLang(lang);
                                    }}
                                    className="hover:opacity-75 cursor-pointer ml-0.5 font-bold"
                                  >
                                    &times;
                                  </span>
                                </span>
                              ))
                            ) : (
                              <span className="text-[#727272]">Select Languages</span>
                            )}
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#727272] shrink-0" />
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          className="w-[280px] sm:w-[320px] bg-white rounded-[14px] border border-[#EFEFEF] shadow-xl p-2 max-h-[260px] overflow-y-auto"
                        >
                          <div className="flex flex-col gap-1">
                            {AVAILABLE_LANGUAGES.map((lang) => {
                              const isSelected = selectedLangs.includes(lang);
                              return (
                                <button
                                  key={lang}
                                  type="button"
                                  onClick={() => toggleLang(lang)}
                                  className={`w-full px-3 py-2 rounded-[8px] flex items-center justify-between text-[13px] font-rubik cursor-pointer transition border-none text-left ${
                                    isSelected
                                      ? 'bg-[#FEF0E9] text-[#F36922] font-medium'
                                      : 'hover:bg-[#F8F9FF] text-[#121111]'
                                  }`}
                                >
                                  <span>{lang}</span>
                                  {isSelected ? (
                                    <CheckSquare className="w-4 h-4 text-[#F36922] shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-[#727272] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                {errors.languages && <span className="text-red-500 text-xs mt-1">{errors.languages.message}</span>}
              </div>
            </div>

            {/* Section 2: Education */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="font-rubik font-semibold text-[16px] text-[#121111]">
                Education
              </h2>

              <div className="flex flex-col gap-4 w-full">
                {educationFields.map((edu, idx) => {
                  const isLast = idx === educationFields.length - 1;
                  return (
                    <div key={edu.id} className="flex flex-col gap-3 w-full">
                      {/* Level Row */}
                      <div className="flex items-center gap-2.5 w-full">
                        <div className="flex-1">
                          <Controller
                            control={control}
                            name={`educations.${idx}.level`}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full h-[48px]! bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]">
                                  <SelectValue placeholder="Education Level" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                                  <SelectItem value="High School">High School</SelectItem>
                                  <SelectItem value="Diploma">Diploma</SelectItem>
                                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                                  <SelectItem value="Master">Master</SelectItem>
                                  <SelectItem value="Doctorate">Doctorate</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (educationFields.length > 1) removeEducation(idx);
                          }}
                          className="w-[48px] h-[48px] bg-[#FFF5F5] border border-[#FCE8E6] text-[#C5221F] rounded-[12px] flex items-center justify-center shrink-0 hover:bg-red-100 transition cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        {/* Add button on last row */}
                        {isLast && (
                          <button
                            type="button"
                            onClick={() =>
                              appendEducation({
                                id: Date.now().toString(),
                                level: '',
                                institute: '',
                                from: '',
                                to: '',
                              })
                            }
                            className="w-[48px] h-[48px] bg-[#F4FBF7] border border-[#E6F4EA] text-[#137333] rounded-[12px] flex items-center justify-center shrink-0 hover:bg-emerald-100 transition cursor-pointer"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* Institute & Dates Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                        <input
                          type="text"
                          placeholder="Institute Or University"
                          {...register(`educations.${idx}.institute`)}
                          className="h-[48px] bg-white rounded-[12px] px-4 font-rubik text-[14px] text-[#121111] placeholder-[#727272] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]"
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <Controller
                            control={control}
                            name={`educations.${idx}.from`}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full h-[48px]! bg-white rounded-[12px] px-3 font-rubik text-[14px] text-[#121111] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]">
                                  <SelectValue placeholder="From" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                                  {['2018', '2019', '2020', '2021', '2022', '2023', '2024'].map((y) => (
                                    <SelectItem key={y} value={y}>{y}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />

                          <Controller
                            control={control}
                            name={`educations.${idx}.to`}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full h-[48px]! bg-white rounded-[12px] px-3 font-rubik text-[14px] text-[#121111] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]">
                                  <SelectValue placeholder="To" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                                  {['2019', '2020', '2021', '2022', '2023', '2024', 'Present'].map((y) => (
                                    <SelectItem key={y} value={y}>{y}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Certification (Shadcn Select & Doc Uploads) */}
            <div className="flex flex-col gap-3 w-full pt-1">
              <h2 className="font-rubik font-semibold text-[16px] text-[#121111]">
                Certification
              </h2>

              <div className="flex flex-col gap-4 w-full">
                {certFields.map((cert, idx) => {
                  const isLast = idx === certFields.length - 1;
                  const currentFileName = watch(`certifications.${idx}.fileName`);

                  return (
                    <div key={cert.id} className="flex flex-col gap-3 w-full">
                      {/* Top Selects Row */}
                      <div className="flex items-center gap-2 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                          {/* Certification Types */}
                          <Controller
                            control={control}
                            name={`certifications.${idx}.type`}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full h-[48px]! bg-white rounded-[12px] px-3 font-rubik text-[13px] text-[#121111] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]">
                                  <SelectValue placeholder="Certification Types" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                                  <SelectItem value="CPR Certified">CPR Certified</SelectItem>
                                  <SelectItem value="First Aid">First Aid</SelectItem>
                                  <SelectItem value="Licensed Professional">Licensed Professional</SelectItem>
                                  <SelectItem value="Specialized Training">Specialized Training</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />

                          {/* Institution Name */}
                          <Controller
                            control={control}
                            name={`certifications.${idx}.institution`}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full h-[48px]! bg-white rounded-[12px] px-3 font-rubik text-[13px] text-[#121111] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]">
                                  <SelectValue placeholder="Institution Name" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                                  <SelectItem value="Red Cross">Red Cross</SelectItem>
                                  <SelectItem value="American Heart Assoc">American Heart Assoc</SelectItem>
                                  <SelectItem value="Texas Health Board">Texas Health Board</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />

                          {/* Date of Completion */}
                          <Controller
                            control={control}
                            name={`certifications.${idx}.date`}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full h-[48px]! bg-white rounded-[12px] px-3 font-rubik text-[13px] text-[#121111] border border-[#EFEFEF] shadow-xs outline-none focus:border-[#F36922]">
                                  <SelectValue placeholder="Date Of Completion" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-[12px] border border-[#EFEFEF] shadow-lg">
                                  <SelectItem value="2022">2022</SelectItem>
                                  <SelectItem value="2023">2023</SelectItem>
                                  <SelectItem value="2024">2024</SelectItem>
                                  <SelectItem value="2025">2025</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (certFields.length > 1) removeCert(idx);
                          }}
                          className="w-[48px] h-[48px] bg-[#FFF5F5] border border-[#FCE8E6] text-[#C5221F] rounded-[12px] flex items-center justify-center shrink-0 hover:bg-red-100 transition cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        {/* Add button on last row (Max 3) */}
                        {isLast && certFields.length < 3 && (
                          <button
                            type="button"
                            onClick={() =>
                              appendCert({
                                id: Date.now().toString(),
                                type: '',
                                institution: '',
                                date: '',
                                fileName: '',
                              })
                            }
                            className="w-[48px] h-[48px] bg-[#F4FBF7] border border-[#E6F4EA] text-[#137333] rounded-[12px] flex items-center justify-center shrink-0 hover:bg-emerald-100 transition cursor-pointer"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* File Upload Box */}
                      <div className="w-full flex items-center justify-between p-3.5 bg-white border border-[#EFEFEF] rounded-[16px] shadow-xs">
                        <div className="flex items-center gap-3">
                          {/* Hidden Real File Input */}
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            ref={(el) => {
                              certFileRefs.current[cert.id] = el;
                            }}
                            onChange={(e) => handleCertFileChange(e, idx)}
                            className="hidden"
                          />
                          <div
                            onClick={() => handleCertFileClick(cert.id)}
                            className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-[12px] text-white flex items-center justify-center cursor-pointer shadow-sm hover:bg-[#080856] transition"
                          >
                            <Plus className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-rubik font-medium text-[14px] text-[#121111]">
                              Upload Certification
                            </span>
                            <span className="font-rubik text-[12px] text-[#727272]">
                              Max 3 Files Pdf&apos;s Upto 20mb
                            </span>
                          </div>
                        </div>

                        {/* Uploaded File Tag */}
                        {currentFileName && (
                          <div className="flex items-center gap-2 bg-[#F8F9FF] border border-[#EFEFEF] rounded-[8px] px-3 py-1.5 relative">
                            <FileText className="w-4 h-4 text-red-500" />
                            <span className="font-rubik text-[12px] text-[#121111] max-w-[110px] truncate">
                              {currentFileName}
                            </span>
                            <button
                              type="button"
                              onClick={() => setValue(`certifications.${idx}.fileName`, '')}
                              className="text-neutral-400 hover:text-red-500 cursor-pointer border-none bg-transparent p-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <div className="w-full flex justify-center mt-3">
              <button
                type="submit"
                className="w-full max-w-[340px] h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-rubik font-medium text-[15px] transition cursor-pointer border-none shadow-sm flex items-center justify-center"
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 3: AVAILABILITY ================= */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full pb-8">
            <h1 className="font-rubik font-semibold text-[22px] text-[#121111] text-center my-1">
              Availability
            </h1>

            {/* Days List */}
            <div className="flex flex-col gap-3.5 w-full">
              {DAYS_LIST.map((day) => {
                const dayData = availabilityValue[day];
                return (
                  <div key={day} className="flex flex-col gap-2.5 w-full">
                    {/* Day Selector Row */}
                    <div className="flex items-center gap-3 w-full">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 transition cursor-pointer border ${
                          dayData?.enabled
                            ? 'bg-[#0A0A6E] border-[#0A0A6E] text-white shadow-xs'
                            : 'bg-white border-[#EFEFEF] hover:bg-neutral-50'
                        }`}
                      >
                        {dayData?.enabled && <Check className="w-5 h-5 stroke-[2.5]" />}
                      </button>

                      {/* Day Name Box */}
                      <div
                        onClick={() => toggleDay(day)}
                        className="flex-1 h-[48px] bg-white border border-[#EFEFEF] rounded-[12px] px-5 flex items-center font-rubik font-medium text-[14px] text-[#121111] shadow-xs cursor-pointer hover:bg-neutral-50/50 transition"
                      >
                        {day}
                      </div>
                    </div>

                    {/* Time Slots when day is enabled */}
                    {dayData?.enabled && (
                      <div className="flex flex-col gap-2.5 pl-[56px] w-full animate-in fade-in-50 duration-200">
                        {dayData.slots.map((slot, sIdx) => {
                          const isLastSlot = sIdx === dayData.slots.length - 1;
                          return (
                            <div key={sIdx} className="flex items-center gap-2.5 w-full">
                              {/* From Time Input */}
                              <div className="flex-1 relative flex items-center">
                                <Clock className="w-4 h-4 text-[#F36922] absolute left-3.5 pointer-events-none shrink-0" />
                                <input
                                  type="time"
                                  {...register(`availability.${day}.slots.${sIdx}.from`)}
                                  className="w-full h-[44px] bg-white border border-[#EFEFEF] rounded-[12px] pl-10 pr-3 font-rubik text-[14px] text-[#121111] shadow-xs outline-none focus:border-[#F36922] transition cursor-pointer"
                                />
                              </div>

                              {/* To Time Input */}
                              <div className="flex-1 relative flex items-center">
                                <Clock className="w-4 h-4 text-[#F36922] absolute left-3.5 pointer-events-none shrink-0" />
                                <input
                                  type="time"
                                  {...register(`availability.${day}.slots.${sIdx}.to`)}
                                  className="w-full h-[44px] bg-white border border-[#EFEFEF] rounded-[12px] pl-10 pr-3 font-rubik text-[14px] text-[#121111] shadow-xs outline-none focus:border-[#F36922] transition cursor-pointer"
                                />
                              </div>

                              {/* Remove Slot */}
                              <button
                                type="button"
                                onClick={() => removeTimeSlot(day, sIdx)}
                                className="w-[44px] h-[44px] bg-[#FFF5F5] border border-[#FCE8E6] text-[#C5221F] rounded-[12px] flex items-center justify-center shrink-0 hover:bg-red-100 transition cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>

                              {/* Add Slot on last */}
                              {isLastSlot && (
                                <button
                                  type="button"
                                  onClick={() => addTimeSlot(day)}
                                  className="w-[44px] h-[44px] bg-[#F4FBF7] border border-[#E6F4EA] text-[#137333] rounded-[12px] flex items-center justify-center shrink-0 hover:bg-emerald-100 transition cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="w-full flex justify-center mt-3">
              <button
                type="submit"
                className="w-full max-w-[340px] h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-rubik font-medium text-[15px] transition cursor-pointer border-none shadow-sm flex items-center justify-center"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
