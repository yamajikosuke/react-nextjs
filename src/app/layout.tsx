"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                My Next.js App
              </Typography>
              <Button color="inherit" component={Link} href="/">
                Home
              </Button>
              <Button color="inherit" component={Link} href="/about">
                About
              </Button>
              <Button color="inherit" component={Link} href="/contact">
                Contact
              </Button>
            </Toolbar>
          </AppBar>

          <main style={{ padding: "24px" }}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
