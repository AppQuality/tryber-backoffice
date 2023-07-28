import { Container, Formik } from "@appquality/appquality-design-system";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignUxQuery } from "src/services/tryberApi";
import { FormValuesInterface } from ".";
import { string, array, object, number, lazy } from "yup";

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetCampaignsByCampaignUxQuery({
    campaign: id,
  });
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError && "status" in error && error.status === 403) {
    // 404 is for data not found but the campaign exists
    // campaign does not exist
    return <Container>Error...</Container>;
  }
  const initialValues: FormValuesInterface = {
    status: data?.status || "draft",
    insights: data?.insight || [],
  };
  const validationSchema = object({
    status: string().required(),
    insights: array().of(
      object().shape({
        title: string().required(),
        description: string().required(),
        severity: object()
          .shape({
            id: number().required(),
            name: string().required(),
          })
          .required(),
        cluster: lazy((value) =>
          typeof value === "string"
            ? string().required()
            : array()
                .of(
                  object().shape({
                    id: number().required(),
                    name: string().required(),
                  })
                )
                .required()
        ),
        videoParts: array().of(
          object().shape({
            id: number().required(),
            start: number().required(),
            end: number().required(),
            mediaId: number().required(),
            description: string().required(),
          })
        ),
      })
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        alert("Form submitted");
      }}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
