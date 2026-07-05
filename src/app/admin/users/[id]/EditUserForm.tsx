"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserInput } from "../userSchema";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function EditUserForm({ user }: { user: User }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: UserInput) => {
    await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("更新しました！");
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
          更新する
        </Button>
      </Stack>
    </form>
  );
}
