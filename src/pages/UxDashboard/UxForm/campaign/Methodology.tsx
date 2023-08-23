import {
  BSCol,
  BSGrid,
  Card,
  Input,
  FieldProps,
  FormLabel,
  FormikField,
  Text,
  TextareaField,
  Title,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import UsersQualityField from "../components/fields/UsersQualityField";
import { FormValuesInterface } from "../FormProvider";

const Methodology = () => {
  const { values } = useFormikContext<FormValuesInterface>();
  return (
    <Card title="La metodologia usata" className="aq-mb-3">
      <BSGrid className="aq-mb-4">
        <Title size="s" className="aq-mb-2">
          Tipologia di test<span className="aq-text-danger">*</span>
        </Title>
        <Title size="m" variant className="aq-mb-3">
          {values.methodology.name}
        </Title>
        <BSCol size="col-lg-8">
          <TextareaField
            height="10em"
            name="methodology.description"
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
          <FormLabel htmlFor="usersNumber" label="Numero di utenti" />
          <FormikField name="usersNumber">
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
          <UsersQualityField />
        </BSCol>
      </BSGrid>
    </Card>
  );
};

export default Methodology;
