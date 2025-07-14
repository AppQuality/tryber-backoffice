import { styled } from "styled-components";

const Light = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: #999;
  transition: background-color 0.6s ease, box-shadow 0.6s ease;

  &.red {
    background-color: #e53935;
  }
  &.yellow {
    background-color: #fdd835;
  }
  &.green {
    background-color: #43a047;
  }
`;

export const Stoplight = ({
  activeColor,
}: {
  activeColor: "green" | "yellow" | "red" | "grey";
}) => {
  return <Light className={`${activeColor}`} />;
};
