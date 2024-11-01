"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { Routes } from "@/app/config/navigation";
import { AppBarContainer } from "@/app/containers/AppBarContainer/AppBarContainer";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import i18n from "@/app/i18n";
import { theme } from "@/app/styles/theme";
import { queryClient } from "@/app/utils/queryClient";

export function Container({ children }: PropsWithChildren) {
  const [isRendered, setRendered] = useState(false);

  useHttpClient();

  const pathname = usePathname();

  const isAuthPage = pathname.startsWith(Routes.auth.self);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!isRendered) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isAuthPage && <AppBarContainer />}
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
