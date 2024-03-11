import { Button, Input, Title } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { setFilters } from "../../../selectionSlice";
import { FilterContainer } from "./components/FilterContainer";

const InputContainer = styled.div`
  display: flex;
`;

const TesterIdInclude = () => {
  const [value, setValue] = useState<string | undefined>("");

  const { filterByInclude } = useAppSelector(
    (state) => state.selection.filters
  );
  const dispatch = useAppDispatch();

  const onApply = () => {
    dispatch(
      setFilters({
        filterByInclude: {
          ...filterByInclude,
          testerIds: value,
        },
      })
    );
  };

  return (
    <FilterContainer>
      <Title size="xs">Show only these testers</Title>
      <InputContainer>
        <Input
          placeholder="T38229, T283472"
          value={value}
          onChange={(val) => {
            setValue(val.trim() === "" ? undefined : val);
          }}
          data-qa="testerIdInclude"
          id="tidinclude"
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
              const paste = `${value},${event.clipboardData.getData(
                "text"
              )},`.replace(/,+/g, ",");
              setValue(paste.replace(/(\r\n|\n|\r)/gm, ","));
            },
          }}
        />
        <Button onClick={() => onApply()}>Apply</Button>
      </InputContainer>
    </FilterContainer>
  );
};

export { TesterIdInclude };
