import { Select } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import styled from "styled-components";

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.palette.primary};
  font-size: 1rem;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.general.borderRadius}};
  line-height: 1.5;
  box-shadow: none;

  &:focus {
    color: ${({ theme }) => theme.palette.primary};
    background-color: #fff;
    border-color: #e2bcf5;
    outline: 0;
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.gray100},
      0 0 0 0.25rem ${({ theme }) => theme.colors.gray200};
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

type Mode = "include" | "exclude";

const SearchBar = ({
  onChange,
  className,
}: {
  onChange?: (value: string, selectionMode?: Mode) => void;
  className?: string;
}) => {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<Mode>("include");
  const debouncedValue = useDebounce(value, 300);
  useEffect(() => {
    onChange && onChange(debouncedValue, mode);
  }, [debouncedValue, mode]);

  return (
    <Container className={className}>
      <div style={{ flexShrink: 0, width: "10%" }}>
        <Select
          isSearchable={false}
          isClearable={false}
          name=""
          label=""
          onChange={(value) => {
            if (value.value === "include" || value.value === "exclude")
              setMode(value.value);
          }}
          options={[
            { label: "Only", value: "include" },
            { label: "Exclude", value: "exclude" },
          ]}
          value={{ label: "", value: mode }}
        />
      </div>
      <StyledInput
        placeholder="Enter comma separated values of tester ids"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onPaste={(event) => {
          event.preventDefault();
          const paste = event.clipboardData.getData("text");
          setValue(paste.replace(/(\r\n|\n|\r)/gm, ","));
        }}
      />
    </Container>
  );
};

export default SearchBar;
