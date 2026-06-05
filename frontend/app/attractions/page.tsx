"use client";
import ProfileUser from "@/components/header/Navbar";
// Remove this line ❌
// import AttractionsPageContent from "@/app/profile/[id]/attractions/page";
import Footer from "@/components/Footer";

export default function PublicAttractionsPage() {
  return (
    <div>
      <ProfileUser />
      {/* Add your attractions content here */}
      <Footer />
    </div>
  );
}