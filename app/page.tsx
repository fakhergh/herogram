"use client";
import IconAdd from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";

import { PostFormContainer } from "@/app/containers/PostFormContainer/PostFormContainer";
import { PostItemContainer } from "@/app/containers/PostItemContainer/PostItemContainer";
import { usePosts } from "@/app/services/postService";

export default function Home() {
  const [createPostFormVisible, setCreatePostFormVisible] = useState(false);

  const { data } = usePosts();

  return (
    <Box
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        overflowY: "auto",
      }}
    >
      <Container sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          {data?.map((post) => (
            <PostItemContainer
              key={post._id}
              name={post.filename}
              url={post.url}
              viewsCount={post.viewsCount}
              tags={post.tags}
              sharableUrl={post.sharableUrl}
            />
          ))}
        </Box>
      </Container>
      <Fab
        sx={{ position: "absolute", right: "1rem", bottom: "1rem" }}
        color="primary"
        onClick={() => setCreatePostFormVisible(true)}
      >
        <IconAdd />
      </Fab>

      {createPostFormVisible && (
        <PostFormContainer onClose={() => setCreatePostFormVisible(false)} />
      )}
    </Box>
  );
}
