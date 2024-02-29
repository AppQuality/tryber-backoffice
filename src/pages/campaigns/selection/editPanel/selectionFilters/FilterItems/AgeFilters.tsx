import { Button, Input, Title } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../../selectionSlice";

const AgeFilters = () => {
  const [max, setMax] = useState<number>();
  const [min, setMin] = useState<number>();

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

  return (
    <>
      <Title size="s">Filter By Age</Title>
      <Input
        placeholder="Min"
        value={min?.toString()}
        onChange={(val) => setMin(parseInt(val))}
        id="minAge"
        type="number"
      />
      <Input
        placeholder="Max"
        value={max?.toString()}
        onChange={(val) => setMax(parseInt(val))}
        id="maxAge"
        type="number"
      />
      <Button onClick={() => onApply()}>Apply</Button>
    </>
  );
};

export { AgeFilters };
