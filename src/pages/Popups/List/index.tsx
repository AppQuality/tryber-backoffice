import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Table,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllPopups from "src/api/getAllPopups";
import { PageTemplate } from "src/features/PageTemplate";

const usePopupsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllPopups().then((res) => {
      setData(
        res.map((r: any) => ({
          id: r.id,
          title: r.title,
          action: {
            title: "Open",
            content: (
              <Link to={`/backoffice/${r.id}`}>
                <Button kind="primary" flat={true}>
                  Open
                </Button>
              </Link>
            ),
          },
        }))
      );

      setLoading(false);
    });
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "2ch",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10ch",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <PageTemplate>
      <div className="popupContainer">
        <div className="aq-mt-3">
          <BSGrid>
            <BSCol size="col-12">
              <Link to="/backoffice/new">
                <Button kind="primary" flat={true} size="block">
                  New
                </Button>
              </Link>
            </BSCol>
            <BSCol>
              <Card>
                <Table
                  dataSource={data}
                  columns={columns}
                  isLoading={loading}
                  isStriped
                />
              </Card>
            </BSCol>
          </BSGrid>
        </div>
      </div>
    </PageTemplate>
  );
};

export default usePopupsList;
