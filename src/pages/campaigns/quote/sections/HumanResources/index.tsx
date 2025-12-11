import {
  aqBootstrapTheme,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import { useState } from "react";
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

type RateOption = {
  notSaved?: boolean;
  value: string;
  label: string;
  dailyRate: number;
};

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
    return { data: [] as RateOption[], isLoading };
  }
  return {
    data: data.items.map((rate) => ({
      value: String(rate.id),
      label: `${rate.name} - ${rate.rate}€ / day`,
      dailyRate: rate.rate,
    })),
    isLoading: false,
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
  const [rowPendingRemoval, setRowPendingRemoval] = useState<number | null>(
    null
  );

  const ModalHR = ({
    isOpen,
    onCancel,
    onConfirm,
  }: {
    isOpen?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
  }) => {
    return (
      <Modal
        title="Delete this Research cost?"
        isOpen={isOpen}
        onClose={onCancel}
        footer={
          <div className="aq-float-right">
            <Button onClick={onCancel} className="aq-mx-2">
              Cancel
            </Button>
            <Button kind="danger" onClick={onConfirm} className="aq-mx-2">
              Delete
            </Button>
          </div>
        }
      >
        <ModalBody>
          <Text>
            <strong>
              This will permanently remove this cost item from the campaign
              budget.
            </strong>{" "}
            <br />
            Are you sure?
          </Text>
        </ModalBody>
      </Modal>
    );
  };

  const totalHR = values.items
    ? values.items
        .reduce((sum, item) => {
          const rateOption = rates.find((r) => r.value === String(item.role));
          const subtotal = rateOption ? rateOption.dailyRate * item.days : 0;
          return sum + subtotal;
        }, 0)
        .toFixed(2)
    : 0;

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
              values.items.map((item, index) => {
                const selectedAssignee = assignees.find(
                  (a) => a.value === String(item.assignee)
                );

                const selectedRateOption = rates.find(
                  (r) => r.value === String(item.role)
                );

                const rateForSelect: RateOption = selectedRateOption ?? {
                  // fallback option
                  value: String(item.role ?? ""),
                  label: "",
                  dailyRate: 0,
                };

                const subtotal = (rateForSelect.dailyRate * item.days).toFixed(
                  2
                );

                return (
                  <div key={`hr-row-wrapper-${index}`}>
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
                          value={
                            selectedAssignee ?? {
                              value: String(item.assignee ?? ""),
                              label: "",
                            }
                          }
                          onChange={(newOption) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              assignee: Number(newOption.value),
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
                              Number of days{" "}
                              <span style={{ color: "red" }}>*</span>
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
                          value={rateForSelect}
                          onChange={(newOption) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              role: Number(newOption.value),
                            });
                          }}
                          noOptionsMessage={() => "No options"}
                        />
                      </div>

                      <div>
                        <Button
                          size="sm"
                          kind="danger"
                          onClick={() => {
                            values.items[index].notSaved
                              ? arrayHelpers.remove(index)
                              : setRowPendingRemoval(index);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </StyledRow>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "8px",
                      }}
                    >
                      <Text>
                        Subtotal:{" "}
                        <span style={{ fontWeight: "bold" }}>{subtotal}€</span>
                      </Text>
                    </div>
                  </div>
                );
              })}

            <ModalHR
              isOpen={rowPendingRemoval !== null}
              onCancel={() => setRowPendingRemoval(null)}
              onConfirm={() => {
                if (rowPendingRemoval === null) return;
                arrayHelpers.remove(rowPendingRemoval);
                setRowPendingRemoval(null);
                submitForm();
              }}
            />

            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                forwardedAs="a"
                onClick={() => {
                  arrayHelpers.push({
                    notSaved: true,
                    assignee: 0,
                    days: 0,
                    role: 0,
                  });
                }}
                kind="link"
              >
                + Add Human Resources
              </Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: "14px" }}>
                  TOTAL HUMAN RESOURCES COSTS:{" "}
                </Text>
                <span
                  style={{
                    marginLeft: "6px",
                    fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                    fontSize: "20px",
                  }}
                >
                  {totalHR}€
                </span>
              </div>
            </div>
          </>
        )}
      />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={!isValid || !dirty || isSubmitting}
          onClick={submitForm}
          type="submit"
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default HumanResources;
