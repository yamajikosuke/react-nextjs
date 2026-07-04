"use client";

import { useState } from "react";
import { Button } from "@mui/material";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Client Component Sample</h2>
      <p>カウント: {count}</p>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        増やす
      </Button>
    </div>
  );
}
