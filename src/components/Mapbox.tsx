import { useRef, useState } from "react";
import {
  Map,
  Source,
  Layer,
  MapLayerMouseEvent,
  NavigationControl,
  MapboxGeoJSONFeature,
  LayerProps,
  Marker,
  Popup,
} from "react-map-gl";
import type { MapRef, GeoJSONSource } from "react-map-gl";
import { useSelector } from "react-redux";

const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "campsites",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "campsites",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "campsites",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

type Feature = MapboxGeoJSONFeature & {
  properties?: {
    cluster_id: number;
  };
  geometry: {
    coordinates: [number, number];
  };
};

export default function ClusterMap({ campsites }: { campsites: any }) {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const campsitesInfo = useSelector((state: any) => state.campsites);
  const mode = useSelector((state: any) => state.mode);

  const onClick = (e: MapLayerMouseEvent) => {
    if (!e.features) return;
    const feature = e?.features[0] as Feature;
    if (!feature?.properties) return;
    const clusterId = feature.properties.cluster_id;
    if (!mapRef.current) return;
    const mapboxSource = mapRef.current.getSource("campsites") as GeoJSONSource;
    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !mapRef.current) return;

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: 40.67,
        longitude: -103.59,
        zoom: 1,
      }}
      mapStyle={`${
        mode === "light"
          ? "mapbox://styles/mapbox/light-v9"
          : "mapbox://styles/mapbox/dark-v9"
      }`}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      interactiveLayerIds={[clusterLayer.id as unknown as string]}
      onClick={onClick}
      ref={mapRef}
      style={{
        height: "min(50vh, 400px)",
        width: "100%",
        marginBottom: "1rem",
        borderRadius: "calc(0.375rem - 1px)",
      }}
    >
      <NavigationControl />
      <Source
        id="campsites"
        type="geojson"
        data={campsites}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
      {campsitesInfo?.map((campsite: any, index: number) => (
        <Marker
          key={`marker-${index}`}
          longitude={campsite.geometry.coordinates[0]}
          latitude={campsite.geometry.coordinates[1]}
          style={{ opacity: "0", width: "2px", height: "2px", border: "50%" }}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(campsite);
          }}
        ></Marker>
      ))}
      {popupInfo && (
        <Popup
          longitude={Number(popupInfo.geometry.coordinates[0])}
          latitude={Number(popupInfo.geometry.coordinates[1])}
          onClose={() => setPopupInfo(null)}
        >
          <div
            className={`d-flex flex-column justify-content-center align-items-center`}
          >
            <a href={`/campsites/${popupInfo._id}`} className="h6 link-primary">
              {popupInfo.title}
            </a>
            <img className="w-100" src={popupInfo.images.url} alt="map" />
          </div>
        </Popup>
      )}
    </Map>
  );
}
