import React from "react";

const donateItems = [
  { id: "education", title: "Education", img: "/donate/education.png" },
  { id: "food", title: "Food", img: "/donate/food.png" },
  { id: "health", title: "Health", img: "/donate/health.png" },
];

const Donate = () => {
  return (
    <section className="py-12 px-6 bg-[var(--background)]">
      {/* Header */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-10">
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
            <h3 className="text-lg font-semibold text-[var(--color-primary)]">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
        {/* Donate Now button */}
      <div className="flex justify-center mt-10">
        <a
          href="/donate"
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow-md hover:bg-[var(--color-accent)] transition"
        >
          Donate Now
        </a>
      </div>
    </section>
  );
};

export default Donate;
