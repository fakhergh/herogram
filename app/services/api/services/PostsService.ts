/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from '../models/Post';
import type { UpdatePostPositionDto } from '../models/UpdatePostPositionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
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
            method: 'POST',
            url: '/api/posts',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @returns Post
     * @throws ApiError
     */
    public static postsControllerGetPosts(): CancelablePromise<Array<Post>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts',
        });
    }
    /**
     * @param postId
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    public static postsControllerUpdatePostPosition(
        postId: string,
        requestBody: UpdatePostPositionDto,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/posts/{postId}/position',
            path: {
                'postId': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
