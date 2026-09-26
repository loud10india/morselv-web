import React, { createContext, useContext, useState, useEffect } from "react";
import providers from "../../api/providers";
import { DEFAULT_LOCATION } from "../../seo/core.js";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  // Shared with the build-time pre-render, which must sort listings the same way.
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [noservice, setNoservice] = useState(false);

  const isServicable = async (city) => {
    try {
      let res = await providers.getProviderCount({ city });
      if (res.data && res.data.providerCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      try {
        const apiKey = "AIzaSyA2R_zjMWO-_TBxKExBEq1CdSx9Ggm-Ml0";
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );
        const data = await res.json();

        if (data.results.length > 0) {
          const components = data.results[0].address_components;

          const cityObj =
            components.find((c) => c.types.includes("locality")) ||
            components.find((c) =>
              c.types.includes("administrative_area_level_2")
            );

          const stateObj = components.find((c) =>
            c.types.includes("administrative_area_level_1")
          );

          const countryObj = components.find((c) =>
            c.types.includes("country")
          );

          setLocation({
            city: cityObj ? cityObj.long_name : "Unknown",
            state: stateObj ? stateObj.long_name : "Unknown",
            country: countryObj ? countryObj.long_name : "Unknown",
            lat,
            lng,
          });
          let datas = await isServicable(cityObj?.long_name);
          setNoservice(!datas);
        }
      } catch (err) {
        console.error("Location fetch error", err);
      }
    });
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, detectLocation, noservice, setNoservice }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLoc = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
  return ctx;
};
