"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";

import ProfileUser from "../../../components/Profile";
import Footer from "../../../components/Footer";

const Layout = ({ children }) => {
  const { id } = useParams();
  const { user, fetchUserById, fetchImage } = useAuthStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id).catch((err) =>
        console.error("Error fetching user:", err)
      );
    }
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) =>
        console.error("Error fetching image:", err)
      );
    }
  }, [user, fetchImage]);

  return (
    <div>
      <ProfileUser id={id}/>
        <main className="flex-1 p-4 md:p-8">{children}</main>
     
      <Footer />
    </div>
  );
};

export default Layout;
