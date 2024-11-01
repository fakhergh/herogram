"use client";
import IconCloudUpload from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import { withMemo } from "@/app/hocs/memo";
import { LocalFile } from "@/app/interfaces/file";

export interface DropzoneAreaProps
  extends Omit<
    DropzoneOptions,
    "onDropAccepted" | "onDragEnter" | "onDragLeave" | "onDrop"
  > {
  aspectRatio?: number;
  onDropAccepted: (files: Array<LocalFile>) => void;
  error: boolean;
}

const DropZone = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "error" &&
    prop !== "dragEntered" &&
    prop !== "aspectRatio" &&
    prop !== "disabled",
})<{
  error?: boolean;
  disabled?: boolean;
  dragEntered?: boolean;
  aspectRatio?: number;
}>(({ theme, dragEntered, error, disabled, aspectRatio = 3 }) => ({
  aspectRatio,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "15rem",
  borderWidth: ".125rem",
  borderRadius: "1rem",
  backgroundColor:
    !disabled && dragEntered && error
      ? theme.palette.mode === "dark"
        ? red["200"]
        : red["50"]
      : "transparent",
  borderColor:
    !disabled && dragEntered
      ? error
        ? theme.palette.error.main
        : theme.palette.success.main
      : error
        ? theme.palette.error.main
        : theme.palette.action.disabled,
  color:
    !disabled && dragEntered
      ? error
        ? theme.palette.error.main
        : theme.palette.success.main
      : error
        ? theme.palette.error.main
        : theme.palette.action.disabled,
  borderStyle: "dashed",
  cursor: "pointer",
  "&:hover": !disabled &&
    !dragEntered && {
      borderColor: theme.palette.action.active,
      color: theme.palette.action.active,
    },
  "& div": {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  "& p,svg": {
    userSelect: "none",
  },
}));
export const DropzoneArea = withMemo(function ({
  onDropAccepted,
  aspectRatio,
  error,
  disabled,
  ...options
}: DropzoneAreaProps) {
  const { t } = useTranslation("DropzoneArea");

  const [dragEntered, setDragEntered] = React.useState(false);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      disabled,
      ...options,
      onDragEnter: () => {
        setDragEntered(true);
      },
      onDragLeave: () => {
        setDragEntered(false);
      },
      onDrop: () => {
        setDragEntered(false);
      },
      onDropAccepted: (files: Array<File>) => {
        onDropAccepted(
          files.map(
            (file, index: number) =>
              ({
                id: `${Date.now()}${index}`,
                file,
              }) as LocalFile,
          ),
        );
      },
    });

  return (
    <DropZone
      aspectRatio={aspectRatio}
      dragEntered={dragEntered}
      error={isDragReject || error}
      disabled={disabled}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Box display="flex" flexDirection="column" textAlign="center" p={3}>
        <IconCloudUpload fontSize="large" />

        {isDragActive ? (
          <Typography>
            {isDragReject ? t("labels.dragRejected") : t("labels.dragHere")}
          </Typography>
        ) : (
          <Typography>{t("labels.hint")}</Typography>
        )}
      </Box>
    </DropZone>
  );
});

export const DEFAULT_ACCEPTED_FILES = {
  "image/*": [".jpeg", ".png"],
  "video/*": [".mp4", ".avi", ".mkv"],
};
