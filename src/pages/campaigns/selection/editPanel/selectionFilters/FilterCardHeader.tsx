import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Button, Title } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "src/store";
import { setDisableApplyFilters } from "../../selectionSlice";
import { v4 as uuidv4 } from "uuid";

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
  const dispatch = useAppDispatch();
  const { disableApplyFilters } = useAppSelector((state) => state.selection);

  return (
    <StyledCardHeader>
      <Title size="ms">Add filters</Title>
      <div>
        <FieldArray
          name="filters.row"
          render={(arrayHelpers) => (
            <Button
              className="header-btn"
              type="link-hover"
              data-testid="selectionFilters_add"
              onClick={() => {
                arrayHelpers.push({
                  id: uuidv4(),
                  filterBy: { label: "", value: "" },
                  queryType: queryTypeOptions[0],
                  search: "",
                });
                dispatch(setDisableApplyFilters(false));
              }}
            >
              + Add new
            </Button>
          )}
        />
        <Button
          className="header-btn aq-ml-2"
          htmlType="submit"
          disabled={disableApplyFilters}
          data-testid="selectionFilters_apply"
          flat
        >
          Apply
        </Button>
      </div>
    </StyledCardHeader>
  );
};

export default FilterCardHeader;
