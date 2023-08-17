import z from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;
const regexNoNumber = /^[^\d]*$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const RegisterUserSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 letters long" })
    .refine(
      (imie) => {
        return regexNoNumber.test(imie);
      },
      {
        message: "Name cannot contain numbers",
      }
    ),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    })
    .max(MAX_PASSWORD_LENGTH, {
      message: `Password cannot be longer than ${MAX_PASSWORD_LENGTH} characters`,
    })
    .refine(
      (password) => {
        return passwordRegex.test(password);
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    })
    .max(MAX_PASSWORD_LENGTH, {
      message: `Password cannot be longer than ${MAX_PASSWORD_LENGTH} characters`,
    })
    .refine(
      (password) => {
        return passwordRegex.test(password);
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
