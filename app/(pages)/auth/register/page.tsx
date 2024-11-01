"use client";
import IconLock from "@mui/icons-material/Lock";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  RegisterForm,
  RegisterFormValues,
} from "@/app/components/RegisterForm/RegisterForm";
import { Routes } from "@/app/config/navigation";
import { useRegister } from "@/app/services/authService";

export default function RegisterPage() {
  const { t } = useTranslation("RegisterPage");
  const { push } = useRouter();

  const { mutate, data, isPending } = useRegister();

  const onSubmit = useCallback(
    (values: RegisterFormValues) => {
      mutate({
        name: values.name,
        email: values.email,
        password: values.password,
      });
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
        {t("labels.register")}
      </Typography>
      <RegisterForm onSubmit={onSubmit} loading={isPending} />
    </>
  );
}
