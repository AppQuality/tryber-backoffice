import {
  Select,
  Dropdown,
  Menu,
  Item,
} from "@appquality/unguess-design-system";
import { Field as FormikField, useFormikContext } from "formik";
import { Field } from "@zendeskgarden/react-dropdowns";
import { useGetCustomersQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "./FormProvider";

const CustomerSelect = () => {
  const { data: customers } = useGetCustomersQuery();
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="customer">
      <Dropdown onSelect={(e) => console.log(e)}>
        <Field>
          <Select>
            {values.customer
              ? customers?.find(
                  (customer) => customer.id?.toString() === values.customer
                )?.name
              : "Select a customer"}
          </Select>
        </Field>
        <Menu>
          {customers?.map((customer) => (
            <Item
              key={customer.id}
              value={customer.id}
              onClick={() => setFieldValue("customer", customer.id)}
            >
              {customer.name}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </FormikField>
  );
};

export default CustomerSelect;
