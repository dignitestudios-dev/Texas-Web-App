'use client';

import React, { use } from 'react';
import { SeekerProfilePage } from '@/features/giver-jobs';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  return <SeekerProfilePage jobId={resolvedParams.id} />;
}
