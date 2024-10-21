import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().min(1, { message: "Invalid email address" }).email(),
    password: z
      .string()
      .min(8, { message: "Password is must be 8 characters long" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

type signupType = z.infer<typeof signupSchema>;

export { signupSchema, type signupType };
