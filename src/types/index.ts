import z from "zod";

export const SignInSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Min 2 chars." })
    .regex(/^[a-z0-9]+$/, { message: "Only lowercase letters and numbers." }),
  password: z
    .string()
    .min(6, { message: "Min 6 chars." })
    .regex(/[0-9]/, { message: "At least 1 number." })
})
export type SignInInput = z.infer<typeof SignInSchema>

export const SignUpSchema = SignInSchema.extend({
  name: z
    .string()
    .min(1, { message: "First name is required." }),
})
export type SignUpInput = z.infer<typeof SignUpSchema>
