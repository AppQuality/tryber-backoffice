import { Button, Select } from "@appquality/appquality-design-system";
import { useState } from "react";
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
  border-radius: ${({ theme }) => theme.general.borderRadius};
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
  onClick,
  className,
}: {
  onClick: (value: string, selectionMode?: Mode) => void;
  className?: string;
}) => {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<Mode>("include");

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
        placeholder="Enter comma separated values of tester ids and click to 'Filter Testers'"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onClick(value, mode);
          }
        }}
        onPaste={(event) => {
          event.preventDefault();
          const paste = `${value},${event.clipboardData.getData(
            "text"
          )},`.replace(/,+/g, ",");
          setValue(paste.replace(/(\r\n|\n|\r)/gm, ","));
        }}
      />
      <div style={{ flexShrink: 0 }}>
        <Button kind="info" flat onClick={() => onClick(value, mode)}>
          Search
        </Button>
      </div>
    </Container>
  );
};

export default SearchBar;
