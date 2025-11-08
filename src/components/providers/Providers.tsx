"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light" // <- fuerza el tema inicial
      enableSystem={false} // <- desactiva el modo automático del sistema
      disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
