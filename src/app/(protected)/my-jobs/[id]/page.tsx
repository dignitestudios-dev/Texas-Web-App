'use client';

import React, { useState, useEffect, use } from 'react';
import { JobDetailsPage } from '@/features/care-services/components/job-details-page';
import { GiverJobDetailsPage } from '@/features/giver-jobs';
import { getRole } from '@/lib/cookies';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  const [role, setRole] = useState<'seeker' | 'giver' | null>(null);

  useEffect(() => {
    setRole(getRole() || 'seeker');
  }, []);

  if (role === 'giver') {
    return <GiverJobDetailsPage jobId={resolvedParams.id} />;
  }

  return <JobDetailsPage jobId={resolvedParams.id} />;
}
