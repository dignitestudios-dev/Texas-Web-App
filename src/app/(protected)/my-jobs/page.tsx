'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { MyJobsPage, JobsPageSkeleton } from '@/features/care-services';
import { GiverMyJobsPage } from '@/features/giver-jobs';
import { getRole, getToken, UserRole } from '@/lib/cookies';

export default function Page() {
  const [role, setRole] = useState<UserRole | undefined>(undefined);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    const updateRoleState = () => {
      setRole(getRole() || 'seeker');
      setIsGuest(!getToken());
    };
    updateRoleState();
    window.addEventListener('roleChange', updateRoleState);
    window.addEventListener('authChange', updateRoleState);
    return () => {
      window.removeEventListener('roleChange', updateRoleState);
      window.removeEventListener('authChange', updateRoleState);
    };
  }, []);

  return (
    <Suspense fallback={<JobsPageSkeleton />}>
      {role === 'giver' || isGuest ? <GiverMyJobsPage /> : <MyJobsPage />}
    </Suspense>
  );
}
