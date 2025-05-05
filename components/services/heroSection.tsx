"use client";

import VideoCard from "./VideoCard";

export function HeroSection() {
    return (
      <section className="overflow-hidden relative py-5 px-10 mt-15">
        {/* Mobile Hero */}
        <div className="block lg:hidden space-y-4 text-center">
          <h1 className="text-3xl font-bold text-[#dba052] leading-relaxed drop-shadow-md tracking-wide">
            Our Services
          </h1>
          <p className="text-md font-semibold text-[#4d4b4b]">
            "Self-care is not a luxury, it's a necessity. Explore treatments crafted just for you."
          </p>
          <VideoCard src="/servicePage/color_nail.mp4" alt="Color Nail" className="h-[200px] w-full" />
        </div>
  
        {/* Desktop Hero */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-2 h-[75vh] overflow-hidden mb-12">
          <div className="col-span-2 row-span-2 row-start-2 flex flex-col justify-center px-6">
            <h1 className="text-3xl font-bold text-[#dba052] leading-relaxed drop-shadow-md tracking-wide">
              Our Services
            </h1>
            <p className="text-md font-semibold text-[#4d4b4b] mt-4">
              "Self-care is not a luxury, it's a necessity. Explore treatments crafted just for you."
            </p>
          </div>
          <VideoCard src="/servicePage/hair_cut.mp4" alt="Hair Cut" className="row-span-5 col-start-6 row-start-1" />
          <VideoCard src="/servicePage/pedicure.mp4" alt="Pedicure" className="row-span-3 col-span-2 col-start-4 row-start-4" />
          <VideoCard src="/servicePage/waxing.mp4" alt="Waxing" className="row-span-3 col-span-2 col-start-4 row-start-1" />
          <VideoCard src="/servicePage/nail_paint.mp4" alt="Nail Paint" className="row-span-5 col-span-1 col-start-3 row-start-2" />
        </div>
      </section>
    );
  }