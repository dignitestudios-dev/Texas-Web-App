'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Locate,
  AlertTriangle,
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
import { AuthGuardDialog } from '@/components/common/auth-guard-dialog';
import {
  RequestSentDialog,
  AssignCaregiverDialog,
  InstantRequestFeeDialog,
  CaregiverAssignedDialog,
} from './instant-job-dialogs';
import { getToken } from '@/lib/cookies';
import { toast } from 'sonner';

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
  price: z.string().min(1, 'Please enter offer price'),
  description: z.string().min(1, 'Description is required'),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function SeekerFindCarePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobCreated, setJobCreated] = useState(false);
  const [proposalsCount, setProposalsCount] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(7);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Proposal | null>(null);

  // Dialog states for the multi-step flow
  const [showRequestSentDialog, setShowRequestSentDialog] = useState(false);
  const [showAssignCaregiverDialog, setShowAssignCaregiverDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showAssignedDialog, setShowAssignedDialog] = useState(false);
  const [showCancelJobModal, setShowCancelJobModal] = useState(false);
  const [isAuthGuardOpen, setIsAuthGuardOpen] = useState(false);

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
      price: '',
      description: '',
    },
  });

  const location = watch('location');

  // 1. On Create Job: Show Request Sent Dialog for 2 seconds, then load all proposals
  const onSubmit = (data: JobFormValues) => {
    // Check if user is logged in
    if (!getToken()) {
      setIsAuthGuardOpen(true);
      return;
    }

    console.log('Submitting Seeker Job Data:', data);
    setShowRequestSentDialog(true);
  };

  const handleRequestSentComplete = () => {
    setShowRequestSentDialog(false);
    setJobCreated(true);
    setProposalsCount(3);
    toast.success('Instant job request sent! Nearby caregivers have responded.');
  };

  const getMapQuery = () => {
    if (!location) return 'Texas';
    const city = CITIES.find((c) => c.id === location);
    return city ? `${city.name}` : 'Texas';
  };

  const mapQuery = getMapQuery();
  const mapZoom = location ? 12 : zoomLevel;

  return (
    <div className="min-h-screen bg-[#FFF6F0] flex flex-col relative w-full overflow-x-hidden select-none">
      {/* Main content container */}
      <div className="relative z-20 w-full flex flex-col items-center pt-[30px] px-4 sm:px-8 lg:px-[150px] gap-[30px] pb-[100px]">
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
              <span className="font-normal text-[#121111]">Instant Job Request</span>
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
          <div className="flex items-center gap-[8px] rounded-lg w-full">
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
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-[16px] h-auto items-start">
          {/* Left Column (Proposals & Form) */}
          <div className="w-full lg:w-[380px] flex flex-col gap-[16px] shrink-0">
            {/* Proposals Card Component */}
            <ProposalSection
              jobCreated={jobCreated}
              isSubmitting={isSubmitting}
              proposalsCount={proposalsCount}
              selectedCaregiver={selectedCaregiver}
              setSelectedCaregiver={setSelectedCaregiver}
              setShowAssignModal={setShowAssignCaregiverDialog}
              proposalsData={PROPOSALS_DATA}
            />

            {/* Create Job Form Card (Matching Provided Figma UI) */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full bg-white border-2 border-dashed border-[#F36922]/40 rounded-[24px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm shrink-0"
            >
              {/* Field 1: Category* */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[18px] text-[#181818]">
                  Category<span className="text-[#F36922]">*</span>
                </label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-[46px] bg-[#F8F9FF] border border-[#EFEFEF] px-3.5 text-[#121111] text-[14px] font-rubik flex items-center justify-between rounded-[12px] cursor-pointer">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-neutral-100 rounded-[12px] shadow-lg max-h-[220px] overflow-y-auto z-40">
                        <SelectItem value="companion">Companion Care</SelectItem>
                        <SelectItem value="personal">Personal Care</SelectItem>
                        <SelectItem value="respite">Respite Care</SelectItem>
                        <SelectItem value="specialized">Specialized Care</SelectItem>
                        <SelectItem value="childcare">Child Care</SelectItem>
                        <SelectItem value="nursing">Nursing Care</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-[12px] font-rubik mt-0.5">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Field 2: Location */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[18px] text-[#181818]">
                  Location
                </label>
                <div className="relative w-full h-[46px] bg-[#F8F9FF] rounded-[12px] border border-[#EFEFEF] flex items-center">
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-full bg-transparent border-none px-3.5 text-[#121111] text-[14px] font-rubik flex items-center justify-between rounded-[12px] pr-10 cursor-pointer outline-none">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-neutral-100 rounded-[12px] shadow-lg max-h-[220px] overflow-y-auto z-40">
                          <SelectItem value="austin">Austin, TX</SelectItem>
                          <SelectItem value="houston">Houston, TX</SelectItem>
                          <SelectItem value="dallas">Dallas, TX</SelectItem>
                          <SelectItem value="san_antonio">San Antonio, TX</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Locate className="w-5 h-5 text-[#F36922] absolute right-3.5 pointer-events-none" />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-[12px] font-rubik mt-0.5">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Field 3: Offer your Price */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[18px] text-[#181818]">
                  Offer your Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  {...register('price')}
                  className="w-full h-[46px] bg-[#F8F9FF] border border-[#EFEFEF] px-3.5 text-[#121111] font-rubik text-[14px] rounded-[12px] placeholder:text-[#A3A3A3] outline-none focus:border-[#F36922] transition-colors"
                />
                {errors.price && (
                  <p className="text-red-500 text-[12px] font-rubik mt-0.5">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Field 4: Description */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-rubik font-medium text-[14px] leading-[18px] text-[#181818]">
                  Description
                </label>
                <Textarea
                  {...register('description')}
                  placeholder="Description"
                  className="w-full h-[88px] min-h-[88px] bg-[#F8F9FF] border border-[#EFEFEF] p-3.5 text-[#121111] font-rubik text-[14px] leading-[20px] rounded-[12px] resize-none placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#F36922] transition-colors"
                />
                {errors.description && (
                  <p className="text-red-500 text-[12px] font-rubik mt-0.5">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col gap-2 w-full pt-1">
                {jobCreated ? (
                  <button
                    type="button"
                    onClick={() => setShowCancelJobModal(true)}
                    className="w-full h-[48px] bg-[#F8F9FF] border border-[#EFEFEF] hover:bg-neutral-100 text-[#121111] font-rubik font-medium text-[15px] rounded-[14px] transition duration-200 cursor-pointer shadow-2xs"
                  >
                    Cancel Job
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[48px] bg-[#F36922] hover:bg-[#e05813] text-white font-rubik font-semibold text-[16px] rounded-[14px] transition duration-200 cursor-pointer border-none shadow-sm disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? 'Creating Job...' : 'Create Job'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column (Map View) */}
          <div className="w-full lg:flex-1 h-[550px] lg:h-[720px] bg-white rounded-[24px] border border-neutral-200 overflow-hidden relative shadow-sm shrink-0">
            <iframe
              title="Google Map Texas"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${mapZoom}&output=embed`}
            />
          </div>
        </div>
      </div>

      {/* Auth Guard Dialog (Prompts Login/Signup when guest user attempts to create a job) */}
      <AuthGuardDialog
        isOpen={isAuthGuardOpen}
        onClose={() => setIsAuthGuardOpen(false)}
        title="Sign Up To Post Instant Job!"
        description="You're currently browsing as a guest. Please sign up or log in to create and broadcast an instant care request."
        loginRedirect="/login"
        signupRedirect="/role"
      />

      {/* Dialog 1: Request Sent Dialog (shows for 2 sec after clicking Create Job) */}
      <RequestSentDialog
        open={showRequestSentDialog}
        onOpenChange={setShowRequestSentDialog}
        autoCloseMs={2000}
        onComplete={handleRequestSentComplete}
      />

      {/* Dialog 2: Assign Caregiver Confirmation Dialog (opens when clicking Assign Job) */}
      <AssignCaregiverDialog
        open={showAssignCaregiverDialog}
        onOpenChange={setShowAssignCaregiverDialog}
        onCancel={() => setShowAssignCaregiverDialog(false)}
        onContinueToPayment={() => {
          setShowAssignCaregiverDialog(false);
          setShowPaymentDialog(true);
        }}
      />

      {/* Dialog 3: Instant Request Fee ($10.00) Payment Dialog */}
      <InstantRequestFeeDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onPayNow={() => {
          setShowPaymentDialog(false);
          setShowAssignedDialog(true);
        }}
      />

      {/* Dialog 4: Caregiver Assigned Success Dialog */}
      <CaregiverAssignedDialog
        open={showAssignedDialog}
        onOpenChange={setShowAssignedDialog}
        caregiverName={selectedCaregiver?.name || 'Peter Parker'}
        onMessageCaregiver={() => {
          setShowAssignedDialog(false);
          router.push('/chat');
        }}
        onViewJob={() => {
          setShowAssignedDialog(false);
          router.push('/my-jobs/act-1?status=ongoing');
        }}
      />

      {/* Cancel Job Confirmation Modal */}
      <JobDialogs
        showCancelJobModal={showCancelJobModal}
        setShowCancelJobModal={setShowCancelJobModal}
        showAssignModal={false}
        setShowAssignModal={() => {}}
        showSuccessModal={false}
        setShowSuccessModal={() => {}}
        onCancelJobConfirm={() => {
          setJobCreated(false);
          setProposalsCount(0);
          setSelectedCaregiver(null);
          setShowCancelJobModal(false);
          reset();
          toast.info('Instant job has been cancelled.');
        }}
        onAssignConfirm={() => {}}
        onSuccessClose={() => {}}
      />
    </div>
  );
}
