import Footer from "@/components/Footer";
import ProfileUser from "../../../../components/Profile";
import React from "react";
import { FaRocket, FaEye } from "react-icons/fa"; // Importing icons

export default function Layout() {
  return (
    <div>
      <section className="py-10 px-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            We Are the People Who Made This Website
          </h2>
          <p className="text-gray-600 mb-10">
            A Tour Guide is a professional who provides information and insights
            to travelers, helping them explore and understand various
            destinations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <img
                src="/image/vibol.png"
                alt="Sen Vibon"
                className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Sen Vibol</h3>
              <p className="text-gray-500">Database and UI design</p>
              <p className="text-gray-400">
                Founding designer team at Figma. Former Pleo, Stripe, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <img
                src="/image/khouch.jpg"
                alt="Khan Saokouch"
                className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Khorn Saokhouch</h3>
              <p className="text-gray-500">Database and UI design</p>
              <p className="text-gray-400">
                Founding designer team at Figma. Former Pleo, Stripe, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <img
                src="/image/nisa.png"
                alt="Sam Nisa"
                className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Sam Nisa</h3>
              <p className="text-gray-500">Front-end and UI design</p>
              <p className="text-gray-400">
                Founding designer team at Figma. Former Pleo, Stripe, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <img
                src="/image/senghorng.png"
                alt="Kheang Seangphong"
                className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Kheang Seanghrong</h3>
              <p className="text-gray-500">Backend and UI design</p>
              <p className="text-gray-400">
                Founding designer team at Figma. Former Pleo, Stripe, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 px-20 text-center ">
        <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Mission Section */}
          <div className="bg-green-200 w-full md:w-1/2 h-64 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <FaRocket className="h-12 w-12 text-black mb-4" />
            <h3 className="text-3xl font-bold text-green-800">Our Mission</h3>
            <p className="text-gray-800 text-lg text-center">
              To provide foundations for post-conflict Somalia's future.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-yellow-200 w-full md:w-1/2 h-64 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <FaEye className="h-12 w-12 text-black mb-4" />
            <h3 className="text-3xl font-bold text-yellow-800">Our Vision</h3>
            <p className="text-gray-800 text-lg text-center">
              To be the most respected and successfully operated company in our
              industry - creating value for all of our stakeholders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
