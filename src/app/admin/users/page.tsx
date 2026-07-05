import UserTable from "./UserTable";
import { Stack } from "@mui/material";

export default function UsersPage() {
  const users = [
    { id: 1, name: "山田太郎", email: "taro@example.com" },
    { id: 2, name: "佐藤花子", email: "hanako@example.com" },
  ];

  return (
    <Stack spacing={2}>
      <h1>ユーザー一覧</h1>

      <UserTable initialUsers={users} />
    </Stack>
  );
}
