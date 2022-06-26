import { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../context/ModalContext";

const Modal = () => {
  let { modalContent, modal } = useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
          modalContent,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;