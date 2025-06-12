import { Button, Select, Title } from "@appquality/appquality-design-system";
import {
  Field as FormikField,
  FieldArray,
  FieldProps,
  useFormikContext,
} from "formik";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import {
  CustomUserFieldsDataOption,
  useGetCustomUserFieldsQuery,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import { NewCampaignValues } from "../FormProvider";

export const useAllFieldsByCuf = () => {
  const { data, isLoading } = useGetCustomUserFieldsQuery();

  if (isLoading) return (cufId: number) => [];

  return (cufId: number) => {
    if (!data) return [];
    const cuf = data
      .flatMap((group) => group.fields || [])
      .find((field) => field.id === cufId);
    return cuf ? cuf.options || [] : [];
  };
};

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
    <div>
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
    </div>
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

  const allOptions = { id: "-1", name: "All options" };

  return (
    <div>
      <FormikField name={`cuf[${index}].value`}>
        {({ field, form }: FieldProps) => {
          const allOptionsSelected = field.value.some(
            (option: string) => option === allOptions.id.toString()
          );
          const current = allOptionsSelected
            ? [allOptions]
            : options.filter((option) =>
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
                if (
                  !options ||
                  options.length === 0 ||
                  !Array.isArray(options)
                ) {
                  form.setFieldValue(field.name, []);
                  return;
                }
                if (
                  options.some(
                    (option) => option.value === allOptions.id.toString()
                  )
                ) {
                  form.setFieldValue(field.name, [allOptions.id.toString()]);
                  return;
                }
                form.setFieldValue(
                  field.name,
                  options.map((option) => option.value)
                );
              }}
              options={(allOptionsSelected
                ? [allOptions]
                : [allOptions, ...options]
              ).map((option) => ({
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
    </div>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 10px;
  align-items: flex-end;
`;
const StyledTitle = styled(Title)`
  display: flex;
  justify-content: space-between;
`;

const CufCriteria = () => {
  const { values } = useFormikContext<NewCampaignValues>();
  return (
    <FieldArray name="cuf">
      {({ push, remove }) => (
        <>
          <StyledTitle size="s" className="aq-mb-2 aq-pt-4">
            Custom User Fields Criteria
            <Button kind="link" onClick={() => push({ id: 0, value: [] })}>
              Add CUF
            </Button>
          </StyledTitle>
          <div>
            {values.cuf &&
              values.cuf.map((item, index) => (
                <Wrapper key={index}>
                  <CufFieldSelect index={index} />
                  <CufOptionsSelect index={index} />

                  <Button kind="danger" onClick={() => remove(index)}>
                    <DeleteIcon />
                  </Button>
                </Wrapper>
              ))}
          </div>
        </>
      )}
    </FieldArray>
  );
};

export default CufCriteria;
