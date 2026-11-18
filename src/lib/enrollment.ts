import { z } from "zod";

export const enrollmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Укажите имя и фамилию")
    .max(80, "Слишком длинное имя")
    .refine((v) => v.split(/\s+/).filter(Boolean).length >= 2, "Укажите имя и фамилию через пробел"),
  age: z.coerce
    .number({ invalid_type_error: "Укажите возраст" })
    .int("Целое число")
    .min(7, "От 7 лет")
    .max(35, "До 35 лет"),
  height: z.coerce
    .number({ invalid_type_error: "Укажите рост" })
    .int("Целое число")
    .min(110, "От 110 см")
    .max(210, "До 210 см"),
  contact: z
    .string()
    .trim()
    .refine(
      (v) => /^@[a-zA-Z0-9_]{4,32}$/.test(v) || /^\+?[0-9\s()-]{10,18}$/.test(v),
      "Нужен телефон (+7 …) или Telegram @username",
    ),
  course: z.string().min(1, "Выберите курс"),
  consent: z.literal(true, { errorMap: () => ({ message: "Нужно согласие на обработку данных" }) }),
});

export type Enrollment = z.infer<typeof enrollmentSchema>;
