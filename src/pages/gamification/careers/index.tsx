import { Button, Title } from "@appquality/appquality-design-system";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useContainerDimensions } from "src/hooks/useContainerDimensions";
import { useGetCampaignsByCampaignQuery } from "src/services/tryberApi";
import styled from "styled-components";
import { PageTemplate } from "src/features/PageTemplate";
import CareersTable from "src/pages/gamification/careers/CareersTable";
const bugHuntingData = [
  {
    id: 1,
    rank: "Newbie",
    area: "BH",
    completedCp: 1,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 0,
    uploadedBugsCritical: 0,
    courses: [],
  },
  {
    id: 2,
    rank: "Rookie",
    area: "BH",
    completedCp: 1,
    uploadedBugs: 2,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 0,
    uploadedBugsCritical: 0,
    courses: [{ id: 5, name: "Basic course of Bug Finding" }],
  }, //corso base bh
  {
    id: 3,
    rank: "Advanced",
    area: "BH",
    completedCp: 5,
    uploadedBugs: 10,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 5,
    uploadedBugsCritical: 0,
    courses: [],
  },
  {
    id: 4,
    rank: "Veteran",
    area: "BH",
    completedCp: 10,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 10,
    uploadedBugsCritical: 0,
    courses: [
      { id: 9, name: "Basic course on useful Tools for the Campaigns" },
    ],
  }, //corso strumenti
  {
    id: 5,
    rank: "Expert",
    area: "BH",
    completedCp: 30,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 20,
    uploadedBugsCritical: 5,
    courses: [],
  },
  {
    id: 6,
    rank: "Champion",
    area: "BH",
    completedCp: 50,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 50,
    uploadedBugsCritical: 10,
    courses: [],
  },
];
const uxData = [
  {
    id: 1,
    rank: "Newbie",
    area: "UX",
    completedCp: 1,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 0,
    uploadedBugsCritical: 0,
    courses: [],
  },
  {
    id: 2,
    rank: "Rookie",
    area: "UX",
    completedCp: 1,
    uploadedBugs: 2,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 0,
    uploadedBugsCritical: 0,
    courses: [{ id: 5, name: "Basic course of Bug Finding" }],
  }, //corso base bh
  {
    id: 3,
    rank: "Advanced",
    area: "UX",
    completedCp: 5,
    uploadedBugs: 10,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 5,
    uploadedBugsCritical: 0,
    courses: [],
  },
  {
    id: 4,
    rank: "Veteran",
    area: "UX",
    completedCp: 10,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 10,
    uploadedBugsCritical: 0,
    courses: [
      { id: 9, name: "Basic course on useful Tools for the Campaigns" },
    ],
  }, //corso strumenti
  {
    id: 5,
    rank: "Expert",
    area: "UX",
    completedCp: 30,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 20,
    uploadedBugsCritical: 5,
    courses: [],
  },
  {
    id: 6,
    rank: "Champion",
    area: "UX",
    completedCp: 50,
    uploadedBugs: 0,
    uploadedBugsLow: 0,
    uploadedBugsMedium: 0,
    uploadedBugsHigh: 50,
    uploadedBugsCritical: 10,
    courses: [],
  },
];

const FluidContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="sm" type="link-hover" />;
};

const CareersPage = () => {
  return (
    <PageTemplate>
      <FluidContainer>
        <Title size="xl">Gamification</Title>
        <Title size="l">Careers Definitions</Title>
        <HeaderButton as="a" href={`/wp-admin/admin.php`} className="aq-mr-2">
          return to backoffice
        </HeaderButton>
        <Title size="mt" className="aq-mb-3" style={{ display: "flex" }}>
          Bug Hunter
        </Title>
        <CareersTable data={bugHuntingData} />
        <Title size="mt" className="aq-mb-3" style={{ display: "flex" }}>
          User experience expert
        </Title>
        <CareersTable data={uxData} />
      </FluidContainer>
    </PageTemplate>
  );
};

export default CareersPage;
