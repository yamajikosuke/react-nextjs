"use client";

import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewUserButton from "./NewUserButton";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserTable({ initialUsers }: { initialUsers: User[] }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // スマホ判定（600px以下）
  const isMobile = useMediaQuery("(max-width:600px)");

  // ダイアログの状態管理
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  const { data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => initialUsers,
    initialData: initialUsers,
  });

  const handleOpenDialog = (id: number, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
    setSelectedName("");
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    await fetch(`/api/users/${selectedId}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["users"] });

    setOpen(false);
    setSelectedId(null);
    setSelectedName("");
  };

  // ★ スマホ時は email 列を非表示、操作はアイコン化
  const columns: GridColDef<User>[] = isMobile
    ? [
        { field: "id", headerName: "ID", width: 60 },
        { field: "name", headerName: "名前", flex: 1 },

        {
          field: "actions",
          headerName: "操作",
          width: 100,
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams<User>) => (
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => router.push(`/admin/users/${params.row.id}`)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => handleOpenDialog(params.row.id, params.row.name)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ),
        },
      ]
    : [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "名前", minWidth: 140, flex: 1 },
        { field: "email", headerName: "メール", minWidth: 180, flex: 1.2 },

        {
          field: "actions",
          headerName: "操作",
          minWidth: 170,
          flex: 1,
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams<User>) => (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                width: "100%",
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <Button
                size="small"
                variant="outlined"
                color="primary"
                sx={{ width: { xs: "100%", sm: "auto" } }}
                onClick={() => router.push(`/admin/users/${params.row.id}`)}
              >
                編集
              </Button>

              <Button
                size="small"
                variant="contained"
                color="error"
                sx={{ width: { xs: "100%", sm: "auto" } }}
                onClick={() => handleOpenDialog(params.row.id, params.row.name)}
              >
                削除
              </Button>
            </Stack>
          ),
        },
      ];

  return (
    <Stack spacing={2}>
      {/* 右上に新規追加ボタン */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "flex-end",
        }}
      >
        <NewUserButton />
      </Box>

      <div style={{ width: "100%", minWidth: 300 }}>
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight
          disableColumnMenu
          pageSizeOptions={[5, 10, 25]}
        />
      </div>

      {/* 削除確認ダイアログ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>本当に「{selectedName}」を削除しますか？</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
