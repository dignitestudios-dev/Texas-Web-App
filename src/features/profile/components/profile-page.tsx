'use client';

import React, { useState, useEffect } from 'react';
import { getRole, UserRole } from '@/lib/cookies';
import { GiverProfilePage } from './giver-profile-page';
import { SeekerProfilePage } from './seeker-profile-page';

export default function ProfilePage() {
  const [role, setRole] = useState<UserRole | undefined>(undefined);

  useEffect(() => {
    const updateRoleState = () => {
      setRole(getRole() || 'giver');
    };
    updateRoleState();
    window.addEventListener('roleChange', updateRoleState);
    return () => window.removeEventListener('roleChange', updateRoleState);
  }, []);

  // If caregiver role, render the caregiver-specific profile page
  if (role === 'giver') {
    return <GiverProfilePage />;
  }

  // Otherwise (seeker or default), render seeker profile page
  return <SeekerProfilePage />;
}
