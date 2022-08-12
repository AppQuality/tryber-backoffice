import { BSCol, BSGrid, Container } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { CufConfigurator } from "./CufConfigurator/CufConfigurator";
import { CufListCard } from "./CufListCard";
import { useAppSelector } from "src/store";
import { JotformSuccessCard } from "src/pages/Jotform/JotformSuccessCard";
import useUserData from "src/pages/Jotform/useUserData";

const StickyContainer = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    position: sticky;
    top: 16px;
  }
`;

export default function Jotform() {
  const { isFetching, isError, data, isLoading } = useUserData();
  const { url } = useAppSelector((state) => state.jotform);
  if (isLoading || isFetching) return <Container>loading...</Container>;
  if (isError) return <Container>there was an error</Container>;
  if (data?.role === "tester" || data?.role === "subscriber")
    return (
      <Container>
        You can't see this page because you are not authorized
      </Container>
    );
  return (
    <Container>
      <BSGrid className="aq-mt-4">
        {url ? (
          <>
            <BSCol size="col-lg-2" />
            <BSCol size="col-lg-8">
              <JotformSuccessCard url={url} />
            </BSCol>
          </>
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
