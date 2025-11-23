import React from "react";
import { MapPin } from "lucide-react";
function DealCard({ image, subCatName, dealName, providerName, city, area }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col h-full group"
      style={{
        padding: "15.88px 17.55px",
        gap: "12.52px",
        borderRadius: "16.71px",
        maxWidth: "300px",
      }}
    >
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden rounded-t-[16.71px]">
        <img
          src={image}
          alt={dealName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="mt-2 flex flex-col">
        <span className="font-medium text-[14px] sm:text-sm leading-[125%] text-[#4d4d4d] truncate">
          {subCatName}
        </span>
        <h2 className="text-[20px] font-semibold text-[#2d2d2d] mt-1 truncate">
          {dealName}
        </h2>
        <h3 className="text-[16px] sm:text-base font-normal text-[#2d2d2d] truncate">
          {providerName}
        </h3>
        {/* <p className="text-xs sm:text-sm text-gray-500 mt-1">
          <MapPin className="inline" />
          {area}, {city}

        </p> */}
        <div className="flex items-center gap-[8.556px] mt-1 mb-4 text-[14px] font-normal text-[#4d4d4d]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M8.36621 9.15137C7.8903 9.15137 7.42508 9.01024 7.02937 8.74584C6.63367 8.48144 6.32525 8.10563 6.14313 7.66595C5.961 7.22627 5.91335 6.74245 6.0062 6.27568C6.09904 5.80892 6.32822 5.38016 6.66474 5.04364C7.00126 4.70712 7.43001 4.47795 7.89678 4.3851C8.36354 4.29226 8.84736 4.33991 9.28704 4.52203C9.72673 4.70416 10.1025 5.01257 10.3669 5.40828C10.6313 5.80398 10.7725 6.26921 10.7725 6.74512C10.7717 7.38306 10.5179 7.99466 10.0668 8.44575C9.61575 8.89684 9.00415 9.1506 8.36621 9.15137ZM8.36621 5.30137C8.08067 5.30137 7.80153 5.38604 7.56411 5.54468C7.32668 5.70333 7.14163 5.92881 7.03236 6.19262C6.92309 6.45643 6.8945 6.74672 6.9502 7.02678C7.00591 7.30684 7.14341 7.56409 7.34533 7.766C7.54724 7.96792 7.80449 8.10542 8.08455 8.16113C8.36461 8.21683 8.6549 8.18824 8.91871 8.07897C9.18252 7.96969 9.408 7.78465 9.56665 7.54722C9.72529 7.3098 9.80996 7.03066 9.80996 6.74512C9.80958 6.36233 9.65735 5.99533 9.38667 5.72465C9.116 5.45398 8.749 5.30175 8.36621 5.30137Z"
              fill="#5D5D5D"
            />
            <path
              d="M8.36699 14.9264L4.30717 10.1385C4.25076 10.0666 4.19493 9.99422 4.1397 9.92142C3.44655 9.00771 3.07196 7.89203 3.07325 6.74517C3.07325 5.34118 3.63098 3.99469 4.62375 3.00192C5.61652 2.00915 6.96301 1.45142 8.36699 1.45142C9.77098 1.45142 11.1175 2.00915 12.1102 3.00192C13.103 3.99469 13.6607 5.34118 13.6607 6.74517C13.6619 7.89148 13.2874 9.0066 12.5948 9.91997L12.5943 9.92142C12.5943 9.92142 12.4499 10.111 12.4283 10.1365L8.36699 14.9264ZM4.90825 9.34151C4.90825 9.34151 5.02038 9.48973 5.04589 9.5215L8.36699 13.4384L11.6924 9.5162C11.7136 9.48973 11.8262 9.34055 11.8267 9.34007C12.3932 8.59372 12.6994 7.68218 12.6982 6.74517C12.6982 5.59645 12.2419 4.49478 11.4297 3.68251C10.6174 2.87024 9.51571 2.41392 8.36699 2.41392C7.21828 2.41392 6.11661 2.87024 5.30434 3.68251C4.49207 4.49478 4.03575 5.59645 4.03575 6.74517C4.03456 7.68278 4.34107 8.59489 4.90825 9.34151Z"
              fill="#5D5D5D"
            />
          </svg>
          {area}
          {city ? ", " + city : ""}
        </div>
      </div>
    </div>
  );
}

export default DealCard;
