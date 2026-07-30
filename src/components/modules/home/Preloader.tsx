"use client";

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-[#f5f1e8] flex justify-center items-center z-[9999]">
      <video
        src="/loader.mp4" // Your new 922KB file
        autoPlay
        muted
        loop
        playsInline
        className="w-[200px] h-auto object-contain"
      />
    </div>
  );
}