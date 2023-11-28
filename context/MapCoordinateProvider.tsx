"use client";

import { createContext, useContext, useState } from "react";
type LatLng = {
  lat: number;
  lng: number;
};
type MapCoordinateContextType = {
  latLng: LatLng;
  setCoordinate: (latLng: LatLng) => void;
};

const MapCoordinateContext = createContext<
  MapCoordinateContextType | undefined
>({
  latLng: {
    lng: 85.320582,
    lat: 27.708317,
  },
  setCoordinate: () => {},
});

export function MapCoordinateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [latLng, setLatLng] = useState<LatLng>({
    lng: 85.320582,
    lat: 27.708317,
  });

  const setCoordinate = (latLng: LatLng) => {
    setLatLng(latLng);
  };
  return (
    <MapCoordinateContext.Provider value={{ latLng, setCoordinate }}>
      {children}
    </MapCoordinateContext.Provider>
  );
}

export const useMapCoordinate = () => {
  const context = useContext(MapCoordinateContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
