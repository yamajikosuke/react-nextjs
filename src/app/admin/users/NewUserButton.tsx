"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NewUserButton() {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ width: { xs: "100%", sm: "auto" } }}
      onClick={() => router.push("/admin/users/new")}
    >
      新規追加
    </Button>
  );
}
