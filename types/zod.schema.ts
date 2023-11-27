import { z } from "zod";

export const proposalFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Firstname is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Lastname is required",
  }),
  age: z.string(),
  gender: z.string(),
  email: z.string().min(10, {
    message: "Email is required",
  }),
  landlineNumber: z.string().optional(),

  mobileNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid mobile number",
  }),
  temporaryAddress: z.string().optional(),
  permanentAddress: z.string().min(1, {
    message: "Address is required",
  }),
  skills: z.array(z.string()),
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
