import styled from "styled-components";

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
`;

export const Preview = () => {
  const origin =
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("dev.")
      ? "https://dev.unguess.io"
      : "https://unguess.io";
  return (
    <StyledIframe
      title="preview"
      src={`${origin}/campaigns/4845/preview`}
      data-qa="ux-dashboard-preview"
    />
  );
};
