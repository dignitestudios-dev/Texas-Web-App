import * as z from 'zod';

export const createServiceSchema = z.object({
  serviceTitle: z
    .string()
    .min(3, 'Service title must be at least 3 characters')
    .max(120, 'Service title cannot exceed 120 characters'),
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().min(1, 'Please select a sub category'),
  payRate: z.string().min(1, 'Pay rate is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  isActive: z.boolean(),
  images: z.array(z.string()),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;
