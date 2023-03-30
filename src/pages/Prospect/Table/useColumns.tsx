import { aqBootstrapTheme, icons } from "@appquality/appquality-design-system";
import { useState } from "react";
import styled from "styled-components";
import { Column } from "../EdiTable/types";
import { Row } from "../types";
import { bugRenderer, euroRenderer, pointsRenderer } from "./cellRenderer";
import OpenableColumnButton from "./OpenableColumnButton";

const { TrophyFill } = icons;

const ColoredCell = styled.div<{
  color: keyof (typeof aqBootstrapTheme)["colors"];
}>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  height: 100%;
  display: grid;
  align-items: center;
`;

const useColumns = ({ isDone }: { isDone: boolean }) => {
  const [expanded, setExpanded] = useState({
    usecases: false,
    bugs: false,
    payout: false,
    experience: false,
  });
  const columns: Column<Row>[] = [
    {
      name: "TID",
      key: "testerId",
      type: "uneditable",
    },
    { name: "Name", key: "tester", width: 150, type: "uneditable" },
    {
      name: "★",
      key: "isTopTester",
      type: "star",
      children: (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            display: "grid",
          }}
        >
          <TrophyFill />
        </div>
      ),
      width: 25,
    },
    {
      name: "Result",
      key: "completed",
      type: isDone ? "uneditable" : "select",
      width: 100,
      values: ["Payable", "No"],
      children: (
        <OpenableColumnButton
          isOpen={expanded.usecases}
          onClick={() =>
            setExpanded({
              ...expanded,
              usecases: !expanded.usecases,
            })
          }
        >
          Result
        </OpenableColumnButton>
      ),
    },
    ...(expanded.usecases
      ? [
          {
            name: "Done",
            key: "useCaseCompleted" as const,
            type: "uneditable" as const,
          },
          {
            name: "Required",
            key: "useCaseTotal" as const,
            type: "uneditable" as const,
          },
        ]
      : []),
    {
      name: "Found Bugs",
      key: "totalBugs",
      width: 110,
      type: "uneditable",
      renderer: bugRenderer,
      children: (
        <ColoredCell color="orange200">
          <OpenableColumnButton
            isOpen={expanded.bugs}
            onClick={() =>
              setExpanded({
                ...expanded,
                bugs: !expanded.bugs,
              })
            }
          >
            Found Bugs
          </OpenableColumnButton>
        </ColoredCell>
      ),
    },
    ...(expanded.bugs
      ? [
          {
            name: "Low",
            key: "lowBugs" as const,
            width: 65,
            type: "uneditable" as const,
            children: <ColoredCell color="orange100">Low</ColoredCell>,
          },
          {
            name: "Medium",
            key: "mediumBugs" as const,
            width: 65,
            type: "uneditable" as const,
            children: <ColoredCell color="orange100">Medium</ColoredCell>,
          },
          {
            name: "High",
            key: "highBugs" as const,
            width: 65,
            type: "uneditable" as const,
            children: <ColoredCell color="orange100">High</ColoredCell>,
          },
          {
            name: "Critical",
            key: "criticalBugs" as const,
            width: 65,
            type: "uneditable" as const,
            children: <ColoredCell color="orange100">Critical</ColoredCell>,
          },
        ]
      : []),
    {
      name: "Total Pay",
      key: "totalPayout",
      width: 110,
      type: "uneditable",
      renderer: euroRenderer,
      children: (
        <ColoredCell color="green200">
          <OpenableColumnButton
            isOpen={expanded.payout}
            onClick={() =>
              setExpanded({
                ...expanded,
                payout: !expanded.payout,
              })
            }
          >
            Paga Totale
          </OpenableColumnButton>
        </ColoredCell>
      ),
    },
    ...(expanded.payout
      ? [
          {
            name: "Test",
            type: isDone ? ("uneditable" as const) : ("number" as const),
            key: "completionPayout" as const,
            renderer: euroRenderer,
            children: <ColoredCell color="green100">Test</ColoredCell>,
          },
          {
            name: "Bonus Bug",
            type: isDone ? ("uneditable" as const) : ("number" as const),
            width: 90,
            key: "bugPayout" as const,
            renderer: euroRenderer,
            children: <ColoredCell color="green100">Bonus Bug</ColoredCell>,
          },
          {
            name: "Refund",
            type: isDone ? ("uneditable" as const) : ("number" as const),
            key: "refundPayout" as const,
            renderer: euroRenderer,
            children: <ColoredCell color="green100">Refund</ColoredCell>,
          },
          {
            name: "Extra",
            type: isDone ? ("uneditable" as const) : ("number" as const),
            key: "extraPayout" as const,
            renderer: euroRenderer,
            children: <ColoredCell color="green100">Extra</ColoredCell>,
          },
        ]
      : []),
    {
      name: "Total XP",
      key: "totalExperience",
      type: "uneditable",
      width: 90,
      renderer: pointsRenderer,
      children: (
        <ColoredCell color="blue200">
          <OpenableColumnButton
            isOpen={expanded.experience}
            onClick={() =>
              setExpanded({
                ...expanded,
                experience: !expanded.experience,
              })
            }
          >
            Total XP
          </OpenableColumnButton>
        </ColoredCell>
      ),
    },
    ...(expanded.experience
      ? [
          {
            name: "Base XP",
            width: 90,
            type: isDone ? ("uneditable" as const) : ("number" as const),
            renderer: pointsRenderer,
            key: "completionExperience" as const,
            children: <ColoredCell color="blue100">XP Base</ColoredCell>,
          },
          {
            name: "Extra XP",
            width: 90,
            renderer: pointsRenderer,
            type: isDone ? ("uneditable" as const) : ("number" as const),
            key: "extraExperience" as const,
            children: <ColoredCell color="blue100">Extra</ColoredCell>,
          },
        ]
      : []),
    {
      name: "Note",
      type: isDone ? "uneditable" : "text",
      key: "notes",
      width: 200,
    },
    { name: "Status", key: "status", type: "uneditable" },
  ];

  return {
    columns,
  };
};

export default useColumns;
