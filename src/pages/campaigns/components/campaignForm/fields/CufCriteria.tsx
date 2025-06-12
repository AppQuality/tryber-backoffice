import { Select } from "@appquality/appquality-design-system";
import {
  Field as FormikField,
  FieldArray,
  FieldProps,
  useFormikContext,
} from "formik";
import {
  CustomUserFieldsDataOption,
  useGetCustomUserFieldsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";

const useGetValidCuf = () => {
  const { data, isLoading } = useGetCustomUserFieldsQuery();

  return {
    data: data
      ? data.reduce((prev, group) => {
          if (!group.fields || group.fields.length === 0) return prev;
          return [
            ...prev,
            ...group.fields
              .filter((field) => ["select", "multiselect"].includes(field.type))
              .map((field) => ({
                id: field.id,
                name: field.name.it || field.name.en || "CUF " + field.id,
                options: field.options || [],
              })),
          ];
        }, [] as { id: number; name: string; options: CustomUserFieldsDataOption[] }[])
      : [],
    isLoading,
  };
};

const CufFieldSelect = ({ index }: { index: number }) => {
  const { data, isLoading } = useGetValidCuf();

  return (
    <>
      <FormikField name={`cuf[${index}].id`}>
        {({ field, form }: FieldProps) => {
          const current = data.find(
            (cuf) => cuf.id === parseInt(field.value, 10)
          );
          return (
            <Select
              name={field.name}
              label="Cuf"
              isDisabled={isLoading}
              placeholder="Select a CUF"
              isClearable
              onChange={(option) => {
                if (!option || !option.value || option.value === "0") {
                  form.setFieldValue(field.name, "0");
                  return;
                }
                form.setFieldValue(field.name, option.value);
              }}
              options={data.map((cuf) => ({
                value: cuf.id.toString(),
                label: cuf.name,
              }))}
              value={{
                label: current?.name || "Select a CUF",
                value: field.value,
              }}
            />
          );
        }}
      </FormikField>
    </>
  );
};

const CufOptionsSelect = ({ index }: { index: number }) => {
  const { data, isLoading } = useGetValidCuf();

  const { values } = useFormikContext<NewCampaignValues>();
  const isCufSelected =
    values.cuf && index in values.cuf && values.cuf[index].id !== "0";

  const options =
    data.find(
      (cuf) => values.cuf && cuf.id === parseInt(values.cuf[index].id, 10)
    )?.options || [];

  return (
    <FormikField name={`cuf[${index}].value`}>
      {({ field, form }: FieldProps) => {
        const current = options.filter((option) =>
          field.value.includes(option.id.toString())
        );
        return (
          <Select
            isMulti
            name={field.name}
            label="Options"
            isDisabled={isLoading || !isCufSelected}
            placeholder="Select options"
            isClearable
            onChange={(options) => {
              if (!options || options.length === 0 || !Array.isArray(options)) {
                form.setFieldValue(field.name, []);
                return;
              }
              form.setFieldValue(
                field.name,
                options.map((option) => option.value)
              );
            }}
            options={options.map((option) => ({
              value: option.id.toString(),
              label: option.name,
            }))}
            value={current.map((option) => ({
              label: option.name,
              value: option.id.toString(),
            }))}
          />
        );
      }}
    </FormikField>
  );
};

const CufCriteria = () => {
  const { values } = useFormikContext<NewCampaignValues>();
  return (
    <FieldArray name="cuf">
      {({ push, remove }) => (
        <div>
          {values.cuf &&
            values.cuf.map((item, index) => (
              <div key={index}>
                <CufFieldSelect index={index} />
                <CufOptionsSelect index={index} />

                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            ))}

          <button
            type="button"
            onClick={() => push({ id: 0, value: [] })}
            style={{ marginTop: "10px" }}
          >
            Add CUF
          </button>
        </div>
      )}
    </FieldArray>
  );
};

export default CufCriteria;
