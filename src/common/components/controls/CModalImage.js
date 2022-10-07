import React from "react";
import ModalImage from "react-modal-image";

const CModalImage = ({ image }) => {
  return (
    <ModalImage
      small={image}
      large={image}
      alt=""
      showRotate={true}
    />
  );
};

export default CModalImage;
