import {
  aqBootstrapTheme,
  BSCol,
  Button,
  Card,
  Dropdown,
  ErrorMessage,
  FieldProps,
  FormGroup,
  Formik,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router";
import {
  useGetCustomersByCustomerIdAgreementsQuery,
  useGetDossiersByCampaignAgreementsQuery,
  useGetDossiersByCampaignQuery,
  usePutDossiersByCampaignAgreementsMutation,
} from "src/services/tryberApi";
import { Section } from "../../components/campaignForm/Section";
import * as yup from "yup";
import { VerticalDivider } from "../components/Dividers";
import { Form, useFormikContext } from "formik";

type RevenueOverviewFormValues = {
  agreement: {
    label: string;
    value: string;
    tokenValue: number;
  };
  tokenUsage: string;
};

type RevenueFormContentProps = {
  agreementsOptions: { label: string; value: string }[];
};

const RevenueFormContent = ({ agreementsOptions }: RevenueFormContentProps) => {
  const { values, setFieldValue } =
    useFormikContext<RevenueOverviewFormValues>();
  return (
    <Form>
      <Card className="aq-mb-4" title="Revenue details">
        <div
          style={{
            display: "flex",
            gap: aqBootstrapTheme.grid.spacing.default,
            justifyContent: "center",
          }}
        >
          <BSCol size="col-6 col-lg-6 col-md-12 ">
            <FormikField name="tokenUsage">
              {({ field }: FieldProps) => (
                <FormGroup>
                  <div>
                    Token Used{" "}
                    <span style={{ color: aqBootstrapTheme.palette.danger }}>
                      *
                    </span>
                  </div>
                  <Input
                    id="tokenUsage"
                    type="string"
                    placeholder="E.g. 10"
                    {...field}
                    onChange={(value) => {
                      setFieldValue(field.name, Number(value) || "", true);
                    }}
                  />
                  <ErrorMessage name={field.name} />
                </FormGroup>
              )}
            </FormikField>
          </BSCol>
          <BSCol size="col-6 col-lg-6 col-md-12">
            <FormikField name="agreement">
              {({ field }: FieldProps) => (
                <FormGroup>
                  <div>
                    Linked agreement{" "}
                    <span style={{ color: aqBootstrapTheme.palette.danger }}>
                      *
                    </span>
                  </div>
                  <Dropdown
                    name="agreement-dropdown"
                    value={field.value}
                    placeholder="Choose an agreement..."
                    options={agreementsOptions}
                    onChange={(value) => {
                      setFieldValue(field.name, value, true);
                    }}
                  />
                  <ErrorMessage name={field.name} />
                  <Button
                    forwardedAs="a"
                    href="/backoffice/agreements/new"
                    kind="link"
                    target="_blank"
                  >
                    <span style={{ color: aqBootstrapTheme.palette.info }}>
                      Agreement not found? Create a new one
                    </span>
                  </Button>
                </FormGroup>
              )}
            </FormikField>
          </BSCol>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 24px 24px 30px",
            gap: "25px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <BSCol size="col-lg-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "4px 25px",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                }}
              >
                TOKEN VALUE
              </span>
              <strong
                style={{
                  fontSize: "24px",
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                  color: aqBootstrapTheme.palette.primary,
                }}
              >
                {values.agreement.tokenValue || "--"}€
              </strong>
            </div>
          </BSCol>
          <VerticalDivider />
          <BSCol size="col-lg-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "column",
                gap: "4px 25px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                }}
              >
                TOTAL REVENUE
              </span>
              <strong
                style={{
                  fontSize: "24px",
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                  color: aqBootstrapTheme.palette.secondary,
                }}
              >
                {Number(values.tokenUsage) * values.agreement.tokenValue ||
                  "--"}{" "}
                €
              </strong>
            </div>
          </BSCol>
        </div>
      </Card>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" kind="primary" size="sm">
          Save
        </Button>
      </div>
    </Form>
  );
};

export const RevenueOverviewSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dossier } = useGetDossiersByCampaignQuery({ campaign: id });
  const { data: campaignAgreement } = useGetDossiersByCampaignAgreementsQuery({
    campaign: id,
  });
  const { data: customerAgreements } =
    useGetCustomersByCustomerIdAgreementsQuery({
      customerId: dossier?.customer.id.toString() || "",
    });

  const [putAgreement] = usePutDossiersByCampaignAgreementsMutation();

  const agreementsOptions = customerAgreements
    ? customerAgreements.items.map((agreement) => ({
        label: agreement.name,
        value: agreement.id?.toString() || "",
        tokenValue: agreement.value || 0,
      }))
    : [];

  const validationSchema = yup.object({
    agreement: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        tokenValue: yup.number().required(),
      })
      .required("Required"),
    tokenUsage: yup.number().required("Required"),
  });

  const initialValues = {
    agreement: {
      label: campaignAgreement?.agreement?.name || "",
      value: campaignAgreement?.agreement?.id?.toString() || "",
      tokenValue: campaignAgreement?.agreement?.value || 0,
    },
    tokenUsage: campaignAgreement?.tokens?.toString() || "",
  };

  const onSubmit = async (values: RevenueOverviewFormValues) => {
    await putAgreement({
      campaign: id!,
      body: {
        agreementId: Number(values.agreement.value),
        tokens: Number(values.tokenUsage),
      },
    });
  };
  return (
    <Section
      title="Revenue Overview"
      subtitle="Track campaign revenue, token usage, and linked agreements"
      id="quote"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <RevenueFormContent agreementsOptions={agreementsOptions} />
      </Formik>
    </Section>
  );
};
