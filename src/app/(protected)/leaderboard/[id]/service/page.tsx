import ServiceDetailPage from '@/features/leaderboard/components/service-detail-page';
import { Caregiver } from '@/features/leaderboard';

const MOCK_CAREGIVERS: Record<string, Caregiver> = {
  'john-doe': {
    rank: 1,
    name: 'John Doe',
    avatar: '/images/avatar.webp',
    rating: 4.9,
    reviewsCount: 32,
    servicesCount: 75,
    completedServicesCount: 1250,
    verified: true,
    message: 'Experienced companion caregiver specializing in senior support, recreational activities, and personal care assistance.',
  },
  'nandi-bolard': {
    rank: 2,
    name: 'Nandi Bolard',
    avatar: '/images/avatar.webp',
    rating: 5.0,
    reviewsCount: 48,
    servicesCount: 98,
    completedServicesCount: 1450,
    verified: true,
    message: 'Passionate and certified companion specialist with over 7 years in social assistance.',
  },
  'mark-taylor': {
    rank: 3,
    name: 'Mark Taylor',
    avatar: '/images/avatar.webp',
    rating: 4.8,
    reviewsCount: 22,
    servicesCount: 50,
    completedServicesCount: 980,
    verified: true,
    message: 'Caring, friendly assistant providing conversational companionship and household chore support.',
  },
  'james-brown': {
    rank: 4,
    name: 'James Brown',
    avatar: '/images/giver.webp',
    rating: 4.7,
    reviewsCount: 42,
    servicesCount: 65,
    completedServicesCount: 1090,
    verified: true,
    message: 'Reliable and punctual professional with extensive history in companion service care.',
  },
  'sara-wilson': {
    rank: 5,
    name: 'Sara Wilson',
    avatar: '/images/avatar.webp',
    rating: 4.7,
    reviewsCount: 25,
    servicesCount: 38,
    completedServicesCount: 890,
    verified: true,
    message: 'Dedicated support caregiver focused on companion therapy and mobility support.',
  },
  'maria-garcia': {
    rank: 6,
    name: 'Maria Garcia',
    avatar: '/images/giver.webp',
    rating: 4.5,
    reviewsCount: 19,
    servicesCount: 28,
    completedServicesCount: 850,
    verified: false,
    message: 'Attentive caregiver offering compassionate companion visits.',
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params;
  const caregiver = MOCK_CAREGIVERS[id] || MOCK_CAREGIVERS['john-doe'];

  return <ServiceDetailPage caregiver={caregiver} />;
}
