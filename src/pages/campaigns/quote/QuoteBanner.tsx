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
          We've prepared this quote based on the provided template. Please
          review it to ensure it is accurate or make any necessary updates.
          <br />
          If you save it without making changes,{" "}
          <strong>it will be automatically confirmed</strong>&nbsp;without
          requiring further action from the client.
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
