import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { removeReview } from "../state";
import Rating from "./Rating";

type Props = {
  body: string;
  rating: number;
  _id: string;
};

const ReviewCard = ({
  review,
  author,
  campsiteId,
}: {
  review: Props;
  author: string;
  campsiteId: string;
}) => {
  const { mode, user } = useSelector((state: RootState) => state.authMaterial);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/campsites/${campsiteId}/reviews/${review._id}`,
        {
          withCredentials: true,
        }
      )
      .then(() => dispatch(removeReview({ reviewId: review._id })));
  };

  return (
    <div
      className={`card mt-1 bg-${
        mode === "light" ? "white" : "dark text-light"
      }`}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <Rating value={review?.rating} count={5} className="d-flex" />
          {author === user?.username && (
            <button className="btn btn-danger" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
        <h5 className="card-subtitle  text-uppercase">{author}</h5>
        <p className="card-text">{review?.body}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
