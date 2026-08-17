'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronDown,
  Info,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';

import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  createServiceSchema,
  CreateServiceFormValues,
} from '../types/create-service.types';

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
];

export function CreateServiceFlow() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'description' | 'gallery'>('overview');
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    '/images/home/search.webp',
    '/images/home/search.webp',
  ]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      serviceTitle: 'Professional Home Cleaning ServicesMaking Your Home Sparkle',
      category: 'Senior Care',
      subCategory: 'Home Cleaning Service',
      payRate: '$10',
      description:
        '<h3>Grasping the importance of your cleaning service title is essential for</h3><p>Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it\'s residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.</p><p>Drawing in clients and effectively communicating the core of your offerings. A well-crafted title not only highlights your expertise but also sets the tone for the quality of service you provide. It should reflect the specific cleaning solutions you offer, whether it\'s residential, commercial, or specialized cleaning. By choosing a title that resonates with your target audience, you can enhance your visibility and attract the right clients who are looking for your unique services.</p>',
      isActive: true,
      images: ['/images/home/search.webp', '/images/home/search.webp'],
    },
  });

  const serviceTitleVal = watch('serviceTitle') || '';
  const isActiveVal = watch('isActive');

  const handleNextFromOverview = async () => {
    const isValid = await trigger(['serviceTitle', 'category', 'subCategory', 'payRate']);
    if (isValid) {
      setActiveTab('description');
    }
  };

  const handleNextFromDescription = async () => {
    const isValid = await trigger('description');
    if (isValid) {
      setActiveTab('gallery');
    }
  };

  const onSubmit = (data: CreateServiceFormValues) => {
    console.log('Submitted Service Data:', data);
    router.push('/my-services/1');
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

  return (
    <div className="min-h-screen bg-[#FEF0E9] flex flex-col w-full items-center">
      {/* Top Header Navigation Bar */}
      <div className="w-full bg-white border-b border-[#E4E4E7] flex justify-center sticky top-0 z-30">
        <div className="w-full max-w-[1440px] px-4 sm:px-[80px] h-[70px] flex items-center justify-between">
          {/* Navigation Tabs (Overview, Description, Gallery) */}
          <div className="flex items-center gap-6 h-full">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`h-full px-4 border-b-2 font-rubik text-[15px] transition cursor-pointer flex items-center ${
                activeTab === 'overview'
                  ? 'border-[#F36922] font-medium text-[#121111]'
                  : 'border-transparent font-normal text-[#121111] hover:text-[#F36922]'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`h-full px-4 border-b-2 font-rubik text-[15px] transition cursor-pointer flex items-center capitalize ${
                activeTab === 'description'
                  ? 'border-[#F36922] font-medium text-[#121111]'
                  : 'border-transparent font-normal text-[#121111] hover:text-[#F36922]'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`h-full px-4 border-b-2 font-rubik text-[15px] transition cursor-pointer flex items-center capitalize ${
                activeTab === 'gallery'
                  ? 'border-[#F36922] font-medium text-[#121111]'
                  : 'border-transparent font-normal text-[#121111] hover:text-[#F36922]'
              }`}
            >
              Gallery
            </button>
          </div>

          {/* Active Status Switch */}
          <div className="w-[134px] h-[38px] border border-[#E4E4E7] rounded-[8px] px-3.5 flex items-center justify-between bg-white">
            <span className="font-rubik font-medium text-[14px] leading-[17px] tracking-[-0.408px] text-[#121111]">
              Active
            </span>
            <button
              type="button"
              onClick={() => setValue('isActive', !isActiveVal)}
              className={`w-[42px] h-[24px] rounded-full p-[2px] transition-colors relative cursor-pointer border-none outline-none ${
                isActiveVal ? 'bg-[#046C4E]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transition-transform transform ${
                  isActiveVal ? 'translate-x-[18px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[1440px] px-4 sm:px-[80px] py-[30px] flex flex-col gap-[30px] items-center"
      >
        {/* STEP 1: OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="w-full max-w-[1280px] bg-white border border-[#E4E4E7] rounded-[12px] p-6 flex flex-col gap-6 shadow-xs">
            {/* Card Header */}
            <div className="pb-3 border-b border-[#E4E4E7]">
              <h2 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                Overview
              </h2>
            </div>

            {/* Field 1: Service Title */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pb-4">
              <div className="flex flex-col gap-1 max-w-[420px] w-full">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Service Title
                </h3>
                <p className="font-rubik font-light text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]/80">
                  Understanding the significance of your service title is crucial for attracting clients and conveying the essence of what you offer.
                </p>
              </div>

              <div className="w-full lg:w-[800px] flex flex-col">
                <div className="relative">
                  <textarea
                    {...register('serviceTitle')}
                    rows={3}
                    maxLength={120}
                    className="w-full p-4 bg-white border border-[#E4E4E7] rounded-[10px] font-rubik font-semibold text-[16px] leading-[22px] text-[#121111] outline-none focus:border-[#F36922] resize-none"
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  {errors.serviceTitle ? (
                    <span className="font-rubik text-[13px] text-red-500">
                      {errors.serviceTitle.message}
                    </span>
                  ) : <div />}
                  <span className="font-rubik font-light text-[13px] text-[#121111]/60">
                    {serviceTitleVal.length}/120 max
                  </span>
                </div>
              </div>
            </div>

            {/* Field 2: Category */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pb-4">
              <div className="flex flex-col gap-1 max-w-[420px] w-full">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Category
                </h3>
                <p className="font-rubik font-light text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]/80">
                  Choose the category most suitable for your service.
                </p>
              </div>

              <div className="w-full lg:w-[800px] flex flex-col">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className="w-full h-[48px] px-4 bg-[#F8F9FF] border border-[#E4E4E7] rounded-[8px] font-rubik font-normal text-[14px] text-[#121111] outline-none focus:border-[#F36922] appearance-none cursor-pointer"
                      >
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#121111] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                />
                {errors.category && (
                  <span className="font-rubik text-[13px] text-red-500 mt-1">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>

            {/* Field 3: Sub Category */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pb-4">
              <div className="flex flex-col gap-1 max-w-[420px] w-full">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Sub category
                </h3>
                <p className="font-rubik font-light text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]/80">
                  Choose the sub category most suitable for your category.
                </p>
              </div>

              <div className="w-full lg:w-[800px] flex flex-col">
                <Controller
                  name="subCategory"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className="w-full h-[48px] px-4 bg-[#F8F9FF] border border-[#E4E4E7] rounded-[8px] font-rubik font-normal text-[14px] text-[#121111] outline-none focus:border-[#F36922] appearance-none cursor-pointer"
                      >
                        {SUB_CATEGORY_OPTIONS.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#121111] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                />
                {errors.subCategory && (
                  <span className="font-rubik text-[13px] text-red-500 mt-1">
                    {errors.subCategory.message}
                  </span>
                )}
              </div>
            </div>

            {/* Field 4: Hourly Rate */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pb-4">
              <div className="flex flex-col gap-1 max-w-[420px] w-full">
                <h3 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                  Hourly Rate
                </h3>
                <p className="font-rubik font-light text-[14px] leading-[22px] tracking-[-0.005em] text-[#121111]/80">
                  The client will see this amount on your profile.
                </p>
              </div>

              <div className="w-full lg:w-[800px] flex flex-col">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    {...register('payRate')}
                    placeholder="Pay Rate"
                    className="w-full h-[48px] pl-4 pr-16 bg-[#F8F9FF] border border-[#E4E4E7] rounded-[12px] font-rubik font-normal text-[14px] text-[#121111] outline-none focus:border-[#F36922]"
                  />
                  <span className="absolute right-4 font-rubik font-normal text-[14px] text-[#121111]">
                    /Hr
                  </span>
                </div>
                {errors.payRate && (
                  <span className="font-rubik text-[13px] text-red-500 mt-1">
                    {errors.payRate.message}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-[#E4E4E7]">
              <button
                type="button"
                onClick={() => router.push('/my-services')}
                className="h-[36px] px-4 bg-white border border-[#E4E4E7] rounded-[8px] font-rubik font-medium text-[15px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNextFromOverview}
                className="h-[36px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[8px] transition cursor-pointer shadow-xs border-none"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DESCRIPTION TAB WITH FULL RICH TEXT EDITOR */}
        {activeTab === 'description' && (
          <div className="w-full max-w-[1280px] bg-white border border-[#E4E4E7] rounded-[12px] p-6 flex flex-col gap-6 shadow-xs">
            {/* Card Header */}
            <div className="pb-3 border-b border-[#E4E4E7]">
              <h2 className="font-rubik font-medium text-[16px] leading-[19px] tracking-[-0.005em] text-[#121111]">
                Briefly Describe your service
              </h2>
            </div>

            {/* WYSIWYG Rich Text Editor Component */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  minHeight="260px"
                  placeholder="Write a clear, detailed description of your service..."
                />
              )}
            />
            {errors.description && (
              <span className="font-rubik text-[13px] text-red-500">
                {errors.description.message}
              </span>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-[#E4E4E7]">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="h-[36px] px-4 bg-white border border-[#E4E4E7] rounded-[8px] font-rubik font-medium text-[15px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNextFromDescription}
                className="h-[36px] px-6 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[8px] transition cursor-pointer shadow-xs border-none"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="w-full max-w-[1280px] bg-white border border-[#E4E4E7] rounded-[12px] p-6 flex flex-col gap-6 shadow-xs">
            {/* Header Title */}
            <div>
              <h2 className="font-rubik font-semibold text-[18px] leading-[22px] tracking-[0.02em] text-[#121111] mb-4">
                Showcase Your Services In A Gallery
              </h2>

              {/* Info Box */}
              <div className="w-full bg-[#ECF3FF] border border-[#D0E2FF] rounded-[10px] p-3.5 flex items-center gap-3 text-[#121111] font-rubik text-[14px]">
                <Info className="w-5 h-5 text-[#0A0A6E] shrink-0" />
                <span>
                  To comply with our terms of service. Upload only content that you either own or have the permission to use
                </span>
              </div>
            </div>

            {/* Upload Section Heading */}
            <div>
              <h3 className="font-rubik font-semibold text-[15px] text-[#121111] mb-1">
                Service Images (up to 3)
              </h3>
              <p className="font-rubik font-light text-[14px] text-[#565656]">
                Get noticed by the right buyers with visual examples of your services.
              </p>
            </div>

            {/* Images Grid */}
            <div className="flex items-center gap-4 flex-wrap">
              {uploadedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="w-[160px] h-[110px] rounded-[10px] relative overflow-hidden border border-[#E4E4E7] group shadow-xs"
                >
                  <Image src={img} alt="Service Image" fill className="object-cover" />
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
                <label className="w-[200px] h-[110px] border border-dashed border-[#D0D5DD] rounded-[10px] bg-[#F9FAFB] hover:bg-neutral-100 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="font-rubik text-[13px] text-[#121111]">
                    Drag & drop a Photo or
                  </span>
                  <span className="font-rubik text-[13px] text-[#F36922] font-medium underline">
                    Upload
                  </span>
                </label>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-[#E4E4E7]">
              <button
                type="button"
                onClick={() => setActiveTab('description')}
                className="h-[36px] px-4 bg-white border border-[#E4E4E7] rounded-[8px] font-rubik font-medium text-[15px] text-[#121111] hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[36px] px-8 bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-medium text-[15px] rounded-[8px] transition cursor-pointer shadow-xs border-none"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
