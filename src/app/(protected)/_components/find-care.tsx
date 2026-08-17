'use client';
import SeekerFindCarePage from './seeker-find-care';
import GiverInstantJobPage from './giver-instant-job';
import { getRole } from '@/lib/cookies';

export default function FindCarePage() {

  const role =  getRole()


  if (role === 'giver') {
    return <GiverInstantJobPage />;
  }

  return <SeekerFindCarePage />;
}
