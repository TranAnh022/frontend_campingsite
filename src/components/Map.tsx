import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  coordinates: {
    longitude: number;
    latitude: number;
  };
  title: string;
  location: string;
  mode: string;
};

export default function Map({ coordinates, title, location, mode }: Props) {
  const [showPopup, setShowPopup] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  },)


  return (
    <ReactMapGL
      initialViewState={{
        longitude: coordinates?.longitude,
        latitude: coordinates?.latitude,
        zoom: 9,
      }}
      style={{
        height: "500px",
        width: "100wv",
        borderRadius: "calc(0.375rem - 1px)",
      }}
      mapStyle={`${
        mode === "light"
          ? "mapbox://styles/mapbox/streets-v9"
          : "mapbox://styles/mapbox/dark-v9"
      }`}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <NavigationControl />
      <Marker
        {...coordinates}
        anchor="bottom"
        onClick={() => setShowPopup(true)}
      />
      {showPopup && (
        <Popup {...coordinates} onClose={() => setShowPopup(false)}>
          <div className={`${mode === "dark" && "text-dark"}`}>
            <h5 className="text-uppercase">{title}</h5>
            <p>{location}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}
