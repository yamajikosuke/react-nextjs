"use client";

import Button from "@mui/material/Button";

export default function MuiSamplePage() {
  return (
    <div>
      <h1>MUI テーマのサンプル</h1>
      <Button variant="contained" color="primary">
        プライマリボタン
      </Button>
      <Button variant="contained" color="secondary">
        セカンダリボタン
      </Button>
    </div>
  );
}
