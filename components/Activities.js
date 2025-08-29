import React from "react";

const activities = [
  {
    id: "dora",
    title: "Dora e Quran",
    speaker: "Sir Jareer Hussain",
    img: "/activities/dora-e-quran.png",
  },
  {
    id: "graphics",
    title: "Graphics Course",
    speaker: "Dr Zain Abbas",
    img: "/activities/graphics-zain.png",
  },
  {
    id: "amr",
    title: "Amr bil Maroof",
    speaker: "Al Noor Teachers",
    img: "/activities/amr-bil-maroof.png",
  },
];

const Activities = () => {
  return (
    <section className="w-[95%] max-w-6xl mx-auto my-16 px-6 py-12 bg-white rounded-2xl shadow-xl animate-fadeInUp">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] relative inline-block">
          Activities
          <span className="block w-16 h-1 bg-[var(--color-accent)] mx-auto mt-2 rounded"></span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Explore our impactful activities that bring knowledge, skills, and
          values to life.
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl w-full max-w-xs cursor-pointer"
          >
            <img
              src={activity.img}
              alt={activity.title}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-1">
                {activity.title}
              </h3>
              <p className="text-gray-600 text-sm">{activity.speaker}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="text-center mt-12">
        <a
          href="/activities"
          className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-xl shadow-md transition-all duration-300 hover:bg-[var(--color-secondary-color)] hover:shadow-lg"
        >
          Explore Activities
        </a>
      </div>
    </section>
  );
};

export default Activities;
