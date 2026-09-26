import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Seo from "../utils/Seo";
import customer from "../../api/customer";
import { staticPageMeta } from "../../seo/siteConfig";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputBase =
  "w-full rounded-[10px] border bg-white px-4 py-3 font-montserrat text-[15px] text-[#121212] outline-none transition-colors placeholder:text-[#9A9A9A] focus:border-[#121212]";

const errorMessage = (error, fallback) =>
  typeof error === "string" && error ? error : fallback;

/**
 * Registration only.
 *
 * Verified phone/email is planned but not required yet, so this is a single
 * step. The OTP endpoints (/api/customer/verify/*) already exist and the
 * customers table already carries IsVerified, so turning verification on later
 * needs no migration — just a second step here.
 */

/**
 * Declared at module scope on purpose. Defining this inside CustomerPanel makes
 * it a fresh component type on every render, so React unmounts the input and
 * the field loses focus after each keystroke.
 */
function Field({ id, label, type = "text", placeholder, autoComplete, maxLength, inputMode, value, error, onChange, required = true }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
        {label}{" "}
        {required ? (
          <span className="text-[#C0392B]">*</span>
        ) : (
          <span className="font-normal text-[#9A9A9A]">(optional)</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`${inputBase} ${error ? "border-[#C0392B]" : "border-[#E0E0E0]"}`}
      />
      {error && (
        <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">
          {error}
        </p>
      )}
    </div>
  );
}

function CustomerPanel() {
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const setField = (name) => (event) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Permissive on purpose: capture the registration rather than block it.
  // Only a name plus one contact method is required.
  const validate = () => {
    const found = {};
    const email = values.email.trim();
    const digits = values.phone.replace(/\D/g, "");

    if (!values.name.trim()) found.name = "Please tell us your name";
    if (!email && !digits) {
      found.email = "Enter an email address or a phone number";
    }
    if (email && !EMAIL_RE.test(email)) found.email = "That email address doesn't look right";
    if (digits && (digits.length < 7 || digits.length > 15))
      found.phone = "That phone number doesn't look right";

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setBusy(true);
    try {
      await customer.register({
        website: honeypot, // honeypot — server drops the request when filled
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.replace(/\D/g, ""),
      });
      setRegistered(true);
      setShowPopup(true);
      toast.success("You're registered with Morselv.");
    } catch (error) {
      toast.error(
        errorMessage(error, "We couldn't complete your registration. Please try again.")
      );
    } finally {
      setBusy(false);
    }
  };

  // Confirmation dialog after a successful registration.
  useEffect(() => {
    if (!showPopup) return undefined;
    const onKey = (e) => e.key === "Escape" && setShowPopup(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  return (
    <main className="w-full min-h-screen mt-[100px] flex flex-col items-center">
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reg-popup-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="w-full max-w-[420px] rounded-[18px] bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4E3]">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
                stroke="#DE9636" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true" focusable="false">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 id="reg-popup-title" className="mt-5 font-inter text-[24px] font-semibold text-[#121212]">
              Registration successful
            </h2>
            <p className="mt-3 font-montserrat text-[15px] leading-[24px] text-[#5D5D5D]">
              Thanks {values.name.trim().split(" ")[0] || "for registering"} — your
              details are with Morselv. We&rsquo;ll keep you posted on deals and
              new providers near you.
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setShowPopup(false)}
              className="mt-7 inline-flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#121212] font-montserrat text-[16px] font-medium text-white transition-colors hover:bg-[#333]"
            >
              Done
            </button>
          </div>
        </div>
      )}
      <Seo {...staticPageMeta("/customer-panel")} />

      <section
        className="w-full flex flex-col items-center justify-center py-16 -mt-8 md:-mt-2.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(254,205,140,0.40) 0%, rgba(163,163,163,0.00) 100%)",
        }}
      >
        <p className="text-[#FECD8C] font-montserrat text-[24px] font-semibold leading-[30px]">
          CUSTOMER PANEL
        </p>
        <h1 className="font-inter text-[36px] md:text-[56px] font-semibold leading-[44px] md:leading-[68px] text-[#000] text-center max-w-[900px] px-4 mt-2">
          Register with Morselv
        </h1>
        <p className="max-w-[720px] text-center text-[#5D5D5D] font-montserrat text-[17px] md:text-[19px] leading-[27px] mt-5 px-4">
          Share your details once and we&rsquo;ll keep you posted on deals, new
          providers and offers near you.
        </p>
      </section>

      <section aria-label="Customer registration" className="w-full px-4 sm:px-6 mt-12 mb-[120px]">
        <div className="mx-auto w-full max-w-[560px] rounded-[16px] border border-[#E0E0E0] bg-white p-6 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-8">
          {registered ? (
            <div role="status" className="text-center">
              <h2 className="font-inter text-[26px] font-semibold text-[#121212]">
                You&rsquo;re registered
              </h2>
              <p className="mt-3 font-montserrat text-[16px] leading-[26px] text-[#5D5D5D]">
                Thanks {values.name.trim().split(" ")[0]}. Your details are with
                Morselv — browse services and enquire with any provider.
              </p>
              <a
                href="/service"
                className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[10px] bg-[#121212] px-[36px] font-montserrat text-[16px] font-medium text-white transition-colors hover:bg-[#333]"
              >
                Explore services
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="relative">
              <h2 className="font-inter text-[24px] font-semibold text-[#121212]">
                Your details
              </h2>
              <p className="mt-2 font-montserrat text-[15px] leading-[24px] text-[#5D5D5D]">
                Takes a few seconds. No password needed — just your name and a
                way to reach you.
              </p>

              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="cp-website">Website</label>
                <input
                  id="cp-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="mt-7 flex flex-col gap-5">
                <Field
                  id="name"
                  label="Name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  error={errors.name}
                  onChange={setField("name")}
                />
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required={false}
                  value={values.email}
                  error={errors.email}
                  onChange={setField("email")}
                />
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={15}
                  placeholder="Mobile number"
                  required={false}
                  value={values.phone}
                  error={errors.phone}
                  onChange={setField("phone")}
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-8 inline-flex h-[56px] w-full items-center justify-center rounded-[10px] bg-[#121212] font-montserrat text-[17px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Registering…" : "Register"}
              </button>

              <p className="mt-4 font-montserrat text-[13px] leading-[20px] text-[#8A8A8A]">
                By registering, you agree to be contacted by Morselv about
                services and offers.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default CustomerPanel;
