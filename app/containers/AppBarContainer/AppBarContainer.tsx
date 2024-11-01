import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { AppBar } from "@/app/components/AppBar/AppBar";
import { Routes } from "@/app/config/navigation";
import { useLogout } from "@/app/services/authService";
import { queryClient } from "@/app/utils/queryClient";

export function AppBarContainer() {
  const { mutate, data } = useLogout();

  const { push } = useRouter();

  const onLogoutClick = useCallback(() => {
    mutate(undefined);
  }, [mutate]);

  useEffect(() => {
    if (data) {
      localStorage.removeItem("token");
      push(Routes.auth.login);
      setTimeout(() => {
        queryClient.clear();
      }, 0);
    }
  }, [data, push]);

  return <AppBar onLogoutClick={onLogoutClick} />;
}
