import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useMemo, useState } from "react";
import { ArrowClockwise } from "react-bootstrap-icons";
import { useGetDossiersByCampaignAvailableTestersQuery } from "src/services/tryberApi";
import { styled } from "styled-components";
import { formatIsoToLocalDateTime } from "../formatDate";
import { NewCampaignValues } from "../FormProvider";
import { Stoplight } from "./Stoplight";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  align-content: center;
  gap: 1rem;
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
  testers,
}: {
  campaignId?: number;
  testers?: number;
}) => {
  const [disableCache, setDisableCache] = useState<"0" | "1" | undefined>();
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDossiersByCampaignAvailableTestersQuery({
      campaign: campaignId?.toString() || "",
      refresh: disableCache,
    });
  const { touched } = useFormikContext<NewCampaignValues>();

  const targetTouched = useMemo(() => {
    return (
      touched.targetSize ||
      touched.countries ||
      touched.provinces ||
      touched.ageRequirements ||
      touched.genderRequirements ||
      touched.languages ||
      touched.cuf
    );
  }, [touched]);

  const stoplightColor = useMemo(() => {
    if (!testers || !data?.count) return "grey";

    if (data.count > testers * 8) return "green";
    if (data.count > testers * 4) return "yellow";
    return "red";
  }, [data?.count, testers]);

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
          Updated on: {formatIsoToLocalDateTime(data.lastUpdate)}
        </Text>
        {targetTouched && (
          <Text small color={"danger"}>
            ⚠️ Target reach has been modified
          </Text>
        )}
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
