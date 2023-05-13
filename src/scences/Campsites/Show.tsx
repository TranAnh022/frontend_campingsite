import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../../components/Nav";
import Map from "../../components/Map";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeCampsite, showCampsite } from "../../state";
import Reviews from "../../components/Reviews";
import { motion } from "framer-motion";

type Props = {};

const Show = (props: Props) => {
  const user = useSelector((state: RootState) => state.authMaterial.user);
  const { id } = useParams();
  const mode = useSelector((state: RootState) => state.authMaterial.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campsite = useSelector((state: any) => state.authMaterial.campsite);
  const review = useSelector((state: any) => state.authMaterial.reviews);

  const getCampsite = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/campsites/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responsed = await response.json();
    dispatch(showCampsite({ campsite: responsed }));
  };

  useEffect(() => {
    getCampsite();
  }, [review]);

  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios
        .delete(`${process.env.REACT_APP_BASE_URL}/campsites/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => dispatch(removeCampsite({ campsite })));
      navigate("/");
    } catch (error) {}
  };

  return (
    <div
      className={`container-fuild d-flex flex-column bg-${
        mode === "light" ? "light" : "black text-light"
      }`}
    >
      <Nav />
      <div className="container d-flex flex-column justify-content-md-between my-5 gap-5">
        {/* Right */}
        <div className="col-12  pb-3">
          <div className={`card bg-${mode === "light" ? "white" : "dark"}`}>
            <img
              src={campsite?.images?.url}
              className="card-img-top object-fit-cover"
              alt="campsite_img"
              style={{ height: "40vh" }}
            />
            <div className="card-body">
              <h5 className="card-title text-uppercase"> {campsite?.title}</h5>
              <hr />
              <p className="card-text text-uppercase">{campsite?.location}</p>
              <hr />
              <div className="d-flex flex-column">
                <p className="card-text fw-medium">About </p>
                <p className="card-text">{campsite?.description}</p>
              </div>
            </div>
            <ul
              className={`list-group list-group-flush bg-${
                mode === "light" ? "white" : ""
              }  `}
            >
              <li
                className={`list-group-item bg-${
                  mode === "light"
                    ? "white"
                    : "dark text-light-emphasis border-top border-secondary "
                }`}
              >
                ${campsite?.price}/night
              </li>
              <li
                className={`list-group-item bg-${
                  mode === "light"
                    ? "white"
                    : "dark text-light border-bottom border-secondary"
                }`}
              >
                <b>Posted by {campsite?.author?.username}</b>
              </li>
            </ul>
            {user?.id === campsite?.author?.id && (
              <div className="card-body d-flex gap-2">
                <a
                  href={`/campsites/${campsite?._id}/edit`}
                  className="card-link btn btn-info"
                >
                  Edit
                </a>
                <form onSubmit={handleDelete}>
                  <button className="card-link btn btn-danger">Delete</button>
                </form>
              </div>
            )}
          </div>
        </div>
        {/* Left */}
        <motion.div
          className="d-flex gap-3 mb-5 flex-column flex-md-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="col-md-6 col-12">
            <div className="card">
              {id === campsite?._id && (
                <Map
                  coordinates={{
                    longitude: campsite?.geometry?.coordinates[0],
                    latitude: campsite?.geometry?.coordinates[1],
                  }}
                  title={campsite?.title}
                  location={campsite?.location}
                  mode={mode}
                />
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <Reviews />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Show;
