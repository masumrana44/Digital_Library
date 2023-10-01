import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string().optional(),
    }),
    role: z.enum(['admin'] as [string, ...string[]]).optional(),
    email: z
      .string({
        required_error: 'email is required',
      })
      .email(),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

export const UserZodValidation = {
  createUserZodSchema,
};
