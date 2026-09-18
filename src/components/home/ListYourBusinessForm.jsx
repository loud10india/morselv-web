import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import businessEnquiry from "../../api/businessEnquiry";
import category from "../../api/category";

// Mirrors the categories rendered on the home page. Used when the category
// API is unreachable so the form still submits instead of dead-ending.
const FALLBACK_CATEGORIES = [
  "Skin, Hair & Beauty",
  "Body Therapies",
  "Health Wellness",
  "Mental & Emotional Wellness",
  "Diet & Weight Management",
  "Travel & Relaxation",
  "Friends, Fun & Community",
  "Fitness & Body Movement",
  "Career & Education",
  "Kids' Activities & Hobbies",
  "Finance & Legal Guidance",
  "Other Services",
].map((label) => ({ value: "", label }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  category: "",
  city: "",
  message: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.businessName.trim()) errors.businessName = "Business name is required";
  else if (values.businessName.trim().length < 2)
    errors.businessName = "Please enter a valid business name";

  if (!values.ownerName.trim()) errors.ownerName = "Owner name is required";
  else if (values.ownerName.trim().length < 2)
    errors.ownerName = "Please enter a valid name";

  if (!values.email.trim()) errors.email = "Email address is required";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address";

  const digits = values.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Phone number is required";
  else if (digits.length !== 10) errors.phone = "Enter a 10-digit phone number";

  if (!values.category) errors.category = "Please select a category";
  if (!values.city.trim()) errors.city = "City / location is required";
  if (values.message.length > 2000) errors.message = "Please keep this under 2000 characters";

  return errors;
};

const inputBase =
  "w-full rounded-[10px] border bg-white px-4 py-3 font-montserrat text-[15px] text-[#121212] outline-none transition-colors placeholder:text-[#9A9A9A] focus:border-[#121212]";

function Field({ label, htmlFor, error, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-montserrat text-[14px] font-medium text-[#2D2D2D]"
      >
        {label}
        {required && <span className="text-[#C0392B]"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="font-montserrat text-[13px] text-[#C0392B]">
          {error}
        </p>
      )}
    </div>
  );
}

function ListYourBusinessForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  useEffect(() => {
    let active = true;
    category
      .getAllCategory()
      .then((res) => {
        const list = res?.data?.[0];
        if (active && Array.isArray(list) && list.length) setCategories(list);
      })
      .catch(() => {
        /* keep the fallback list */
      });
    return () => {
      active = false;
    };
  }, []);

  const setField = (name) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  };

  const handleBlur = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const errorFor = (name) => (touched[name] ? errors[name] : undefined);
  const borderFor = (name) =>
    errorFor(name) ? "border-[#C0392B]" : "border-[#E0E0E0]";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    setTouched(
      Object.keys(EMPTY).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(found).length) {
      toast.error("Please fix the highlighted fields.");
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const selected = categories.find((c) => c.label === values.category);
      await businessEnquiry.addBusinessEnquiry({
        website: honeypot, // honeypot — server drops the request when filled
        businessName: values.businessName.trim(),
        ownerName: values.ownerName.trim(),
        email: values.email.trim(),
        phone: values.phone.replace(/\D/g, ""),
        categoryID: selected?.value || null,
        category: values.category,
        city: values.city.trim(),
        message: values.message.trim(),
      });

      setSubmitted(true);
      setValues(EMPTY);
      setTouched({});
      toast.success("Thanks! Our team will get in touch with you shortly.");
    } catch (error) {
      // api.js rethrows the server message as a string; network failures arrive
      // as an Error with no response body.
      const message =
        typeof error === "string" && error
          ? error
          : "We couldn't submit your enquiry. Please try again in a moment.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="mx-auto w-full max-w-[760px] rounded-[16px] border border-[#E0E0E0] bg-white p-8 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]"
        role="status"
      >
        <h2 className="font-inter text-[28px] font-semibold text-[#121212]">
          Enquiry received
        </h2>
        <p className="mt-3 font-montserrat text-[16px] leading-[26px] text-[#5D5D5D]">
          Thanks for your interest in listing on Morselv. Our onboarding team will
          reach out on the phone number and email you shared.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[10px] bg-[#121212] px-[36px] font-montserrat text-[16px] font-medium text-white transition-colors hover:bg-[#333]"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="enquiry-heading"
      className="relative mx-auto w-full max-w-[760px] rounded-[16px] border border-[#E0E0E0] bg-white p-6 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <h2
        id="enquiry-heading"
        className="font-inter text-[26px] font-semibold leading-[34px] text-[#121212] sm:text-[30px]"
      >
        Tell us about your business
      </h2>
      <p className="mt-2 font-montserrat text-[15px] leading-[24px] text-[#5D5D5D]">
        Share a few details and our onboarding team will get you listed.
      </p>


              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="lyb-website">Website</label>
                <input
                  id="lyb-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Business Name" htmlFor="businessName" required error={errorFor("businessName")}>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            placeholder="e.g. The Gilded Rose Salon"
            value={values.businessName}
            onChange={setField("businessName")}
            onBlur={handleBlur("businessName")}
            aria-invalid={!!errorFor("businessName")}
            aria-describedby={errorFor("businessName") ? "businessName-error" : undefined}
            className={`${inputBase} ${borderFor("businessName")}`}
          />
        </Field>

        <Field label="Owner Name" htmlFor="ownerName" required error={errorFor("ownerName")}>
          <input
            id="ownerName"
            name="ownerName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.ownerName}
            onChange={setField("ownerName")}
            onBlur={handleBlur("ownerName")}
            aria-invalid={!!errorFor("ownerName")}
            aria-describedby={errorFor("ownerName") ? "ownerName-error" : undefined}
            className={`${inputBase} ${borderFor("ownerName")}`}
          />
        </Field>

        <Field label="Email Address" htmlFor="email" required error={errorFor("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
            value={values.email}
            onChange={setField("email")}
            onBlur={handleBlur("email")}
            aria-invalid={!!errorFor("email")}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            className={`${inputBase} ${borderFor("email")}`}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" required error={errorFor("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={15}
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={setField("phone")}
            onBlur={handleBlur("phone")}
            aria-invalid={!!errorFor("phone")}
            aria-describedby={errorFor("phone") ? "phone-error" : undefined}
            className={`${inputBase} ${borderFor("phone")}`}
          />
        </Field>

        <Field label="Business Category" htmlFor="category" required error={errorFor("category")}>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={setField("category")}
            onBlur={handleBlur("category")}
            aria-invalid={!!errorFor("category")}
            aria-describedby={errorFor("category") ? "category-error" : undefined}
            className={`${inputBase} ${borderFor("category")} ${
              values.category ? "" : "text-[#9A9A9A]"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((option, index) => (
              <option key={`${option.label}-${index}`} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="City / Location" htmlFor="city" required error={errorFor("city")}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Gurugram, Haryana"
            value={values.city}
            onChange={setField("city")}
            onBlur={handleBlur("city")}
            aria-invalid={!!errorFor("city")}
            aria-describedby={errorFor("city") ? "city-error" : undefined}
            className={`${inputBase} ${borderFor("city")}`}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message / Requirements" htmlFor="message" error={errorFor("message")}>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about the services you offer and what you're looking for."
              value={values.message}
              onChange={setField("message")}
              onBlur={handleBlur("message")}
              aria-invalid={!!errorFor("message")}
              aria-describedby={errorFor("message") ? "message-error" : undefined}
              className={`${inputBase} ${borderFor("message")} resize-y`}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex h-[60px] w-full items-center justify-center rounded-[10px] bg-[#121212] px-[44px] font-montserrat text-[18px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Submitting…" : "Submit Enquiry"}
      </button>

      <p className="mt-4 font-montserrat text-[13px] leading-[20px] text-[#8A8A8A]">
        By submitting, you agree to be contacted by the Morselv team about listing
        your business.
      </p>
    </form>
  );
}

export default ListYourBusinessForm;
