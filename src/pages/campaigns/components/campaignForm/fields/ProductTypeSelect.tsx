import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { useGetProductTypesQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";

const ProductType = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: productTypes } = useGetProductTypesQuery();

  const options = productTypes?.results
    ? productTypes.results.map((productType) => ({
        value: productType.id.toString(),
        label: productType.name,
      }))
    : [];

  return (
    <FormikField name="productType">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Product Type" />
          <Dropdown
            options={options}
            name={field.name}
            value={options.find((o) => field.value === o.value)}
            onChange={(v) => v && setFieldValue(field.name, v.value)}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default ProductType;
