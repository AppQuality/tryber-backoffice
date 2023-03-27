import { Title } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignPayoutsQuery } from "src/services/tryberApi";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const TIMEOUT = 300;

const Fade = `display: none;
opacity: 0;

&.fade {
  transition: opacity ${TIMEOUT}ms;
}
&.fade-enter {
  display: block;
  &.fade-enter-active {
    opacity: 1;
  }
}
&.fade-enter-done {
  opacity: 1;
  display: block;
}
&.fade-exit {
  display: block;
  &.fade-exit-active {
    opacity: 0;
  }
}
&.fade-exit-done {
  opacity: 0;
  display: none;
}
`;

const EnterFromRight = (size: string) => `
display: none;
right: -${size};

&.enterFromRight {
  transition: all ${TIMEOUT}ms;
}
&.enterFromRight-enter {
  display: block;
  &.enterFromRight-enter-active {
    right: 0;
  }
}
&.enterFromRight-enter-done {
  right: 0;
  display: block;
}
&.enterFromRight-exit {
  display: block;
  &.enterFromRight-exit-active {
    right: -${size};
  }
}
&.enterFromRight-exit-done {
  right: -${size};
  display: none;
}
`;

const InfoDrawerBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  ${Fade}
`;

const InfoDrawerContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: white;
  z-index: 101;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  padding: ${({ theme }) => theme.grid.sizes[2]}
    ${({ theme }) => theme.grid.sizes[3]};

  ${EnterFromRight("400px")}
`;
const InfoDrawerTitle = styled.div``;

const InfoDrawer = ({
  campaign,
  isOpen,
  setIsOpen,
}: {
  campaign: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const { data, isLoading } = useGetCampaignsByCampaignPayoutsQuery({
    campaign,
  });
  return (
    <>
      <CSSTransition timeout={TIMEOUT} in={isOpen} classNames="fade">
        <InfoDrawerBackground
          onClick={() => setIsOpen(false)}
          className="fade"
        />
      </CSSTransition>
      <CSSTransition timeout={TIMEOUT} in={isOpen} classNames="enterFromRight">
        <InfoDrawerContent className="enterFromRight">
          <InfoDrawerTitle>
            <Title size="mt">Campaign Info </Title>
          </InfoDrawerTitle>
          {isLoading || !data ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>Max Bonus Bug: {data.maxBonusBug}</div>
              <div>Success Payout: {data.testSuccess.payout}</div>
              <div>Success Points: {data.testSuccess.points}</div>
              <div>Success Note: {data.testSuccess.message}</div>
              <div>Failure Payout: {data.testFailure.payout}</div>
              <div>Failure Points: {data.testFailure.points}</div>
              <div>Failure Note: {data.testFailure.message}</div>
            </>
          )}
        </InfoDrawerContent>
      </CSSTransition>
    </>
  );
};

export default InfoDrawer;
