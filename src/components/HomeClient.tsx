"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { apiClient } from "@/lib/api/client";
import { contactSchema, ContactSchema } from "@/lib/validation/contact";
import { useCounterStore } from "@/lib/store/counter";

const columns: GridColDef[] = [
  { field: "name", headerName: "ライブラリ", flex: 1 },
  { field: "purpose", headerName: "用途", flex: 1 },
];

const rows = [
  { id: 1, name: "MUI", purpose: "UI" },
  { id: 2, name: "MUI X", purpose: "Data Grid" },
  { id: 3, name: "Wijmo", purpose: "Enterprise UI" },
];

export function HomeClient() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  const { data } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await apiClient.get<{ status: string }>("/api/health");
      return response.data;
    },
  });

  const { register, handleSubmit, formState } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4">Next.js 15 + React 19 Starter</Typography>
        <Typography>API Health: {data?.status ?? "loading"}</Typography>

        <Button variant="contained" onClick={increment}>
          Zustand Counter: {count}
        </Button>

        <Box component="form" onSubmit={handleSubmit(() => undefined)} sx={{ maxWidth: 420 }}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={Boolean(formState.errors.email)}
              helperText={formState.errors.email?.message}
            />
            <Button type="submit" variant="outlined">
              React Hook Form + Zod
            </Button>
          </Stack>
        </Box>

        <Box sx={{ height: 260 }}>
          <DataGrid columns={columns} rows={rows} hideFooter />
        </Box>

        <Alert severity="info">OpenAPI Generator / Swagger は openapi ディレクトリを参照してください。</Alert>
      </Stack>
    </Container>
  );
}
