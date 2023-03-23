import React from "react";
import { Toast } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import { CiMountain1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../state";
type Props = {};

const Error = (props: Props) => {
  const dispatch = useDispatch();
  const { errorMess, status, showAlert } = useSelector((state: any) => state);
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <Toast className="toast fade" autohide delay={3000} show={showAlert}>
        <div className="toast-header ">
          {status === "danger" ? (
            <AiFillWarning className="me-2" />
          ) : (
            <CiMountain1 className="me-2" />
          )}

          <strong className="me-auto">Camping Site</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => dispatch(setShow({ value: false }))}
          ></button>
        </div>
        <div className={`toast-body text-bg-${status}`}>{errorMess}</div>
      </Toast>
    </div>
  );
};

export default Error;
