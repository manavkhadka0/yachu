import { z } from "zod";

export const proposalFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Firstname is required",
  }),
  lastName: z.string().min(1, {
    message: "Lastname is required",
  }),
  age: z.string(),
  gender: z.string(),
  email: z.string().min(10, {
    message: "Email is required",
  }),
  mobileNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid mobile number",
  }),
  address: z.string().optional(),
  skills: z.string().min(1, {
    message: "Skills is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  experience: z.string().min(1, {
    message: "Message is required",
  }),
});

export const contactFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name is required",
  }),
  email: z.string().min(10, {
    message: "Email is required",
  }),
  phone: z.string().min(1, {
    message: "Phone No. is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});
