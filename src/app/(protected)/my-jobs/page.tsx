'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { MyJobsPage } from '@/features/care-services';
import { GiverMyJobsPage } from '@/features/giver-jobs';
import { getRole, UserRole } from '@/lib/cookies';

export default function Page() {
  const [role, setRole] = useState<UserRole | undefined>(undefined);

  useEffect(() => {
    const updateRoleState = () => {
      setRole(getRole() || 'seeker');
    };
    updateRoleState();
    window.addEventListener('roleChange', updateRoleState);
    return () => window.removeEventListener('roleChange', updateRoleState);
  }, []);

  return (
    <Suspense fallback={<div className="h-[calc(100vh-0px)] bg-[#FFF6F0]/20 flex items-center justify-center font-rubik text-[#565656]">Loading...</div>}>
      {role === 'giver' ? <GiverMyJobsPage /> : <MyJobsPage />}
    </Suspense>
  );
}
