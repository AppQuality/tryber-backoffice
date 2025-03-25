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
        <Title size="s">The quote is now:</Title>
        {getQuoteStatusPill(status)}
      </StyledDiv>

      {status === "pending" && (
        <Text small>
          Based on the template used, we've prepared this quote. Please check if
          it is still accurate or needs an update.
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
