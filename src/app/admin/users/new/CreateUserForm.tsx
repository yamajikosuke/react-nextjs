"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserInput } from "../userSchema";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserInput) => {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("ユーザーを作成しました！");
    reset();

    // 一覧ページへ戻る
    router.push("/admin/users");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="名前"
          {...register("name")}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="メール"
          {...register("email")}
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Button type="submit" variant="contained" color="primary">
          作成する
        </Button>
      </Stack>
    </form>
  );
}
