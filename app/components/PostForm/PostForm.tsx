import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import { DEFAULT_ACCEPTED_FILES } from "@/app/components/DropzonArea/DropzoneArea";
import { DropzoneAreaField } from "@/app/components/DropzoneAreaField/DropzoneAreaField";
import { DropzoneAreaPreview } from "@/app/components/DropzoneAreaPreview/DropzoneAreaPreview";
import { InputField } from "@/app/components/InputField/InputField";
import { PickedFile } from "@/app/interfaces/file";
import { BaseFormProps } from "@/app/interfaces/form";
import Yup from "@/app/utils/yup";

export interface PostFormValues {
  media: Array<PickedFile>;
  tags: string;
}

export type PostFormProps = BaseFormProps<PostFormValues>;

const defaultValues: PostFormValues = {
  media: [],
  tags: "",
};

const validationSchema = Yup.object().shape({
  media: Yup.array(Yup.mixed().required()).length(1),
  string: Yup.string(),
});

export function PostForm({
  loading,
  initialValues = defaultValues,
  onSubmit,
  onClose,
}: PostFormProps) {
  const { t } = useTranslation("PostForm");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, dirty, handleSubmit, setFieldValue }) => (
        <Dialog open={true} onClose={() => !dirty && onClose?.()} fullWidth>
          <DialogTitle>{t(`title`)}</DialogTitle>
          <DialogContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                {values.media.length === 0 ? (
                  <Box p={2}>
                    <DropzoneAreaField
                      name="media"
                      multiple={false}
                      aspectRatio={5}
                      accept={DEFAULT_ACCEPTED_FILES}
                    />
                  </Box>
                ) : (
                  <DropzoneAreaPreview
                    height={256}
                    files={values.media}
                    onImageDelete={() => setFieldValue("media", [])}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name="tags"
                  role="input"
                  label={t("inputs.tags.label")}
                  margin="normal"
                  fullWidth
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              role="cancel"
              onClick={() => onClose?.()}
              disabled={loading}
            >
              {t("buttons.cancel.title")}
            </Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={loading || !dirty}
              role="submit"
            >
              {t("buttons.submit.title")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}
