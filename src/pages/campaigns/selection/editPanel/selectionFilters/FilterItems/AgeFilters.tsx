import { Button, Input, Title } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { setFilters } from "../../../selectionSlice";
import { FilterContainer } from "./components/FilterContainer";

const InputContainer = styled.div`
  display: flex;
`;

const AgeFilters = () => {
  const [max, setMax] = useState<number | undefined>();
  const [min, setMin] = useState<number | undefined>();

  const { filterByAge } = useAppSelector((state) => state.selection.filters);
  const dispatch = useAppDispatch();

  const onApply = () => {
    dispatch(
      setFilters({
        filterByAge: {
          ...filterByAge,
          ...(typeof max === "number" ? { max } : {}),
          ...(typeof min === "number" ? { min } : {}),
        },
      })
    );
  };

  useEffect(() => {
    setMin(filterByAge?.min);
    setMax(filterByAge?.max);
  }, [filterByAge?.min, filterByAge?.max]);

  return (
    <FilterContainer>
      <Title size="xs">Filter By Age</Title>
      <InputContainer>
        <Input
          placeholder="Min"
          value={min ? min.toString() : ""}
          onChange={(val) => setMin(parseInt(val))}
          id="minAge"
          type="number"
          className="aq-mr-2"
        />
        <Input
          placeholder="Max"
          value={max ? max.toString() : ""}
          onChange={(val) => setMax(parseInt(val))}
          id="maxAge"
          type="number"
          className="aq-mr-2"
        />
        <Button onClick={onApply}>Apply</Button>
      </InputContainer>
    </FilterContainer>
  );
};

export { AgeFilters };
