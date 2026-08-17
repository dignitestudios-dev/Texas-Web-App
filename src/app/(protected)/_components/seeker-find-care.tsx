'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Locate,
  AlertTriangle,
  Plus,
  Minus,
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ProposalSection, { Proposal } from './proposal-section';
import JobDialogs from './job-dialogs';

const PROPOSALS_DATA: Proposal[] = [
  {
    name: 'Peter Parker',
    avatar: '/images/avatar.webp',
    price: '$50',
    description: 'I am a reliable and experienced child care',
    time: '45sec',
    progress: 80,
    hasBadge: true,
    message:
      'I am a reliable and experienced child care professional who can provide a safe, caring, and supportive environment for your child. I am patient, attentive, and available to start immediately.',
  },
  {
    name: 'Olivia James',
    avatar: '/images/giver.webp',
    price: '$70',
    description: 'I am experienced child care',
    time: '45sec',
    progress: 40,
    hasBadge: true,
    message:
      'I am a dedicated caregiver with over 5 years of early childhood care experience. I love engaging children in creative learning and outdoor activities.',
  },
  {
    name: 'Ava Hart',
    avatar: '/images/seeker.webp',
    price: '$65',
    description: 'I am experienced child care',
    time: '45sec',
    progress: 30,
    hasBadge: false,
    message:
      'I specialize in pediatric first-aid and personal child care. I focus on creating a secure, comfortable, and structured environment for children.',
  },
];

const CITIES = [
  { id: 'austin', name: 'Austin, TX', top: '65%', left: '55%' },
  { id: 'houston', name: 'Houston, TX', top: '70%', left: '72%' },
  { id: 'dallas', name: 'Dallas, TX', top: '42%', left: '60%' },
  { id: 'san_antonio', name: 'San Antonio, TX', top: '74%', left: '46%' },
];

const jobSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function SeekerFindCarePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobCreated, setJobCreated] = useState(false);
  const [proposalsCount, setProposalsCount] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(7);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Proposal | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelJobModal, setShowCancelJobModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      category: '',
      location: '',
      description: '',
    },
  });

  const location = watch('location');

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 3));

  const onSubmit = (data: JobFormValues) => {
    console.log('Submitting Seeker Job Data:', data);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setJobCreated(true);
      setTimeout(() => {
        setProposalsCount(3);
      }, 3500);
    }, 2000);
  };

  const getMapQuery = () => {
    if (!location) return 'Texas';
    const city = CITIES.find((c) => c.id === location);
    return city ? `${city.name}` : 'Texas';
  };

  const mapQuery = getMapQuery();
  const mapZoom = location ? 12 : zoomLevel;

  return (
    <div className="min-h-screen bg-[#FFF6F0] flex flex-col relative w-full overflow-x-hidden">
      {/* Main content container */}
      <div className="relative z-20 w-full flex flex-col items-center pt-[30px] px-8 lg:px-[150px] gap-[30px] pb-[100px]">
        {/* Breadcrumb & Title Section */}
        <div className="w-full max-w-7xl flex flex-col gap-[20px]">
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-[16px] h-[48px]">
            <button
              onClick={() => router.back()}
              className="w-[48px] h-[48px] bg-[#0A0A6E] rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 cursor-pointer border-none"
            >
              <ArrowLeft className="text-white w-6 h-6" />
            </button>
            <div className="flex items-center gap-[10px] font-rubik text-[16px] text-[#3D3D3D]">
              <Link href="/" className="hover:text-[#F36922] transition">
                Home
              </Link>
              <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
              <span className="font-normal">Instant Job Request</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-[5px]">
            <h1 className="font-rubik font-semibold text-[32px] leading-[38px] tracking-[-0.408px] text-[#121111]">
              Instant Job Request
            </h1>
            <p className="font-rubik font-light text-[16px] leading-[19px] tracking-[-0.408px] text-[#121111]">
              Find care fast by submitting your requirements to instantly notify nearby available caregivers.
            </p>
          </div>

          {/* Alert Banner */}
          <div className="flex items-center gap-[8px] rounded-lg w-full select-none">
            <AlertTriangle className="text-[#F36922] w-5 h-5 shrink-0" />
            <span className="font-rubik text-[14px] text-black tracking-[-0.408px] leading-[17px]">
              <strong className="font-medium mr-1 text-[#000000]">Your First Instant Job Request is Free</strong>
              <span className="text-[#3D3D3D]">
                Starting from your second instant request, a service fee of $10 per request will apply to connect you with nearby caregivers faster.
              </span>
            </span>
          </div>
        </div>

        {/* Content Layout (Form & Map) */}
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-[12px] h-auto lg:h-[758px]">
          {/* Left Column (Proposals & Form) */}
          <div className="w-full lg:w-[362px] flex flex-col gap-[12px] shrink-0">
            {/* Proposals Card Component */}
            <ProposalSection
              jobCreated={jobCreated}
              isSubmitting={isSubmitting}
              proposalsCount={proposalsCount}
              selectedCaregiver={selectedCaregiver}
              setSelectedCaregiver={setSelectedCaregiver}
              setShowAssignModal={setShowAssignModal}
              proposalsData={PROPOSALS_DATA}
            />

            {/* Create Job Form Card */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full h-[373px] bg-white border border-dashed border-[#F36922]/50 rounded-[24px] p-[16px_24px] flex flex-col justify-between shadow-sm shrink-0"
            >
              {/* Category Select */}
              <div className="flex flex-col gap-[4px] w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Category*
                </label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-[44px] bg-[#FAFAFA] border-neutral-100 px-3 text-[#727272] text-[14px] flex items-center justify-between rounded-lg cursor-pointer">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-neutral-100 rounded-lg shadow-md max-h-[200px] overflow-y-auto z-40">
                        <SelectItem value="companion">Companion Care</SelectItem>
                        <SelectItem value="personal">Personal Care</SelectItem>
                        <SelectItem value="respite">Respite Care</SelectItem>
                        <SelectItem value="specialized">Specialized Care</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-[11px] leading-[11px] font-sans font-medium">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Location Select */}
              <div className="flex flex-col gap-[4px] w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Location*
                </label>
                <div className="relative w-full h-[44px] bg-[#FAFAFA] rounded-lg border border-neutral-100 flex items-center">
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-full bg-[#FAFAFA] border-neutral-100 px-3 text-[#727272] text-[14px] flex items-center justify-between rounded-lg pr-10 cursor-pointer">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-neutral-100 rounded-lg shadow-md max-h-[200px] overflow-y-auto z-40">
                          <SelectItem value="austin">Austin, TX</SelectItem>
                          <SelectItem value="houston">Houston, TX</SelectItem>
                          <SelectItem value="dallas">Dallas, TX</SelectItem>
                          <SelectItem value="san_antonio">San Antonio, TX</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Locate className="w-5 h-5 text-[#F36922] absolute right-3 pointer-events-none" />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-[11px] leading-[11px] font-sans font-medium">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-[4px] w-full">
                <label className="font-sans font-medium text-[14px] leading-[19px] text-[#181818] capitalize">
                  Description*
                </label>
                <Textarea
                  {...register('description')}
                  placeholder="Describe the care requirements..."
                  className="w-full h-[80px] min-h-[80px] bg-[#FAFAFA] border-neutral-100 p-3 text-[#727272] text-[14px] leading-[18px] rounded-lg resize-none placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#F36922]"
                />
                {errors.description && (
                  <p className="text-red-500 text-[11px] leading-[11px] font-sans font-medium">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex gap-[8px] w-full">
                {jobCreated ? (
                  <button
                    type="button"
                    onClick={() => setShowCancelJobModal(true)}
                    className="w-full h-[40px] bg-[#F8F9FF] border border-[#EFEFEF] hover:bg-neutral-100 text-[#121111] font-sans font-medium text-[14px] rounded-lg transition duration-200 cursor-pointer border-none shadow-xs"
                  >
                    Cancel Job
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="w-1/2 h-[40px] border border-neutral-200 bg-white hover:bg-neutral-50 text-[#181818] font-sans font-medium text-[14px] rounded-lg transition duration-200 cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/2 h-[40px] bg-[#F36922] hover:bg-[#e05813] text-white font-sans font-medium text-[14px] rounded-lg transition duration-200 cursor-pointer border-none shadow-xs disabled:opacity-50"
                    >
                      {isSubmitting ? 'Posting...' : 'Create Job'}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Right Column (Map View) */}
          <div className="w-full lg:w-[906px] h-[500px] lg:h-[758px] bg-white rounded-[24px] border border-neutral-200 overflow-hidden relative shadow-sm shrink-0">
            <iframe
              title="Google Map Texas"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${mapZoom}&output=embed`}
            />

            {/* Custom Map Markers Overlay */}
            {CITIES.map((city) => (
              <div
                key={city.id}
                style={{ top: city.top, left: city.left }}
                onClick={() => setValue('location', city.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg transition-transform duration-200 cursor-pointer select-none ${
                  location === city.id
                    ? 'bg-[#F36922] text-white scale-110 z-30'
                    : 'bg-white/90 text-[#181818] hover:scale-105 z-20 border border-neutral-100'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    location === city.id ? 'bg-white animate-ping' : 'bg-[#F36922]'
                  }`}
                />
                <span className="font-sans font-medium text-[12px]">{city.name}</span>
              </div>
            ))}

            {/* Map Controls (Zoom buttons) */}
            <div className="absolute right-4 bottom-6 flex flex-col gap-2 z-30 select-none">
              <button
                type="button"
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-neutral-50 transition border border-neutral-100 cursor-pointer outline-none"
              >
                <Plus className="w-5 h-5 text-[#181818]" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-neutral-50 transition border border-neutral-100 cursor-pointer outline-none"
              >
                <Minus className="w-5 h-5 text-[#181818]" />
              </button>
            </div>
          </div>
        </div>

        {/* Dialogs & Modals */}
        <JobDialogs
          showCancelJobModal={showCancelJobModal}
          setShowCancelJobModal={setShowCancelJobModal}
          showAssignModal={showAssignModal}
          setShowAssignModal={setShowAssignModal}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          onCancelJobConfirm={() => {
            setShowCancelJobModal(false);
            setJobCreated(false);
            setProposalsCount(0);
            setSelectedCaregiver(null);
            reset();
          }}
          onAssignConfirm={() => {
            setShowAssignModal(false);
            setShowSuccessModal(true);
          }}
          onSuccessClose={() => {
            setShowSuccessModal(false);
            router.push('/my-jobs');
          }}
        />
      </div>
    </div>
  );
}
