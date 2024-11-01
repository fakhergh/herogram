import { useCallback } from "react";

import { PostItem, PostItemProps } from "@/app/components/PostItem/PostItem";

export interface PostItemContainerProps
  extends Omit<PostItemProps, "onShareClick"> {
  sharableUrl: string;
}

export function PostItemContainer({
  sharableUrl,
  ...props
}: PostItemContainerProps) {
  const onShareClick = useCallback(async () => {
    await navigator.clipboard.writeText(sharableUrl);
  }, [sharableUrl]);

  return <PostItem {...props} onShareClick={onShareClick} />;
}
