import {
  useGetCampaignsByCampaignQuery,
  useGetCampaignsFormsByFormIdQuery,
} from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const QuestionsFilterPill = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCampaignsByCampaignQuery({
    campaign: id,
  });

  if (!data || isLoading || !data.preselectionFormId) {
    return null;
  }

  return <QuestionsFilterPillItems id={data.preselectionFormId.toString()} />;
};

const QuestionsFilterPillItems = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCampaignsFormsByFormIdQuery({
    formId: id,
  });

  if (!data || isLoading) {
    return null;
  }

  return (
    <>
      {data.fields.map((value) => {
        return (
          <QuestionFilterPill
            question={`question_${value.id}`}
            label={value.question}
          />
        );
      })}
    </>
  );
};

const QuestionFilterPill = ({
  question,
  label,
}: {
  question: string;
  label: string;
}) => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByInclude } = filters;

  if (!filterByInclude || question in filterByInclude === false) return null;

  const questionFilter = filterByInclude[
    question as keyof typeof filterByInclude
  ] as string[] | undefined;

  if (!questionFilter) return null;

  return (
    <>
      {questionFilter.map((answer) => (
        <FilterPill
          label={label}
          onRemove={() => {
            dispatch(
              setFilters({
                filterByInclude: {
                  ...filterByInclude,
                  [question]: questionFilter.filter((a) => a !== answer),
                },
              })
            );
          }}
        >
          {answer}
        </FilterPill>
      ))}
    </>
  );
};

export { QuestionsFilterPill };
