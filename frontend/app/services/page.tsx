"use client";

import ProfileUser from "@/components/header/Navbar";
import Services from "@/components/home/Card/Service";
import FeatureNewsCard from "@/components/FeatureNewsCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function PublicServicesPage() {
  return (
    <div>
      <ProfileUser />
      <Services />
      <FeatureNewsCard />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
