import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../../components/Nav";
import Map from "../../components/Map";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard";
import Rating from "../../components/Rating";
import { addReview, removeCampsite, showCampsite } from "../../state";

type Props = {};

const Show = (props: Props) => {
  const user = useSelector((state:RootState)=> state.authMaterial.user)
  const { id } = useParams();
  const mode = useSelector((state: RootState) => state.authMaterial.mode);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campsite = useSelector((state: any) => state.authMaterial.campsite);
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
  }, []);

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
  const handleReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/campsites/${id}/reviews`,
        {
          rating,
          comment,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((respone) => dispatch(addReview({ review: respone.data.review })));
    setComment("");
    setRating(0);
    window.location.reload();
  };

  return (
    <div
      className={`container-fuild d-flex flex-column bg-${
        mode === "light" ? "light" : "black text-light"
      } h-100`}
    >
      <Nav />
      <div className="container d-flex flex-column-reverse flex-md-row justify-content-md-between my-5 gap-5 ">
        {/* Right */}
        <div className="col-md-6 col-11 pb-3">
          <div className={`card bg-${mode === "light" ? "white" : "dark"}`}>
            <img
              src={campsite?.images?.url}
              className="card-img-top object-fit-cover"
              alt="campsite_img"
              style={{ height: "35vh" }}
            />
            <div className="card-body">
              <h5 className="card-title text-uppercase">{campsite?.title}</h5>
              <p className="card-text text-uppercase">{campsite?.location}</p>
              <p className="card-text">{campsite?.description}</p>
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
                    : "dark text-light-emphasis border-bottom border-secondary"
                }`}
              >
                <b>Submmited by {campsite?.author?.username}</b>
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
        <div className="col-md-6 col-11">
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
          <div>
            <h3 className="mt-3">Reviews</h3>
            <div className={`accordion`}>
              <div className="accordion-item ">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className={`accordion-button  bg-${
                      mode === "light" ? "white" : "dark text-light"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                  >
                    Write a review
                  </button>
                  <i className="bi bi-plus" />
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                  <div
                    className={`accordion-body bg-${
                      mode === "light" ? "white" : "dark text-light"
                    }`}
                  >
                    <form onSubmit={handleReview}>
                      <Rating
                        count={5}
                        value={rating}
                        edit={true}
                        onChange={(value) => setRating(value)}
                        className="d-flex"
                      />
                      <div className="mt-3">
                        <textarea
                          className={`form-control bg-${
                            mode === "light" ? "white" : "dark text-light"
                          }`}
                          id="review"
                          rows={3}
                          placeholder={"Leave a comment here ..."}
                          value={comment}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setComment(e.target.value)
                          }
                        />
                      </div>
                      <button className="btn btn-success mt-3">Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {campsite?.reviews?.map(
            (review: { _id: string; body: string; rating: number }) => (
              <ReviewCard
                key={review?._id}
                review={review}
                author={campsite?.author?.username}
                campsiteId={campsite?._id}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Show;
