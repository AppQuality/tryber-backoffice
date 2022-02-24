import { Toastr, BSGrid } from "@appquality/appquality-design-system";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import siteWideMessageStore from "../redux/siteWideMessages";
import styled from "styled-components";

const TIMEOUT = 200;
const ToastrContainer = styled.div`
  position: fixed;
  top: calc(
    56px + ${(props) => props.theme.grid.spacing.default}
  ); // navbar height + default margin
  width: 100%;
  z-index: 99999;
  .toastr-container {
    margin-left: calc(var(--gutter-x) / 2);
    width: calc(100% - var(--gutter-x));
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      width: 920px;
      margin-left: calc((100% - 920px) / 2);
    }
  }
  .fade {
    transition: all ${TIMEOUT}ms;
  }
  .fade-enter {
    opacity: 0;
    &.fade-enter-active {
      opacity: 1;
    }
  }
  .fade-exit {
    opacity: 1;
    &.fade-exit-active {
      opacity: 0;
    }
  }
`;

const SiteWideMessages = () => {
  const { messages, remove } = siteWideMessageStore();

  return (
    <ToastrContainer>
      <BSGrid>
        <TransitionGroup className="toastr-container">
          {messages.map((m) => (
            <CSSTransition timeout={TIMEOUT} classNames="fade">
              <Toastr
                type={m.type}
                className="aq-mb-3 fade"
                onClose={m.expire ? undefined : () => remove({ uuid: m.uuid })}
              >
                {m.message}
              </Toastr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </BSGrid>
    </ToastrContainer>
  );
};

export default SiteWideMessages;
