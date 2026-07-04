import { z } from "zod";

export const contactSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
