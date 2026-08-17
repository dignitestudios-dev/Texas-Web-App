import * as z from 'zod';

export const createJobSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().optional(),
  images: z.array(z.string()).optional(),
  serviceTitle: z.string().min(3, 'Service title must be at least 3 characters'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  minPrice: z.string().min(1, 'Min price is required'),
  maxPrice: z.string().min(1, 'Max price is required'),
  experience: z.string().optional(),
  language: z.string().optional(),
  radius: z.number().default(15),
  certificates: z.string().optional(),
});

export type CreateJobFormValues = z.input<typeof createJobSchema>;
