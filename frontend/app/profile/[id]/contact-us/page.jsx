import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkedAlt,
  FaFacebook,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className=" py-5 px-20 ">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Contact Information Section */}
        <div className="bg-gray-200 p-8 w-full md:w-1/2 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-2">Contact Information</h2>
          <p className="text-gray-600 mb-4 text-lg mt-4">
            Say something to start a live chat!
          </p>

          <div className="flex items-center mt-10 text-lg">
            <FaPhone className="mr-4" />
            <strong>Phone:</strong> <span className="ml-2">+102 3456 789</span>
          </div>

          <div className="flex items-center mt-5 text-lg">
            <FaEnvelope className="mr-4" />
            <strong>Email:</strong> <span className="ml-2">demo@gmail.com</span>
          </div>

          <div className="flex items-center mt-5 text-lg">
            <FaMapMarkedAlt className="mr-4" />
            <strong>Map data ©2024</strong>{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms
            </a>
          </div>

          <div className="p-5">
            <strong>Royal University of Phnom Penh</strong>
          </div>

          <div className="p-5">
            <strong>Open:</strong> <span>Close - 5pm</span>
          </div>

          <div className="p-5">
            <strong>Other:</strong>{" "}
            <span>Russian Federation University (+62) 023 883 840</span>
          </div>

          <div className="flex space-x-6 mt-10 text-4xl">
            <a href="#" className="text-blue-600 hover:underline">
              <FaFacebook />
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              <FaTwitter />
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              <FaDiscord />
            </a>
            {/* Add more social links as needed */}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="border border-gray-300 rounded-lg w-full p-3"
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="border border-gray-300 rounded-lg w-full p-3"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="border border-gray-300 rounded-lg w-full p-3"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="border border-gray-300 rounded-lg w-full p-3"
                placeholder="Write your message here..."
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
