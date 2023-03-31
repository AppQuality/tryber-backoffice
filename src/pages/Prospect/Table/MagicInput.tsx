import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";

const MagicInput = ({ onChange }: { onChange?: (value: string) => void }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);
  useEffect(() => {
    onChange && onChange(debouncedValue);
  }, [debouncedValue]);
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onPaste={(event) => {
        event.preventDefault();
        const paste = event.clipboardData.getData("text");
        setValue(paste.replace(/(\r\n|\n|\r)/gm, ","));
      }}
    />
  );
};

export default MagicInput;
