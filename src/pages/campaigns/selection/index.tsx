import {
  BSCol,
  BSGrid,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import Counter from "./counter";
import ColumnsConfigurator from "./editPanel/columnsConfigurator";
import SelectionFilters from "./editPanel/selectionFilters";
import SelectionTable from "./SelectionTable";
import { useParams } from "react-router-dom";
import ConfirmButton from "src/pages/campaigns/selection/confirmButton/ConfirmButton";
import ConfirmModal from "src/pages/campaigns/selection/confirmModal/ConfirmModal";
import styled from "styled-components";
import { PageTemplate } from "src/features/PageTemplate";
import NewSelectionFilters from "./editPanel/newSelectionFilters";
import { useState } from "react";

const StickyToBottomContainer = styled.div`
  position: sticky;
  bottom: 0;
`;

const SelectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mail, setMail] = useState<string[]>([]);
  const [provider, setProvider] = useState<string[]>([]);
  const [os, setOs] = useState<string[]>([]);
  const [age, setAge] = useState({ min: 18, max: 56 });
  const [bhLevel, setBhLevel] = useState<string[]>([]);
  const [uxLevel, setUxLevel] = useState<string[]>([]);
  return (
    <PageTemplate>
      <div className="selection-page">
        <OpsUserContainer>
          <ConfirmModal id={id} />
          <PageTitle size="regular">Tester selection panel</PageTitle>
          <BSGrid className="aq-my-4">
            <BSCol size="col-lg-3">
              <Card className="aq-mb-3" title="Columns">
                <ColumnsConfigurator id={id} />
              </Card>
              <Card className="aq-mb-3" title="Filters">
                <NewSelectionFilters
                  mail={mail}
                  setMail={setMail}
                  provider={provider}
                  setProvider={setProvider}
                  os={os}
                  setOs={setOs}
                  bhLevel={bhLevel}
                  setBhLevel={setBhLevel}
                  uxLevel={uxLevel}
                  setUxLevel={setUxLevel}
                  age={age}
                  setAge={setAge}
                />
              </Card>
            </BSCol>
            <BSCol size="col-lg-9">
              <Card className="aq-mb-3">
                <SelectionTable
                  id={id}
                  mail={mail}
                  provider={provider}
                  os={os}
                  bhLevel={bhLevel}
                  uxLevel={uxLevel}
                  age={age}
                />
              </Card>
              <Card>
                <Counter />
                <ConfirmButton />
              </Card>
            </BSCol>
          </BSGrid>
        </OpsUserContainer>
      </div>
    </PageTemplate>
  );
};
export default SelectionPage;
