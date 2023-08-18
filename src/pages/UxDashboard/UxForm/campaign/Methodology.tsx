import {
  BSCol,
  BSGrid,
  Card,
  ErrorMessage,
  Input,
  FieldProps,
  FormLabel,
  FormikField,
  Select,
  Text,
  TextareaField,
  Title,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";

const Methodology = () => {
  const { setFieldValue } = useFormikContext();
  return (
    <Card title="La metodologia usata" className="aq-mb-3">
      <BSGrid className="aq-mb-4">
        <Title size="s" className="aq-mb-2">
          Tipologia di test<span className="aq-text-danger">*</span>
        </Title>
        <Title size="m" variant className="aq-mb-3">
          Usability Test
        </Title>
        <BSCol size="col-lg-8">
          <TextareaField
            height="10em"
            name="testDescription"
            label="Breve descrizione"
          />
        </BSCol>
        <BSCol size="col-lg-4">
          <FormLabel htmlFor="" label="Cos’è questo campo?" />
          <Card>
            <Title size="xs" className="aq-text-info aq-mb-3">
              Spiega la metodologia e perché è stata scelta in relazione ai
              bisogni del cliente
            </Title>
            <Text small>Nota bene:</Text>
            <Text className="aq-mb-2">
              Se non modifichi la descrizione, useremo quella di default
            </Text>
          </Card>
        </BSCol>
      </BSGrid>
      <BSGrid>
        <Title size="s" className="aq-mb-2">
          Utenti coinvolti<span className="aq-text-danger">*</span>
        </Title>
        <BSCol size="col-lg-4">
          <FormLabel htmlFor="usersLoad" label="Numero di utenti" />
          <FormikField name="usersLoad">
            {(fieldProps: FieldProps) => (
              <Input
                id={fieldProps.field.name}
                {...fieldProps.field}
                type="number"
              />
            )}
          </FormikField>
        </BSCol>
        <BSCol size="col-lg-4">
          <Select
            placeholder=""
            options={[
              { label: "Qualitativa", value: "qualitativa" },
              { label: "Quantitativa", value: "quantitativa" },
            ]}
            label="Tipologia"
            name="usersQuality"
            value={{ label: "Qualitativa", value: "qualitativa" }}
            onChange={(value) => {
              setFieldValue("users-quality", value);
            }}
          />
          <ErrorMessage name="users-quality" />
        </BSCol>
      </BSGrid>
    </Card>
  );
};

export default Methodology;
