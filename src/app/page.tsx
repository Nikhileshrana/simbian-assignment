"use client"
import { Feature } from "@/components/Feature-Comparison";
import  MainNavbar  from "@/components/MainNavbar";
import Footer from "@/components/Footer";

const page = () => {
 
  return (
    <>

    {/*  Navigation Bar */}
    <MainNavbar/>
    {/*  Feature Comparison */}
    <Feature />
    {/* Footer */}
    <Footer/>
    </>
  )
}

export default page