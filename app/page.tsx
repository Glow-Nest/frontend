import Navbar from "@/components/common/MainNavbar";
import ImageCard from "@/components/landingPage/ImageCard";
import TextBox from "@/components/landingPage/Textbox";

import image1 from "../public/landingPage/Image1.jpg";
import image2 from "../public/landingPage/Image2.jpg";
import image3 from "../public/landingPage/Image3.jpg";
import image4 from "../public/landingPage/Image4.jpg";
import image5 from "../public/landingPage/Image5.jpg";
import Testimonials from "@/components/landingPage/Testimonials";



export default function Home() {
  return (
    <div className="relative overflow-hidden inset-0 -z-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#ffffff]">

      {/* --- Subtle Background Gradient Overlay --- */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#fbe9dd] via-transparent to-[#de6412] opacity-60"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="overflow-hidden relative py-5 px-10 mt-15">

        {/* Small screen */}
        <div className="block md:hidden space-y-4">
          <ImageCard src={image1} alt="External Image" className="h-[200px] w-full" />
          <TextBox
  headline="Welcome to GlowNest"
  subheadline="Elevate your beauty with GlowNest — appointments available now."
/>

        </div>

        {/* Medium screen */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          <ImageCard src={image1} alt="External Image" className="min-h-[250px]" />
          <TextBox
  headline="Welcome to GlowNest"
  subheadline="Elevate your beauty with GlowNest — appointments available now."
/>

        </div>

        {/* Large screen */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-2 h-[75vh] overflow-hidden">
          <ImageCard src={image5} alt="External Image" className="row-span-2 col-start-4 row-start-4" />
          <ImageCard src={image3} alt="External Image" className="row-span-3 col-start-4 row-start-1" />
          <ImageCard src={image2} alt="External Image" className="row-span-3 col-start-3 row-start-2" />
          <ImageCard src={image1} alt="External Image" className="col-span-2 row-span-3 col-start-5 row-start-3" />
          <ImageCard src={image4} alt="External Image" className="row-span-2 col-start-5 row-start-1" />
          <TextBox
  headline="Welcome to GlowNest"
  subheadline="Elevate your beauty with GlowNest — appointments available now."
  className="col-span-2 row-span-2 row-start-2"
/>

        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials/>

    </div>
  );
}