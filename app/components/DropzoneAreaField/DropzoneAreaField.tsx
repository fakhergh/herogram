'use client';
import { useField } from 'formik';
import * as React from 'react';

import {
    DropzoneArea,
    DropzoneAreaProps,
} from '@/app/components/DropzonArea/DropzoneArea';
import { withMemo } from '@/app/hocs/memo';
import { PickedFile } from '@/app/interfaces/file';
import { BaseFieldProps } from '@/app/interfaces/form';

export interface DropzoneAreaFieldProps
    extends BaseFieldProps,
        Omit<DropzoneAreaProps, 'onDropAccepted' | 'error'> {}

export const DropzoneAreaField = withMemo(function ({
    name,
    ...props
}: DropzoneAreaFieldProps) {
    const [{ value }, { error }, { setValue }] =
        useField<Array<PickedFile>>(name);

    const onDropAccepted = React.useCallback(
        (files: Array<PickedFile>) => setValue([...value, ...files]),
        [setValue, value],
    );

    return (
        <DropzoneArea
            {...props}
            onDropAccepted={onDropAccepted}
            error={!!error}
        />
    );
});
