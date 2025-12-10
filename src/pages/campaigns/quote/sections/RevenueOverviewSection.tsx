import {
  aqBootstrapTheme,
  BSCol,
  Button,
  Card,
  ErrorMessage,
  FieldProps,
  FormGroup,
  Formik,
  FormikField,
  FormLabel,
  Input,
  Select,
} from "@appquality/appquality-design-system";
import { Form, useFormikContext } from "formik";
import { useParams } from "react-router";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  useGetCustomersByCustomerIdAgreementsQuery,
  useGetDossiersByCampaignAgreementsQuery,
  useGetDossiersByCampaignQuery,
  usePutDossiersByCampaignAgreementsMutation,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import * as yup from "yup";
import { Section } from "../../components/campaignForm/Section";
import { VerticalDivider } from "../components/Dividers";

type RevenueOverviewFormValues = {
  agreement: number;
  tokenUsage: string;
};

type RevenueFormContentProps = {
  customerId: string;
  agreementsOptions: { label: React.ReactNode; value: string }[];
};

const Wrapper = styled.div`
  .aq-select-single small {
    display: none;
  }
`;

const useGetAgreement = ({ customerId }: { customerId: string }) => {
  const { data: customerAgreements } =
    useGetCustomersByCustomerIdAgreementsQuery({
      customerId: customerId,
    });

  if (!customerAgreements) {
    return () => ({ value: undefined });
  }

  return (agreementId: string) => {
    const a = customerAgreements.items.find(
      (agreement) => agreement.id?.toString() === agreementId
    );

    return a || { value: undefined };
  };
};

const RevenueFormContent = ({
  customerId,
  agreementsOptions,
}: RevenueFormContentProps) => {
  const { values, setFieldValue, isSubmitting, isValid, dirty } =
    useFormikContext<RevenueOverviewFormValues>();
  const getAgreement = useGetAgreement({ customerId });

  const selectedAgreement = getAgreement(values.agreement.toString());
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
                  <FormLabel
                    htmlFor="tokenUsage"
                    label={
                      <>
                        Token Used{" "}
                        <span
                          style={{ color: aqBootstrapTheme.palette.danger }}
                        >
                          *
                        </span>
                      </>
                    }
                  />
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
                  <Wrapper>
                    <Select
                      label={
                        <>
                          Linked Agreement{" "}
                          <span
                            style={{ color: aqBootstrapTheme.palette.danger }}
                          >
                            *
                          </span>
                        </>
                      }
                      name="agreement-dropdown"
                      value={{ value: field.value, label: "" }}
                      placeholder="Choose an agreement..."
                      options={agreementsOptions}
                      onChange={(value) => {
                        setFieldValue(field.name, value.value, true);
                      }}
                    />
                  </Wrapper>
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
                {selectedAgreement.value || "--"}€
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
                {Number(values.tokenUsage) * (selectedAgreement.value || 0) ||
                  "--"}{" "}
                €
              </strong>
            </div>
          </BSCol>
        </div>
      </Card>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={isSubmitting || !isValid || !dirty}
          type="submit"
          kind="primary"
          size="sm"
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export const RevenueOverviewSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dossier } = useGetDossiersByCampaignQuery({ campaign: id });
  const { add } = siteWideMessageStore();

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
        label: (
          <>
            <div>{agreement.name}</div>
            <small>
              🪙 {agreement.remainingTokens}/{agreement.totalTokens} available
              tokens 💰 {agreement.value}€ / token
            </small>
          </>
        ),
        value: agreement.id?.toString() || "",
        tokenValue: agreement.value || 0,
      }))
    : [];

  const validationSchema = yup.object({
    agreement: yup.number().required("Required"),
    tokenUsage: yup.number().required("Required"),
  });

  const initialValues = {
    agreement: campaignAgreement?.agreement?.id?.toString() || "",
    tokenUsage: campaignAgreement?.tokens?.toString() || "",
  };

  const onSubmit = async (values: RevenueOverviewFormValues) => {
    await putAgreement({
      campaign: id!,
      body: {
        agreementId: Number(values.agreement),
        tokens: Number(values.tokenUsage),
      },
    })
      .unwrap()
      .then((res) => {
        add({ type: "success", message: "All set! Data saved successfully" });
      })
      .catch((e) => {
        add({
          type: "danger",
          message: "Oops! Something went wrong. Please try again.",
        });
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
        <RevenueFormContent
          customerId={dossier?.customer.id.toString() || ""}
          agreementsOptions={agreementsOptions}
        />
      </Formik>
    </Section>
  );
};
