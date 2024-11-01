import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ApiError,
  Post,
  PostsService,
  UpdatePostPositionDto,
} from "@/app/services/api";
import { queryClient } from "@/app/utils/queryClient";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => PostsService.postsControllerGetPosts(),
  });
}

export function useCreatePost() {
  return useMutation<Post, ApiError, FormData>({
    mutationKey: ["create-post"],
    mutationFn: (data) => PostsService.postsControllerCreate(data),
    onSuccess: (data) => {
      return queryClient.setQueriesData<Array<Post>>(
        {
          predicate: (query) => {
            return query.queryKey.includes("posts");
          },
        },
        (prev) => {
          if (prev) {
            return [data, ...prev];
          }
        },
      );
    },
  });
}

export function useUpdatePostPosition(id: string) {
  return useMutation<Post, ApiError, UpdatePostPositionDto>({
    mutationKey: ["update-post-position", id],
    mutationFn: (data: UpdatePostPositionDto) =>
      PostsService.postsControllerUpdatePostPosition(id, data),
  });
}
