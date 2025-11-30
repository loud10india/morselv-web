import React, { useState, useRef, useEffect } from "react";
import leads from "../../api/leads";
import { toast } from "react-toastify";

const ServicePopup = ({ isOpen, onClose, dealID, serviceID, providerID }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: "", email: "", phoneNumber: "" };

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email is invalid";
        isValid = false;
      } else {
        // ✅ Check allowed domains
        const allowedDomains = [
          "gmail.com",
          "yahoo.com",
          "outlook.com",
          "hotmail.com",
        ];
        const emailDomain = formData.email.split("@")[1];
        if (!allowedDomains.includes(emailDomain)) {
          newErrors.email = `Email domain must be one of: ${allowedDomains.join(
            ", "
          )}`;
          isValid = false;
        }
      }
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else {
      const phoneRegex = /^\d{10}$/; // exactly 10 digits
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber =
          "Phone number must be 10 digits long and numeric.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const param = {
        fullName: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        dealID: parseInt(dealID),
        serviceID: parseInt(serviceID),
        providerID: parseInt(providerID),
      };

      const res = await leads.addBookings(param);

      if (res.success == true) {
        toast.success("✅ Details submitted successfully!");
        setIsSubmitted(true);

        // Wait 3 seconds before closing to show thank you message
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error("❌ Something went wrong! Please try again.");
      }
    } catch (error) {
      toast.error("❌ Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ fullName: "", email: "", phoneNumber: "" });
      setErrors({ fullName: "", email: "", phoneNumber: "" });
      setIsSubmitted(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mt-[70px] bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center w-[361px] md:w-[550px] p-[31px] md:px-[16px] md:p-[31px] rounded-[20px] border-2 border-[#7E7E7E] md:border-[#FECD8C] bg-[#FBFBFB] shadow-[-3px_0px_23.6px_0px_rgba(0,0,0,0.25)] overflow-hidden"
      >
        {/*  Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4A4A4A] hover:text-black text-2xl font-bold z-10"
        >
          &times;
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-[#4A4A4A] font-montserrat text-[24px] md:text-[28px] font-semibold mt-[31px] text-center">
              Book Your Appointment
            </h2>

            <p className="text-[#5B5B5B] font-inter text-[12px] md:text-[14px] font-normal leading-[22px] text-center">
              Leave your details and we'll get in touch to confirm.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-[11px]"
            >
              <div className="w-full mt-[43px]">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  disabled={isLoading}
                  className={`w-full p-[15px] px-[20px] rounded-[10px] border bg-white text-[#6D6D6D] font-inter text-[16px] font-medium placeholder-[#6D6D6D] focus:outline-none focus:ring-1 focus:ring-black ${errors.fullName ? "border-red-500" : "border-[#6D6D6D]"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled={isLoading}
                  className={`w-full p-[15px] mt-[11px] px-[20px] rounded-[10px] border bg-white text-[#6D6D6D] font-inter text-[16px] font-medium placeholder-[#6D6D6D] focus:outline-none focus:ring-1 focus:ring-black ${errors.email ? "border-red-500" : "border-[#6D6D6D]"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="w-full mt-[11px] flex gap-2">
                {/* STD Code */}
                <input
                  type="text"
                  name="stdCode"
                  value={"+91"}
                  readOnly
                  className="w-[70px] p-[15px] rounded-[10px] border bg-gray-100 text-gray-600 font-inter text-[16px] font-medium text-center focus:outline-none"
                />

                {/* Mobile Number */}
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  disabled={isLoading}
                  className={`flex-1 p-[15px] rounded-[10px] border bg-white text-[#6D6D6D] font-inter text-[16px] font-medium placeholder-[#6D6D6D] focus:outline-none focus:ring-1 focus:ring-black ${errors.phoneNumber ? "border-red-500" : "border-[#6D6D6D]"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`flex h-[60px] justify-center items-center rounded-[10px] px-[44px] py-[16px] text-[#FFF] font-montserrat text-[20px] font-medium leading-[22px] transition-colors mt-[43px] mb-[31px] ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#121212] hover:bg-black"
                  }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        ) : (
          // Thank You Message
          <div className="flex flex-col items-center justify-center py-8 w-full">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h2 className="text-[#4A4A4A] font-montserrat text-[24px] md:text-[28px] font-semibold text-center mb-4">
              Appointment Request Received!
            </h2>

            <p className="text-[#5B5B5B] font-inter text-[14px] md:text-[16px] font-normal leading-[22px] text-center max-w-md mb-2">
              Thank you for booking with us! Our team will contact you shortly to confirm your appointment details.
            </p>

            <p className="text-green-600 font-inter text-[12px] text-center font-medium">
              ✓ Successfully submitted
            </p>

            {/* <div className="mt-6 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-[#1E40AF] font-inter text-[12px] text-center">
                Closing in 3 seconds...
              </p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};


export default ServicePopup;