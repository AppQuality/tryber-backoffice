import { Button, Input, Title } from "@appquality/appquality-design-system";
import { useState } from "react";
import {
  useGetCampaignsByCampaignQuery,
  useGetCampaignsFormsByFormIdQuery,
} from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { setFilters } from "../../../selectionSlice";
import { CheckboxFilter } from "./CheckboxFilter";
import { FilterContainer } from "./components/FilterContainer";

const InputContainer = styled.div`
  display: flex;
`;
const QuestionFilters = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCampaignsByCampaignQuery({
    campaign: id,
  });

  if (!data || isLoading || !data.preselectionFormId) {
    return null;
  }

  return <QuestionFiltersItems id={data.preselectionFormId.toString()} />;
};

const QuestionFiltersItems = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCampaignsFormsByFormIdQuery({
    formId: id,
  });

  if (!data || isLoading) {
    return null;
  }

  console.log(data);
  return (
    <>
      {data.fields.map((value) => {
        return (
          <div key={value.id}>
            <QuestionFilterItem
              id={value.id}
              title={value.short_name ?? value.question}
              type={value.type}
              options={
                "options" in value && value.options
                  ? value.options.map((o) => o.toString())
                  : undefined
              }
            />
          </div>
        );
      })}
    </>
  );
};

const QuestionFilterItem = ({
  id,
  title,
  options,
  type,
}: {
  id: number;
  title: string;
  type: string;
  options?: string[];
}) => {
  if (["radio", "select", "multiselect"].includes(type) && options) {
    return (
      <CheckboxQuestionFilterItem id={id} title={title} options={options} />
    );
  }

  return <TextQuestionFilterItem id={id} title={title} />;
};

const CheckboxQuestionFilterItem = ({
  id,
  title,
  options,
}: {
  id: number;
  title: string;
  options: string[];
}) => {
  const { filterByInclude } = useAppSelector(
    (state) => state.selection.filters
  );
  const questionData =
    filterByInclude &&
    `question_${id}` in filterByInclude &&
    filterByInclude[`question_${id}` as keyof typeof filterByInclude]
      ? filterByInclude[`question_${id}` as keyof typeof filterByInclude]
      : [];

  return (
    <CheckboxFilter
      title={title}
      key={id.toString()}
      options={options}
      onSelect={(checked, option) =>
        setFilters({
          filterByInclude: {
            ...(filterByInclude || {}), // Add an empty object as fallback
            [`question_${id}`]: checked
              ? [...questionData, option]
              : questionData.filter((o) => o !== option),
          },
        })
      }
    />
  );
};

const TextQuestionFilterItem = ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => {
  const [value, setValue] = useState("");
  const { filterByInclude } = useAppSelector(
    (state) => state.selection.filters
  );
  const dispatch = useAppDispatch();

  const onApply = () => {
    if (value === "") {
      const newFilterByInclude = { ...filterByInclude };
      delete newFilterByInclude[
        `question_${id}` as keyof typeof filterByInclude
      ];
      dispatch(setFilters({ filterByInclude: newFilterByInclude }));
      return;
    }
    dispatch(
      setFilters({
        filterByInclude: {
          ...filterByInclude,
          [`question_${id}`]: value.split(",").map((v) => v.trim()),
        },
      })
    );
  };

  return (
    <FilterContainer>
      <Title size="s">{title}</Title>
      <InputContainer>
        <Input
          value={value}
          onChange={setValue}
          data-qa={`question_${id}`}
          id={`question_${id}`}
          type="text"
        />
        <Button onClick={() => onApply()}>Apply</Button>
      </InputContainer>
    </FilterContainer>
  );
};

export { QuestionFilters };
