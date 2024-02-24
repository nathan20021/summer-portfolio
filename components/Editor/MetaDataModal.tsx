import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <div className="absolute top-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-70">
          <div className="w-[80%] h-[90%] bg-primary">
            <div>Content here This is a modal</div>
            <button onClick={onClose}>YOO</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
