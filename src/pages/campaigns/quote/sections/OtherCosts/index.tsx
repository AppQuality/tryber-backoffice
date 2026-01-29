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
import { styled } from "styled-components";
import CostsFormProvider, { FormProps } from "./CostsFormProvider";
import { AttachmentsDropzone } from "./AttachmentsDropzone";

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

const COST_TYPES = [
  { value: "1", label: "Travel" },
  { value: "2", label: "Equipment" },
];
const SUPPLIERS = [
  { value: "1", label: "Supplier A" },
  { value: "2", label: "Supplier B" },
];

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
                const selectedType = COST_TYPES.find(
                  (t) => t.value === String(item.type)
                );
                const selectedSupplier = SUPPLIERS.find(
                  (s) => s.value === String(item.supplier)
                );

                return (
                  <div
                    key={`cost-row-wrapper-${index}`}
                    style={{
                      borderBottom: "1px solid #eee",
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
                      <div>
                        <Select
                          name={`items.${index}.type`}
                          menuTargetQuery="body"
                          options={COST_TYPES}
                          label={
                            <Text>
                              Type <span style={{ color: "red" }}>*</span>
                            </Text>
                          }
                          value={selectedType ?? { value: "", label: "" }}
                          onChange={(opt) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              type: Number(opt.value),
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Select
                          name={`items.${index}.supplier`}
                          menuTargetQuery="body"
                          options={SUPPLIERS}
                          label={
                            <Text>
                              Supplier <span style={{ color: "red" }}>*</span>
                            </Text>
                          }
                          value={selectedSupplier ?? { value: "", label: "" }}
                          onChange={(opt) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              supplier: Number(opt.value),
                            });
                          }}
                        />
                      </div>
                      <div style={{ maxWidth: "150px" }}>
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
                          value={item.cost.toString()}
                          onChange={(value) => {
                            arrayHelpers.replace(index, {
                              ...item,
                              cost: Number(value),
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Button
                          size="sm"
                          kind="danger"
                          onClick={() => {
                            item.notSaved
                              ? arrayHelpers.remove(index)
                              : setRowPendingRemoval(index);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
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
                    onClick={() => {
                      if (rowPendingRemoval !== null) {
                        arrayHelpers.remove(rowPendingRemoval);
                        setRowPendingRemoval(null);
                        submitForm();
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
