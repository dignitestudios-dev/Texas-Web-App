'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Info, User } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { saveToken, saveRole } from '@/lib/cookies';
import { toast } from 'sonner';

const seekerProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phoneNumber: z.string().min(6, 'Phone number is required'),
  streetAddress: z.string().min(3, 'Street address is required'),
  aptSuite: z.string().optional(),
  city: z.string().min(1, 'Please select a city'),
});

type SeekerProfileFormValues = z.infer<typeof seekerProfileSchema>;

const TEXAS_CITIES = [
  'Austin',
  'Houston',
  'Dallas',
  'San Antonio',
  'Fort Worth',
  'El Paso',
  'Arlington',
  'Corpus Christi',
  'Plano',
  'Laredo',
  'Lubbock',
  'Garland',
  'Irving',
  'Amarillo',
  'Grand Prairie',
  'Brownsville',
  'McKinney',
  'Frisco',
  'Pasadena',
  'Killeen',
  'McAllen',
];

export const ProfileForm = () => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>('/images/home/profile.webp');
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SeekerProfileFormValues>({
    resolver: zodResolver(seekerProfileSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '+1 123 456 798',
      streetAddress: '',
      aptSuite: '',
      city: '',
    },
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Only JPG, PNG, or WebP formats are allowed.');
      toast.error('Only JPG, PNG, or WebP formats are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB.');
      toast.error('File size must be less than 5MB.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    toast.success('Avatar uploaded successfully!');
  };

  const onSubmit = (data: SeekerProfileFormValues) => {
    console.log('Seeker profile created:', data);
    saveToken(`${Date.now()}`);
    saveRole('seeker');
    toast.success('Profile created successfully!');
    router.replace('/subscriptions');
  };

  return (
    <div className="w-full min-h-screen bg-[#FEF0E9] flex flex-col items-center justify-center relative py-12 px-4 select-none">
      {/* Top Left Branding Logo (Matching Figma Frame: left: 213px, top: 37px) */}
      <div className="absolute top-6 left-6 md:top-9 md:left-14 lg:left-24 z-20">
        <Image
          src="/images/logo2.webp"
          alt="Texas Caregiver Alliance Logo"
          width={151}
          height={173}
          className="w-[110px] sm:w-[130px] md:w-[151px] h-auto object-contain"
          priority
        />
      </div>

      {/* Center Form Container (Frame 2147227760) */}
      <div className="w-full max-w-[445px] flex flex-col items-center gap-7 z-10 mt-16 sm:mt-8">
        
        {/* Header (Frame 2147227348) */}
        <div className="flex flex-col items-center gap-3 text-center max-w-[437px]">
          <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111]">
            Create Your Profile
          </h1>
          <p className="font-poppins font-normal text-[14px] leading-[120%] text-[#565656]">
            Complete your profile information to help us personalize your experience and connect you with the right opportunities.
          </p>
        </div>

        {/* Profile Creation Form (Frame 2147228730) */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          {/* Avatar Upload Row (Frame 2147227342) */}
          <div className="flex flex-row items-center gap-[30px] w-full h-[120px] mb-1">
            {/* Avatar Circle */}
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden shrink-0 border border-neutral-100 shadow-sm relative bg-[#FAFAFA]">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Avatar Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                  <User className="w-12 h-12 text-neutral-400" />
                </div>
              )}
            </div>

            {/* Upload Button & Size Info (Frame 2147227343) */}
            <div className="flex flex-col justify-center items-start gap-2.5">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="w-[118px] h-[32px] bg-white rounded-[8px] border border-[#E4E4E7]/60 shadow-2xs font-rubik font-normal text-[14px] leading-[135%] text-[#121111] capitalize hover:bg-neutral-50 transition cursor-pointer flex items-center justify-center"
              >
                Upload
              </button>
              <span className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
                Png, jpeg upto 5mb
              </span>
            </div>
          </div>

          {fileError && (
            <span className="text-red-500 text-[12px] font-rubik -mt-1">
              {fileError}
            </span>
          )}

          {/* Field 1: Full name (Frame 2147227056) */}
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Full name"
              {...register('fullName')}
              className={`w-full h-[48px] bg-[#F8F9FF] border rounded-[12px] px-[15px] font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#565656] outline-none transition-colors focus:border-[#F36922] ${
                errors.fullName ? 'border-red-500' : 'border-[#E4E4E7]'
              }`}
            />
            {errors.fullName && (
              <span className="text-red-500 text-[12px] font-rubik mt-1">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Field 2: Phone Number (Frame 2147227346) */}
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="+1 123 456 798"
              {...register('phoneNumber')}
              className={`w-full h-[48px] bg-[#F8F9FF] border rounded-[12px] px-[15px] font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#565656] outline-none transition-colors focus:border-[#F36922] ${
                errors.phoneNumber ? 'border-red-500' : 'border-[#E4E4E7]'
              }`}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-[12px] font-rubik mt-1">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Field 3: Street Address (Frame 2147227348) */}
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Street Address"
              {...register('streetAddress')}
              className={`w-full h-[48px] bg-[#F8F9FF] border rounded-[12px] px-[15px] font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#565656] outline-none transition-colors focus:border-[#F36922] ${
                errors.streetAddress ? 'border-red-500' : 'border-[#E4E4E7]'
              }`}
            />
            {errors.streetAddress && (
              <span className="text-red-500 text-[12px] font-rubik mt-1">
                {errors.streetAddress.message}
              </span>
            )}
          </div>

          {/* Field 4: Apt, Suite, Unit (Optional) (Frame 2147228939) */}
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Apt, Suite, Unit (Optional)"
              {...register('aptSuite')}
              className="w-full h-[48px] bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] px-[15px] font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#565656] outline-none transition-colors focus:border-[#F36922]"
            />
          </div>

          {/* Field 5 & 6: State & City Row (Frame 2147228938) */}
          <div className="flex flex-row items-center gap-[12px] w-full">
            {/* Texas Disabled Box (Frame 2147227349) */}
            <div className="w-[215px] flex-1 h-[48px] bg-[#CDCDCD] border border-[#E4E4E7] rounded-[12px] px-[15px] flex items-center justify-between">
              <span className="font-rubik font-light text-[14px] text-[#121111]">
                Texas
              </span>
              <Info className="w-5 h-5 text-[#F36922] shrink-0" />
            </div>

            {/* City Select Dropdown (Frame 2147227350) */}
            <div className="w-[217px] flex-1 flex flex-col">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`w-full h-[48px]! bg-[#F8F9FF] border rounded-[12px] px-[15px] font-rubik font-light text-[14px] text-[#121111] flex items-center justify-between outline-none cursor-pointer ${
                        errors.city ? 'border-red-500' : 'border-[#E4E4E7]'
                      }`}
                    >
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#E4E4E7] rounded-[12px] shadow-lg max-h-[220px] overflow-y-auto z-40">
                      {TEXAS_CITIES.map((city) => (
                        <SelectItem key={city} value={city} className="font-rubik text-[14px]">
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {errors.city && (
            <span className="text-red-500 text-[12px] font-rubik -mt-1">
              {errors.city.message}
            </span>
          )}

          {/* Continue Button (Buttons) */}
          <button
            type="submit"
            className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[12px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-sm mt-1"
          >
            Continue
          </button>
        </form>

      </div>
    </div>
  );
};

export default ProfileForm;
