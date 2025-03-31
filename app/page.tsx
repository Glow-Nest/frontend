import Navbar from "@/components/common/MainNavbar";
import Image from "next/image";

// Reusable ImageCard component
function ImageCard({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-md ${className}`}>
      <Image src={src} alt={alt} fill unoptimized className="object-cover" />
    </div>
  );
}

// Reusable TextBox component
function TextBox({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-xl shadow-md p-5 ${className}`}>
      <p className="text-lg text-gray-800 text-center">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-5 p-5 md:p-8 lg:p-10">

        {/* Small screen */}
        <div className="block md:hidden space-y-4">
          <ImageCard src="https://placehold.co/800x400" alt="External Image" className="h-[200px] w-full" />
          <TextBox text="Welcome to GlowNest - Where Beauty Meets Elegance." />
        </div>

        {/* Medium screen */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 h-auto">
          <ImageCard src="https://placehold.co/600x400" alt="External Image" className="min-h-[250px]" />
          <TextBox text="Welcome to GlowNest - Where Beauty Meets Elegance." />
        </div>

        {/* Large screen */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-2 h-[75vh] overflow-hidden">

          <ImageCard src="https://placehold.co/300x200" alt="External Image" className="row-span-2 col-start-4 row-start-4" />
          <ImageCard src="https://placehold.co/300x200" alt="External Image" className="row-span-3 col-start-4 row-start-1" />
          <ImageCard src="https://placehold.co/300x200" alt="External Image" className="row-span-3 col-start-3 row-start-2" />
          <ImageCard src="https://placehold.co/800x400" alt="External Image" className="col-span-2 row-span-3 col-start-5 row-start-3" />
          <ImageCard src="https://placehold.co/300x200" alt="External Image" className="row-span-2 col-start-5 row-start-1" />

          <TextBox text="Welcome to GlowNest - Where Beauty Meets Elegance." className="col-span-2 row-span-2 row-start-5" />
        </div>
      </div>
    </div>
  );
}
