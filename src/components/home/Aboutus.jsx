import React from "react";

function Aboutus() {
    return (
        <div className="w-full bg-white text-black font-montserrat overflow-x-hidden">
            {/** ===================== DESKTOP (>= md) ===================== */}
            <div className="hidden md:block">
                {/** HERO */}
                <section className="w-full flex justify-center pt-14 mt-[105px] pb-10 px-8 md:px-4">
                    <div className="w-full max-w-[1280px] grid grid-cols-[minmax(0,506px)_minmax(500px,1fr)] items-start gap-4 mx-auto">
                        {/* Left copy */}
                        <div>
                            <div className="text-[#FECD8C] text-[24px] font-normal font-600 leading-[30px] mb-4">
                                ABOUT MOR-SELV
                            </div>
                            <h1 className="text-[#000] xl:text-[64px] text-[64px] font-bold md:text-[52px] leading-[80px] w-full">
                                Wellness, Designed for{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">Women</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="185"
                                        height="39"
                                        viewBox="0 0 215 39"
                                        fill="none"
                                        aria-hidden="true"
                                        className="absolute bottom-[8px] left-0 ml-[20px] xl:ml-[80px] h-auto z-0 opacity-100 pointer-events-none"
                                    >
                                        <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="font-inter text-[#4D4D4D] font-normal font-400 text-[18px] leading-[22.5px] w-full mt-6">
                                Connecting you with trusted experts across every aspect <br /> of women's well-being.
                            </p>
                        </div>
                        {/* Right overlapping grey boxes with responsive positioning */}
                        <div className="relative w-full min-h-[450px] flex justify-end">
                            <div className="relative w-full max-w-[600px] h-[450px]">
                                <div
                                    className="absolute top-0 left-0 w-[60%] max-w-[305px] h-[328px] rounded-[20px] bg-[#D9D9D9]
                                            transform transition-all duration-300"
                                />
                                <div
                                    className="absolute top-[150px] right-0 w-[60%] max-w-[413px] h-[238px] rounded-[20px] bg-[#D9D9D9]
                                            transform transition-all duration-300"
                                    style={{ boxShadow: "-12px -6px 35.8px rgba(0,0,0,0.25)" }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/** OUR STORY Section */}
                <section className="w-full pt-[100px] flex flex-col items-center">
                    {/* Title with orange trapezoid */}
                    <div className="relative inline-block">
                        <h2 className="relative z-10 text-[48px] text-[#000] font-bold leading-[60px]">OUR STORY</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="215"
                            height="39"
                            viewBox="0 0 215 39"
                            fill="none"
                            aria-hidden="true"
                            className="absolute z-0 top-[27px] ml-[95px] left-1/2 -translate-x-1/2 pointer-events-none opacity-100"
                        >
                            <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                        </svg>
                    </div>

                    {/* Story copy */}
                    <p className="w-full max-w-[1280px] text-[#2D2D2D] text-[24px] font-normal font-400 leading-[36px] mt-6 px-4">
                        Morselv was created with one mission — to make women's wellness simple, accessible, and truly holistic. 
                        We bring together trusted service providers across multiple wellness categories, so you can find the right 
                        support for your mind, body, and lifestyle — all in one place. Whether you're seeking expert guidance, 
                        personalized care, or just a safe space to focus on yourself, Morselv is here for you.
                    </p>

                    {/* Full-width beige band with a responsive grid layout */}
                    <div className="mt-10 w-full bg-[#F3D0A1] py-10 px-4 overflow-visible">
                        <div className="w-full max-w-[1280px] mx-auto grid grid-cols-12 gap-5">
                            {/* Left tall box spanning 3 columns and 2 rows */}
                            <div className="col-span-3 row-span-2 aspect-[3/4] rounded-[20px] bg-[#D9D9D9]" />

                            {/* Top row of boxes */}
                            <div className="col-span-4 aspect-[4/2] rounded-[20px] bg-[#D9D9D9]" />
                            <div className="col-span-2 aspect-[2/2] rounded-[20px] bg-[#D9D9D9]" />
                            <div className="col-span-3 aspect-[3.8/2] rounded-[20px] bg-[#D9D9D9]" />

                            {/* Bottom row of boxes */}
                            <div className="col-span-3 aspect-[3/1.8] rounded-[20px] bg-[#D9D9D9]" />
                            <div className="col-span-3 aspect-[3/1.8] rounded-[20px] bg-[#D9D9D9]" />
                            <div className="col-span-3 aspect-[3/2.2] rounded-[20px] bg-[#D9D9D9] md:-mt-6 lg:-mt-10" />
                        </div>
                    </div>
                </section>

                {/** MISSION & VALUES */}
                <section className="w-full flex justify-center py-16 xl:px-4 md:px-4">
                  <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-start gap-16 mx-auto">
                      {/* Left copy (no changes) */}
                      <div className="w-[560px]">
                          <div className="relative inline-block">
                              <h3 className="text-[#000] xl:text-[64px] md:text-[50px] text-[64px] font-bold leading-[80px]">
                                  <span className="relative inline-block">
                                      <span className="relative z-10">Our Mission</span>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 215 39"
                                          fill="none"
                                          aria-hidden="true"
                                          className="absolute bottom-[0px] left-0 ml-[125px] xl:ml-[145px] xl:w-[270px] w-[170px] h-[60px] z-0 opacity-80 pointer-events-none"
                                      >
                                          <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                                      </svg>
                                  </span>
                                  <br />&amp; Values
                              </h3>
                          </div>
                          <p className="text-[#2D2D2D] font-normal font--400 mt-7 w-[514px] xl:text-[24px] text-[24px] md:text-[18px] leading-[36px]">
                              To create a trusted space where women <br /> can access holistic wellness support, <br />connect with experts who truly care, and <br />feel empowered to prioritize their well- <br />being without barriers or guilt.
                          </p>
                      </div>

                      {/* Right card container - now using flexbox with controlled spacing */}
                      <div className="flex-1 w-full xl:ml-0 md:-ml-[270px]">
                          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                              {/* Card 1 */}
                              <div className="w-full h-full border border-[#BFBFBF] rounded-[20px] p-[41px] flex flex-col gap-10">
                                  <div className="w-[49px] h-[50px] bg-[#FECD8C] rounded-[6px]" />
                                  <div className="flex flex-col gap-2">
                                      <div className="text-[24px] md:text-[18px] text-[#000] font-semibold leading-[30px] text-wrap flex-shrink-0">Empowerment</div>
                                      <div className="text-[#5D5D5D] text-[20px] leading-[25px] font-normal">
                                          Helping women take charge of their wellness journey.
                                      </div>
                                  </div>
                              </div>

                              {/* Card 2 */}
                              <div className="w-full h-full border border-[#BFBFBF] rounded-[20px] p-[41px] flex flex-col gap-10 md:mt-[48px] xl:mt-[100px]">
                                  <div className="w-[49px] h-[50px] bg-[#FECD8C] rounded-[6px]" />
                                  <div className="flex flex-col gap-2">
                                      <div className="text-[24px] text-[#050101] md:text-[18px] font-semibold leading-[30px] text-wrap">Accessibility</div>
                                      <div className="text-[#4D4D4D] text-[20px] leading-[25px] font-normal font-inter font-400">
                                          Quality services for every budget and lifestyle.
                                      </div>
                                  </div>
                              </div>

                              {/* Card 3 */}
                              <div className="w-full h-full border border-[#BFBFBF] rounded-[20px] p-[41px] flex flex-col gap-10">
                                  <div className="w-[49px] h-[50px] bg-[#FECD8C] rounded-[6px]" />
                                  <div className="flex flex-col gap-2">
                                      <div className="text-[24px] text-[#000] md:text-[18px] font-semibold leading-[30px] text-wrap">Trust</div>
                                      <div className="text-[#4D4D4D] text-[20px] leading-[25px] font-normal font-inter font-400">
                                          Verified providers who care about your well-being.
                                      </div>
                                  </div>
                              </div>

                              {/* Card 4 */}
                              <div className="w-full h-full border border-[#BFBFBF] rounded-[20px] p-[41px] flex flex-col gap-10 md:mt-[48px] xl:mt-[100px]">
                                  <div className="w-[49px] h-[50px] bg-[#FECD8C] rounded-[6px]" />
                                  <div className="flex flex-col gap-2">
                                      <div className="text-[24px] text-[#000] md:text-[18px] font-semibold leading-[30px] text-wrap">Holistic Approach</div>
                                      <div className="text-[#4D4D4D] text-[20px] leading-[25px] font-normal font-inter font-400">
                                          Caring for body, mind, and soul together.
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
               {/** HOW IT WORKS */}
                <section className="w-full flex justify-center bg-[#FFF4E5] py-16 xl:mt-[100px] px-4">
                    <div className="w-full max-w-[1280px] mx-auto">
                        <div className="relative w-full text-center">
                            <h3 className="relative z-10 text-[#000] text-[64px] font-bold leading-[80px] inline-block">How it Works</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="225"
                                height="59"
                                viewBox="0 0 215 39"
                                fill="none"
                                aria-hidden="true"
                                className="absolute z-0 bottom-[0px] left-1/2 -translate-x-1/2 pointer-events-none ml-[120px]"
                            >
                                <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                            </svg>
                        </div>
                        {/* Steps */}
                        <div className="mt-12 w-full flex items-start justify-center gap-14">
                            {/* Step 1 */}
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center rounded-[60px] border-[4px] border-[#FECD8C] p-[10px]">
                                    <div className="text-[#FECD8C] text-[40px] font-bold leading-[50px] w-12 h-12 flex items-center justify-center">1.</div>
                                </div>
                                <div className="mt-3 text-[#000] text-[24px] font-bold leading-[30px]">EXPLORE</div>
                                <div className="mt-2 text-[#2D2D2D] font-400 text-[16px] leading-[20px] font-normal">
                                    Discover a variety of trusted wellness services — from fitness to mental health — all in one place.
                                </div>
                            </div>
                            {/* connector */}
                            <div className="self-center pt-4">
                                <svg width="68.029" height="10" viewBox="0 0 65 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M59.0146 1C60.3407 0.884153 61.6125 1.30944 62.5502 2.24906C63.4879 3.1848 64.0146 4.55807 64.0146 6C64.0146 7.44193 63.4879 8.8152 62.5502 9.75094C61.6125 10.6906 60.3407 11.1158 59.0146 11C58.0475 10.9167 57.0803 10.8333 56.1132 10.75C38.7044 9.25 21.2955 7.75 3.88671 6.25C2.91955 6.16667 1.9524 6.08333 0.985245 6C1.9524 5.91667 2.91955 5.83333 3.88671 5.75C21.2955 4.25 38.7044 2.75 56.1132 1.25C57.0803 1.16667 58.0475 1.08333 59.0146 1Z" fill="#FECD8C" />
                                </svg>
                            </div>
                            {/* Step 2 */}
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center rounded-[60px] border-[4px] border-[#FECD8C] p-[10px]">
                                    <div className="text-[#FECD8C] text-[40px] font-bold leading-[50px] w-12 h-12 flex items-center justify-center">2.</div>
                                </div>
                                <div className="mt-3 text-[#000] text-[24px] font-bold leading-[30px]">SELECT</div>
                                <div className="mt-2 text-[#2D2D2D] font-400 text-[16px] leading-[20px] font-normal">
                                    Find the provider who understands your needs and aligns with your wellness goals.
                                </div>
                            </div>
                            {/* connector */}
                            <div className="self-center pt-4">
                                <svg width="68.029" height="10" viewBox="0 0 65 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M59.0146 1C60.3407 0.884153 61.6125 1.30944 62.5502 2.24906C63.4879 3.1848 64.0146 4.55807 64.0146 6C64.0146 7.44193 63.4879 8.8152 62.5502 9.75094C61.6125 10.6906 60.3407 11.1158 59.0146 11C58.0475 10.9167 57.0803 10.8333 56.1132 10.75C38.7044 9.25 21.2955 7.75 3.88671 6.25C2.91955 6.16667 1.9524 6.08333 0.985245 6C1.9524 5.91667 2.91955 5.83333 3.88671 5.75C21.2955 4.25 38.7044 2.75 56.1132 1.25C57.0803 1.16667 58.0475 1.08333 59.0146 1Z" fill="#FECD8C" />
                                </svg>
                            </div>
                            {/* Step 3 */}
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center rounded-[60px] border-[4px] border-[#FECD8C] p-[10px]">
                                    <div className="text-[#FECD8C] text-[40px] font-bold leading-[50px] w-12 h-12 flex items-center justify-center">3.</div>
                                </div>
                                <div className="mt-3 text-[#000] text-[24px] font-bold leading-[30px]">BOOK</div>
                                <div className="mt-2 text-[#2D2D2D] font-400 text-[16px] leading-[20px] font-normal">
                                    Schedule your session instantly, and start your journey toward better well-being.
                                </div>
                            </div>
                        </div>
                        {/* CTA */}
                        <div className="w-full flex justify-center mt-[120px]">
                            <button className="inline-flex h-[60px] items-center gap-2 rounded-[10px] bg-[#121212] px-[44px] py-[16px] text-white text-[20px] font-medium leading-[22px]">
                                Explore Mor-Selv
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="25" viewBox="0 0 13 25" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.003 13.2406L4.87461 19.1333L3.34277 17.6604L8.70527 12.5042L3.34277 7.34792L4.87461 5.875L11.003 11.7677C11.2061 11.9631 11.3202 12.228 11.3202 12.5042C11.3202 12.7804 11.2061 13.0453 11.003 13.2406Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section> 
            </div>

            {/** ===================== MOBILE (< md) ===================== */}
            <div className="block md:hidden w-full px-4 overflow-x-hidden mt-[105px]">
                {/* HERO Mobile */}
                <section>
                    <div className="text-[#FECD8C] text-[18px] font-normal font-600 leading-[26px] mb-3">ABOUT MOR-SELV</div>
                    <h1 className="text-[#000] text-[34px] font-bold leading-[42px]">
                        Wellness, Designed for{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">Women</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100"
                                height="18"
                                viewBox="0 0 215 39"
                                fill="none"
                                className="absolute -bottom-0 left-0 ml-[40px] w-[115px] h-[28px] z-0"
                            >
                                <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FCD69B" />
                            </svg>
                        </span>
                    </h1>
                    <p className="font-inter text-[#4D4D4D] text-[16px] leading-[20px] mt-3">
                        Connecting you with trusted experts across every aspect of women's well-being.
                    </p>

                    {/* Mobile overlapping boxes */}
                    <div className="relative mt-6 h-[420px] w-full">
                        <div className="absolute left-0 top-2 w-[60%] h-[328px] rounded-[20px] bg-[#D9D9D9]" />
                        <div
                            className="absolute top-[150px] right-0 w-[60%] h-[238px] rounded-[20px] bg-[#D9D9D9]"
                            style={{ boxShadow: "-12px -6px 35.8px rgba(0,0,0,0.25)" }}
                        />
                    </div>
                </section>

                {/* STORY Mobile - Full width orange box with responsive grid */}
                <section className="mt-10">
                    <div className="relative inline-block w-full text-center">
                        <h2 className="text-[#000] relative z-10 text-[28px] font-bold">OUR STORY</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="140"
                            height="28"
                            viewBox="0 0 215 39"
                            fill="none"
                            className="absolute z-0 ml-[60px] top-[18px] left-1/2 -translate-x-1/2 w-[140px] h-[28px] pointer-events-none"
                        >
                            <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                        </svg>
                    </div>
                    <p className="mt-4 text-[#2D2D2D] text-[16px] leading-[22px] font-normal font-400 text-center px-2">
                        Morselv was created with one mission — to make women's wellness simple, accessible, and truly holistic.
                        We bring together trusted service providers across multiple wellness categories, so you can find the right support 
                        for your mind, body, and lifestyle — all in one place. Whether you're seeking expert guidance, personalized care, or
                        just a safe space to focus on yourself, Morselv is here for you.
                    </p>

                    {/* Full width orange container with responsive grid */}
                    <div className="mt-6 w-screen bg-[#F3D0A1] py-6 -mx-4 overflow-visible">
                        {/* Inner container matching the page width */}
                        <div className="w-full px-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-1 row-span-2 aspect-[3/4.1] rounded-[20px] bg-[#D9D9D9]" />
                                <div className="col-span-1 aspect-[3/2] rounded-[20px] bg-[#D9D9D9]" />
                                <div className="col-span-1 aspect-[3/2] rounded-[20px] bg-[#D9D9D9]" />
                                <div className="col-span-1 aspect-[3/2] rounded-[20px] bg-[#D9D9D9]" />
                                <div className="col-span-1 aspect-[3/2] rounded-[20px] bg-[#D9D9D9]" />
                                <div className="col-span-1 aspect-[3/2] rounded-[20px] bg-[#D9D9D9]" />
                                <div className="col-span-1 aspect-[3/2] rounded-[20px] bg-[#D9D9D9]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* MISSION Mobile */}
                <section className="mt-10">
                    <div className="relative inline-block">
                        <h3 className="relative text-[28px] text-[#000] font-bold leading-tight inline-block">
                            Our{" "}
                            <span className="relative inline-block z-10">
                                <span className="relative z-10">Mission</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 215 39"
                                    className="absolute top-[5px] left-[10px] w-[101px] h-[35px] z-0"
                                    fill="none"
                                >
                                    <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                                </svg>
                            </span>
                            {" "} &amp; Values
                        </h3>
                    </div>
                    <p className="mt-3 text-[16px] text-[#2D2D2D] leading-[22px]">
                        To create a trusted space where women can access holistic wellness support, connect with experts who truly care, and feel empowered to prioritize their well-being without barriers or guilt.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        {[
                            { title: "Empowerment", text: "Helping women take charge of their wellness journey." },
                            { title: "Accessibility", text: "Quality services for every budget and lifestyle." },
                            { title: "Trust", text: "Verified providers who care about your well-being." },
                            { title: "Holistic Approach", text: "Caring for body, mind, and soul together." }
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="w-full h-[230px] border border-[#BFBFBF] rounded-[20px] p-5 flex flex-col gap-6"
                            >
                                <div className="w-[42px] h-[44px] bg-[#FECD8C] rounded-[6px]" />
                                <div className="text-[18px] font-semibold">{item.title}</div>
                                <div className="text-[14px] leading-[18px] font-normal font-400 text-[#4D4D4D]">
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* HOW IT WORKS Mobile - full width pink box */}
                <section className="mt-12 w-screen bg-[#FFF4E5] py-10 -mx-4">
                    <div className="px-4">
                        <div className="relative text-center">
                            <h3 className="relative z-10 text-[32px] text-[#000] font-bold">How it Works</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100"
                                height="28"
                                viewBox="0 0 215 39"
                                fill="none"
                                className="absolute z-0 -bottom-0 left-1/2 -translate-x-1/2 w-[140px] h-[28px] pointer-events-none ml-[70px]"
                            >
                                <path d="M10.4116 0H215L204.588 39H0L10.4116 0Z" fill="#FECD8C" />
                            </svg>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-8">
                            {[1, 2, 3].map((n, i) => (
                                <div key={n} className="w-full max-w-[360px] text-center">
                                    <div className="inline-flex rounded-[60px] border-[4px] border-[#FECD8C] px-[21px] py-[10px]">
                                        <span className="text-[34px] font-bold text-[#FECD8C]">{n}.</span>
                                    </div>
                                    <div className="mt-3 text-[20px] text-[#000] font-bold">{["EXPLORE", "SELECT", "BOOK"][i]}</div>
                                    <div className="mt-2 text-[14px] text-[#2D2D2D] font-inter font-normal font-400 leading-[18px]">
                                        {i === 0 && "Discover a variety of trusted wellness services — from fitness to mental health — all in one place."}
                                        {i === 1 && "Find the provider who understands your needs and aligns with your wellness goals."}
                                        {i === 2 && "Schedule your session instantly, and start your journey toward better well-being."}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-[60px] flex justify-center">
                            <button className="inline-flex h-[56px] items-center gap-2 rounded-[10px] bg-[#121212] px-8 text-white text-[18px] font-medium">
                                Explore Mor-Selv
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="25" viewBox="0 0 13 25" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.003 13.2406L4.87461 19.1333L3.34277 17.6604L8.70527 12.5042L3.34277 7.34792L4.87461 5.875L11.003 11.7677C11.2061 11.9631 11.3202 12.228 11.3202 12.5042C11.3202 12.7804 11.2061 13.0453 11.003 13.2406Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Aboutus;