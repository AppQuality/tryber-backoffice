import { BSCol, BSGrid, Container } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { CufConfigurator } from "./CufConfigurator/CufConfigurator";
import { CufListCard } from "./CufListCard";
import { useAppSelector } from "src/store";
import { JotformSuccessCard } from "src/pages/Jotform/JotformSuccessCard";

const StickyContainer = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    position: sticky;
    top: 16px;
  }
`;

export default function Jotform() {
  const { url } = useAppSelector((state) => state.jotform);
  return (
    <Container>
      <BSGrid className="aq-mt-4">
        {url ? (
          <BSCol size="col-lg-8">
            <JotformSuccessCard url={url} />
          </BSCol>
        ) : (
          <>
            <BSCol size="col-lg-4">
              <StickyContainer>
                <CufListCard />
              </StickyContainer>
            </BSCol>
            <BSCol size="col-lg-8">
              <CufConfigurator />
            </BSCol>
          </>
        )}
      </BSGrid>
    </Container>
  );
}
