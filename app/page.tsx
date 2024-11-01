"use client";
import IconAdd from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useCallback, useMemo, useState } from "react";

import { SortableList } from "@/app/components/SortableList/SortableList";
import { PostFormContainer } from "@/app/containers/PostFormContainer/PostFormContainer";
import { PostItemContainer } from "@/app/containers/PostItemContainer/PostItemContainer";
import { Post } from "@/app/services/api";
import { usePosts, useSortPosts } from "@/app/services/postService";

export default function Home() {
  const [createPostFormVisible, setCreatePostFormVisible] = useState(false);

  const { data } = usePosts();

  const { mutate, isPending: sortPostsPending } = useSortPosts();

  const items = useMemo(
    () => data?.map((item) => ({ ...item, id: item._id })) ?? [],
    [data],
  );

  const onChange = useCallback(
    (sortedItems: Array<Post>) => {
      mutate({ ids: sortedItems.map((item) => item._id) });
    },
    [mutate],
  );

  return (
    <Box
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        overflowY: "auto",
      }}
    >
      <Container sx={{ py: 4 }}>
        <SortableList<Post & { id: string }>
          items={items}
          onChange={onChange}
          renderItem={(post) => (
            <SortableList.Item id={post._id}>
              <Box display="flex">
                <SortableList.DragHandle disabled={sortPostsPending} />
                <PostItemContainer
                  key={post._id}
                  name={post.filename}
                  url={post.url}
                  viewsCount={post.viewsCount}
                  tags={post.tags}
                  sharableUrl={post.sharableUrl}
                />
              </Box>
            </SortableList.Item>
          )}
        />
        <Box display="flex" flexDirection="column" gap={2}></Box>
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
