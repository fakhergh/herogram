/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MediaService {
    /**
     * @param filename
     * @returns any
     * @throws ApiError
     */
    public static mediaControllerFindByUniqueNameForPublic(
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/media/public/{filename}',
            path: {
                'filename': filename,
            },
        });
    }
    /**
     * @param filename
     * @returns any
     * @throws ApiError
     */
    public static mediaControllerFindByUniqueName(
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/media/{filename}',
            path: {
                'filename': filename,
            },
        });
    }
}
