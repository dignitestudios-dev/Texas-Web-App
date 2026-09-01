'use client';

import React, { useState, useEffect } from 'react';
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

  if (role === 'giver') {
    return <GiverMyJobsPage />;
  }

  return <MyJobsPage />;
}
