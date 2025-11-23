import React, { useState, useRef, useEffect } from "react";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useLoc } from "../context/LocationContext";
import providers from "../../api/providers";
import { useNavigate } from "react-router-dom";

// Popular services
const popularSearches = [
  "Salon Services",
  "Therapy",
  "Yoga",
  "Nutrition",
  "Coaching",
  "Fitness Training",
  "Ayurveda",
  "Mental Wellness",
];

// Popular localities
const popularLocalities = ["Delhi", "Gurgaon", "Noida"];

function SearchBar() {
  const { location, setLocation, detectLocation } = useLoc();
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchOptions, setSearchOptions] = useState({
    providers: [],
    deals: [],
    subCategory: [],
  });

  // Location handling
  const [searchLoc, setSearchLoc] = useState("Select Location");
  const [finalLoc, setFinalLoc] = useState("Select Location"); // confirmed location
  const [showLocDropdown, setShowLocDropdown] = useState(false);
  const naviagte = useNavigate();
  const containerRef = useRef(null);

  const toSlug = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Handle service search typing
  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    providers.getSearchResult({ query: input, ...location }).then((res) => {
      setSearchOptions(res.data);
    });

    if (input.length > 0) {
      const matches = popularSearches.filter((service) =>
        service.toLowerCase().includes(input.toLowerCase())
      );
      setFiltered(matches);
    } else {
      setFiltered([]);
    }
  };

  // Handle service select
  const handleSelect = (value) => {
    setQuery(value);
    setFiltered([]);
    setShowDropdown(false);
    setRecentSearches((prev) => {
      const updated = [value, ...prev.filter((item) => item !== value)];
      return updated.slice(0, 5);
    });
  };

  // Location input change
  const handleSearchLoc = async (e) => {
    let input = e.target.value;
    setSearchLoc(e.target.value);
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/autocomplete?input=${encodeURIComponent(input)}`
      );
      const data = await res.json();
      setSuggestions(data.predictions || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // Location select from dropdown
  const handleLocalitySelect = async (placeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/details?placeId=${placeId}`
      );
      const data = await res.json();

      if (data.result) {
        const lat = data.result.geometry.location.lat;
        const lng = data.result.geometry.location.lng;

        // Extract city name
        let city = null;
        const components = data.result.address_components;

        const cityObj =
          components.find((c) => c.types.includes("locality")) ||
          components.find((c) =>
            c.types.includes("administrative_area_level_2")
          );

        const stateObj = components.find((c) =>
          c.types.includes("administrative_area_level_1")
        );

        const countryObj = components.find((c) => c.types.includes("country"));

        setLocation({
          city: cityObj ? cityObj.long_name : "Unknown",
          state: stateObj ? stateObj.long_name : "Unknown",
          country: countryObj ? countryObj.long_name : "Unknown",
          lat,
          lng,
        });
        setShowLocDropdown(false);
      }
    } catch (err) {
      console.error("Error fetching place details:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowLocDropdown(false);

        // Reset location input if user typed but didn’t select
        setSearchLoc(finalLoc);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [finalLoc]);

  // Sync with context location initially
  useEffect(() => {
    if (location.city !== "Unknown") {
      const locString =
        location.city + (location.country ? `, ${location.country}` : "");
      setFinalLoc(locString);
      setSearchLoc(locString);
    }
  }, [location]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto bg-white sm:rounded-full rounded-2xl shadow-lg"
      style={{ width: "90%", maxWidth: "90%" }}
    >
   
   {/*------------desktop view------------------*/}
      <div className="hidden sm:flex items-center px-4 sm:px-6 py-2 sm:py-3">  
        {/* Location Section */}
        <div className="flex items-center gap-1 text-gray-500 pr-2 sm:pr-3 mr-2 sm:mr-3 ">
          <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" />
          <input
            type="text"
            value={searchLoc}
            onChange={handleSearchLoc}
            onFocus={() => {
              setSearchLoc(""); // clear when focused
              setShowLocDropdown(true);
			  setSuggestions([]);
            }}
            placeholder={
              location.city + (location.country ? `, ${location.country}` : "")
            }
            className="flex-grow outline-none text-gray-800 bg-transparent text-xs sm:text-base border-r border-gray-300"
          />

          {/* Service Search */}
        <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 ml-1 sm:ml-2" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search services..."
          className="flex-grow outline-none text-gray-800 bg-transparent text-xs sm:text-base pr-2 sm:pr-3"
        />
        </div>
      </div>

      {/* -------- Mobile Section -------- */}
    <div className="sm:hidden flex flex-col px-4 py-2 gap-2">
      {/* Location Row */}
      <div className="flex items-center gap-1 text-gray-500 border rounded-2xl px-3 py-2">
        <MapPinIcon className="h-4 w-4 cursor-pointer" />
        <input
          type="text"
          value={searchLoc}
          onChange={handleSearchLoc}
          onFocus={() => {
              setSearchLoc(""); // clear when focused
              setShowLocDropdown(true);
              setSuggestions([]);
            }}
          placeholder={
              location.city + (location.country ? `, ${location.country}` : "")
            }
          className="flex-grow outline-none text-gray-800 bg-transparent text-base font-montserrat"
        />
      </div>

      {/* Services Row */}
      <div className="flex items-center gap-1 text-gray-500 border rounded-2xl px-3 py-2">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search services..."
          className="flex-grow outline-none text-gray-800 bg-transparent text-normal font-montserrat"
        />
      </div>
    </div>

    {/* Dropdown for location */}
          {showLocDropdown && (
            <div className="absolute top-11 left-0 sm:ml-0
             sm:bg-white bg-gray-50 shadow-md rounded-[20px] w-full sm:w-52  p-3 z-[1001] mt-2 before:content-[''] before:absolute before:-top-2 before:left-4 
                before:border-l-8 before:border-r-8 before:border-b-8 
                before:border-l-transparent before:border-r-transparent before:border-b-white">
              <button
                onClick={() => {
                  detectLocation();
                  setShowLocDropdown(false);
                }}
                className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-gray-100 rounded"
              >
                Auto Detect Location
              </button>
              <div className="mt-2">
                <h4 className="text-gray-500 text-xs mb-1">
                  Popular Localities
                </h4>
                {suggestions.map((loc, idx) => (
                  <div
                    key={idx}
                     onClick={() => handleLocalitySelect(loc.place_id)}
                    className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-100 rounded"
                  >
                    {loc.description}
                  </div>
                ))}
              </div>
            </div>
          )}


      {/* Service Search Dropdown */}
      {showDropdown && (
        <div
          style={{
            maxHeight: "342px",
            overflowY: "auto",
            position: "absolute",
            top: "110%",
            right: 0,
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius:"20px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            padding: "16px",
            zIndex: 1000,
            
          }} className="sm:bg-white bg-gray-50 w-[100%] sm:w-[75%] relative"
        >
          {searchOptions.subCategory.length > 0 && (
            <div className="mb-4">
              <h4 className="text-gray-500 text-sm mb-2">Category</h4>
              <div className="flex flex-wrap gap-2">
                {searchOptions.subCategory.map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() =>
                      naviagte(
                        `/service/${item.CategoryID}-${toSlug(
                          item.CategoryName
                        )}/${item.ID}-${toSlug(item.NAME)}`
                      )
                    }
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item.NAME}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Recent Searches */}
          {/* {searchOptions.providers.length > 0 && (
            <div className="mb-4">
              <h4 className="text-gray-500 text-sm mb-2">Providers</h4>
              <div className="flex flex-wrap gap-2">
                {searchOptions.providers.map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() =>
                      naviagte(`/provider/${toSlug(item.NAME)}/${item.ID}`)
                    }
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item.NAME}
                  </span>
                ))}
              </div>
            </div>
          )}
          {searchOptions.deals.length > 0 && (
            <div className="mb-4">
              <h4 className="text-gray-500 text-sm mb-2">Deals</h4>
              <div className="flex flex-wrap gap-2">
                {searchOptions.deals.map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() =>
                      naviagte(`/deal/${toSlug(item.NAME)}/${item.ID}`)
                    }
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item.NAME}
                  </span>
                ))}
              </div>
            </div>
          )} */}

          {/* Popular Searches */}
          {/* <div>
            <h4 className="text-gray-500 text-sm mb-2">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {(filtered.length > 0 ? filtered : popularSearches).map(
                (item, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
