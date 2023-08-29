import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
`;

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const origin =
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("dev.")
      ? "https://unguess.tryber.me"
      : "https://unguess.tryber.me";
  return (
    <StyledIframe
      title="preview"
      src={`${origin}/campaigns/${id}/preview`}
      data-qa="ux-dashboard-preview"
    />
  );
};

export default Preview;
