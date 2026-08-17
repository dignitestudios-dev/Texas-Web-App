'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/lib/cookies';

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  // phoneNumber: z.string().min(12, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileForm = () => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      // phoneNumber: '',
      address: '',
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile created:", data);
    // Save auth token in cookies after profile complete
    saveToken(`${Date.now()}`);
    // Move to next step or dashboard
    router.replace('/subscriptions');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Only JPG, PNG, or WebP formats are allowed.');
      return;
    }

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB.');
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  return (
    <div className="flex flex-col items-center max-w-[445px] w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center space-y-3 mb-10 text-center">
        <h1 className="font-rubik font-medium text-[26px] leading-[31px] tracking-[-0.408px] text-[#121111]">
          Create Your Profile
        </h1>
        <p className="font-poppins font-normal text-[14px] leading-[1.2] text-[#565656]">
          Complete your profile information to help us personalize your experience and connect you with the right opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-10">

        {/* Avatar Section */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-center gap-[30px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] bg-white rounded-full shadow-sm shrink-0 border border-gray-100 overflow-hidden relative">
              {previewUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col justify-center items-start gap-[10px]">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
              />
              <button type="button" onClick={handleUploadClick} className="flex items-center justify-center px-[20px] py-[8px] bg-white rounded-lg shadow-sm font-rubik font-normal text-[14px] leading-[19px] text-[#121111] border border-gray-100 hover:bg-gray-50 transition-colors">
                Upload
              </button>
              <p className="font-rubik font-light text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
                Png, jpeg, webp upto 5mb
              </p>
            </div>
          </div>
          {fileError && <span className="text-red-500 text-sm font-poppins text-center">{fileError}</span>}
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex flex-col">
            <Input
              {...register('fullName')}
              placeholder="Full name"
              className={`h-[48px] bg-[#F8F9FF] rounded-xl px-4 font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#555252] outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A6E] focus-visible:border-[#0A0A6E] focus-visible:ring-offset-0 border border-[#E4E4E7] ${errors.fullName ? 'ring-1 ring-red-500' : ''}`}
            />
            {errors.fullName && <span className="text-red-500 text-sm mt-1 font-poppins">{errors.fullName.message}</span>}
          </div>



          <div className="flex flex-col">
            <Input
              {...register('address')}
              placeholder="Address"
              className={`h-[48px] bg-[#F8F9FF] rounded-xl px-4 font-rubik font-light text-[14px] text-[#121111] placeholder:text-[#555252] outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A6E] focus-visible:border-[#0A0A6E] focus-visible:ring-offset-0 border border-[#E4E4E7] ${errors.address ? 'ring-1 ring-red-500' : ''}`}
            />
            {errors.address && <span className="text-red-500 text-sm mt-1 font-poppins">{errors.address.message}</span>}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          type="submit"
          className="flex flex-row justify-center items-center py-[14px] px-[16px] gap-[6px] w-full h-[48px] bg-[#F36922] rounded-xl hover:bg-[#E55A13] transition-colors text-white shadow-sm border-none"
        >
          <span className="font-rubik font-medium text-[15px] leading-[1.35] text-center capitalize">
            Continue
          </span>
        </Button>
      </form>
    </div>
  );
};
