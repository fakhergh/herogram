export interface BasePickedFile {
    id: string | number;
}

export interface LocalFile extends BasePickedFile {
    file: File;
}

export interface RemoteFile extends BasePickedFile {
    url: string;
    path: string;
}

export type PickedFile = LocalFile | RemoteFile;
