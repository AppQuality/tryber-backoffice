import { BSCol, BSGrid, Container } from "@appquality/appquality-design-system";
import { CufConfigurator } from "./CufConfigurator/CufConfigurator";
import { CufListCard } from "./CufListCard";

export default function Jotform() {
  return (
    <Container>
      <BSGrid className="aq-mt-4">
        <BSCol size="col-lg-4">
          <CufListCard />
        </BSCol>
        <BSCol size="col-lg-8">
          <CufConfigurator />
        </BSCol>
      </BSGrid>
    </Container>
  );
}
