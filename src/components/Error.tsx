import React from "react";

type Props = {
  error: string;
  setShowAlert: (value: boolean) => void;
};

const Error = (props: Props) => {
  return (
    <div className="row mb-3">
      <div
        className="alert alert-danger alert-dismissible fade show w-100"
        role="alert"
      >
        {props.error}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => props.setShowAlert(false)}
        ></button>
      </div>
    </div>
  );
};

export default Error;
