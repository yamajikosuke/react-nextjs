import { Button, Stack } from "@mui/material";
import Link from "next/link";
import EditUserForm from "./EditUserForm";

async function getUser(id: string) {
  // 本来は DB や API から取得する
  const users = [
    { id: "1", name: "山田太郎", email: "taro@example.com" },
    { id: "2", name: "佐藤花子", email: "hanako@example.com" },
  ];

  return users.find((u) => u.id === id);
}

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }

  return (
    <Stack spacing={2}>
      <div>
        <Button component={Link} href="/admin/users" variant="outlined">
          一覧に戻る
        </Button>
      </div>
      <h1>ユーザー編集</h1>
      <EditUserForm user={user} />
    </Stack>
  );
}
