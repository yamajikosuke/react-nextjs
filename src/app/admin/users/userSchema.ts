import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
});

export type UserInput = z.infer<typeof userSchema>;
