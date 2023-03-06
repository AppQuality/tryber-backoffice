import { Card, Form, Formik } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useEffect, useState } from "react";
import { useGetCampaignsByCampaignFormsQuery } from "src/services/tryberApi";
import styled from "styled-components";
import FilterRow from "./FilterRow";
import { mapCampaingFormData } from "../columnsConfigurator/mapData";
import * as yup from "yup";
import FilterCardHeader from "./FilterCardHeader";
import { useAppDispatch } from "src/store";
import { useFiltersValues } from "./useFiltersValues";
import useSelectionQueryTypeOptions from "./useSelectionQueryTypeOptions";
import useSelectionBaseFilters from "./useSelectionBaseFilters";

const StyledSelectionFilters = styled.div`
  height: 122px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  const dispatch = useAppDispatch();
  const queryTypeOptions = useSelectionQueryTypeOptions();
  const baseFilters = useSelectionBaseFilters();
  const [filterByList, setFilterByList] = useState<Option[]>(baseFilters);
  // const { data } = useGetCampaignsByCampaignFormsQuery(
  //   { campaign: id },
  //   { skip: !id }
  // );

  const initialFiltersValues: SelectionFiltersValues = {
    filters: {},
  };

  const validationSchema = {
    filters: yup.object(),
  };

  const { applyFilters } = useFiltersValues();

  // useEffect(() => {
  //   if (data) {
  //     const questions = mapCampaingFormData(data);
  //     setFilterByList([...baseFilters, ...questions]);
  //   }
  // }, [data]);

  return (
    <Formik
      initialValues={initialFiltersValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={applyFilters}
    >
      {(formikProps: FormikProps<SelectionFiltersValues>) => {
        return (
          <Form id="selectionFilters">
            <Card>
              <FilterCardHeader queryTypeOptions={queryTypeOptions} />
              <StyledSelectionFilters>
                {formikProps.values.filters.rows?.map(
                  (r: SelectionFilterRow, i: number) => (
                    <FilterRow
                      key={r.id}
                      index={i}
                      filterByOptions={filterByList}
                      queryTypeOptions={queryTypeOptions}
                    />
                  )
                )}
              </StyledSelectionFilters>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SelectionFilters;