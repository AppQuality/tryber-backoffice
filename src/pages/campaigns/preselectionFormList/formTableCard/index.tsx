import {
  Card,
  Pagination,
  Table,
  TableType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { useGetCampaignsFormsQuery } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { resetList } from "../preselectionListSlice";
import Columns from "./columns";
import { FormSearchCard } from "./formSearchCard";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

export const FormTableCard = () => {
  const { search } = useAppSelector((state) => state.campaignPreselectionList);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<TableType.Row[]>([]);
  const columns = Columns();
  const limit = 10;
  const { data, isFetching, isLoading, error } = useGetCampaignsFormsQuery({
    start: (page - 1) * limit,
    limit: limit,
    search,
    searchBy: "name,campaign_id",
  });

  useEffect(() => {
    const a = data?.results?.map((res) => {
      return {
        key: res.id,
        id: res.id,
        name: res.name,
        campaignId: res.campaign || (
          <div title="No associated campaigns" className="aq-text-danger">
            No associated campaigns
          </div>
        ),
        actions: {
          title: "",
          content: (
            <PencilSquare
              size={"18"}
              className={"aq-text-primaryVariant"}
              title="Edit"
              onClick={(e) => {
                if (e.ctrlKey)
                  window.open(
                    `/backoffice/campaigns/preselection/${res.id}`,
                    "_blank"
                  );
                else
                  history.push(`/backoffice/campaigns/preselection/${res.id}`);
              }}
              style={{ cursor: "pointer" }}
            />
          ),
        },
      };
    });
    setRows(a || []);
  }, [data?.results]);

  useEffect(() => {
    if (search || search === "") {
      setPage(1);
    }
  }, [search]);

  useEffect(() => {
    if (error)
      dispatch(
        addMessage("An error has occurred. Please try again.", "danger", false)
      );
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(resetList());
    };
  }, []);

  return (
    <Card title="Preselection Form List">
      <Card>
        <FormSearchCard />
        <Table
          dataSource={rows}
          isLoading={isLoading || isFetching}
          isStriped
          i18n={{
            loading: "Loading Data",
            empty: "No data",
          }}
          columns={columns}
        />
        <Pagination
          className="aq-pt-3"
          onPageChange={setPage}
          current={page}
          maxPages={Math.ceil((data?.total || 0) / limit)}
        />
      </Card>
    </Card>
  );
};
