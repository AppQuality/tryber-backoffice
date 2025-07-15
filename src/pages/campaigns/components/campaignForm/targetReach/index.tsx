import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useMemo, useState } from "react";
import { ArrowClockwise } from "react-bootstrap-icons";
import { useGetDossiersByCampaignAvailableTestersQuery } from "src/services/tryberApi";
import { styled } from "styled-components";
import { formatDate, formatTime } from "../formatDate";
import { Stoplight } from "./Stoplight";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
  align-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

function prettyPrintNumber(num: number): string {
  if (num >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return num.toString();
}

export const TargetReachInfo = ({
  campaignId,
  cap,
}: {
  campaignId?: number;
  cap?: number;
}) => {
  const [disableCache, setDisableCache] = useState<"0" | "1" | undefined>();
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDossiersByCampaignAvailableTestersQuery({
      campaign: campaignId?.toString() || "",
      refresh: disableCache,
    });

  const stoplightColor = useMemo(() => {
    if (!cap || !data?.count) return "grey";

    if (data.count > cap * 8) return "green";
    if (data.count > cap * 4) return "yellow";
    return "red";
  }, [data?.count, cap]);

  const prettyCount = useMemo(() => {
    if (!data?.count) return "0";
    return prettyPrintNumber(data.count);
  }, [data?.count]);

  if (isLoading || isFetching)
    return (
      <StyledContainer className="aq-mb-4 aq-pt-4">Loading...</StyledContainer>
    );

  if (isError || !data) return null;

  return (
    <StyledContainer className="aq-mb-4 aq-pt-4">
      <div>
        <Stoplight activeColor={stoplightColor} />
      </div>
      <div>
        <TitleContainer>
          <Title size="s">Potential reach: {prettyCount} testers</Title>
        </TitleContainer>

        <Text small>
          Updated on: {formatDate(data.lastUpdate)} at{" "}
          {formatTime(data.lastUpdate)}.{" "}
        </Text>
        <Button
          kind="link"
          size="sm"
          onClick={() => {
            setDisableCache("1");
            refetch();
          }}
        >
          <ArrowClockwise style={{ marginTop: "auto" }} />
          Refresh
        </Button>
      </div>
    </StyledContainer>
  );
};
