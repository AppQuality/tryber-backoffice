import { Text, Title } from "@appquality/appquality-design-system";
import { styled } from "styled-components";
import { getQuoteStatusPill } from "./statusPill";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;

export const QuoteBanner = ({ status }: { status: string }) => {
  return (
    <div className="aq-mb-4">
      <StyledDiv>
        <Title size="s">Current Quote:</Title>
        {getQuoteStatusPill(status)}
      </StyledDiv>

      {status === "pending" && (
        <Text color={"info"}>
          💡 Please <strong>review this template-based quote.</strong>
          <br /> Saving it without changes will automatically confirm it
        </Text>
      )}

      {status === "proposed" && (
        <Text small>
          We are waiting for the customer to accept the quote. Please update it
          <b> responsibly</b>.
        </Text>
      )}
    </div>
  );
};
