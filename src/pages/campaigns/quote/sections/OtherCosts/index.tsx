import {
  aqBootstrapTheme,
  Button,
  Dropdown,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import { useState, useMemo } from "react";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import { styled } from "styled-components";
import siteWideMessageStore from "src/redux/siteWideMessages";
import CostsFormProvider, { FormProps } from "./CostsFormProvider";
import { AttachmentsDropzone } from "./AttachmentsDropzone";
import {
  useGetCampaignsByCampaignFinanceSupplierQuery,
  useGetCampaignsByCampaignFinanceTypeQuery,
  usePostCampaignsByCampaignFinanceSupplierMutation,
  useDeleteCampaignsByCampaignFinanceOtherCostsMutation,
} from "src/services/tryberApi";

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

const useCostTypes = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useGetCampaignsByCampaignFinanceTypeQuery({
    campaign: campaignId,
  });

  const options = useMemo(() => {
    if (!data?.items) return [];
    return data.items.map((item, index) => ({
      value: String(index + 1),
      label: item.name || `Type ${index + 1}`,
    }));
  }, [data]);

  return { data: options, isLoading };
};

const useSuppliers = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading, refetch } =
    useGetCampaignsByCampaignFinanceSupplierQuery({
      campaign: campaignId,
    });

  const options = useMemo(() => {
    if (!data?.items) return [];
    return data.items.map((item, index) => ({
      value: String(index + 1),
      label: item.name,
    }));
  }, [data]);

  return { data: options, isLoading, refetch };
};

const OtherCosts = ({ campaignId }: { campaignId: string }) => {
  return (
    <CostsFormProvider campaignId={campaignId}>
      <FormContent campaignId={campaignId} />
    </CostsFormProvider>
  );
};

const FormContent = ({ campaignId }: { campaignId: string }) => {
  const { values, isValid, submitForm, dirty, isSubmitting } =
    useFormikContext<FormProps>();
  const [rowPendingRemoval, setRowPendingRemoval] = useState<number | null>(
    null
  );

  const { data: costTypes, isLoading: costTypesLoading } = useCostTypes({
    campaignId,
  });
  const { data: suppliers, refetch: refetchSuppliers } = useSuppliers({
    campaignId,
  });
  const [createSupplier] = usePostCampaignsByCampaignFinanceSupplierMutation();
  const [deleteOtherCost] =
    useDeleteCampaignsByCampaignFinanceOtherCostsMutation();
  const { add } = siteWideMessageStore();

  const handleDelete = async (index: number, arrayHelpers: any) => {
    const item = values.items[index];

    if (item.notSaved) {
      arrayHelpers.remove(index);
      setRowPendingRemoval(null);
    } else if (item.cost_id) {
      try {
        await deleteOtherCost({
          campaign: campaignId,
          body: { cost_id: item.cost_id },
        }).unwrap();

        arrayHelpers.remove(index);
        setRowPendingRemoval(null);

        add({
          message: "Cost deleted successfully",
          type: "success",
        });
      } catch (error) {
        console.error("Failed to delete cost:", error);
        add({
          message: "Failed to delete cost",
          type: "danger",
        });
        setRowPendingRemoval(null);
      }
    }
  };

  const totalOtherCosts = values.items
    ? values.items
        .reduce((sum, item) => sum + (Number(item.cost) || 0), 0)
        .toFixed(2)
    : "0.00";

  return (
    <>
      <span style={{ color: aqBootstrapTheme.palette.info }}>
        💡
        <span style={{ fontWeight: "bold" }}>Add Other Costs</span> and{" "}
        <span style={{ fontWeight: "bold" }}>fill all required fields</span> (*)
      </span>

      <FieldArray
        name="items"
        render={(arrayHelpers) => (
          <>
            {values.items &&
              values.items.map((item, index) => {
                const selectedType = costTypes.find(
                  (t) => t.value === String(item.type)
                );

                const isLastItem = index === values.items.length - 1;

                return (
                  <div
                    key={`cost-row-wrapper-${index}`}
                    style={{
                      borderBottom: isLastItem ? "none" : "1px solid #eee",
                      paddingBottom: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <StyledRow>
                      <div style={{ flex: 1 }}>
                        <FormLabel
                          htmlFor={`desc-${index}`}
                          label={
                            <Text>
                              Description{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Text>
                          }
                        />
                        <Input
                          type="text"
                          id={`desc-${index}`}
                          value={item.description}
                          onChange={(value) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              description: value,
                            });
                          }}
                        />
                      </div>
                    </StyledRow>

                    <StyledRow>
                      <div style={{ flex: 1 }}>
                        <Select
                          name={`items.${index}.type`}
                          menuTargetQuery="body"
                          options={costTypes}
                          label={
                            <Text>
                              Type <span style={{ color: "red" }}>*</span>
                            </Text>
                          }
                          value={
                            selectedType ?? {
                              value: String(item.type || ""),
                              label: "",
                            }
                          }
                          onChange={(opt) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              type: Number(opt.value),
                            });
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <FormLabel
                          label={
                            <Text>
                              Supplier <span style={{ color: "red" }}>*</span>
                            </Text>
                          }
                        />
                        <Dropdown
                          isMulti={false}
                          isClearable
                          options={suppliers}
                          value={suppliers.find(
                            (s) => s.value === String(item.supplier)
                          )}
                          onChange={(opt: any) => {
                            if (opt) {
                              arrayHelpers.replace(index, {
                                ...item,
                                supplier: Number(opt.value),
                              });
                            } else {
                              arrayHelpers.replace(index, {
                                ...item,
                                supplier: 0,
                              });
                            }
                          }}
                          onCreateOption={async (inputValue: string) => {
                            try {
                              const supplierId = await createSupplier({
                                campaign: campaignId,
                                body: { name: inputValue },
                              })
                                .unwrap()
                                .then((res) => res.supplier_id);

                              await refetchSuppliers();
                              arrayHelpers.replace(index, {
                                ...item,
                                supplier: supplierId,
                              });
                            } catch (e) {
                              console.error("Failed to create supplier:", e);
                            }
                          }}
                          placeholder="Start typing to select or add"
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <FormLabel
                          htmlFor={`cost-${index}`}
                          label={
                            <Text>
                              Cost (€) <span style={{ color: "red" }}>*</span>
                            </Text>
                          }
                        />
                        <Input
                          id={`cost-${index}`}
                          type="number"
                          placeholder="0.00"
                          value={String(item.cost)}
                          onChange={(value: string) => {
                            const numValue =
                              value === "" ? 0 : parseFloat(value);
                            arrayHelpers.replace(index, {
                              ...item,
                              cost: numValue,
                            });
                          }}
                        />
                      </div>
                    </StyledRow>

                    <div style={{ marginTop: "12px" }}>
                      <FormLabel
                        label={
                          <Text small>
                            Attachments <span style={{ color: "red" }}>*</span>
                          </Text>
                        }
                      />
                      <AttachmentsDropzone
                        campaignId={campaignId}
                        name={`items.${index}.files`}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flex: 1,
                        }}
                      >
                        <Text>
                          Subtotal:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {(Number(item.cost) || 0).toFixed(2)}€
                          </span>
                        </Text>
                      </div>
                      <Button
                        size="sm"
                        kind="danger"
                        onClick={() => {
                          item.notSaved
                            ? arrayHelpers.remove(index)
                            : setRowPendingRemoval(index);
                        }}
                        style={{ marginLeft: "16px" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}

            <Modal
              title="Delete this cost?"
              isOpen={rowPendingRemoval !== null}
              onClose={() => setRowPendingRemoval(null)}
              footer={
                <div className="aq-float-right">
                  <Button
                    onClick={() => setRowPendingRemoval(null)}
                    className="aq-mx-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    kind="danger"
                    onClick={async () => {
                      if (rowPendingRemoval !== null) {
                        await handleDelete(rowPendingRemoval, arrayHelpers);
                      }
                    }}
                    className="aq-mx-2"
                  >
                    Delete
                  </Button>
                </div>
              }
            >
              <ModalBody>
                <Text>
                  <strong>This will permanently remove this cost item.</strong>
                </Text>
              </ModalBody>
            </Modal>

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
                onClick={() => {
                  arrayHelpers.push({
                    notSaved: true,
                    description: "",
                    type: 0,
                    supplier: 0,
                    cost: 0,
                    files: [],
                  });
                }}
                kind="link"
              >
                + Add Cost
              </Button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ fontSize: "14px" }}>TOTAL OTHER COSTS: </Text>
                <span
                  style={{
                    marginLeft: "6px",
                    fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                    fontSize: "20px",
                  }}
                >
                  {totalOtherCosts}€
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

export default OtherCosts;
