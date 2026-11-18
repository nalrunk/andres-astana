import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(60, "Слишком длинное имя"),
  city: z.string().trim().min(2, "Укажите город").max(60, "Слишком длинное название"),
  height: z.coerce
    .number({ invalid_type_error: "Укажите рост в сантиметрах" })
    .int("Укажите рост целым числом")
    .min(140, "Рост от 140 см")
    .max(210, "Рост до 210 см"),
  contact: z
    .string()
    .trim()
    .min(3, "Оставьте ссылку или @username")
    .max(200, "Слишком длинная ссылка")
    .refine(
      (v) => /^@[a-zA-Z0-9_]{4,32}$/.test(v) || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v),
      "Нужна ссылка на соцсеть или Telegram @username",
    ),
});

export type Application = z.infer<typeof applicationSchema>;
