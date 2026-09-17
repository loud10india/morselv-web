import React, { useState } from "react";
import { toast } from "react-toastify";
import Seo from "../utils/Seo";
import customer from "../../api/customer";
import { breadcrumbSchema } from "../../seo/siteConfig";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputBase =
  "w-full rounded-[10px] border bg-white px-4 py-3 font-montserrat text-[15px] text-[#121212] outline-none transition-colors placeholder:text-[#9A9A9A] focus:border-[#121212]";

const errorMessage = (error, fallback) =>
  typeof error === "string" && error ? error : fallback;

function CustomerPanel() {
  const [step, setStep] = useState("details"); // details -> code -> verified
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const setField = (name) => (event) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateDetails = () => {
    const found = {};
    if (!values.name.trim()) found.name = "Name is required";
    if (!values.email.trim()) found.email = "Email address is required";
    else if (!EMAIL_RE.test(values.email.trim()))
      found.email = "Please enter a valid email address";

    const digits = values.phone.replace(/\D/g, "");
    if (!digits) found.phone = "Phone number is required";
    else if (digits.length !== 10) found.phone = "Enter a 10-digit phone number";

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleStart = async (event) => {
    event.preventDefault();
    if (!validateDetails()) return;

    setBusy(true);
    try {
      await customer.startVerification({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.replace(/\D/g, ""),
      });
      setStep("code");
      toast.success("We've sent a verification code to your email.");
    } catch (error) {
      toast.error(
        errorMessage(error, "We couldn't start verification. Please try again.")
      );
    } finally {
      setBusy(false);
    }
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    if (!otp.trim()) {
      setErrors({ otp: "Enter the code we sent you" });
      return;
    }

    setBusy(true);
    try {
      await customer.confirmVerification({
        email: values.email.trim(),
        otp: otp.trim(),
      });
      setStep("verified");
      toast.success("Your account is verified.");
    } catch (error) {
      toast.error(errorMessage(error, "That code didn't work. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const borderFor = (name) => (errors[name] ? "border-[#C0392B]" : "border-[#E0E0E0]");

  return (
    <main className="w-full min-h-screen mt-[100px] flex flex-col items-center">
      <Seo
        title="Customer Panel"
        path="/customer-panel"
        description="Verify your details to access your Morselv customer panel — track enquiries, manage bookings and view your saved providers across web and mobile."
        noindex
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Customer Panel", path: "/customer-panel" },
        ])}
      />

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
          Your Morselv account
        </h1>
        <p className="max-w-[720px] text-center text-[#5D5D5D] font-montserrat text-[17px] md:text-[19px] leading-[27px] mt-5 px-4">
          Verify your name, email and phone number once to access your enquiries,
          bookings and saved providers — on web and mobile.
        </p>
      </section>

      <section
        aria-label="Customer verification"
        className="w-full px-4 sm:px-6 mt-12 mb-[120px]"
      >
        <div className="mx-auto w-full max-w-[560px] rounded-[16px] border border-[#E0E0E0] bg-white p-6 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-8">
          {step === "details" && (
            <form onSubmit={handleStart} noValidate>
              <h2 className="font-inter text-[24px] font-semibold text-[#121212]">
                Verify your details
              </h2>
              <p className="mt-2 font-montserrat text-[15px] leading-[24px] text-[#5D5D5D]">
                We'll send a one-time code to confirm it's really you.
              </p>

              <div className="mt-7 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Name <span className="text-[#C0392B]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={setField("name")}
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${borderFor("name")}`}
                  />
                  {errors.name && (
                    <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Email Address <span className="text-[#C0392B]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={setField("email")}
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${borderFor("email")}`}
                  />
                  {errors.email && (
                    <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Phone Number <span className="text-[#C0392B]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={15}
                    placeholder="10-digit mobile number"
                    value={values.phone}
                    onChange={setField("phone")}
                    aria-invalid={!!errors.phone}
                    className={`${inputBase} ${borderFor("phone")}`}
                  />
                  {errors.phone && (
                    <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-8 inline-flex h-[56px] w-full items-center justify-center rounded-[10px] bg-[#121212] font-montserrat text-[17px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Sending code…" : "Send verification code"}
              </button>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={handleConfirm} noValidate>
              <h2 className="font-inter text-[24px] font-semibold text-[#121212]">
                Enter your code
              </h2>
              <p className="mt-2 font-montserrat text-[15px] leading-[24px] text-[#5D5D5D]">
                We sent a one-time code to{" "}
                <span className="font-medium text-[#121212]">{values.email}</span>.
                It expires in 10 minutes.
              </p>

              <div className="mt-7 flex flex-col gap-2">
                <label htmlFor="otp" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                  Verification code <span className="text-[#C0392B]">*</span>
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={10}
                  placeholder="Enter the code"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setErrors((prev) => ({ ...prev, otp: undefined }));
                  }}
                  aria-invalid={!!errors.otp}
                  className={`${inputBase} ${borderFor("otp")} tracking-[0.3em]`}
                />
                {errors.otp && (
                  <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">
                    {errors.otp}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-8 inline-flex h-[56px] w-full items-center justify-center rounded-[10px] bg-[#121212] font-montserrat text-[17px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Verifying…" : "Verify and continue"}
              </button>

              <button
                type="button"
                onClick={() => setStep("details")}
                className="mt-4 w-full font-montserrat text-[14px] text-[#5D5D5D] underline"
              >
                Change my details
              </button>
            </form>
          )}

          {step === "verified" && (
            <div role="status" className="text-center">
              <h2 className="font-inter text-[26px] font-semibold text-[#121212]">
                You're verified
              </h2>
              <p className="mt-3 font-montserrat text-[16px] leading-[26px] text-[#5D5D5D]">
                Thanks {values.name.trim().split(" ")[0]}. Your Morselv customer
                account is confirmed. Browse services and your enquiries will be
                linked to this account.
              </p>
              <a
                href="/service"
                className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[10px] bg-[#121212] px-[36px] font-montserrat text-[16px] font-medium text-white transition-colors hover:bg-[#333]"
              >
                Explore services
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CustomerPanel;
