import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setError, setShow } from "../state/error";
import axios from "axios";
import { addReview } from "../state";
import Rating from "./Rating";
import ReviewCard from "./ReviewCard";

type Props = {};

const Reviews = (props: Props) => {
  const user = useSelector((state: RootState) => state.authMaterial.user);
  const campsite = useSelector((state: any) => state.authMaterial.campsite);
  const { id } = useParams();
  const mode = useSelector((state: RootState) => state.authMaterial.mode);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!user) {
      dispatch(
        setError({
          errorMess: "Login to leave a comment",
          status: "danger",
        })
      );
      dispatch(setShow({ value: true }));
      return;
    }
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
    //window.location.reload();
  };
  return (
    <div>
      <h3 className="">Reviews</h3>
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
  );
};

export default Reviews;
