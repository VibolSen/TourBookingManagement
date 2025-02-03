export default function booking() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Booking Tour Checkout
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your full name*
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Country</option>
                <option>India</option>
                <option>USA</option>
                <option>France</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Your contact number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Booking Summary Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Booking Summary
            </h2>
            <table className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2">Tour</th>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-right px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-blue-500 hover:underline">
                    Tajmahal Trip
                  </td>
                  <td className="px-4 py-2">2022-02-25</td>

                  <td className="px-4 py-2 text-right">$15,400.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-blue-500 hover:underline">
                    France Tour Package
                  </td>
                  <td className="px-4 py-2">2022-02-27</td>
                  <td className="px-4 py-2 text-right">$999.00</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan="3" className="px-4 py-2 text-right">
                    Subtotal
                  </td>
                  <td className="px-4 py-2 text-right">$16,399.00</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan="3" className="px-4 py-2 text-right">
                    Total
                  </td>
                  <td className="px-4 py-2 text-right text-blue-600">
                    $16,399.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Payment Gateways
          </h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500"
              />
              <span>Book Now Pay Later</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500"
              />
              <span>Paypal Standard</span>
            </label>
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-8 flex justify-end">
          <button className="w-[100px] bg-gray-500 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-600">
            Cancel
          </button>
          <button className="w-[150px] mx-4 bg-blue-500 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-600">
            Order Booking
          </button>
        </div>
      </div>
    </div>
  );
}
