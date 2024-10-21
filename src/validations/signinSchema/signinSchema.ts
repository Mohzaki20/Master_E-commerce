import { z } from "zod";

const signinSchema = z.object({
  email: z.string().min(1, { message: "Invalid email address" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type siginType = z.infer<typeof signinSchema>;

export { signinSchema, type siginType };
