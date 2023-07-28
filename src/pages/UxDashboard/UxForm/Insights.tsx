import { Button, Card, Pill } from "@appquality/appquality-design-system";
import {
  AddNewInsightCTA,
  InsightPillsWrapper,
  InsightsWrapper,
} from "../components/styled";
import { FieldArray } from "formik";
import { InsightModal } from "../components/insightModal";
import { setInsightIndex, setSelectedInsight } from "../uxDashboardSlice";
import SeverityPill from "../components/SeverityPill";
import { useState } from "react";
import { FormValuesInterface } from ".";
import { useAppDispatch } from "src/store";

const InsightSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  function editInsight(insight: FormValuesInterface["insights"][number]): void {
    dispatch(setSelectedInsight(insight));
    setModalOpen(true);
  }
  const dispatch = useAppDispatch();
  return (
    <>
      <InsightModal onClose={() => setModalOpen(false)} isOpen={modalOpen} />
      <Card title="Insights" className="aq-mb-2">
        <InsightsWrapper data-qa="insights-list" className="aq-mb-3">
          <FieldArray
            name="insights"
            render={({ form, remove, push, name }) => (
              <>
                {form.values.insights.map(
                  (
                    insight: FormValuesInterface["insights"][number],
                    index: number
                  ) => (
                    <div
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
                                ) && remove(index);
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
                    </div>
                  )
                )}
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
                    <span>Add new insight</span>
                  </AddNewInsightCTA>
                </Card>
              </>
            )}
          />
        </InsightsWrapper>
      </Card>
    </>
  );
};

export default InsightSection;
