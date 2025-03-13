import {
  Button,
  ErrorMessageWrapper,
  FieldProps,
  Formik,
  FormikField,
  Modal,
  Select,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { FormProps } from "..";
import { NewCampaignValues } from "../FormProvider";
import { CampaignSelect } from "./CampaignSelect";

type ImportPagesValues = {
  previewAction: "generate" | "import" | "no-action";
  previewCampaign?: number;
  manualAction: "generate" | "import" | "no-action";
  manualCampaign?: number;
};

const ImportPagesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    values,
    setFieldValue,
    submitForm,
    setFieldTouched,
    errors,
    touched,
    validateForm,
    isSubmitting,
    setSubmitting,
  } = useFormikContext<ImportPagesValues>();

  return (
    <Modal isOpen={isOpen} title="Import page" onClose={onClose} size="mid">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <Select
            name="previewAction"
            onBlur={() => {
              setFieldTouched("previewAction");
            }}
            label="Preview"
            value={
              values?.previewAction
                ? { label: "", value: values?.previewAction }
                : { label: "Nessuna azione", value: "no-action" }
            }
            options={[
              { label: "Genera dal tipo", value: "generate" },
              { label: "Importa da un'altra campagna", value: "import" },
              { label: "Nessuna azione", value: "no-action" },
            ]}
            menuTargetQuery={"body"}
            onChange={(option) => {
              if (option === null || option.value === "no-action") {
                setFieldValue("previewAction", "no-action");
                setFieldValue("previewCampaign", undefined);
                return;
              }

              setFieldValue("previewAction", option.value);
            }}
          />
          {values?.previewAction === "import" && (
            <FormikField name="previewCampaign">
              {({ field, form }: FieldProps) => (
                <div className="aq-mt-2">
                  <CampaignSelect
                    onBlur={() => {
                      form.setFieldTouched("previewCampaign");
                    }}
                    name={field.name}
                    label="Campagna da cui importare la preview"
                    placeholder="Seleziona la campagna da cui importare la preview"
                    onChange={(value) => {
                      if (value === null || value.value === "") {
                        form.setFieldValue("previewCampaign", undefined);
                        return;
                      }
                      form.setFieldValue(
                        "previewCampaign",
                        Number(value.value)
                      );
                    }}
                  />
                  {errors.previewCampaign && (
                    <ErrorMessageWrapper>
                      {errors.previewCampaign}
                    </ErrorMessageWrapper>
                  )}
                </div>
              )}
            </FormikField>
          )}
        </div>
        <div>
          <Select
            name="manualAction"
            label="Manual"
            onBlur={() => {
              setFieldTouched("manualAction");
            }}
            value={
              values?.manualAction
                ? { label: "", value: values?.manualAction }
                : { label: "Nessuna azione", value: "no-action" }
            }
            options={[
              { label: "Genera dal tipo", value: "generate" },
              { label: "Importa da un'altra campagna", value: "import" },
              { label: "Nessuna azione", value: "no-action" },
            ]}
            menuTargetQuery={"body"}
            onChange={(option) => {
              if (option === null || option.value === "no-action") {
                setFieldValue("manualAction", "no-action");
                setFieldValue("manualCampaign", undefined);
                return;
              }
              setFieldValue("manualAction", option.value);
            }}
          />
          {values?.manualAction === "import" && (
            <div className="aq-mt-2">
              <CampaignSelect
                name="manualCampaign"
                onBlur={() => {
                  setFieldTouched("manualCampaign");
                }}
                label="Campagna da cui importare il manuale"
                placeholder="Seleziona la campagna da cui importare il manuale"
                onChange={(value) => {
                  if (value === null || value.value === "") {
                    setFieldValue("manualCampaign", undefined);
                    return;
                  }
                  setFieldValue("manualCampaign", Number(value.value));
                }}
              />
              {errors.manualCampaign && (
                <ErrorMessageWrapper>
                  {errors.manualCampaign}
                </ErrorMessageWrapper>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Button
            size="block"
            flat
            onClick={() => {
              onClose();
            }}
          >
            Annulla
          </Button>
          <Button
            type="submit"
            size="block"
            disabled={isSubmitting}
            onClick={() => {
              validateForm().then((errors) => {
                if (Object.keys(errors).length > 0) {
                  return;
                }
                submitForm();
              });
            }}
          >
            Conferma
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const ImportPages = ({ dossier }: { dossier: FormProps["dossier"] }) => {
  const [open, setOpen] = useState(false);
  const { values } = useFormikContext<NewCampaignValues>();

  if (!values.isEdit) return null;
  return (
    <>
      <Formik
        initialValues={{
          previewAction: "no-action",
          previewCampaign: undefined,
          manualAction: "no-action",
          manualCampaign: undefined,
        }}
        validationSchema={yup.object().shape({
          previewAction: yup.string().required("Required"),
          previewCampaign: yup.number().when("previewAction", {
            is: "import",
            then: yup.number().required("Required"),
          }),
          manualAction: yup.string().required("Required"),
          manualCampaign: yup.number().when("manualAction", {
            is: "import",
            then: yup.number().required("Required"),
          }),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // alert(JSON.stringify(values));
          setOpen(false);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        <ImportPagesModal isOpen={open} onClose={() => setOpen(false)} />
      </Formik>
      <Button size="block" onClick={() => setOpen(true)}>
        Open
      </Button>
    </>
  );
};

export default ImportPages;
