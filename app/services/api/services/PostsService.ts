/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from "../models/Post";
import type { UpdatePostPositionDto } from "../models/UpdatePostPositionDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class PostsService {
  /**
   * @param formData
   * @returns Post
   * @throws ApiError
   */
  public static postsControllerCreate(
    formData: Record<string, any>,
  ): CancelablePromise<Post> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/posts",
      body: formData,
      mediaType: "multipart/form-data",
    });
  }
  /**
   * @returns Post
   * @throws ApiError
   */
  public static postsControllerGetPosts(): CancelablePromise<Array<Post>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/posts",
    });
  }
  /**
   * @param requestBody
   * @returns Post
   * @throws ApiError
   */
  public static postsControllerSortsPosts(
    requestBody: UpdatePostPositionDto,
  ): CancelablePromise<Array<Post>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/posts/sort",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
