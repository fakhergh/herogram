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

export function useSortPosts() {
  return useMutation<Array<Post>, ApiError, UpdatePostPositionDto>({
    mutationKey: ["update-post-position"],
    mutationFn: (data: UpdatePostPositionDto) =>
      PostsService.postsControllerSortsPosts(data),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const prevPosts = queryClient.getQueryData<Array<Post>>(["posts"]);

      const prevPostsById = prevPosts?.reduce(
        (prev, curr: Post) => {
          prev[curr._id] = curr;
          return prev;
        },
        {} as Record<string, Post>,
      );

      if (prevPostsById) {
        queryClient.setQueryData(["posts"], () =>
          variables.ids.map((id) => prevPostsById[id]),
        );
      }

      return { prevPosts };
    },
    onError: (_, __, context: any) => {
      queryClient.setQueriesData({ queryKey: ["posts"] }, context.prevPosts);
    },
  });
}
