import { Button, Input, Title } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../../selectionSlice";

const TesterIdExclude = () => {
  const [value, setValue] = useState("");

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

  return (
    <>
      <Title size="s">Exclude these testers</Title>
      <Input
        value={value}
        onChange={setValue}
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
            const paste = `${value},${event.clipboardData.getData(
              "text"
            )},`.replace(/,+/g, ",");
            setValue(paste.replace(/(\r\n|\n|\r)/gm, ","));
          },
        }}
      />
      <Button onClick={() => onApply()}>Apply</Button>
    </>
  );
};

export { TesterIdExclude };
