import Map from "react-map-gl";
import { mapboxAccessToken } from "@/constants/constant";
import GeocoderControl from "../map/geocoder-control";
import "../../styles/map.css";
import { useMapCoordinate } from "@/context/MapCoordinateProvider";

const StoreLocation = () => {
  const { latLng } = useMapCoordinate();
  return (
    <div>
      <p className="text-lg font-bold mb-1">Set store Location</p>
      <div className="  h-96">
        <Map
          initialViewState={{
            longitude: latLng.lng,
            latitude: latLng.lat,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={mapboxAccessToken}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <GeocoderControl
            position="top-left"
            mapboxAccessToken={mapboxAccessToken || ""}
            marker
          />
        </Map>
      </div>
    </div>
  );
};
export default StoreLocation;
