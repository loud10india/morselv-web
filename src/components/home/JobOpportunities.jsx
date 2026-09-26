import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Seo from "../utils/Seo";
import { staticPageMeta } from "../../seo/siteConfig";
import jobsApi from "../../api/jobs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ".pdf,.doc,.docx";
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  position: "",
  message: "",
};

const inputBase =
  "w-full rounded-[10px] border bg-white px-4 py-3 font-montserrat text-[15px] text-[#121212] outline-none transition-colors placeholder:text-[#9A9A9A] focus:border-[#121212]";

function JobOpportunities() {
  const [openings, setOpenings] = useState([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);
  const [values, setValues] = useState(EMPTY);
  const [openingID, setOpeningID] = useState("");
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const fileRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    let active = true;
    jobsApi
      .getOpenings()
      .then((res) => {
        const list = res?.data?.[0];
        if (active && Array.isArray(list)) setOpenings(list);
      })
      .catch(() => {
        /* the CV form still works without a list of roles */
      })
      .finally(() => active && setLoadingOpenings(false));
    return () => {
      active = false;
    };
  }, []);

  const setField = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) return setCv(null);
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setErrors((p) => ({ ...p, cv: "Please upload a PDF or Word document" }));
      setCv(null);
      e.target.value = "";
      return;
    }
    if (f.size > MAX_CV_BYTES) {
      setErrors((p) => ({ ...p, cv: "Your CV must be under 5 MB" }));
      setCv(null);
      e.target.value = "";
      return;
    }
    setErrors((p) => ({ ...p, cv: undefined }));
    setCv(f);
  };

  const validate = () => {
    const f = {};
    if (!values.fullName.trim()) f.fullName = "Your name is required";
    if (!values.email.trim()) f.email = "Email address is required";
    else if (!EMAIL_RE.test(values.email.trim())) f.email = "Enter a valid email address";
    const digits = values.phone.replace(/\D/g, "");
    if (!digits) f.phone = "Phone number is required";
    else if (digits.length !== 10) f.phone = "Enter a 10-digit phone number";
    if (!cv) f.cv = "Please attach your CV";
    setErrors(f);
    return Object.keys(f).length === 0;
  };

  // Applying from a role card scrolls to the form and preselects that opening.
  const applyTo = (opening) => {
    setOpeningID(String(opening.ID));
    setValues((v) => ({ ...v, position: opening.Title }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("website", honeypot); // honeypot — server drops the request when filled
      fd.append("fullName", values.fullName.trim());
      fd.append("email", values.email.trim());
      fd.append("phone", values.phone.replace(/\D/g, ""));
      if (values.city.trim()) fd.append("city", values.city.trim());
      if (values.position.trim()) fd.append("position", values.position.trim());
      if (values.message.trim()) fd.append("message", values.message.trim());
      if (openingID) fd.append("openingID", openingID);
      fd.append("resume", cv);

      await jobsApi.submitApplication(fd);
      setDone(true);
      setValues(EMPTY);
      setCv(null);
      setOpeningID("");
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Thanks! Your CV has been submitted.");
    } catch (err) {
      toast.error(
        typeof err === "string" && err
          ? err
          : "We couldn't submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const borderFor = (k) => (errors[k] ? "border-[#C0392B]" : "border-[#E0E0E0]");

  return (
    <main className="w-full bg-white">
      <Seo {...staticPageMeta("/job-opportunities")} />

      {/* Hero */}
      <section
        className="w-full flex flex-col items-center justify-center pt-[150px] pb-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(254,205,140,0.40) 0%, rgba(163,163,163,0.00) 100%)",
        }}
      >
        <p className="font-montserrat text-[20px] md:text-[24px] font-semibold leading-[30px] text-[#DE9636]">
          JOB OPPORTUNITIES
        </p>
        <h1 className="mt-3 max-w-[980px] font-inter text-[32px] md:text-[54px] font-semibold leading-[1.15] text-[#000]">
          Opportunities available with different{" "}
          <span className="relative inline-block">
            <span className="relative z-10">partners of Morselv</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 z-0 h-[10px] md:h-[14px] bg-[#FECD8C]/70"
            />
          </span>
        </h1>
        <p className="mt-6 max-w-[760px] font-montserrat text-[16px] md:text-[18px] leading-[28px] text-[#5D5D5D]">
          Morselv partners with salons, spas, clinics, studios and lifestyle
          businesses across India. Browse current openings, or send us your CV
          and we&rsquo;ll match you with the right partner as roles open up.
        </p>
      </section>

      {/* Current openings */}
      <section
        aria-labelledby="openings-heading"
        className="mx-auto w-[90%] max-w-[1180px] py-14 md:py-20"
      >
        <div className="flex items-center w-full mb-8">
          <h2
            id="openings-heading"
            className="whitespace-nowrap font-montserrat text-xl md:text-2xl lg:text-3xl font-bold tracking-wider text-black"
          >
            CURRENT OPENINGS WITH MORSELV PARTNERS
          </h2>
          <div className="flex-1 mx-4 h-[2px] bg-black" />
        </div>

        {loadingOpenings ? (
          <p className="font-montserrat text-[15px] text-[#5D5D5D]">Loading openings…</p>
        ) : openings.length === 0 ? (
          <div className="rounded-2xl border border-[#EFEFEF] bg-[#FBFBFB] px-6 py-12 text-center">
            <p className="font-montserrat text-[16px] text-[#5D5D5D]">
              There are no listed openings right now — but partners hire
              regularly. Submit your CV below and we&rsquo;ll be in touch when a
              suitable role opens.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {openings.map((o) => (
              <li
                key={o.ID}
                className="flex h-full flex-col rounded-[16px] border border-[#E6E6E6] bg-white p-6 shadow-[0_3px_15px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_26px_rgba(0,0,0,0.10)]"
              >
                {o.Partner && (
                  <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#DE9636]">
                    {o.Partner}
                  </p>
                )}
                <h3 className="mt-2 font-inter text-[21px] font-semibold text-[#121212]">
                  {o.Title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[o.Location, o.JobType, o.Department].filter(Boolean).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#F4F4F4] px-3 py-1 font-montserrat text-[12px] text-[#4D4D4D]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {o.Description && (
                  <p className="mt-4 font-montserrat text-[14px] leading-[23px] text-[#5D5D5D]">
                    {o.Description}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => applyTo(o)}
                  className="mt-6 inline-flex h-[46px] items-center justify-center self-start rounded-[10px] bg-[#121212] px-7 font-montserrat text-[14px] font-medium text-white transition-colors hover:bg-[#333]"
                >
                  Apply now
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* CV submission */}
      <section
        ref={formRef}
        aria-labelledby="cv-heading"
        className="w-full bg-[#FBFBFB] py-14 md:py-20 scroll-mt-[110px]"
      >
        <div className="mx-auto w-[90%] max-w-[760px]">
          {done ? (
            <div
              role="status"
              className="rounded-[16px] border border-[#E0E0E0] bg-white p-8 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]"
            >
              <h2 className="font-inter text-[28px] font-semibold text-[#121212]">
                CV received
              </h2>
              <p className="mt-3 font-montserrat text-[16px] leading-[26px] text-[#5D5D5D]">
                Thanks for applying. Our team will review your profile and reach
                out when a matching role opens with one of our partners.
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[10px] bg-[#121212] px-9 font-montserrat text-[16px] font-medium text-white hover:bg-[#333]"
              >
                Submit another CV
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              aria-labelledby="cv-heading"
              className="relative rounded-[16px] border border-[#E0E0E0] bg-white p-6 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-8"
            >
              <h2
                id="cv-heading"
                className="font-inter text-[26px] sm:text-[30px] font-semibold leading-[34px] text-[#121212]"
              >
                Submit your CV for opportunities with Morselv Partners
              </h2>
              <p className="mt-2 font-montserrat text-[15px] leading-[24px] text-[#5D5D5D]">
                You don&rsquo;t need an open role to apply — send your details and
                we&rsquo;ll keep you in mind for partner openings.
              </p>


              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="job-website">Website</label>
                <input
                  id="job-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Full Name <span className="text-[#C0392B]">*</span>
                  </label>
                  <input id="fullName" type="text" autoComplete="name" placeholder="Your full name"
                    value={values.fullName} onChange={setField("fullName")}
                    aria-invalid={!!errors.fullName}
                    className={`${inputBase} ${borderFor("fullName")}`} />
                  {errors.fullName && <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">{errors.fullName}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Email Address <span className="text-[#C0392B]">*</span>
                  </label>
                  <input id="email" type="email" autoComplete="email" placeholder="you@example.com"
                    value={values.email} onChange={setField("email")}
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${borderFor("email")}`} />
                  {errors.email && <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Phone Number <span className="text-[#C0392B]">*</span>
                  </label>
                  <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={15}
                    placeholder="10-digit mobile number"
                    value={values.phone} onChange={setField("phone")}
                    aria-invalid={!!errors.phone}
                    className={`${inputBase} ${borderFor("phone")}`} />
                  {errors.phone && <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">{errors.phone}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    City
                  </label>
                  <input id="city" type="text" autoComplete="address-level2" placeholder="e.g. Gurugram"
                    value={values.city} onChange={setField("city")}
                    className={`${inputBase} border-[#E0E0E0]`} />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="position" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Role you&rsquo;re interested in
                  </label>
                  <select
                    id="position"
                    value={openingID}
                    onChange={(e) => {
                      const id = e.target.value;
                      setOpeningID(id);
                      const match = openings.find((o) => String(o.ID) === id);
                      setValues((v) => ({ ...v, position: match ? match.Title : "" }));
                    }}
                    className={`${inputBase} border-[#E0E0E0] ${openingID ? "" : "text-[#9A9A9A]"}`}
                  >
                    <option value="">Open application — any suitable role</option>
                    {openings.map((o) => (
                      <option key={o.ID} value={o.ID}>
                        {o.Title}
                        {o.Partner ? ` — ${o.Partner}` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="cv" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Upload CV <span className="text-[#C0392B]">*</span>
                  </label>
                  <input
                    id="cv"
                    ref={fileRef}
                    type="file"
                    accept={ACCEPTED}
                    onChange={onFile}
                    aria-invalid={!!errors.cv}
                    className={`w-full rounded-[10px] border ${borderFor("cv")} bg-white px-4 py-3 font-montserrat text-[14px] text-[#4D4D4D] file:mr-4 file:rounded-[8px] file:border-0 file:bg-[#121212] file:px-4 file:py-2 file:font-montserrat file:text-[13px] file:text-white hover:file:bg-[#333]`}
                  />
                  <p className="font-montserrat text-[12px] text-[#8A8A8A]">
                    PDF or Word document, up to 5 MB.
                    {cv ? ` Selected: ${cv.name}` : ""}
                  </p>
                  {errors.cv && <p role="alert" className="font-montserrat text-[13px] text-[#C0392B]">{errors.cv}</p>}
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="font-montserrat text-[14px] font-medium text-[#2D2D2D]">
                    Anything you&rsquo;d like us to know
                  </label>
                  <textarea id="message" rows={4}
                    placeholder="Experience, availability, preferred location…"
                    value={values.message} onChange={setField("message")}
                    className={`${inputBase} border-[#E0E0E0] resize-y`} />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 inline-flex h-[58px] w-full items-center justify-center rounded-[10px] bg-[#121212] px-10 font-montserrat text-[17px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Submitting…" : "Submit CV"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default JobOpportunities;
