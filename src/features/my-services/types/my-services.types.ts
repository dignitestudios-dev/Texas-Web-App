export type SidebarTab = 'explore' | 'services' | 'requests' | 'active' | 'history';

export type ServicesSubTab = 'active' | 'inactive';
export type ActiveJobsSubTab = 'upcoming' | 'ongoing';
export type HistorySubTab = 'completed' | 'canceled';

export interface ServiceItem {
  id: string;
  title: string;
  isFeatured?: boolean;
  image: string;
  description: string;
  priceHourly: number;
  isActive: boolean;
}

export interface RequestItem {
  id: string;
  seekerName: string;
  seekerTitle: string;
  seekerRating: number;
  seekerRatingCount: number;
  seekerAvatar: string;
  jobTitle: string;
  priceRange: string;
  description: string;
  time: string;
  date: string;
  location: string;
  distance: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  images: string[];
}

export interface ActiveJobItem {
  id: string;
  title?: string;
  category: string;
  priceRange: string;
  budgetRange?: string;
  description: string;
  time: string;
  date: string;
  location: string;
  distance: string;
  seekerName: string;
  seekerAvatar: string;
  seekerRating: number;
  seekerReviews: number;
  seekerServices: number;
  type: 'upcoming' | 'ongoing';
}

export interface HistoryItem {
  id: string;
  title?: string;
  category: string;
  description?: string;
  time?: string;
  date?: string;
  location?: string;
  distance?: string;
  budgetRange?: string;
  seekerName: string;
  seekerAvatar: string;
  seekerRating: number;
  seekerReviews: number;
  seekerServices: number;
  status: 'Completed' | 'Cancelled';
  cancellationReason?: string;
  review?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerAvatar: string;
  };
}
