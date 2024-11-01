"use client";
import IconVisibility from "@mui/icons-material/Visibility";
import IconVisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { InputField } from "@/app/components/InputField/InputField";
import { BaseFormProps } from "@/app/interfaces/form";
import Yup from "@/app/utils/yup";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = BaseFormProps<LoginFormValues>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export function LoginForm({
  initialValues = defaultValues,
  loading,
  ...props
}: LoginFormProps) {
  const { onSubmit } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { t } = useTranslation("LoginForm");

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

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
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={togglePasswordVisibility}>
                      {passwordVisible ? (
                        <IconVisibilityOff fontSize="small" />
                      ) : (
                        <IconVisibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              {t("buttons.login")}
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
