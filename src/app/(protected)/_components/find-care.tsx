'use client';

import React, { useState, useEffect } from 'react';
import SeekerFindCarePage from './seeker-find-care';
import GiverInstantJobPage from './giver-instant-job';
import { getRole, UserRole } from '@/lib/cookies';

export default function FindCarePage() {
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
    return <GiverInstantJobPage />;
  }

  return <SeekerFindCarePage />;
}
