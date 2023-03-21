import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Nav from "../../components/Nav";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import schema from "../../validationForm";
import { setError, setShow } from "../../state";

type Props = {};

const Create = (props: Props) => {
  const { mode } = useSelector((state: any) => state);
  const [img, setImg] = useState<null | File>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [camp, setCamp] = useState({
    title: "",
    location: "",
    price: 0,
    description: "",
  });
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) navigate("/");
  }, [mode]);

  //Handle Iput
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCamp((prevCampground) => ({ ...prevCampground, [name]: value }));
  };

  //Handle Image

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    setImg(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target === null) return;
        setImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
    setCamp((prevCampground) => ({
      ...prevCampground,
      image: selectedImage,
    }));
  };

  //Handle submit
  const createCamp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", camp.title);
    formData.append("location", camp.location);
    formData.append("price", String(camp.price));
    formData.append("description", camp.description);
    formData.append("image", img as File);

    schema
      .validate(Object.fromEntries(formData))
      .then(async (validate: FormInput) => {
        try {
          axios
            .post(`${process.env.REACT_APP_BASE_URL}/campsites`, validate, {
              withCredentials: true, // Send cookies with request
              headers: {
                "Content-Type": "multipart/form-data", // Set appropriate headers
              },
            })
            .then(() => {
              setCamp({
                title: "",
                location: "",
                price: 0,
                description: "",
              });
              navigate("/");
            });
        } catch (error) {
          dispatch(setShow());
          dispatch(
            setError({ errorMess: "There is an error. Please try again !!!" })
          );
        }
      })
      .catch((err) => {
        dispatch(setShow());
        dispatch(setError({ errorMess: err.message }));
      });
  };
  return (
    <div
      className={`container-fuild d-flex flex-column bg-${
        mode === "light" ? "light" : "black text-light"
      } `}
      style={{ height: "100vh" }}
    >
      <Nav />
      <div
        className={`row justify-content-center h-full bg-${
          mode === "light" ? "light" : "black text-light"
        }`}
      >
        <div
          className={`card bg-${
            mode === "light" ? "white" : "dark"
          } col-md-5 my-5 px-5`}
        >
          <h1 className="text-center my-3">New Camping Site</h1>
          {/* FORM  */}
          <form
            onSubmit={createCamp}
            noValidate
            className="validation_form col-md-8 offset-2"
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                value={camp.title}
                onChange={handleInputChange}
                required
              />
              <div className="invalid-feedback">Please provide a title</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <input
                className="form-control"
                type="text"
                id="location"
                name="location"
                value={camp.location}
                onChange={handleInputChange}
                required
              />
              <div className="invalid-feedback">Please provide a location.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Upload Images
              </label>
              <input
                className="form-control"
                accept=".jpg,.jpeg,.png"
                type="file"
                id="formFileMultiple"
                name="image"
                onChange={handleImageChange}
              />
              {imageUrl && (
                <div className="my-3 d-flex justify-content-center align-items-center">
                  <img
                    src={imageUrl}
                    alt="Selected"
                    className="img-thumbnail"
                    style={{ width: "10vw", height: "10vh" }}
                  />
                  <AiOutlineDelete
                    type="button"
                    className="text-center"
                    onClick={(e) => {
                      setImageUrl(null);
                      setImg(null);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="price">
                Campground Price
              </label>
              <div className="input-group">
                <span className="input-group-text" id="price-label">
                  $
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="0.00"
                  aria-label="price"
                  aria-describedby="price-label"
                  name="price"
                  value={camp.price}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={camp.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="my-4">
              <button className="btn btn-success">Add Campground</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
