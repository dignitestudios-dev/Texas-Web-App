"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser } from './auth.api';
import { authKeys } from './auth.queries';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Typically you would save the token to a cookie here, e.g. via document.cookie or an API route
      document.cookie = `auth-token=${data.token}; path=/; max-age=86400;`;

      queryClient.setQueryData(authKeys.currentUser(), data.user);
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error('Failed to login. Please check your credentials.');
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      document.cookie = `auth-token=${data.token}; path=/; max-age=86400;`;

      queryClient.setQueryData(authKeys.currentUser(), data.user);
      toast.success('Registered successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error('Failed to register.');
    },
  });
};
