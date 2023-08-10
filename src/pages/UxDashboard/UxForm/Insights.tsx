import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Pill,
} from "@appquality/appquality-design-system";
import { AddNewInsightCTA, InsightPillsWrapper } from "../components/styled";
import { FieldArray, useFormikContext } from "formik";
import { setInsightIndex, setSelectedInsight } from "../uxDashboardSlice";
import SeverityPill from "../components/SeverityPill";
import { useState } from "react";
import { FormValuesInterface } from "./FormProvider";
import { useAppDispatch } from "src/store";
import InsightModal from "./InsightModal";

const InsightSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { submitForm } = useFormikContext<FormValuesInterface>();
  function editInsight(insight: FormValuesInterface["insights"][number]): void {
    dispatch(setSelectedInsight(insight));
    setModalOpen(true);
  }
  const dispatch = useAppDispatch();
  return (
    <>
      <Card title="Insights" className="aq-mb-3">
        <FieldArray
          name="insights"
          render={({ form, remove, push, name }) => (
            <BSGrid data-qa="insights-list" className="aq-mb-3">
              <InsightModal
                onClose={() => setModalOpen(false)}
                isOpen={modalOpen}
                fieldName={name}
              />
              {form.values[name].map(
                (
                  insight: FormValuesInterface["insights"][number],
                  index: number
                ) => (
                  <BSCol
                    size="col-lg-4"
                    className="aq-mb-4"
                    key={insight.id}
                    data-qa={`insight-card-${insight.id}`}
                  >
                    <Card title={insight.title}>
                      <div className="aq-mb-3">{insight.description}</div>
                      <div>
                        <InsightPillsWrapper className="aq-mb-3">
                          {insight?.severity && (
                            <SeverityPill severity={insight.severity} />
                          )}
                          {Array.isArray(insight.cluster) &&
                            insight.cluster.map((cluster) => (
                              <Pill
                                type="primary"
                                className="aq-mr-1"
                                key={cluster.id}
                                flat
                              >
                                {cluster.name}
                              </Pill>
                            ))}
                          {insight.cluster &&
                            !Array.isArray(insight.cluster) && (
                              <Pill type="primary" className="aq-mr-1" flat>
                                General
                              </Pill>
                            )}
                        </InsightPillsWrapper>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <Button
                            htmlType="button"
                            flat
                            type="danger"
                            size="block"
                            onClick={() => {
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              ) &&
                                remove(index) &&
                                submitForm();
                            }}
                            data-qa="delete-insight"
                          >
                            Delete
                          </Button>
                          <Button
                            htmlType="button"
                            flat
                            type="primary"
                            size="block"
                            onClick={() => {
                              editInsight(insight);
                              dispatch(setInsightIndex(index));
                            }}
                            data-qa="edit-insight"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </BSCol>
                )
              )}
              <BSCol size="col-lg-4">
                <Card shadow>
                  <AddNewInsightCTA
                    data-qa="add-new-insight"
                    onClick={() => {
                      push({
                        title: "",
                        description: "",
                        videoParts: [],
                      });
                      dispatch(setInsightIndex(form.values.insights.length));
                      setModalOpen(true);
                    }}
                  >
                    <span className="icon-big">+</span>
                    <span>Aggiungi scoperta</span>
                  </AddNewInsightCTA>
                </Card>
              </BSCol>
            </BSGrid>
          )}
        />
      </Card>
    </>
  );
};

export default InsightSection;
