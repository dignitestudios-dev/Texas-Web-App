'use client';

import React, { useState, useEffect } from 'react';
import { getRole } from '@/lib/cookies';
import { GiverProfileForm, ProfileForm } from '@/features/auth';

export default function CreateProfilePage() {
  const role = getRole()

  if (role === 'giver') {
    return (
      <div className="flex-1 flex items-center justify-center min-h-full w-full">
        <GiverProfileForm />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-full w-full">
      <ProfileForm />
    </div>
  );
}
