import IconOpenInNew from "@mui/icons-material/OpenInNew";
import { Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

export interface PostItemProps {
  url: string;
  name: string;
  viewsCount: number;
  tags?: Array<string>;
  onShareClick?: () => void;
}

export function PostItem({
  url,
  name,
  viewsCount,
  tags = [],
  onShareClick,
}: PostItemProps) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
      <Box position="relative" width={100} height={100}>
        <Image src={url} fill alt="" />
      </Box>
      <Box>
        <Box>
          <Typography>{name}</Typography>
          <Typography variant="caption">{viewsCount} Views</Typography>
        </Box>
        <Box display="flex" gap={1} mt={1}>
          {tags?.map((tag, i) => <Chip key={i} label={`#${tag}`} />)}
        </Box>
      </Box>
      <Box>
        <IconButton onClick={onShareClick}>
          <IconOpenInNew />
        </IconButton>
      </Box>
    </Box>
  );
}
