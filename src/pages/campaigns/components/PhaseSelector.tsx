import {
  Dropdown,
  Skeleton,
  icons,
} from "@appquality/appquality-design-system";
import { ReactNode, useMemo, useState } from "react";
import {
  useGetPhasesQuery,
  usePutDossiersByCampaignPhasesMutation,
} from "src/services/tryberApi";
import styled from "styled-components";

const PhaseDropdownWrapper = styled.div`
  .phase-dropdown {
    width: 100%;
  }
`;

const PhaseIcon = ({ id }: { id: number }) => {
  if (id === 1) return <icons.PencilSquare />;
  if (id === 2) return <icons.CalendarX />;
  if (id === 10) return <icons.CalendarCheck />;
  if (id === 20) return <icons.Gear />;
  if (id === 30) return <icons.Search />;
  if (id === 40) return <icons.CalendarRange />;
  if (id === 50) return <icons.HourglassSplit />;
  if (id === 60) return <icons.CashCoin />;
  if (id === 100) return <icons.Check2Circle />;
  return <icons.DashLg />;
};

const PhaseLabelComponent = ({
  className,
  id,
  name,
}: {
  className?: string;
  id: number;
  name: string;
}) => {
  return (
    <div className={className}>
      <PhaseIcon id={id} />
      <span>{name}</span>
    </div>
  );
};

const PhaseLabel = styled(PhaseLabelComponent)<{ id: number }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.grid.sizes[2]};
  svg {
    flex-shrink: 0;
  }
  ${({ id, theme }) => id === 2 && `color:${theme.palette.danger};`}
  ${({ id, theme }) => id === 100 && `color:${theme.palette.success};`}
`;

export const PhaseSelector = ({
  campaign,
}: {
  campaign: { phase: { id: number }; id: number };
}) => {
  const [value, setValue] = useState<string | undefined>(
    campaign.phase.id.toString()
  );
  const { data, isLoading } = useGetPhasesQuery();
  const [updatePhase] = usePutDossiersByCampaignPhasesMutation();

  const options = useMemo(() => {
    if (!data?.results) return [];

    return Object.values(
      data.results.reduce((acc, phase) => {
        const phaseType = phase.type.id;

        if (!acc[phaseType]) {
          acc[phaseType] = { options: [], label: phase.type.name };
        }

        acc[phaseType].options.push({
          value: phase.id.toString(),
          label: <PhaseLabel id={phase.id} name={phase.name} />,
          labelString: phase.name,
        });
        return acc;
      }, {} as { [key: string]: { options: { value: string; label: string | ReactNode; labelString: string }[]; label: string } })
    );
  }, [data?.results]);

  if (isLoading || !data || !data.results) return <Skeleton />;

  return (
    <PhaseDropdownWrapper>
      <Dropdown
        name={`phase-${campaign.id}`}
        id={`phase-${campaign.id}`}
        className="phase-dropdown"
        options={options}
        filterOption={(option, search) =>
          option.data.labelString.toLowerCase().includes(search.toLowerCase())
        }
        value={options.flatMap((g) => g.options).find((o) => o.value === value)}
        onChange={(option) => {
          if (!option) return;
          setValue(option.value);
          updatePhase({
            campaign: campaign.id.toString(),
            body: {
              phase: parseInt(option.value),
            },
          });
        }}
      />
    </PhaseDropdownWrapper>
  );
};
