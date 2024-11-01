"use client";
import IconDelete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRef } from "react";

import { LocalFile, PickedFile, RemoteFile } from "@/app/interfaces/file";

export interface ImageWrapperProps {
  height?: number;
}

export interface DropzoneAreaPreviewProps extends ImageWrapperProps {
  files: Array<PickedFile>;
  disabled?: boolean;
  onImageDelete: (file: PickedFile) => void;
}

const ImageWrapper = styled(Box)<ImageWrapperProps>(({ theme, height }) => ({
  userSelect: "none",
  "& img": {
    width: "auto",
    height: height ?? 172,
    borderRadius: "1rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.action.disabled,
  },
  " .actions-container": {
    display: "flex",
    opacity: 0,
  },
  "&:hover .actions-container": {
    opacity: 1,
  },

  "& .MuiButtonBase-root": {
    transform: "scale(.9)",
    backgroundColor: "white",
    "&:hover": {
      transform: "scale(1)",
      backgroundColor: "white",
    },
  },
}));

export function DropzoneAreaPreview({
  files,
  height,
  disabled,
  ...props
}: DropzoneAreaPreviewProps) {
  const { onImageDelete } = props;

  const ref = useRef(null);

  /*const scrollToEnd = React.useCallback(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    React.useEffect(() => {
        if (files.length) {
            scrollToEnd();
        }
    }, [files.length, scrollToEnd]);
*/
  return (
    <Box display="flex" gap={2} overflow="auto" py={2}>
      {files.map((file: PickedFile) => (
        <ImageWrapper
          position="relative"
          key={file.id}
          ref={ref}
          height={height}
        >
          <Image
            alt="preview"
            src={
              file.hasOwnProperty("url")
                ? (file as RemoteFile).url
                : URL.createObjectURL((file as LocalFile).file)
            }
            width={0}
            height={0}
            unoptimized
          />
          <Box
            className="actions-container"
            position="absolute"
            width="100%"
            height="100%"
            top={0}
            left={0}
            bottom={0}
            right={0}
            justifyContent="flex-end"
            alignItems="flex-start"
            p={1}
          >
            {!disabled && (
              <IconButton color="error" onClick={() => onImageDelete(file)}>
                <IconDelete />
              </IconButton>
            )}
          </Box>
        </ImageWrapper>
      ))}
    </Box>
  );
}
