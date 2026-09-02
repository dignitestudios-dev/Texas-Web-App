'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { MyJobsPage, JobsPageSkeleton } from '@/features/care-services';
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
    <Suspense fallback={<JobsPageSkeleton />}>
      {role === 'giver' ? <GiverMyJobsPage /> : <MyJobsPage />}
    </Suspense>
  );
}
