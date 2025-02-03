import React from "react";
import Link from "next/link";

const ServiceCard = ({ title, description, imageUrl, link }) => {
  return (
    <Link href={link} className="block max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 m-auto cursor-pointer">
      {/* Image Section */}
      <img
        src={imageUrl} // Dynamic image URL
        alt={title} // Dynamic alt text
        className="w-full h-48 object-cover"
      />

      {/* Content Section */}
      <div className="px-6 py-4">
        {/* Title */}
        <div className="font-bold text-xl mb-2">{title}</div>

        {/* Description */}
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      {/* Footer Section (Button) */}
      <div className="px-6 pt-4 pb-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          View More
        </button>
      </div>
    </Link>
  );
};

const ServicesSection = () => {
  // Data for the cards
  const services = [
    {
      title: "Local Culture",
      description:
        "Built Wicket longer admire do barton vanity itself do in it. Preferd to men it engrossed listening. Park gate sell they west hard for the.",
      imageUrl: "https://img.freepik.com/free-vector/cambodia-culture-flat-icons-set_98292-2663.jpg", // Replace with your image path
      link: "./services/local-culture", // Replace with your link
    },
    {
      title: "Local Events",
      description:
        "Barton vanity itself do in admire do barton vanity it. Preferd to men it engrossed listening. Park gate sell they west hard for the.",
      imageUrl: "https://www.shutterstock.com/image-vector/travel-cambodia-flat-icons-set-600nw-2300386719.jpg", // Replace with your image path
      link: "./services/local-events", // Replace with your link
    },
    {
      title: "Historical Sites",
      description:
        "Admire do barton vanity itself do in it. Preferd to men it engrossed listening. Park gate sell they west hard for the.",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/000/162/362/non_2x/free-cambodia-icons-vector.jpg", // Replace with your image path
      link: "./services/historical-sites", // Replace with your link
    },
  ];

  return (
    <div className="p-8 px-20">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-8">We Offer Best Services</h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Map through the services array and render each card */}
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            link={service.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;