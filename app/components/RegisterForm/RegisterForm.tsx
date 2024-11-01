"use client";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { InputField } from "@/app/components/InputField/InputField";
import { BaseFormProps } from "@/app/interfaces/form";
import Yup from "@/app/utils/yup";

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFormProps = BaseFormProps<RegisterFormValues>;

const defaultValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .min(6)
    .oneOf([Yup.ref("password")])
    .required(),
});

export function RegisterForm({
  initialValues = defaultValues,
  loading,
  ...props
}: RegisterFormProps) {
  const { onSubmit } = props;

  const { t } = useTranslation("RegisterForm");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InputField
              margin="normal"
              required
              fullWidth
              label={t("inputs.name.label")}
              name="name"
              autoComplete="off"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              margin="normal"
              required
              fullWidth
              label={t("inputs.email.label")}
              name="email"
              autoComplete="email"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("inputs.password.label")}
              type="password"
              autoComplete="new-password"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={t("inputs.confirmPassword.label")}
              type="password"
              autoComplete="new-password"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
              disabled={loading}
            >
              {t("buttons.register")}
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
