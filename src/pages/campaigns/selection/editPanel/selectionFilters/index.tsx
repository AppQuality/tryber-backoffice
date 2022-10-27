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
import {
  changeTablePage,
  clearSelectedDevice,
  setDisableApplyFilters,
  setFilters,
} from "../../selectionSlice";

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
  // { label: "Tester Id", value: "tester_id" },
];

const queryTypeOptions: Option[] = [
  { label: "Include", value: "filterByInclude" },
  { label: "Exclude", value: "filterByExclude" },
];

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  const dispatch = useAppDispatch();
  const [filterByList, setFilterByList] = useState<Option[]>(filters);
  // const [filterByList, setFilterByList] = useState<Option[]>([]);
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

  // useEffect(() => {
  //   if (data) {
  //     const questions = mapCampaingFormData(data);
  //     setFilterByList([...filters, ...questions]);
  //   }
  // }, [data]);

  return (
    <Formik
      initialValues={initialFiltersValues}
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values) => {
        let filterByInclude: { [key: string]: string[] } = {};
        let filterByExclude: { [key: string]: string[] } = {};
        values.filters.row?.forEach((r: any) => {
          if (r.queryType.value === "filterByInclude") {
            if (
              Object.keys(filterByInclude).some((k) => k === r.filterBy.value)
            ) {
              filterByInclude[r.filterBy.value].push(r.search);
            } else {
              filterByInclude = {
                ...filterByInclude,
                ...{ [r.filterBy.value]: [r.search] },
              };
            }
          } else {
            if (
              Object.keys(filterByExclude).some((k) => k === r.filterBy.value)
            ) {
              filterByExclude[r.filterBy.value].push(r.search);
            } else {
              filterByExclude = {
                ...filterByExclude,
                ...{ [r.filterBy.value]: [r.search] },
              };
            }
          }
        });
        dispatch(changeTablePage({ newPage: 1 }));
        dispatch(setDisableApplyFilters(true));
        dispatch(clearSelectedDevice());
        dispatch(setFilters({ filterByInclude, filterByExclude }));
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
