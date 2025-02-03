

export default function HowItWorks  () {
  return (
    <section className="py-10 px-20 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works With Booking Vacation Tours</h2>
        <p className="text-gray-600 mb-10">List the advantages of joining your platform, like</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 ">1</h3>
            <h4 className="text-xl font-bold text-gray-800">Sign Up and Create Your Account</h4>
            <p className="text-gray-600">Fill out a simple registration form to become a supplier. We'll guide you through the steps to get started.</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600">2</h3>
            <h4 className="text-xl font-bold text-gray-800">Add Your Listings</h4>
            <p className="text-gray-600">Upload descriptions, photos, and details of the experiences you offer. Make your listings stand out with captivating images and clear information.</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600">3</h3>
            <h4 className="text-xl font-bold text-gray-800">Manage Bookings Effortlessly</h4>
            <p className="text-gray-600">Track and manage reservations from your dashboard. Stay organized and ready to welcome your guests.</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600">4</h3>
            <h4 className="text-xl font-bold text-gray-800">Earn and Grow</h4>
            <p className="text-gray-600">Receive payments and increase your bookings. Benefit from a growing network of enthusiastic travelers.</p>
          </div>
        </div>
        
        <button className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};
