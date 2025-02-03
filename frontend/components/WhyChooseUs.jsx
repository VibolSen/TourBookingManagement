import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-6">WHY CHOOSE US?</h2>
      <div className="flex justify-around">
        <div className="max-w-xs">
          <div className="bg-blue-100 p-4 rounded-full mx-auto mb-4">
            <span className="text-blue-500 text-3xl">&#36;</span> {/* Example icon */}
          </div>
          <h3 className="text-xl font-semibold">Competitive Prices</h3>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          </p>
        </div>
        <div className="max-w-xs">
          <div className="bg-blue-100 p-4 rounded-full mx-auto mb-4">
            <span className="text-blue-500 text-3xl">&#128274;</span> {/* Example icon */}
          </div>
          <h3 className="text-xl font-semibold">Secure Booking</h3>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          </p>
        </div>
        <div className="max-w-xs">
          <div className="bg-blue-100 p-4 rounded-full mx-auto mb-4">
            <span className="text-blue-500 text-3xl">&#10004;</span> {/* Example icon */}
          </div>
          <h3 className="text-xl font-semibold">Seamless Experience</h3>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;