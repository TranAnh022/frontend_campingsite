import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import schema from "../../validationForm";
import { setError, setShow } from "../../state";

type Props = {};

const Edit = (props: Props) => {
  useEffect(() => {
    if (!user) navigate("/");
    getCampsite();
  }, []);

  const { id } = useParams();
  const { mode } = useSelector((state: any) => state);
  const [image, setImage] = useState<File | null>(null);
  const [imageFetch, setImageFetch] = useState({
    url: "",
    fileName: "",
  });

  const [camp, setCamp] = useState({
    title: "",
    location: "",
    price: 0,
    description: "",
    _id: "",
  });
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    setCamp(responsed);
    setImageFetch(responsed?.images);
  };

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
    const random = Math.floor(Math.random() * 1000);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target === null) return;
        setImageFetch({
          url: event.target.result as string,
          fileName: `campsites/${random}`,
        });
      };
      reader.readAsDataURL(selectedImage);
      setImage(selectedImage);
    }
    setCamp((prevCampground) => ({
      ...prevCampground,
      image: selectedImage,
    }));
  };

  const updateCamp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", camp.title);
    formData.append("location", camp.location);
    formData.append("price", String(camp.price));
    formData.append("description", camp.description);
    formData.append("image", image as File);
    if (imageFetch?.fileName) formData.append("imageUrl", imageFetch?.fileName);
    schema
      .validate(Object.fromEntries(formData))
      .then(async (validate) => {
        try {
          await axios
            .put(
              `${process.env.REACT_APP_BASE_URL}/campsites/${id}`,
              validate,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data", // Set appropriate headers
                },
              }
            )
            .then(() => {
              navigate("/");
            });
        } catch (error: any) {
          dispatch(setShow());
          dispatch(setError({ errorMess: error.message }));
        }
      })
      .catch((err) => {
        dispatch(setShow());
        dispatch(setError({ errorMess: err.message }));
      });
  };
  return (
    <div className={`container-fuild d-flex flex-column `}>
      <Nav />
      <div
        className={`row justify-content-center bg-${
          mode === "light" ? "light" : "black text-light"
        }`}
      >
        <div
          className={`card bg-${
            mode === "light" ? "white" : "dark"
          } col-md-5 my-5 px-5 `}
        >
          <h1 className="text-center my-3">Edit Camping Site</h1>
          {/* FORM  */}
          <form
            onSubmit={updateCamp}
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
              {imageFetch?.url ? (
                <div className="my-3 d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-10">
                      <img
                        src={imageFetch?.url}
                        alt="Selected"
                        className="img-thumbnail"
                        style={{ width: "auto", height: "20vh" }}
                      />
                    </div>
                    <div className="col-2">
                      <AiOutlineDelete
                        type="button"
                        className="text-center"
                        onClick={(e) => {
                          setImageFetch({
                            url: "",
                            fileName: "",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <input
                  className="form-control"
                  accept=".jpg,.jpeg,.png"
                  type="file"
                  id="formFileMultiple"
                  name="image"
                  onChange={handleImageChange}
                />
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
                  min={0}
                  value={camp.price}
                  onChange={handleInputChange}
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
              <button className="btn btn-info">Update Campground</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
