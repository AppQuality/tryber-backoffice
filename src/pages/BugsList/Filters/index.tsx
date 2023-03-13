import StatusFilter from "./StatusFilter";
import SeverityFilter from "./SeverityFilter";
import Search from "./Search";
import DuplicationFilter from "./DuplicationFilter";
import TypeFilter from "./TypeFilter";
import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import styled from "styled-components";

const Grid = styled(BSGrid)`
  align-items: flex-end;
`;

const Filters = ({ id }: { id: string }) => {
  return (
    <Grid>
      <BSCol>
        <Search />
      </BSCol>
      <BSCol>
        <SeverityFilter id={id} />
      </BSCol>
      <BSCol>
        <StatusFilter id={id} />
      </BSCol>
      <BSCol>
        <DuplicationFilter id={id} />
      </BSCol>
      <BSCol>
        <TypeFilter id={id} />
      </BSCol>
    </Grid>
  );
};

export default Filters;
