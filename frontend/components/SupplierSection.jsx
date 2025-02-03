


export default function SupplierSection() {
  return (
    <div className="container mx-auto p-9">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Who Can Become a Supplier?</h2>
                <p className="text-md font-semibold mb-4 text-gray-500">We welcome partners who offer:</p>
                <ul className="list-disc pl-5">

                <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Guided tours and unique travel experiences.</h3>
                    <p className="text-gray-600">Aliquat rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 mt-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Popular or hidden gem attractions.</h3>
                    <p className="text-gray-600">Aliquet rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 mt-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Comfortable and welcoming accommodations.</h3>
                    <p className="text-gray-600">Aliquet rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 my-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Events or activities that bring enjoyment and fun to visitors.</h3>
                    <p className="text-gray-600">Aliquet rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                  </div>
                </div>

                </ul>
            </div>
            {/* Image Section */}
            <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Top Left Image */}
                <div className="w-full h-10 md:h-44 bg-yellow-400 flex items-center justify-center rounded-lg">
                  <img
                    src="https://www.nomago.hr/storage/app/media/potovanja/ilustracije/Travel_SpletnaStran_LETALSKEKARTE_1000x1000px_2-24.png" // Replace with the image path
                    alt="Properties Sold"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
        
                {/* Top Right Image */}
                <div className="w-full h-10 md:h-44 bg-blue-100 flex items-center justify-center rounded-lg">
                  <img
                    src="https://penntoday.upenn.edu/sites/default/files/2022-02/Plotkin-cooperation.jpeg" // Replace with the image path
                    alt="People Networking"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
               </div>

                {/* Bottom Image */}
                <div className="mt-5 w-full h-44 bg-gray-200 flex items-center justify-center rounded-lg">
                  <img
                    src="https://scx2.b-cdn.net/gfx/news/hires/2014/14-researchshow.jpg" // Replace with the image path
                    alt="Team Meeting"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                </div>


                 {/* Image Section Left Content*/}
                <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Top Left Image */}
                <div className="w-full h-10 md:h-44 bg-yellow-400 flex items-center justify-center rounded-lg">
                  <img
                    src="https://www.eclipserecruitment.co.nz/wp-content/uploads/teamwork-iStock-1443245439-mm.jpg" // Replace with the image path
                    alt="Properties Sold"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
        
                {/* Top Right Image */}
                <div className="w-full h-10 md:h-44 bg-blue-100 flex items-center justify-center rounded-lg">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5612AQGkZnuqjOFsLA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1661287237628?e=2147483647&v=beta&t=4YWn7ZDBUSgiuOdM1e84BD-h2SYvBz3tUyoIGW0F3wg" // Replace with the image path
                    alt="People Networking"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
               </div>

                {/* Bottom Image */}
                <div className="mt-5 w-full h-44 bg-gray-200 flex items-center justify-center rounded-lg">
                  <img
                    src="https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/CSFCMSEN/4jwkequnrueuc3zsuky8jw.jpg" // Replace with the image path
                    alt="Team Meeting"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                </div>


                    {/* Left Section Right content*/}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Benefits of Becoming a Supplier</h2>
                    <p className="text-md font-semibold mb-4 text-gray-500">List the advantages of joining your platform, like:</p>
                    <ul className="list-disc pl-5">
                    <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Access to a wider audience.</h3>
                        <p className="text-gray-600">Aliquet rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 mt-10">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Marketing support and promotional opportunities.</h3>
                        <p className="text-gray-600">Aliquet rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 mt-10">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Easy-to-use tools to manage listings and bookings.</h3>
                        <p className="text-gray-600">Aliquet rhoncus ornare dolor quam. Quis egestas aliquam.</p>
                      </div>
                    </div>

                    </ul>
                </div>


          </div>
      </div>
    );
};
