"use client";

import HelmetComponent from "@/components/HelmetComponent";
import ContactUs from "@/components/sections/Contact-us";
import FastAndEffiscient from "@/components/sections/FastAndEffiscient";
import FeedBack from "@/components/sections/FeedBack";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className=" flex flex-col min-h-screen bg-gray-950">
      <HelmetComponent
        title="Welcome to RealWorld"
        description="Welcome to RealWorld"
      />
      <FeedBack />
    </div>
  );
}
