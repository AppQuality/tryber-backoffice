import { BSCol, BSGrid, Container } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { CufConfigurator } from "./CufConfigurator/CufConfigurator";
import { CufListCard } from "./CufListCard";

const StickyContainer = styled.div`
  position: sticky;
  top: 16px;
`;

export default function Jotform() {
  return (
    <Container>
      <BSGrid className="aq-mt-4">
        <BSCol size="col-lg-4">
          <StickyContainer>
            <CufListCard />
          </StickyContainer>
        </BSCol>
        <BSCol size="col-lg-8">
          <CufConfigurator />
        </BSCol>
      </BSGrid>
    </Container>
  );
}
