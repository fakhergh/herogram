"use client";
import IconLock from "@mui/icons-material/Lock";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NextLinkComposed } from "@/app/components/Link/Link";
import {
  LoginForm,
  LoginFormValues,
} from "@/app/components/LoginForm/LoginForm";
import { Routes } from "@/app/config/navigation";
import { useLogin } from "@/app/services/authService";

export default function LoginPage() {
  const { t } = useTranslation("LoginPage");
  const { push } = useRouter();

  const { mutate, data, isPending } = useLogin();

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      mutate({ email: values.email, password: values.password });
    },
    [mutate],
  );

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
      push(Routes.home);
    }
  }, [data, push]);

  return (
    <>
      <Box mt={3}>
        <IconLock />
      </Box>
      <Typography component="h5" variant="h5" mb={3}>
        {t("labels.login")}
      </Typography>
      <LoginForm onSubmit={onSubmit} loading={isPending} />
      <Box mt={1} sx={{ textDecoration: "none" }}>
        <Button
          component={NextLinkComposed}
          to={{ pathname: Routes.auth.register }}
        >
          {t("links.register")}
        </Button>
      </Box>
    </>
  );
}
