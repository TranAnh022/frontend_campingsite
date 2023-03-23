import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import { setError, setShow } from "../../state";

type Props = {};

const Password = (props: Props) => {
  const { mode, user } = useSelector((state: any) => state);
  const [email, setEmail] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const dispatch = useDispatch();
  const [codeResponse, setCodeResponse] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  },[]);
  const handleSendEmail = async (e: any) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/password`,
        { email },
        {
          withCredentials: true,
        }
      )
      .then(async (response) => {
        setCodeResponse(response.data.code);
      })
      .catch((error) => {
        dispatch(setShow({ value: true }));
        dispatch(setError({ errorMess: error.message, status: "danger" }));
      });
  };
  const handleCode = (e: any) => {
    e.preventDefault();
    if (codeInput === codeResponse) {
      setShowForm(true);
    } else {
      dispatch(setShow({ value: true }));
      dispatch(
        setError({
          errorMess:
            "Incorrect reset code. Please check the code and try again.",
          status: "danger",
        })
      );
    }
  };
  const handleReset = async (e: any) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/password/reset`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate("/login")
        dispatch(setShow({ value: true }));
        dispatch(
          setError({ errorMess: response.data.message, status: "success" })
        );
      })

      .catch((error) => {
        dispatch(setShow({ value: true }));
        dispatch(setError({ errorMess: error.message, status: "danger" }));
      });
  };
  return (
    <div
      className={`container-fuild d-flex flex-column bg-${
        mode === "light" ? "light" : "black text-light"
      } h-100`}
    >
      <Nav />
      <div className="container d-flex h-100 justify-content-center align-items-center flex-column">
        {!showForm ? (
          <div className="d-flex flex-column gap-3">
            <div className="fw-bold fs-2">Forgot your password ?</div>
            {!codeResponse ? (
              <form className="row g-3">
                <input
                  placeholder="Your email"
                  className="p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                <div className="btn btn-info p-3" onClick={handleSendEmail}>
                  send to reset the password
                </div>
              </form>
            ) : (
              <form className="row g-3">
                <input
                  placeholder="Enter reset code"
                  className="p-3"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  type="string"
                />
                <div className="btn btn-info p-3" onClick={handleCode}>
                  send to verify
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            <div className="fw-bold fs-2">New Password Form</div>
            <form className="row g-3">
              <input
                placeholder="Enter your new password"
                className="p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <div className="btn btn-info p-3" onClick={handleReset}>
                send to reset
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Password;
