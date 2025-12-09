import {
  aqBootstrapTheme,
  Button,
  ErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import {
  useGetDossiersByCampaignQuery,
  useGetDossiersRatesQuery,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import FormProvider, { FormProps } from "./FormProvider";

const StyledRow = styled.div`
  margin-top: ${({ theme }) => theme.grid.spacing.default};
  display: flex;
  gap: ${({ theme }) => theme.grid.sizes[4]};
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.grid.sizes[3]};

  > div:not(:last-child) {
    display: flex;
    flex-direction: column;
    gap: 4px;

    flex: 1;
    min-width: 0;
  }

  > div:last-child {
    flex: 0;
  }
`;

const useAssignees = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useGetDossiersByCampaignQuery({
    campaign: campaignId,
  });

  if (!data || isLoading) {
    return { data: [], isLoading };
  }

  const csm = {
    value: String(data.csm.id),
    label: `${data.csm.name} - CSM`,
  };
  const assistant = (data.roles || [])
    .filter(
      (
        role
      ): role is typeof role & {
        user: NonNullable<typeof role.user>;
        role: NonNullable<typeof role.role>;
      } => !!role?.user && !!role?.role
    )
    .map((role) => ({
      value: String(role.user.id || 0),
      label: `${role.user.name} ${role.user.surname} - ${role.role.name}`,
    }));
  return {
    data: [csm, ...assistant],
    isLoading,
  };
};
const useRates = () => {
  const { data, isLoading } = useGetDossiersRatesQuery();

  if (!data || isLoading) {
    return { data: [], isLoading };
  }
  return {
    data: data.items.map((rate) => ({
      value: String(rate.id),
      label: `${rate.name} - ${rate.rate}€ / day`,
    })),
  };
};

const HumanResources = ({ campaignId }: { campaignId: string }) => {
  return (
    <FormProvider campaignId={campaignId}>
      <FormContent campaignId={campaignId} />
    </FormProvider>
  );
};

const FormContent = ({ campaignId }: { campaignId: string }) => {
  const { values, isValid, submitForm, dirty, isSubmitting } =
    useFormikContext<FormProps>();
  const { data: assignees } = useAssignees({ campaignId });
  const { data: rates } = useRates();

  return (
    <>
      <span style={{ color: aqBootstrapTheme.palette.info }}>
        💡
        <span style={{ fontWeight: "bold" }}>Add Human Resources</span> and{" "}
        <span style={{ fontWeight: "bold" }}>fill all required fields</span> (*)
        to enable saving
      </span>

      <FieldArray
        name="items"
        render={(arrayHelpers) => (
          <>
            {values.items &&
              values.items.length > 0 &&
              values.items.map((item, index) => (
                <StyledRow>
                  <div>
                    <Select
                      menuTargetQuery={"body"}
                      name={"assignee-select"}
                      options={assignees}
                      label={
                        <Text>
                          Assignee <span style={{ color: "red" }}>*</span>
                        </Text>
                      }
                      value={{ value: String(item.assignee), label: "Option" }}
                      onChange={(newOptions) => {
                        arrayHelpers.replace(index, {
                          ...item,
                          assignee: Number(newOptions.value),
                        });
                      }}
                      noOptionsMessage={() => "No options"}
                    />
                  </div>
                  <div>
                    <FormLabel
                      htmlFor={`days-input-${index}`}
                      label={
                        <Text>
                          Number of days <span style={{ color: "red" }}>*</span>
                        </Text>
                      }
                    />
                    <Input
                      id={`days-input-${index}`}
                      type="number"
                      value={item.days.toString()}
                      onChange={(e) => {
                        const newValue = Number(e);
                        arrayHelpers.replace(index, {
                          ...item,
                          days: newValue,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      placeholder={"-"}
                      menuTargetQuery={"body"}
                      name={"dailyrate-select"}
                      options={rates}
                      label={
                        <Text>
                          Daily rate <span style={{ color: "red" }}>*</span>
                        </Text>
                      }
                      value={{ value: String(item.role), label: "Option" }}
                      onChange={(newOptions) => {
                        arrayHelpers.replace(index, {
                          ...item,
                          role: Number(newOptions.value),
                        });
                      }}
                      noOptionsMessage={() => "No options"}
                    />
                  </div>
                  <div>
                    <Button
                      size="sm"
                      kind="danger"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </StyledRow>
              ))}
            <div>
              <Button
                forwardedAs="a"
                onClick={() => {
                  arrayHelpers.push({ assignee: 0, days: 0, role: 0 });
                }}
                kind="link"
                target="_blank"
              >
                + Add Human Resources
              </Button>
            </div>
          </>
        )}
      />
      <ErrorMessage name="items" />
      <Button
        disabled={!isValid || !dirty || isSubmitting}
        onClick={submitForm}
        type="submit"
        style={{ marginTop: "16px" }}
      >
        Save
      </Button>
    </>
  );
};

export default HumanResources;
