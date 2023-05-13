import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//import Mapbox from "../../components/Mapbox";

import Nav from "../../components/Nav";
import { setCampsites } from "../../state";
import CampsiteCard from "../../components/CampsiteCard";
import Mapbox from "../../components/Mapbox";
import Thumbnail from "../../components/Thumbnail";
type Props = {};

const Campsite = (props: Props) => {
  const { campsites, mode } = useSelector(
    (state: RootState) => state.authMaterial
  );
  const dispatch = useDispatch();

  const getCamsites = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/campsites`,
      {
        credentials: "include",
        method: "GET",
      }
    );
    const data = await response.json();
    dispatch(setCampsites({ campsites: data }));
  };
  useEffect(() => {
    getCamsites();
  }, [mode]);

  return (
    <div
      className={`container-fuild d-flex flex-column bg-${
        mode === "light" ? "light" : "black text-light"
      }`}
    >
      <Nav />

      <Thumbnail />
      <div
        className="container d-flex flex-column align-items-center mt-3"
        id="main"
      >
        <h1 className="text-center">Explore the Camping Site</h1>
        <Mapbox
          campsites={{
            features: campsites.map(({ geometry }: { geometry: any }) => ({
              type: "Feature",
              geometry,
            })),
          }}
        />

        <div className="row justify-content-center gap-md-5 ">
          {campsites.map((props: CampsiteType) => (
            <CampsiteCard {...props} key={props._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campsite;
