"use client";
import { useCallback, useEffect } from "react";

import {
  PostForm,
  PostFormProps,
  PostFormValues,
} from "@/app/components/PostForm/PostForm";
import { LocalFile } from "@/app/interfaces/file";
import { useCreatePost } from "@/app/services/postService";

export type PostFormContainerProps = Omit<
  PostFormProps,
  "onSubmit" | "loading"
>;

export function PostFormContainer(props: PostFormContainerProps) {
  const { mutate, data, isPending } = useCreatePost();

  const onSubmit = useCallback(
    (values: PostFormValues) => {
      const form = new FormData();

      form.append("media", (values.media[0] as LocalFile).file);
      values.tags.split(" ").forEach((tag, index) => {
        form.append(`tags[${index}]`, tag);
      });

      mutate(form);
    },
    [mutate],
  );

  useEffect(() => {
    if (data) {
      props.onClose?.();
    }
  }, [data, props]);

  return <PostForm {...props} onSubmit={onSubmit} loading={isPending} />;
}
