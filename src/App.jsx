import React from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  // Padding superior para que el contenido no quede debajo de TopBar + Header fijos
  return (
    <div className="font-sans text-gray-800 bg-white pt-28">
      <TopBar />
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
