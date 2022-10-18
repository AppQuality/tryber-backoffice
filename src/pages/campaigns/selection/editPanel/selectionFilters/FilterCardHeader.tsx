import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Button, Title } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import styled from "styled-components";

const StyledCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;

  .header-btn {
    padding: 4px 30px;
  }
`;

interface FilterCardHeaderProps {
  queryTypeOptions: Option[];
}

const FilterCardHeader = ({ queryTypeOptions }: FilterCardHeaderProps) => {
  return (
    <StyledCardHeader>
      <Title size="ms">Add filters</Title>
      <div>
        <FieldArray
          name="filters.row"
          render={(arrayHelpers) => (
            <Button
              className="header-btn"
              type="link"
              onClick={() =>
                arrayHelpers.push({
                  filterBy: { label: "", value: "" },
                  queryType: queryTypeOptions[0],
                  search: "",
                })
              }
            >
              + Add new
            </Button>
          )}
        />
        <Button className="header-btn aq-ml-2" htmlType="submit" flat>
          Apply
        </Button>
      </div>
    </StyledCardHeader>
  );
};

export default FilterCardHeader;
