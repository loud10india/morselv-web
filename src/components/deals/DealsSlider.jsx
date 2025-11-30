import React, { useState, useEffect, useRef } from "react";
import FilterIcon from "../assets/rivet-icons_filter.svg";
import CategoriesIcon from "../assets/iconamoon_category-light.svg";
import DistanceIcon from "../assets/mdi_map-marker-distance.svg";
import ArrowIcon from "../assets/weui_arrow-filled (1).svg";
import DealCardGrid from "./DealCardGrid";
import PartnerSection from "../home/PartnerSection";
import category from "../../api/category.js";
import subCategory from "../../api/subCategory.js";
import deals from "../../api/deals";
import { useLoc } from "../context/LocationContext";
import { useNavigate, useLocation } from "react-router-dom";

// Distance filter options
const distances = [
  { id: 1, text: "Nearby (0 - 5km)", min: 0, max: 5 },
  { id: 2, text: "5 - 10km", min: 5, max: 10 },
  { id: 3, text: "10 - 25km", min: 10, max: 25 },
  { id: 4, text: "25 - 50km", min: 25, max: 50 },
  { id: 5, text: "50km and more", min: 50, max: Infinity },
];

function DealSlider() {
  const navigate = useNavigate();
  const locationRouter = useLocation();

  const { location } = useLoc();
  const { categoryState, subCategoryState } = useLocation().state || {};
  const [showCategories, setShowCategories] = useState(false);
  const [showDistance, setShowDistance] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryState ?? {
      ID: 0,
      Name: "",
    }
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subCategoryState ?? {
      ID: 0,
      Name: "",
    }
  );
  const [selectedDistance, setSelectedDistance] = useState({});
  const [openNested, setOpenNested] = useState(null);
  const [mergedCatFilter, setMergedCatFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showFloatingFilters, setShowFloatingFilters] = useState(false);

// new state variables for floating filters
const [showFloatingCategories, setShowFloatingCategories] = useState(false);
const [showFloatingDistance, setShowFloatingDistance] = useState(false);
const [openNestedFloating, setOpenNestedFloating] = useState(null);

// Updated the click outside handler to include floating filters also
useEffect(() => {
  const handleClickOutside = (event) => {
    const inDesktopCat = categoriesRefDesktop.current?.contains(event.target);
    const inMobileCat = categoriesRefMobile.current?.contains(event.target);
    const inFloatingCat = floatingCategoriesRef.current?.contains(event.target);
    const inSubcategoryPanel = !!event.target.closest(".subcategory-panel");

    const inCategories = inDesktopCat || inMobileCat || inFloatingCat || inSubcategoryPanel;

    const inDesktopDist = distanceRefDesktop.current?.contains(event.target);
    const inMobileDist = distanceRefMobile.current?.contains(event.target);
    const inFloatingDist = floatingDistanceRef.current?.contains(event.target);
    const inDistance = inDesktopDist || inMobileDist || inFloatingDist;

    if (!inCategories && !inDistance) {
      setShowCategories(false);
      setShowDistance(false);
      setShowFloatingCategories(false);
      setShowFloatingDistance(false);
      setOpenNested(null);
      setOpenNestedFloating(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// function for floating nested dropdowns
const toggleNestedDropdownFloating = (index) => {
  setOpenNestedFloating((prev) => (prev === index ? null : index));
};

  // Separate refs for DESKTOP and MOBILE to avoid collisions
  const categoriesRefDesktop = useRef(null);
  const categoriesRefMobile = useRef(null);
  const distanceRefDesktop = useRef(null);
  const distanceRefMobile = useRef(null);
  const floatingCategoriesRef = useRef(null);
  const floatingDistanceRef = useRef(null);

  const toSlug = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Scroll handler for floating filters
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show floating filters when scrolled down 300px
      setShowFloatingFilters(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //Restore filters from sessionStorage
  {/* useEffect(() => {
    const savedCategory = sessionStorage.getItem("dealselectedCategory");
    const savedSubCategory = sessionStorage.getItem("dealselectedSubCategory");
    const savedDistance = sessionStorage.getItem("dealselectedDistance");

    if (savedCategory) setSelectedCategory(JSON.parse(savedCategory));
    if (savedSubCategory) setSelectedSubCategory(JSON.parse(savedSubCategory));
    if (savedDistance) setSelectedDistance(JSON.parse(savedDistance));
  }, []); 

  //Save filters to sessionStorage when changed
  useEffect(() => {
    if (selectedCategory?.ID) {
      sessionStorage.setItem("dealselectedCategory", JSON.stringify(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory?.ID) {
      sessionStorage.setItem("dealselectedSubCategory", JSON.stringify(selectedSubCategory));
    }
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedDistance?.min !== undefined) {
      sessionStorage.setItem("dealselectedDistance", JSON.stringify(selectedDistance));
    }
  }, [selectedDistance]);

  */}

  useEffect(() => {
    // const hasSaved =
    //   sessionStorage.getItem("dealselectedCategory") ||
    //   sessionStorage.getItem("dealselectedSubCategory") ||
    //  sessionStorage.getItem("dealselectedDistance");

    // if (hasSaved) return; 

    const parts = locationRouter.pathname.split("/").filter(Boolean);
    // ["deals", "2-electronics", "5-smartphones"]

    if (parts[1]) {
      const [catID, ...catSlug] = parts[1].split("-");
      setSelectedCategory({ ID: parseInt(catID), Name: catSlug.join("-") });
    }

    if (parts[2]) {
      const [subID, ...subSlug] = parts[2].split("-");
      setSelectedSubCategory({ ID: parseInt(subID), Name: subSlug.join("-") });
    }

    const params = new URLSearchParams(locationRouter.search);
    const min = params.get("min");
    const max = params.get("max");

    if (min !== null || max !== null) {
      const minVal = min !== null ? parseFloat(min) : 0;
      const maxVal = max !== null ? parseFloat(max) : Infinity;

      setSelectedDistance({
        min: minVal,
        max: maxVal,
        text: `${
          maxVal === Infinity
            ? minVal + "km and more"
            : minVal + " - " + max + "km"
        }`,
      });
    }
  }, [locationRouter]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedDistance.min !== undefined)
      params.set("min", selectedDistance.min);
    if (
      selectedDistance.max !== undefined &&
      selectedDistance.max !== Infinity
    ) {
      params.set("max", selectedDistance.max);
    }

    let path = "/deals";

    if (selectedCategory?.ID && selectedCategory?.Name) {
      path += `/${selectedCategory.ID}-${toSlug(selectedCategory.Name)}`;
    }

    if (selectedSubCategory?.ID && selectedSubCategory?.Name) {
      path += `/${selectedSubCategory.ID}-${toSlug(selectedSubCategory.Name)}`;
    }

    navigate({ pathname: path, search: params.toString() }, { replace: true });
  }, [
    selectedCategory.ID,
    selectedSubCategory.ID,
    selectedDistance?.min,
    selectedDistance?.max,
  ]);

  // Load category and subcategory
  useEffect(() => {
    category.getAllCategory().then((res) => {
      setCategoryList(res.data[0]);
    });
    subCategory.getAllSubCategory().then((res) => {
      setSubCategoryList(res.data[0]);
    });
  }, []);
  
  // Merge categories with subcategories
  useEffect(() => {
    const merged = categoryList.map((cat) => ({
      ...cat,
      subcategories: subCategoryList
        .filter((sub) => sub.CatID === cat.ID)
        .map((sub) => ({ ID: sub.ID, SubCatName: sub.SubCatName })),
    }));
    setMergedCatFilter(merged);
  }, [categoryList, subCategoryList]);

  //Fetch providers when filters
  useEffect(() => {
    if (location.lat && location.lng) {
      let param = {
        category: selectedCategory.ID,
        subCategory: selectedSubCategory.ID,
        location: { ...location },
        distanceMin: selectedDistance.min,
        distanceMax: selectedDistance.max,
      };
      deals.getDealsByFilter(param).then((res) => {
        setFilteredData(
          res.data?.map((x) => ({
            id: x.ID,
            image: x.imageURL,
            subCatName: x.subCatName,
            dealName: x.dealName,
            providerName: x.providerName,
            city: x.city,
            area: x.area,
          }))
        );
      });
    }
  }, [
    selectedCategory.ID,
    selectedSubCategory.ID,
    selectedDistance.min,
    selectedDistance.max,
    location.lat,
    location.lng,
  ]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const inDesktopCat = categoriesRefDesktop.current?.contains(event.target);
      const inMobileCat = categoriesRefMobile.current?.contains(event.target);
      const inFloatingCat = floatingCategoriesRef.current?.contains(event.target);
      const inSubcategoryPanel = !!event.target.closest(".subcategory-panel");

      const inCategories = inDesktopCat || inMobileCat || inFloatingCat || inSubcategoryPanel;

      const inDesktopDist = distanceRefDesktop.current?.contains(event.target);
      const inMobileDist = distanceRefMobile.current?.contains(event.target);
      const inFloatingDist = floatingDistanceRef.current?.contains(event.target);
      const inDistance = inDesktopDist || inMobileDist || inFloatingDist;

      if (!inCategories && !inDistance) {
        setShowCategories(false);
        setShowDistance(false);
        setOpenNested(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle nested subcategories
  const toggleNestedDropdown = (index) => {
    setOpenNested((prev) => (prev === index ? null : index));
  };

  // Handle category selection
  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory({ ID: 0, Name: "" });
    setShowCategories(false);
    setOpenNested(null);
  };
  const handleSubCategorySelect = (value) => {
    setSelectedSubCategory(value);
    setOpenNested(null);
    setShowCategories(false);
  };

  // CSS for accordion (inserted in component so no external file required)
  const accordionStyles = `
    /* accordion wrapper controls the expansion animation */
    .accordion-wrapper {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.35s cubic-bezier(.2,.9,.3,1), opacity 0.25s ease;
    }
    .accordion-wrapper.open {
      max-height: 520px; /* allows the container to grow; inner .accordion-content can scroll */
      opacity: 1;
    }

    /* the inner content area — will scroll if content taller than allowed height */
    .accordion-content {
      max-height: 420px; /* content visible area; adjust as needed */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    /* optional small visual nicety for the scrollbar on webkit */
    .accordion-content::-webkit-scrollbar {
      width: 6px;
    }
    .accordion-content::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.08);
      border-radius: 6px;
    }

    /* mobile tweak: slightly smaller limits and a little slower for a softer feel */
    @media (max-width: 640px) {
      .accordion-wrapper.open {
        max-height: 420px;
        transition: max-height 0.42s cubic-bezier(.2,.9,.3,1), opacity 0.32s ease;
      }
      .accordion-content {
        max-height: 300px;
      }
    }

  .glass-container {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px;
    padding: 16px 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  }

  /* Floating Filters */
  .floating-filters {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .floating-filters.hidden {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
    pointer-events: none;
  }

  .floating-filters.visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: all;
  }

  .glass-btn {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border: 1px solid rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
    color: #2D2D2D !important;
  }

  .glass-btn:hover {
    background: rgba(255, 255, 255, 1) !important;
    border: 1px solid rgba(0, 0, 0, 0.2) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
    transform: translateY(-1px);
  }

  .glass-dropdown {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border: 1px solid rgba(0, 0, 0, 0.15) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
    color: #2D2D2D !important;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .floating-filters {
      top: 85px;
    }
    
    .glass-container {
      padding: 12px 18px;
      border-radius: 16px;
    }
    
    .glass-btn {
      width: 160px !important;
      padding: 10px 12px;
    }
  }

  @media (max-width: 640px) {
    .floating-filters {
      top: 75px;
    }
    
    .glass-container {
      padding: 10px 14px;
      border-radius: 14px;
    }
    
    .glass-btn {
      width: 140px !important;
      padding: 8px 10px;
    }
    
    .glass-btn span {
      font-size: 13px !important;
    }
  }
`;  

  // Floating Filters Component with separate state also
  const FloatingFilters = () => (
    <div className={`floating-filters ${showFloatingFilters ? 'visible' : 'hidden'}`}>
      <div className="glass-container">
        <div className="flex items-center justify-center gap-4">
          {/* Categories Dropdown */}
          <div className="relative" ref={floatingCategoriesRef}>
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer glass-btn sm:w-[160px] xl:w-[200px] lg:w-[200px] md:w-[170px] w-[140px]"
              style={{ minHeight: "48px" }}
              onClick={() => {
                setShowFloatingCategories((prev) => !prev);
                setShowFloatingDistance(false); 
                setOpenNestedFloating(null);
              }}
            >
              <img src={CategoriesIcon} alt="Categories" className="w-5 h-5" />
              <span className="text-[15px] font-montserrat font-normal truncate flex-1 text-gray-800">
                {selectedSubCategory.Name !== ""
                  ? selectedSubCategory.Name
                  : selectedCategory.Name !== ""
                  ? selectedCategory.Name
                  : "Categories"}
              </span>
              <img
                src={ArrowIcon}
                alt="Arrow"
                className="w-[16px] h-[14px] transition-transform duration-300"
                style={{
                  transform: showFloatingCategories ? "rotate(270deg)" : "rotate(90deg)",
                  filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                }}
              />
            </div>

            {/* Categories Menu */}
            {showFloatingCategories && (
              <div
                className="absolute z-50 mt-2 glass-dropdown rounded-xl sm:w-[160px] xl:w-[200px] lg:w-[200px] md:w-[170px] w-[140px]"
                style={{
                  padding: "12px",
                  maxHeight: "400px",
                }}
              >
                <div className="accordion-content" style={{ maxHeight: "350px" }}>
                  {mergedCatFilter.map((category, index) => (
                    <React.Fragment key={category.value}>
                      <div
                        className={`flex items-center justify-between cursor-pointer px-3 py-3 rounded-lg mb-1 ${
                          selectedCategory.ID === category.value
                            ? "bg-black text-white"
                            : "hover:bg-[#FEE5C5]"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (category.subcategories.length > 0) {
                            toggleNestedDropdownFloating(category.value);
                          } else {
                            handleCategorySelect({
                              ID: category.value,
                              Name: category.label,
                            });
                            setShowFloatingCategories(false);
                          }
                        }}
                      >
                        <span className="font-montserrat text-[14px]">
                          {category.label}
                        </span>
                        {category.subcategories.length > 0 && (
                          <img
                            src={ArrowIcon}
                            alt="Arrow"
                            className="w-[14px] h-[12px] transition-transform duration-300"
                            style={{
                              transform: openNestedFloating === category.value ? "rotate(270deg)" : "rotate(90deg)",
                              filter: selectedCategory.ID === category.value 
                                ? "brightness(0) invert(1)"
                                : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                            }}
                          />
                        )}
                      </div>

                      <div className={`accordion-wrapper ${openNestedFloating === category.value ? 'open' : ''} subcategory-panel`}>
                        <div className="accordion-content pl-2">
                          {category.subcategories.map((subCat) => (
                            <div
                              key={subCat.ID}
                              className={`px-3 py-2 cursor-pointer rounded-lg my-1 ${
                                selectedSubCategory.ID === subCat.ID
                                  ? "bg-gray-300 text-black"
                                  : "hover:bg-[#FEE5C5]"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategorySelect({
                                  ID: category.value,
                                  Name: category.label,
                                });
                                handleSubCategorySelect({
                                  ID: subCat.ID,
                                  Name: subCat.SubCatName,
                                });
                                setShowFloatingCategories(false);
                              }}
                            >
                              <span className="font-montserrat text-[13px]">
                                {subCat.SubCatName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {<div className="h-px bg-gray-200 my-1 mx-3"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Distance Dropdown */}
          <div className="relative" ref={floatingDistanceRef}>
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer glass-btn"
              style={{ width: "180px", minHeight: "48px" }}
              onClick={() => {
                setShowFloatingDistance((prev) => !prev);
                setShowFloatingCategories(false); 
                setOpenNestedFloating(null);
              }}
            >
              <img src={DistanceIcon} alt="Distance" className="w-5 h-5" />
              <span className="text-[15px] font-montserrat font-normal truncate flex-1 text-gray-800">
                {selectedDistance.text ?? "Distance"}
              </span>
              <img
                src={ArrowIcon}
                alt="Arrow"
                className="w-[16px] h-[14px] transition-transform duration-300"
                style={{
                  transform: showFloatingDistance ? "rotate(270deg)" : "rotate(90deg)",
                  filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                }}
              />
            </div>

            {/* Distance Menu */}
            {showFloatingDistance && (
              <div
                className="absolute z-50 mt-2 glass-dropdown rounded-xl sm:w-[160px] xl:w-[180px] lg:w-[180px] md:w-[180px]"
                style={{
                  padding: "12px"
                }}
              >
                {distances.map((distance) => (
                  <div
                    key={distance.id}
                    className={`cursor-pointer px-3 py-3 rounded-lg my-1 ${
                      selectedDistance.min === distance.min
                        ? "bg-black text-white"
                        : "hover:bg-[#FEE5C5]"
                    }`}
                    onClick={() => {
                      setSelectedDistance(distance);
                      setShowFloatingDistance(false);
                    }}
                  >
                    <span className="font-montserrat text-[14px]">
                      {distance.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full overflow-visible">
      {/* inject the accordion CSS into this component */}
      <style>{accordionStyles}</style>

      {/* Beautiful Floating Filters */}
      <FloatingFilters />
      {/* DESKTOP VIEW */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-6 lg:px-6 xl:px-0 pt-[130px] pb-[20px] relative">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="font-montserrat text-[32px] sm:text-4xl font-semibold text-[#2D2D2D] leading-[40px]">
              Exclusive Deals{" "}
              {selectedCategory.Name && (
                <span className="font-normal">- {selectedCategory.Name}</span>
              )}
            </h2>
          </div>

          {/* Filters Section */}
          <div className="text-[#4D4D4D] font-medium font-montserrat flex flex-wrap items-center gap-4 mb-8 text-[18px]">
            {/* Filters Icon + Label */}
            <img src={FilterIcon} alt="Filters" className="w-5 h-5" />
            <span>Filters</span>
            <div></div>

            {/* Categories Dropdown (DESKTOP) */}
            <div
              className="relative inline-block mr-4"
              ref={categoriesRefDesktop}
              style={{ width: "380px", flexShrink: 0 }}
            >
              <div
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white relative cursor-pointer"
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  setShowDistance(false);
                  setOpenNested(null);
                }}
              >
                <img
                  src={CategoriesIcon}
                  alt="Categories"
                  className="w-5 h-5"
                />
                <span className="text-[#4D4D4D] font-montserrat text-[16px] font-medium">
                  {selectedSubCategory.Name !== ""
                    ? selectedSubCategory.Name
                    : selectedCategory.Name !== ""
                    ? selectedCategory.Name
                    : "Categories"}
                </span>
                {/* Arrow icon rotation based on dropdown state */}
                <img
                  src={ArrowIcon}
                  alt="Arrow"
                  className="w-[20px] h-[18px] absolute right-4 transition-transform duration-200"
                  style={{
                    top: "50%",
                    transform: showCategories
                      ? "translateY(-50%) rotate(270deg)"
                      : "translateY(-50%) rotate(90deg)",
                    filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                  }}
                />
              </div>

              {/* Categories Menu */}
              {showCategories && (
                <div
                  className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
                  style={{
                    borderRadius: "12px",
                    padding: "8px",
                    width: "380px",
                  }}
                >
                  {mergedCatFilter.map((category, index) => (
                    <React.Fragment key={category.value}>
                      {/* Main Category Item */}
                      <div
                        className={`flex items-center justify-between cursor-pointer px-4 py-3 rounded-md ${
                          selectedCategory.ID === category.value
                            ? "bg-black text-white"
                            : "hover:bg-[#FEE5C5]"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (category.subcategories.length > 0) {
                            toggleNestedDropdown(category.value);
                          } else {
                            handleCategorySelect({
                              ID: category.value,
                              Name: category.label,
                            });
                          }
                        }}
                      >
                        <span
                          className={`font-montserrat text-[16px] ${
                            selectedCategory.ID === category.value
                              ? "text-white"
                              : "text-[#2D2D2D]"
                          }`}
                        >
                          {category.label}
                        </span>

                        {/* Arrow for nested menu */}
                        {category.subcategories.length > 0 && (
                          <img
                            src={ArrowIcon}
                            alt="Arrow"
                            className="w-[16px] h-[14px] transition-transform duration-200"
                            style={{
                              transform:
                                openNested === category.value
                                  ? "rotate(270deg)"
                                  : "rotate(90deg)",
                              filter:
                                selectedCategory.ID === category.value
                                  ? "brightness(0) invert(1)" // White for selected
                                  : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)", // Black for unselected
                            }}
                          />
                        )}
                      </div>

                      {/* Accordion-style subcategories (inside same dropdown box) */}
                      <div
                        className={`accordion-wrapper ${
                          openNested === category.value ? "open" : ""
                        } subcategory-panel`}
                      >
                        <div className="accordion-content">
                          {category.subcategories.map((subCat) => (
                            <div
                              key={subCat.ID}
                              className={`px-4 py-2 cursor-pointer rounded-md my-1 ${
                                selectedSubCategory.ID === subCat.ID
                                  ? "bg-gray-300 text-black"
                                  : "hover:bg-[#FEE5C5]"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategorySelect({
                                  ID: category.value,
                                  Name: category.label,
                                });
                                handleSubCategorySelect({
                                  ID: subCat.ID,
                                  Name: subCat.SubCatName,
                                });
                              }}
                            >
                              <span
                                className={`font-montserrat text-[16px] ${
                                  selectedSubCategory.ID === subCat.ID
                                    ? "text-black"
                                    : "text-[#2D2D2D]"
                                }`}
                              >
                                {subCat.SubCatName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {<div className="h-px bg-gray-200 my-1 mx-3"></div>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Distance Dropdown (DESKTOP) */}
            <div
              className="relative md:mr-[30px]"
              ref={distanceRefDesktop}
              style={{ width: "200px", flexShrink: 0}}
            >
              <div
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white relative cursor-pointer"
                onClick={() => {
                  setShowDistance((prev) => !prev);
                  setShowCategories(false);
                  setOpenNested(null);
                }}
                style={{ width: "250px"}}
              >
                <img src={DistanceIcon} alt="Distance" className="w-10 h-5" />
                <span className="text-[#4D4D4D] font-montserrat text-[16px] font-medium">
                  {selectedDistance.text ?? "Distance"}
                </span>
                {/* Arrow rotation */}
                <img
                  src={ArrowIcon}
                  alt="Arrow"
                  className="w-[20px] h-[18px] absolute right-4 transition-transform duration-200"
                  style={{
                    top: "50%",
                    transform: showDistance
                      ? "translateY(-50%) rotate(270deg)"
                      : "translateY(-50%) rotate(90deg)",
                    filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                  }}
                />
              </div>

              {/* Distance Menu */}
              {showDistance && (
                <div
                  className="absolute z-50 mt-2 bg-white rounded-md shadow-lg border border-gray-200"
                  style={{
                    borderRadius: "20px",
                    padding: "8px",
                    width: "250px",
                  }}
                >
                  {distances.map((distance) => (
                    <div
                      key={distance.id}
                      className={`cursor-pointer ${
                        selectedDistance.min === distance.min
                          ? "bg-black text-white"
                          : "hover:bg-[#FEE5C5]"
                      }`}
                      style={{ 
                        padding: selectedDistance.min === distance.min
                        ? "9px 12px"
                        : "12px 6px", 
                        borderRadius: "8px",
                        margin: selectedDistance.min === distance.min
                        ? "3px 0"
                        : "3px 0" 
                       }}
                      onClick={() => {
                        setSelectedDistance(distance);
                        setShowDistance(false);
                      }}
                    >
                      <span
                        className={`font-montserrat text-[16px] ${
                          selectedDistance.min === distance.min
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {distance.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden px-4 pt-[120px] pb-4">
        {/* Title */}
        <div className="mb-6">
          <h2 className="font-montserrat text-[18px] font-semibold text-[#000] leading-[22.5px]">
            Exclusive Deals{" "}
          {selectedCategory.Name && (
            <span className="font-normal">- {selectedCategory.Name}</span>
          )}{" "}
          </h2>
        </div>

        {/* Filters label */}
        <div className="flex items-center gap-2 mb-4">
          <img src={FilterIcon} alt="Filters" className="w-5 h-5" />
          <span className="text-[#949494] font-montserrat text-[16px]">Filters</span>
        </div>

        {/* Categories & Distance side by side */}
        <div className="flex flex-row items-center gap-3 mb-4">
          {/* Categories (Mobile) */}
          <div className="relative flex-1 min-w-0" ref={categoriesRefMobile}>
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-full border border-gray-300 bg-white relative cursor-pointer"
              onClick={() => {
                setShowCategories((prev) => !prev);
                setShowDistance(false);
                setOpenNested(null);
              }}
            >
              <img src={CategoriesIcon} alt="Categories" className="w-5 h-5" />
              <span className="text-[#606060] font-montserrat text-[14px] leading-[17.5px] font-medium truncate">
                {selectedSubCategory.Name !== ""
                  ? selectedSubCategory.Name
                  : selectedCategory.Name !== ""
                  ? selectedCategory.Name
                  : "Categories"}
              </span>
              <img
                src={ArrowIcon}
                alt="Arrow"
                className="w-[16px] h-[14px] absolute right-3 transition-transform duration-200"
                style={{
                  top: "50%",
                  transform: showCategories
                    ? "translateY(-50%) rotate(270deg)"
                    : "translateY(-50%) rotate(90deg)",
                  filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                }}
              />
            </div>

            {/* Categories Menu (Mobile) */}
            {showCategories && (
              <div className="absolute z-50 mt-2 w-full max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200">
                {mergedCatFilter.map((category) => (
                  <React.Fragment key={category.value}>
                    {/* Main Category */}
                    <div
                      className={`flex items-center justify-between cursor-pointer px-4 py-3 rounded-md ${
                        selectedCategory.ID === category.value
                          ? "bg-black text-white mx-2 mt-2"
                          : "hover:bg-[#FEE5C5] mx-2 mt-2"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category.subcategories.length > 0) {
                          toggleNestedDropdown(category.value);
                        } else {
                          handleCategorySelect({
                            ID: category.value,
                            Name: category.label,
                          });
                        }
                      }}
                    >
                      <span
                        className={`font-montserrat text-sm ${
                          selectedCategory.ID === category.value
                            ? "text-white"
                            : "text-[#606060]"
                        }`}
                      >
                        {category.label}
                      </span>
                      {category.subcategories.length > 0 && (
                        <img
                          src={ArrowIcon}
                          alt="Arrow"
                          className="w-[14px] h-[12px] transition-transform duration-200"
                          style={{
                            transform:
                              openNested === category.value
                                ? "rotate(270deg)"
                                : "rotate(90deg)",
                            filter:
                              selectedCategory.ID === category.value
                                ? "brightness(0) invert(1)" // White for selected
                                : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)", // Black for unselected
                          }}
                        />
                      )}
                    </div>

                    {/* Accordion-style subcategories in same box (mobile) */}
                    <div
                      className={`accordion-wrapper ${
                        openNested === category.value ? "open" : ""
                      } subcategory-panel`}
                    >
                      <div className="accordion-content">
                        {openNested === category.value &&
                          category.subcategories.map((subCat) => (
                            <div
                              key={subCat.ID}
                              className={`px-4 py-2 cursor-pointer rounded-md my-1 ${
                                selectedSubCategory.ID === subCat.ID
                                  ? "bg-gray-300 text-black mx-2"
                                  : "hover:bg-[#FEE5C5] mx-2"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategorySelect({
                                  ID: category.value,
                                  Name: category.label,
                                });
                                handleSubCategorySelect({
                                  ID: subCat.ID,
                                  Name: subCat.SubCatName,
                                });
                              }}
                            >
                              <span
                                className={`font-montserrat text-xs ${
                                  selectedSubCategory.ID === subCat.ID
                                    ? "text-black"
                                    : "text-[#606060]"
                                }`}
                              >
                                {subCat.SubCatName}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    {<div className="h-px bg-gray-200 my-1 mx-3"></div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Distance (Mobile) */}
          <div className="relative flex-1 min-w-0" ref={distanceRefMobile}>
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-full border border-gray-300 bg-white relative cursor-pointer"
              onClick={() => {
                setShowDistance((prev) => !prev);
                setShowCategories(false);
                setOpenNested(null);
              }}
            >
              <img src={DistanceIcon} alt="Distance" className="w-5 h-5" />
              <span className="text-[#606060] font-montserrat text-[14px] leading-[17.5px] font-medium truncate">
                {selectedDistance.text ?? "Distance"}
              </span>
              <img
                src={ArrowIcon}
                alt="Arrow"
                className="w-[16px] h-[14px] absolute right-3 transition-transform duration-200"
                style={{
                  top: "50%",
                  transform: showDistance
                    ? "translateY(-50%) rotate(270deg)"
                    : "translateY(-50%) rotate(90deg)",
                  filter:
                    "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)",
                }}
              />
            </div>

            {/* Distance Menu (Mobile) */}
            {showDistance && (
              <div className="absolute z-50 mt-2 w-full max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 py-3 px-2">
                {distances.map((distance) => (
                  <div
                    key={distance.id}
                    className={`cursor-pointer mx-4 ${
                      selectedDistance.min === distance.min
                        ? "bg-black text-white"
                        : "hover:bg-[#FEE5C5]"
                    }`}
                    style={{
                      padding:
                        selectedDistance.min === distance.min
                          ? "9px 12px"
                          : "12px 6px",
                      borderRadius: "8px",
                      margin:
                        selectedDistance.min === distance.min
                          ? "3px 0"
                          : "3px 0",
                    }}
                    onClick={() => {
                      setSelectedDistance(distance);
                      setShowDistance(false);
                    }}
                  >
                    <span
                      className={`font-montserrat text-sm ${
                        selectedDistance.min === distance.min
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {distance.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
        
      {/* Divider */}
      <div className="absolute left-0 right-0 h-px bg-gray-300"></div>
      <div className="bg-white w-full">
        <DealCardGrid
          data={filteredData}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
        />
      </div>
      <div className="mb-20">
        <PartnerSection />
      </div>
    </div>
  );
}

export default DealSlider;