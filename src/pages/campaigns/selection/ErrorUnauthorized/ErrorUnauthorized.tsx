import tryber from "src/pages/campaigns/selection/SelectionTable/assets/tryber.png";
import bg from "src/pages/campaigns/selection/SelectionTable/assets/bg.png";
import { Text } from "@appquality/appquality-design-system";
import styled from "styled-components";

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  min-height: 250px;
  background-image: url(${bg});
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const ErrorUnauthorized = () => (
  <StyledError>
    <img
      alt="error 403"
      className="aq-mb-3"
      src={tryber}
      style={{ maxWidth: 100 }}
    />
    <Text style={{ textAlign: "center" }}>
      <strong>Non c'è niente da vedere qui</strong>
      <br />
      Sembrerebbe che tu non abbia i permessi per accedere alla selezione di
      questa campagna
    </Text>
  </StyledError>
);

export default ErrorUnauthorized;
