import z from "zod";

const regexNoNumber = /^[^\d]*$/;

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 letters long" })
    .max(15, { message: "Name cannot be longer than 15 characters" })
    .refine(
      (projectName) => {
        return regexNoNumber.test(projectName);
      },
      {
        message: "Name cannot contain numbers",
      }
    ),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;
