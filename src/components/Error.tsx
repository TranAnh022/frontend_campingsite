import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../state";
type Props = {};

const Error = (props: Props) => {
  const dispatch = useDispatch();
  const { errorMess } = useSelector((state: any) => state);
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        className="toast"
        style={{ display: "block" }}
        data-autohide="true"
        data-delay="3000"
      >
        <div className="toast-header ">
          <AiFillWarning className="me-2" />
          <strong className="me-auto">Camping Site warning</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => dispatch(setShow())}
          ></button>
        </div>
        <div className="toast-body text-bg-danger">{errorMess}</div>
      </div>
    </div>
  );
};

export default Error;
