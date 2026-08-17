'use client';

import React, { useState, useEffect } from 'react';
import { MyJobsPage } from '@/features/care-services';
import { GiverMyJobsPage } from '@/features/giver-jobs';
import { getRole } from '@/lib/cookies';

export default function Page() {


 const role = getRole()


  if (role === 'giver') {
    return <GiverMyJobsPage />;
  }

  return <MyJobsPage />;
}
