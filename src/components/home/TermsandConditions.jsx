import React from "react";

function TermsAndConditions() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col mt-[70px] md:mt-[70px]">
      {/* Top Gradient Box */}
      <div className="w-full bg-gradient-to-b from-[#FECD8C66] to-transparent flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-[#FECD8C] font-montserrat text-2xl font-semibold  leading-[125%] mt-[108px]">
          TERMS & CONDITIONS
        </h2>
        <h1 className="text-[#000] font-inter text-5xl md:text-6xl font-semibold leading-[125%] mt-4">
          Our Agreement with You
        </h1>
        <p className="text-[#5D5D5D] font-inter text-[16px] md:text-[20px] font-normal leading-[125%] max-w-[1280px] mt-4">
          At Mor-Selv, we value trust and transparency. These Terms & Conditions
          set the guidelines for using our website and services, ensuring <br /> a safe
          and fair experience for everyone.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[1280px] h-[3px] bg-[#EBEBEB] mt-[102px] mb-[71px] mx-auto px-4"></div>

      {/* Terms Content */}
      <div className="w-full flex-1 px-4 flex flex-col items-center pb-20">
        <div className="w-full max-w-[1280px] space-y-8 text-left">
          {/* Intro */}
          <p className="text-[#5D5D5D] font-montserrat text-[16px] md:text-[16px] font-normal font-500 leading-[125%]">
            Welcome to Mor-Selv. By accessing our website or using our services,
            you agree to comply with and be bound by the following terms and
            conditions. Please <br />read them carefully before proceeding.
          </p>

          {/* Section 1 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold  leading-[125%]">
              1. Acceptance of Terms
            </h3>
            <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] mt-6">
              By using our website or services, you confirm that you accept these
              terms and conditions. If you do not agree, please refrain from using
              our site or services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold  leading-[125%]">
              2. Services Provided
            </h3>
            <p className="text-[#5D5D5D] font-montserrat text-[16px] font-500 font-normal leading-[125%] mt-6">
              Mor-Selv offers women-only wellness and spa services. All services
              are subject to availability and may vary based on location.
              Memberships and promotions <br />are subject to additional terms outlined
              in their respective agreements.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%] pb-6">
              3. Booking and Payment
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-[#5D5D5D]">
                <span className="font-montserrat text-[16px] font-bold leading-[24px]">
                  Booking:{" "}
                </span>
                <span className="font-montserrat text-[16px] font-normal font-500 leading-[24px]">
                  All appointments must be booked in advance. Walk-ins are subject to availability.
                </span>
              </li>
              <li className="text-[#5D5D5D]">
                <span className="font-montserrat text-[16px] font-bold leading-[24px]">
                  Payments:{" "}
                </span>
                <span className="font-montserrat text-[16px] font-normal font-500 leading-[24px]">
                  Payments for services must be made at the time of booking or during the visit. Membership fees are non-refundable.
                </span>
              </li>
              <li className="text-[#5D5D5D]">
                <span className="font-montserrat text-[16px] font-bold leading-[24px]">
                  Cancellations:{" "}
                </span>
                <span className="font-montserrat text-[16px] font-normal font-500 leading-[24px]">
                  Cancellations must be made at least 24 hours before the appointment. Late cancellations or no-shows may incur charges.
                </span>
              </li>
            </ul>
          </div>
          {/* Section 4 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              4. Membership Terms
            </h3>
            <ul className="list-disc pl-5  text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] mt-6">
              <li>
                Memberships are non-transferable and valid for the specified
                duration only.
              </li>
              <li className="py-1">
                Unused services in membership plans may roll over, subject to
                specific membership terms.
              </li>
              <li className="py-1">
                Additional terms for memberships are outlined in our Membership
                Agreement.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              5. Conduct and Usage
            </h3>
            <ul className="list-disc pl-5 mt-6 text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%]">
              <li>
                Our spa is a women-only space, and we reserve the right to deny
                service to anyone who does not adhere to this policy.
              </li>
              <li className="py-1">
                Guests are expected to conduct themselves respectfully. Any
                disruptive or inappropriate behavior may result in service
                refusal.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              6. Limitation of Liability
            </h3>
            <ul className="list-disc text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[150%] mt-6">
              <p>Mor-Selv is not liable for:</p>
              <div className="pl-5">
                <li className="py-1">
                  Any adverse reactions to treatments or products unless caused by
                  our negligence.
                </li>
                <li>
                  Loss, theft, or damage of personal belongings during visits.
                </li>
              </div>
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              7. Intellectual Property
            </h3>
            <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] mt-6">
              All content on our website, including text, images, logos, and
              graphics, is the property of Mor-Selv and is protected under
              intellectual property laws. <br /> Unauthorized use is strictly prohibited.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              8. Privacy Policy
            </h3>
            <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] mt-6">
              Your use of our website and services is also governed by our Privacy
              Policy. Please review it to understand how we collect and use your
              personal information.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              9. Changes to Terms
            </h3>
            <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] mt-6">
              We reserve the right to update these terms and conditions at any
              time. Changes will be effective immediately upon posting on this
              page. Please check this <br /> page regularly for updates.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h3 className="text-[#5D5D5D] font-montserrat text-[20px] font-semibold leading-[125%]">
              10. Contact Us
            </h3>
            <div className="mt-6 text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[150%]">
              <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.
                The revised policy will be posted on this page with <br />
                the updated effective date.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <span className="font-semibold">Email:</span> info@morselv.com
                </li>
                <li>
                  <span className="font-semibold">Phone:</span> +91-9818257300
                </li>
                <li>
                  <span className="font-semibold">Address:</span> FEMTECH SPHERE
                  TECH PRIVATE LIMITED, AltF Coworking, Suncity Success Tower,
                  Sector 65, Gurugram, Haryana 122005
                </li>
              </ul>
            </div>
          </div>

          {/* Closing Note */}
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] ">
            By using our website or services, you agree to these terms and
            conditions. Thank you for choosing Mor-Selv for your wellness journey.
          </p>

          {/* Effective Date */}
          <p className="text-[#5D5D5D] font-montserrat text-[16px] font-normal font-500 leading-[125%] mt-4">
            Effective Date:SEP 24, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
export default TermsAndConditions;