export default function TextBox({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={` 
        flex flex-col items-center justify-center space-y-3
        rounded-3xl p-8
        ${className}
      `}
    >
      <p className="text-3xl font-bold text-[#dba052] text-center leading-relaxed drop-shadow-md tracking-wide">
        {text}
      </p>

      {/* Decorative Divider */}
      <div className="w-30 h-[2px] bg-[#dba052] rounded"></div>

      {/* Subheadline */}
      <p className="text-md font-semibold text-[#4d4b4b] text-center">
        Elevate your beauty with GlowNest — appointments available now.
      </p>

      {/* CTA Button */}
      <button className="mt-2 px-5 py-2 cursor-pointer rounded-full border border-[#dba052] text-[#dba052] hover:bg-[#dba052] hover:text-black transition">
        Explore Our Services
      </button>
    </div>
  );
}
