import React, { lazy, Suspense } from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact")); // ⬅ lazy
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-800 bg-white pt-28">
      <TopBar />
      <Header />
      <Hero />
      <Services />

      <Suspense fallback={<div className="p-6 text-center">Cargando galería…</div>}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<div className="p-6 text-center">Cargando contacto…</div>}>
        <Contact />
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
