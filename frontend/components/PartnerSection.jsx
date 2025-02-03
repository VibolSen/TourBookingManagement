


export default function PartnerSection() {
  return (
    <section className="px-20">
      <div className="container mx-auto text-center">
        {/* Partners Title */}
        <h5 className="text-lg text-purple-600 uppercase mb-6">Our Partners</h5>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
          We work with the best partners
        </h2>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center ">
          <div className="p-6">
            <img
              src="https://cdn.buttercms.com/ec5959u2SMe0zJJzBXVM"
              alt="ahrefs"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg"
              alt="microsoft"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://d2mkz4zdclmlek.cloudfront.net/blog/wp-content/uploads/2020/12/help-scout-vector-logo.png"
              alt="helpscout"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://cdn.buttercms.com/FbhuK0cDS1mzRXYRyrHg"
              alt="jotform"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/06/Amazon-Logo-2000.png"
              alt="amazon"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/142133/notion.png"
              alt="notion"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2022/08/Linkedin-Logo-e1660320077673.png"
              alt="linkedin"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <img
              src="https://mma.prnewswire.com/media/1220689/Circle_Logo.jpg?p=facebook"
              alt="circle"
              className="h-[100px] border-2 w-[400px] rounded-md object-cover transition-transform transform hover:scale-105"
            />
          </div>   
        </div>
      </div>
    </section>
  );
}
