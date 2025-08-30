import React from "react";

const Hero = () => {
  return (
    <div
      className="w-full min-h-screen bg-[url('/bg-light.jpg')] bg-cover bg-center text-[var(--primary)] flex items-center justify-center"
    >
      <div className="text-center max-w-3xl px-4 font-[Outfit]">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary">
          Welcome to 360 Muslim Experts
        </h1>
        <p className="text-lg font-outfit md:text-2xl font-medium max-w-2xl mx-auto mt-4 mb-6 leading-relaxed">
          Connect with a dynamic network of professionals, scholars, and
          creatives shaping the future. Stay updated on events, insights, and
          opportunities in science, arts, and Islamic research. Let’s grow and
          thrive together!
        </p>
        <button className="bg-white text-[#212121] px-6 py-3 rounded-full font-semibold cursor-pointer transition-transform duration-300 hover:scale-105">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Hero;
