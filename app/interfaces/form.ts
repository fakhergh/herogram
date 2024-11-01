import { FormikValues } from 'formik';

export type FormAction = 'create' | 'update';

export interface BaseFieldProps {
    name: string;
}

export interface BaseFormProps<T> {
    initialValues?: T & FormikValues;
    loading?: boolean;
    action?: FormAction;
    onSubmit: (values: T) => void;
    onClose?: () => void;
}
