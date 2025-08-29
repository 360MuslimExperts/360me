import React from "react";
import Link from "next/link";

const donateItems = [
  { id: "education", title: "Education", img: "/donate/education.png" },
  { id: "food", title: "Food", img: "/donate/food.png" },
  { id: "health", title: "Health", img: "/donate/health.png" },
];

const Donate = () => {
  return (
    <section className="py-12 px-4 md:px-6 bg-[var(--background)]">
      {/* Header */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-10">
        Want to Spend for the sake of Allah?
      </h2>

      {/* Donation categories */}
      <div className="flex justify-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
        {donateItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center flex-[1_1_0] max-w-[200px] md:max-w-[180px] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-auto rounded-xl mb-3 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            />
            <h3 className="text-lg font-semibold text-primary">
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Donate Now button */}
      <div className="flex justify-center mt-10">
        <Link href="/donate" className="btn">
          Donate Now
        </Link>
      </div>
    </section>
  );
};

export default Donate;
