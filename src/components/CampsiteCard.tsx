import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const CampsiteCard = (props: CampsiteType) => {
  const { _id, title, images, location, description } = props;
  const { mode } = useSelector((state: any) => state);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      className={`card mb-3 bg-${
        mode === "light" ? "white" : "dark"
      } col-md-5 col-11 `}
    >
      <img
        src={images === undefined ? "" : images?.url}
        alt={`${title} campsite`}
        style={{
          width: "100%",
          objectFit: "cover",
          aspectRatio: "5/2",
        }}
        className="card-img-top mt-3"
      />
      <div className="card-body ">
        <div className="card-title">{title}</div>
        <p className={`${mode === "dark" ? "" : "text-muted"}`}>{location}</p>
        <div className="card-text mb-3">
          {description.length>125 ? description.slice(0, 125)+"..." : description}
          </div>
        <a className="btn btn-primary mb-3" href={`/campsites/${_id}`}>
          View {title}
        </a>
      </div>
    </motion.div>
  );
};

export default CampsiteCard;
