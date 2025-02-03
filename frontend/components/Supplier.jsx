



export default function Supplier() {
  const requirements = [
    {
      title: "Quality of Service",
      description: "Provide travelers with the best experiences. Ensure that all descriptions, images, and details about your services are accurate and up to date.",
      icon: "🌟", // You can replace this with an actual icon component
    },
    {
      title: "Professional Certifications for Tour Guides",
      description: "If required by your local government, provide proof of certification to operate as a professional tour guide.",
      icon: "📜", // You can replace this with an actual icon component
    },
    {
      title: "Insurance or Safety Regulations",
      description: "Provide proof of liability insurance. Have extra liability insurance to cover any unforeseen incidents during tours or activities.",
      icon: "🛡️", // You can replace this with an actual icon component
    },
  ];

  return (
    <div className="px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Supplier Requirements</h2>
      <p className="text-center text-gray-600 mb-6">
        Clearly outline any criteria or standards suppliers must meet, like
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requirements.map((requirement, index) => ( 
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
            <div className="text-4xl mb-4">{requirement.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{requirement.title}</h3>
            <p className="text-gray-600">{requirement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}