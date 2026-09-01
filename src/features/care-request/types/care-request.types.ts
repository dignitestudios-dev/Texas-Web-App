export interface CareRequestFormData {
  // Step 1
  category: string;
  subCategory: string;

  // Step 2
  images: string[];
  serviceTitle: string;
  location: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  minPrice: string;
  maxPrice: string;
  experience: string;
  language: string;
  radius: number;
  certificates: string;

  // Step 3
  selectedPlan?: '1-day' | '7-days' | '30-days';
}

export const INITIAL_CARE_REQUEST_DATA: CareRequestFormData = {
  category: 'Senior Care',
  subCategory: '',
  images: [],
  serviceTitle: 'Elderly Care Assistant Seeking Job',
  location: 'San Juan, Texas(TX)',
  description:
    "I'm looking for a reliable and patient caregiver to join our family. Focus on outdoor play and reading. Must be safety-conscious and energetic.",
  date: '12 Dec 23',
  startTime: '12:00 PM',
  endTime: '04:00 PM',
  minPrice: '35',
  maxPrice: '50',
  experience: '3+ Years',
  language: 'English',
  radius: 15,
  certificates: 'CPR Certified',
};

export const CARE_SERVICE_CATEGORIES = [
  'Senior Care',
  'Child Care',
  'Post-Hospital & Recovery Care',
  'Special Needs & Disability Support',
  'Companion Care',
  'Respite Care',
];
