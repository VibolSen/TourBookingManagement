import Image from 'next/image'; 
import Link from 'next/link';


export default function BusinessSection() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 px-20">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Let's start your business with <span className="text-red-600">Booking Vacation Tour</span>
            </h2>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              You will get <span className="text-blue-600">$1000</span> per month!
            </p>
            <p className="text-gray-600 mb-6">
              Welcome to our "Become a Supplier" page! Join us and showcase your amazing experiences to travelers who are eager to discover popular and exciting places.
            </p>
            <Link href="/become-a-supplier/company-supplier1">
  <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition mb-6">
    Get Started
  </button>
</Link>
          </div>
          <div className="md:w-1/2 flex flex-col items-center">
            <Image
              src="/BusinessSection.png" // Ensure the image is in the public folder
              alt="Business Illustration"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="w-full h-[400px] mb-2 object-cover"
            />
            <div className="bg-pink-200 rounded-full px-6 py-4 shadow-md flex items-center justify-center mb-4">
              <div className="bg-gray-300 rounded-full w-16 h-8"></div>
              <p className="text-red-600 mx-2 text-lg">300+ Suppliers earn more</p>
              <p className="text-black">with Booking Vacation Tour</p>
            </div>
          </div>
        </div>
      );
    }