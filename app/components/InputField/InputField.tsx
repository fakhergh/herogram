"use client";
import { FilledInputProps } from "@mui/material/FilledInput";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { BaseFieldProps } from "@/app/interfaces/form";
import { buildError } from "@/app/utils/yup";

export interface InputFieldProps
  extends BaseFieldProps,
    Omit<TextFieldProps, "name" | "value" | "onChange" | "onBlur"> {
  InputProps?: Partial<FilledInputProps>;
  withHelperText?: boolean;
}

export function InputField({
  name,
  role,
  InputProps,
  withHelperText = true,
  type,
  ...props
}: InputFieldProps) {
  const { t: tYup } = useTranslation("yup");

  const [{ value, onChange, onBlur }, { error }] = useField(name);

  const ariaLabel = props["aria-label"];

  const inputProps = useMemo(
    () => ({
      role: role,
      "aria-label": ariaLabel,
    }),
    [role, ariaLabel],
  );

  const helperText: string = useMemo(() => {
    return buildError({ t: tYup, error });
  }, [error, tYup]);

  return (
    <TextField
      {...props}
      type={type}
      inputProps={inputProps}
      name={name}
      value={value}
      onChange={onChange(name)}
      onBlur={onBlur(name)}
      color={!!error ? "error" : "primary"}
      error={!!error}
      helperText={withHelperText ? helperText : undefined}
      InputProps={{
        ...InputProps,
        sx: {
          borderRadius: "1rem",
        },
      }}
      sx={{ m: 0 }}
      InputLabelProps={{ shrink: true }}
    />
  );
}
