import { Card, Form, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useEffect, useState } from "react";
import { useGetCampaignsByCampaignFormsQuery } from "src/services/tryberApi";
import styled from "styled-components";
import FilterRow from "./FilterRow";
import { mapCampaingFormData } from "./mapData";
import * as yup from "yup";
import FilterCardHeader from "./FilterCardHeader";
import { useAppDispatch } from "src/store";
import { setDisableApplyFilters } from "../../selectionSlice";

const StyledSelectionFilters = styled.div`
  height: 122px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const filters: Option[] = [
  { label: "Os/Os version", value: "os" },
  { label: "Tester Id", value: "tester_id" },
];

const queryTypeOptions: Option[] = [
  { label: "Include", value: "filteByInclude" },
  { label: "Exclude", value: "filterByExclude" },
];

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  const dispatch = useAppDispatch();
  const [filterByList, setFilterByList] = useState<Option[]>([]);
  const { data } = useGetCampaignsByCampaignFormsQuery(
    { campaign: id },
    { skip: !id }
  );

  const initialFiltersValues: SelectionFiltersValues = {
    filters: {},
  };

  const validationSchema = {
    filters: yup.object(),
  };

  useEffect(() => {
    if (data) {
      const questions = mapCampaingFormData(data);
      setFilterByList([...filters, ...questions]);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialFiltersValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values) => {
        console.info("submit", values);
        dispatch(setDisableApplyFilters(true));
      }}
    >
      {(formikProps: FormikProps<SelectionFiltersValues>) => {
        return (
          <Form id="selectionFilters">
            <Card>
              <FilterCardHeader queryTypeOptions={queryTypeOptions} />
              <StyledSelectionFilters>
                {formikProps.values.filters.row?.map((f: any, i: number) => (
                  <FilterRow
                    key={i}
                    index={i}
                    filterByOptions={filterByList}
                    queryTypeOptions={queryTypeOptions}
                  />
                ))}
              </StyledSelectionFilters>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SelectionFilters;
