import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name is required",
  }),
  email: z.string().optional(),
  phone: z.string().min(1, {
    message: "Phone No. is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

export const checkoutFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name is required",
  }),
  email: z.string().optional(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
  alternate_phone: z.string().optional(),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  remarks: z.string().optional(),
});

export const instantOrderFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  address: z.string().min(2, {
    message: "Address is required",
  }),
  phone_number: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits",
    })
    .refine((value) => /^\d{10,}$/.test(value.replace(/\s+/g, "")), {
      message: "Please enter a valid phone number",
    }),
  quantity: z.number().min(1).max(3).default(1),
});
