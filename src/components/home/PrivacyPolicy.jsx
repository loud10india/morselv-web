import React from "react";

function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white font-montserrat mt-[70px] md:mt-[90px]">
      {/* ================= HERO SECTION ================= */}
      <div
        className="w-full flex flex-col items-center justify-center text-center px-4 py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(254, 205, 140, 0.40) 0%, rgba(163, 163, 163, 0.00) 100%)",
        }}
      >
        <p className="text-[#FECD8C] font-montserrat font-semibold text-[24px] leading-[30px] mt-[108px]">
          PRIVACY POLICY
        </p>
        <h1 className="text-[#000] font-inter font-semibold text-[40px] md:text-[64px] leading-[125%] mt-2">
          Your Trust, Our Priority
        </h1>
        <p className="text-[#5D5D5D] font-inter font-normal text-[16px] md:text-[20px] leading-[125%] max-w-[1280px] mt-4 text-center">
          At Mor-Selv, your privacy is our priority. We are committed to
          safeguarding your personal information and ensuring transparency about{" "}
          <br />
          how we collect, use, and protect your data. This Privacy Policy
          outlines our practices concerning the information we collect through
          our <br />
          website and services.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[1280px] h-[3px] bg-[#EBEBEB] mt-[97px] mb-[71px]" />

      {/* ================= CONTENT ================= */}
      <div className="w-full max-w-[1280px] flex flex-col gap-8 px-4 pb-32">
        {/* Section 1 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            1. Information We Collect
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We may collect the following types of information when you interact
            with us:
          </p>
          <ul className="list-disc list-inside text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[24px] mt-2 space-y-2">
            <li>
              <span className="font-bold">Personal Information:</span> Name,
              email address, phone number, and other details you provide when
              booking appointments or filling out forms.
            </li>
            <li>
              <span className="font-bold">Payment Information:</span> For
              transactions, we collect billing details, but payment processing
              is handled securely by third-party providers.
            </li>
            <li>
              <span className="font-bold">Usage Data:</span> Information about
              how you use our website, including IP address, browser type, and
              browsing behavior.
            </li>
            <li>
              <span className="font-bold">Communication Data:</span> Details
              from your communications with us, such as emails, messages, or
              customer service interactions.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            2. How We Use Your Information
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We may collect the following types of information when you interact
            with us:
          </p>
          <ul className="list-disc list-inside text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[24px] mt-2 space-y-2">
            <li>Provide and improve our services.</li>
            <li>Process bookings, payments, and memberships.</li>
            <li>
              Send promotional offers, updates, and relevant communications
              (with your consent).
            </li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Analyze website usage and improve user experience.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            3. Sharing Your Information
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We do not sell or rent your personal information. However, we may
            share your data with trusted third parties, including:
          </p>
          <ul className="list-disc list-inside text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[24px] mt-2 space-y-2">
            <li>
              <span className="font-bold">Service Providers:</span> To process
              payments, manage bookings, or send communications on our behalf.
            </li>
            <li>
              <span className="font-bold">Legal Obligations:</span> To comply
              with applicable laws, regulations, or legal requests.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            4. Sharing Your Information
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We implement robust security measures to protect your personal
            information from unauthorized access, alteration, or disclosure.
            Despite our efforts, no <br />
            system is entirely secure, and we encourage you to use caution when
            sharing sensitive data.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            5. Cookies and Tracking Technologies
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We use cookies to enhance your browsing experience and analyze
            website traffic. You can manage cookie preferences through your
            browser settings. By <br /> continuing to use our website, you
            consent to our use of cookies.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            6. Your Rights
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[24px] mt-2 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request corrections or updates to your information.</li>
            <li>Withdraw consent for marketing communications.</li>
            <li>
              Request the deletion of your data, subject to legal obligations.{" "}
              <br /> <br /> To exercise your rights, please contact us at{" "}
              <span className="underline">info@morselv.com</span>.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            7. Third-Party Links
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            Our website may contain links to external sites. We are not
            responsible for the privacy practices of these third-party websites
            and encourage you to review <br /> their policies.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. The revised policy will be
            posted on this page with <br /> the updated effective date.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-[#5D5D5D] font-montserrat font-semibold text-[20px] leading-[25px]">
            9. Contact Us
          </h2>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. The revised policy will be
            posted on this page with <br /> the updated effective date.
          </p>
          <ul className="list-disc pl-5 text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[24px] mt-2 space-y-1">
            <li>
              <span className="font-semibold">
                Email: <span className="font-normal">info@morselv.com</span>
              </span>
            </li>
            <li>
              <span className="font-semibold">
                Phone: <span className="font-normal">+91-9818257300</span>
              </span>
            </li>
            <li>
              <span className="font-semibold">
                Address:{" "}
                <span className="font-normal">
                  FEMTECH SPHERE TECH PRIVATE LIMITED, AltF Coworking, Suncity
                  Success Tower, Sector 65, Gurugram, Haryana 122005
                </span>
              </span>
            </li>
          </ul>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-4">
            By using our website or services, you agree to this Privacy Policy
            and our practices described herein. Thank you for trusting Mor-Selv
            with your personal <br /> information.
          </p>
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[20px] mt-2">
            Effective Date:SEP 24, 2025
          </p>
        </section>
      </div>
    </div>
  );
}
export default PrivacyPolicy;