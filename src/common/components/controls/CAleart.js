import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CAleart = ({ mess, err }) => {
  React.useEffect(() => {
    notify();
  });
  const notify = () => {
    err
      ? toast.error(mess)
      : toast.success(mess);
  };

  return (
    <div className={`CAleart-container`}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CAleart;
