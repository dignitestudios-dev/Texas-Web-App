'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ChatPopup from './chat-popup';
import InstantJobsDropdown from './instant-jobs-dropdown';
import { Switch } from '@/components/ui/switch';
import { getRole, updateRole, getToken } from '@/lib/cookies';
import { AuthGuardDialog } from '@/components/common/auth-guard-dialog';

function Home() {
  const router = useRouter();
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [isAuthGuardOpen, setIsAuthGuardOpen] = useState(false);

  useEffect(() => {
    const updateRoleState = () => {
      setIsCaregiver(getRole() === 'giver');
    };
    updateRoleState();
    window.addEventListener('roleChange', updateRoleState);
    return () => window.removeEventListener('roleChange', updateRoleState);
  }, []);

  const handleSwitchChange = (checked: boolean) => {
    setIsCaregiver(checked);
    updateRole(checked ? 'giver' : 'seeker');
    window.dispatchEvent(new Event('roleChange'));
  };

  const seekerCards = [
    {
      title: 'Find Care Fast',
      image: '/images/home/search.webp',
      link: '/find-care',
      requiresAuth: false,
      description: "Need care right away? Submit your requirements and instantly notify available caregivers. Receive responses in real time and book the right caregiver within minutes.",
    },
    {
      title: 'Post a Care Request',
      image: '/images/home/profile.webp',
      link: '/care-request',
      requiresAuth: true,
      description: "Tell caregivers exactly what you need. Create a public service request and receive interest from qualified caregivers ready to help.",
    },
    {
      title: 'Explore Care Services',
      image: '/images/home/find.webp',
      link: '/care-services',
      requiresAuth: false,
      description: "Browse care categories, discover available caregivers, compare profiles, and connect with the caregiver that best matches your needs.",
    },
    {
      title: 'Caregivers',
      image: '/images/home/position.webp',
      link: '/leaderboard',
      requiresAuth: false,
      description: "Discover the platform's highest-performing caregivers based on ratings, reviews, and service quality. Find trusted professionals with confidence.",
    },
    {
      title: 'Stay on Schedule',
      image: '/giver/calender.webp',
      link: '/calendar',
      requiresAuth: true,
      description: "Keep track of your scheduled care bookings, upcoming appointments, and caregiver sessions all organized in one convenient calendar.",
    },
    {
      title: 'Chat with Caregivers',
      image: '/images/home/chat.webp',
      link: '/chat',
      requiresAuth: true,
      description: "Communicate directly with caregivers through secure messaging. Discuss details, share photos, and stay informed with real-time updates.",
    },
    {
      title: 'Save Your Favorites',
      image: '/images/home/support.webp',
      link: '/favorites',
      requiresAuth: true,
      description: "Keep track of caregivers that stand out to you. Save profiles for easy access and compare your top choices before making a decision.",
    },
  ];

  const giverCards = [
    {
      title: 'Manage your Jobs',
      image: '/giver/my-jobs.webp',
      link: '/my-jobs',
      requiresAuth: true,
      description: "Track all your job activity in one place. View service requests, monitor applications you've submitted, and manage jobs through Pending, Ongoing, and Completed stages.",
    },
    {
      title: 'Manage Your Services',
      image: '/giver/services.webp',
      link: '/my-services',
      requiresAuth: true,
      description: "View, edit, and manage all your existing service listings in one place. Update service details, adjust availability, and create new services to attract more care seekers and grow your business.",
    },
    {
      title: 'Get Jobs in Real Time',
      image: '/giver/instant.webp',
      link: '/find-care',
      requiresAuth: false,
      description: "Receive instant notifications when care seekers need immediate assistance. Review requests, respond quickly, and secure bookings as they happen.",
    },
    {
      title: 'Stay on Schedule',
      image: '/giver/calender.webp',
      link: '/calendar',
      requiresAuth: true,
      description: "Keep all your accepted jobs and upcoming services organized in one calendar. Bookings are automatically added so you can easily manage your time and availability.",
    },
    {
      title: 'My Inbox',
      image: '/giver/messages.webp',
      link: '/chat',
      requiresAuth: true,
      description: "Communicate directly with care seekers through secure messaging. Discuss job details, share information, and build trust before and during service delivery.",
    },
  ];

  const activeCards = isCaregiver ? giverCards : seekerCards;

  const handleCardClick = (card: { link: string; requiresAuth: boolean }) => {
    const token = getToken();
    if (card.requiresAuth && !token) {
      setIsAuthGuardOpen(true);
      return;
    }
    router.push(card.link);
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">

      {/* Hero Section */}
      <div className="absolute w-full h-[400px] top-0 flex flex-col items-center">
        {/* Background Image / Gradients */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(247.2deg, #0A0A6E -13.06%, #F36922 111.27%)' }}></div>
        <div
          className="absolute inset-0 z-10 opacity-80 bg-no-repeat"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(102, 102, 102, 0) 0%, #000000 100%), url(/images/home/banner.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col mt-28 items-center justify-center flex-1 w-full lg:w-[60%] text-center gap-[16px] px-4">
          <h1 className="font-rubik font-semibold text-[40px] md:text-[56px] leading-[1.2] tracking-[-0.408px] text-white">
            {isCaregiver ? "Your Caregiving Hub" : "Available Caregivers Near You"}
          </h1>
          <p className="font-rubik font-light text-[18px] md:text-[24px] leading-[1.3] tracking-[-0.408px] text-white">
            {isCaregiver ? "Manage your jobs, services and connections - all in one place." : "Explore qualified professionals, check their specialties and availability, and hire with confidence through Texas Caregiver."}
          </p>
        </div>
      </div>

      {/* Main Content / Cards Grid */}
      <div className="w-full flex flex-col items-center relative z-20 pt-[400px] pb-[150px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-w-[1080px] w-full px-4">

          {/* Main Cards */}
          {activeCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(card)}
              className="flex flex-col gap-[12px] w-full max-w-[338.67px] h-auto md:h-[360px] mx-auto cursor-pointer group"
            >
              <div className="flex flex-col items-center justify-center bg-white rounded-[12px] w-full h-[264px] transition ">
                <div className="flex flex-col items-center gap-[8px]">
                  <div className="w-[236px] h-[150px] relative shrink-0">
                    <Image src={card.image} alt={card.title} fill className="object-contain" />
                  </div>
                  <h3 className="font-poppins p-2 font-medium text-[20px] text-[#0A0A6E] text-center leading-[36px]">
                    {card.title}
                  </h3>
                </div>
              </div>
              <p className="font-poppins font-normal text-[14px] text-[#0A0A6E] leading-[21px] tracking-[-0.01em]">
                {card.description}
              </p>
            </div>
          ))}

          {/* Card 7: Switch Mode Card */}
          <div className="flex flex-col gap-[12px] w-full max-w-[338.67px] h-auto md:h-[360px] mx-auto">
            <div className="flex flex-col items-center justify-center bg-white rounded-[12px] w-full h-[264px] ">
              <div className="flex flex-col items-center gap-[8px]">
                {/* Custom Shadcn Switcher replacing Image */}
                <div className="flex items-center justify-center gap-3 w-[236px] h-[150px] shrink-0 select-none">
                  <Switch
                    checked={isCaregiver}
                    onCheckedChange={handleSwitchChange}
                    className="scale-125"
                    aria-label="Switch between Care Seeker and Caregiver"
                  />
                </div>

                <h3 className="font-poppins font-medium text-[20px] text-[#0A0A6E] text-center leading-[36px]">
                  {isCaregiver ? 'Switch To Careseeker' : 'Switch to Caregiver'}
                </h3>
              </div>
            </div>
            <p className="font-poppins font-normal text-[14px] text-[#0A0A6E] leading-[21px] tracking-[-0.01em]">
              Switch between Care Seeker and Caregiver modes at any time and enjoy the full flexibility of the platform from a single account
            </p>
          </div>
        </div>

        <div className="w-full flex justify-end max-w-[1080px] mx-auto">
          {isCaregiver && <InstantJobsDropdown />}
        </div>
      </div>

      {/* Floating Chat Button */}
      <ChatPopup />

      {/* Auth Guard Dialog Modal */}
      <AuthGuardDialog
        isOpen={isAuthGuardOpen}
        onClose={() => setIsAuthGuardOpen(false)}
      />

    </div>
  );
}

export default Home;
