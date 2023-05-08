import styled from "styled-components";
import { ReactComponent as ClosedComponent } from "./assets/closed.svg";
import { ReactComponent as IncomingComponent } from "./assets/incoming.svg";
import { ReactComponent as RunningComponent } from "./assets/running.svg";

const Running = styled(RunningComponent)`
    font-size: 16px;
    width: 16px;
  color: ${({ theme }) => theme.palette.warning}};
`;
const Incoming = styled(IncomingComponent)`
  font-size: 16px;
  width: 16px;
  color: ${({ theme }) => theme.palette.info}};
`;
const Closed = styled(ClosedComponent)`
  font-size: 16px;
  width: 16px;
  color: ${({ theme }) => theme.palette.success}};
`;

const StatusIcon = ({
  status,
  start,
}: {
  status: "running" | "closed";
  start: string;
}) => {
  if (status === "running") {
    if (new Date(start) > new Date()) return <Incoming />;
    return <Running />;
  }
  if (status === "closed") return <Closed />;
  return null;
};

StatusIcon.text = (status: "running" | "closed", start: string) => {
  if (status === "running") {
    if (new Date(start) > new Date()) return "Incoming";
    return "Running";
  }
  if (status === "closed") return "Closed";
  return "";
};

export default StatusIcon;
