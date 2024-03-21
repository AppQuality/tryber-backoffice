import { Button, Input, Title } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { setFilters } from "../../../selectionSlice";
import { FilterContainer } from "./components/FilterContainer";

const InputContainer = styled.div`
  display: flex;
`;

const TesterIdExclude = () => {
  const [value, setValue] = useState<string | undefined>("");

  const { filterByExclude } = useAppSelector(
    (state) => state.selection.filters
  );
  const dispatch = useAppDispatch();

  const onApply = () => {
    dispatch(
      setFilters({
        filterByExclude: {
          ...filterByExclude,
          testerIds: value,
        },
      })
    );
  };

  useEffect(() => {
    setValue(filterByExclude?.testerIds);
  }, [filterByExclude?.testerIds]);

  return (
    <FilterContainer>
      <Title size="xs">Exclude these testers</Title>
      <InputContainer>
        <Input
          placeholder="T38229, T283472"
          className="aq-mr-2"
          value={value ? value : ""}
          onChange={(val) => {
            setValue(val.trim());
          }}
          data-qa="testerIdExclude"
          id="tidexclude"
          type="text"
          extra={{
            onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onApply();
              }
            },
            onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => {
              event.preventDefault();
              const paste = `${
                value && value + ","
              }${event.clipboardData.getData("text")},`.replace(/,+/g, ",");
              setValue(paste.replace(/(\r\n|\n|\r)/gm, ","));
            },
          }}
        />
        <Button onClick={() => onApply()}>Apply</Button>
      </InputContainer>
    </FilterContainer>
  );
};

export { TesterIdExclude };
