import ReactDOM from "react-dom";
import styled from "styled-components";
import Backdrop from "./Backdrop/Backdrop";

const WrapperModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? "translate(-50%, -50%)" : "translate(-50%, -150%)"};
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  justify-content: center;
  opacity: ${({ opened }) => (opened ? "1" : "0")};
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  box-shadow: 0 0.5rem 3.5rem var(--shadow);
  border-radius: 1rem;
  background-color: var(--color-main);
  transition: all 0.1s;
`;

const InsideWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 3rem;
`;

const Modal = ({ opened, close, children }) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop opened={opened} close={close} />
      <WrapperModal opened={opened}>
        <InsideWrapper>{children}</InsideWrapper>
      </WrapperModal>
    </>,
    document.getElementById("root-modal")
  );
};

export default Modal;
