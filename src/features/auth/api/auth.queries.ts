import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './auth.api';

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
  });
};
