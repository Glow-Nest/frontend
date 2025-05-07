"use client";

import TextBox from "../landingPage/Textbox";
import VideoCard from "./VideoCard";

export function HeroSection() {
  const textBoxProps = {
    headline: "Our Services",
    subheadline: "Self-care is not a luxury, it's a necessity. Explore treatments crafted just for you.",
    showButton: false,
  };

  return (
    <section className="overflow-hidden relative py-5 px-10 mt-15">
      {/* Small screens */}
      <div className="block md:hidden space-y-4 text-center">
        <VideoCard src="/servicePage/nail_paint.mp4" alt="Color Nail" className="h-[200px] w-full" />
        <TextBox {...textBoxProps} />
      </div>

      {/* Medium screens */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 items-center">
        <div className="space-y-4 text-center md:text-left">
          <VideoCard src="/servicePage/nail_paint.mp4" alt="Color Nail" className="h-[200px] w-full" />
          <TextBox {...textBoxProps} />
        </div>
      </div>

      {/* Large screens */}
      <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-2 h-[75vh] overflow-hidden mb-12">
        <VideoCard src="/servicePage/hair_cut.mp4" alt="Hair Cut" className="row-span-5 col-start-6 row-start-1" />
        <VideoCard src="/servicePage/pedicure.mp4" alt="Pedicure" className="row-span-3 col-span-2 col-start-4 row-start-4" />
        <VideoCard src="/servicePage/waxing.mp4" alt="Waxing" className="row-span-3 col-span-2 col-start-4 row-start-1" />
        <VideoCard src="/servicePage/nail_paint.mp4" alt="Nail Paint" className="row-span-5 col-span-1 col-start-3 row-start-2" />
        <TextBox {...textBoxProps} className="col-span-2 row-span-2 row-start-2" />
      </div>
    </section>
  );
}
