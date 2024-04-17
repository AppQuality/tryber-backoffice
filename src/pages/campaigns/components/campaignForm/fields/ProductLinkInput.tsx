import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import Input from "./components/Input";

const ProductLinkInput = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="productLink">
      {({ field }: FieldProps) => (
        <Input
          type="url"
          name={field.name}
          label="Product Link"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default ProductLinkInput;
