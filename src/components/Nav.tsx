import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setModeLightDark } from "../state";
import { setError, setShow } from "../state/error";
type Props = {};

const Nav = (props: Props) => {
  const { mode, user } = useSelector((state: RootState) => state.authMaterial);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleLightDark = () => {
    dispatch(setModeLightDark());
  };

  const handleCreate = () => {
    if (!user) {
      dispatch(setShow({ value: true }));
      dispatch(
        setError({ errorMess: "You have to login first !!!", status: "danger" })
      );
    } else {
      navigate("/campsites/create");
    }
  };

  return (
    <div
      className={`container-fluid bg-${mode === "light" ? "white" : "dark"} `}
      data-bs-theme={`${mode}`}
    >
      <nav className={`navbar navbar-expand-sm p-3`}>
        <a className={`navbar-brand text-weight-bold fs-3`} href="#">
          Camping Site
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="example-collapse-text"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isOpen ? "show " : "flex-xl-row justify-content-sm-between"
          } `}
          id="navbarNav"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link fs-6 active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-6" onClick={handleCreate}>
                Create Campsite
              </a>
            </li>
          </ul>

          {user ? (
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <b className="nav-link">{user.username}</b>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fs-6"
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
              <li>
                {mode === "light" ? (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdDarkMode />
                  </button>
                ) : (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdLightMode className="text-light" />
                  </button>
                )}
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav text-center gap-3">
              <li>
                {mode === "light" ? (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdDarkMode />
                  </button>
                ) : (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdLightMode className="text-light" />
                  </button>
                )}
              </li>
              <li className="nav-item ">
                <a className="nav-link fs-6" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fs-6 btn btn-primary text-light"
                  href="/register"
                >
                  Sign up
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
