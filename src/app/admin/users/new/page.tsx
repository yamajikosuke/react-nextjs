// src/app/admin/users/new/page.tsx

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";

export default function CreateUserPage() {
  return (
    <Stack spacing={2}>
      <div>
        <Button component={Link} href="/admin/users" variant="outlined">
          一覧に戻る
        </Button>
      </div>
      <h1>ユーザー新規作成</h1>
      <CreateUserForm />
    </Stack>
  );
}
