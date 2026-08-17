export interface Caregiver {
  id?: string;
  rank: number;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  servicesCount: number;
  completedServicesCount: number;
  verified: boolean;
  message: string;
}

export interface LeaderboardCategoryData {
  category: string;
  podium: {
    first: Caregiver;
    second: Caregiver;
    third: Caregiver;
  };
  table: Caregiver[];
}
