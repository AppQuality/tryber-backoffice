import { styled } from "styled-components";
import { useFormikContext } from "formik";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FormOverlay = () => {
  const { isSubmitting, isValid } = useFormikContext();

  if (!isSubmitting || !isValid) return null;

  return (
    <Overlay>
      Saving campaign in progress
      <br />
      It may take a few seconds...
      <br />
    </Overlay>
  );
};

export default FormOverlay;
