import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import BookingForm from "@/components/sections/BookingForm";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BookingCTA from "@/components/sections/BookingCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BookingForm />
        <Services />
        <About />
        <WhyChooseUs />
        <BookingCTA />
      </main>

      <Footer />
    </>
  );
}
