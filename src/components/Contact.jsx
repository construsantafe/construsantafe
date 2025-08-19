// src/components/Contact.jsx
import React, { useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";

const WA_NUMBER = "543425829061"; // internacional sin "+"
const WA_TEXT = encodeURIComponent(
  "Hola, vengo desde el sitio web de Construsantafe. Quisiera solicitar un presupuesto. Gracias."
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
const TEL_LINK = `tel:+${WA_NUMBER}`;

// FAQ
const FAQ = [
  {
    q: "¿En qué zonas trabajan?",
    a: "Santa Fe capital y alrededores. Si estás a más de 30 km, coordinamos visita según disponibilidad.",
  },
  {
    q: "¿El presupuesto tiene costo?",
    a: "No. Cotizamos sin cargo y sin compromiso. Te explicamos alternativas y tiempos estimados.",
  },
  {
    q: "¿Cuándo pueden venir a ver la obra?",
    a: "Coordinamos la visita por WhatsApp o teléfono. Generalmente dentro de las 48–72 horas hábiles.",
  },
  {
    q: "¿Formas de pago?",
    a: "Efectivo, transferencia y depósito. Para trabajos grandes podemos fraccionar por etapas.",
  },
  {
    q: "¿Trabajos chicos o urgencias?",
    a: "Sí, también hacemos arreglos puntuales y urgencias eléctricas (según disponibilidad).",
  },
  {
    q: "¿Ofrecen garantía?",
    a: "Sí, nuestros trabajos cuentan con garantía. El alcance se explica en el presupuesto.",
  },
];

export default function Contact() {
  // Abrimos por defecto la última (la más larga) para que la columna derecha tenga un alto inicial grande
  const [open, setOpen] = useState(FAQ.length - 1);
  const toggle = (i) => setOpen((prev) => (prev === i ? -1 : i));

  return (
    <section
      id="contacto"
      className="scroll-mt-24 py-24 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10">
          <p className="text-sm tracking-wide text-orange-600 font-semibold">
            Contacto
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
            Coordinamos tu presupuesto sin cargo
          </h2>
          <p className="mt-3 text-slate-600">
            Escribinos y respondemos rápido. También podés llamarnos en horario
            de atención.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Tarjeta izquierda: sin sticky, con altura mínima estable */}
          <div
            className="
              rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm
              p-5 md:p-6
              flex flex-col
              /* Altura estable por defecto: igual o mayor al panel de FAQ abierto */
              min-h-[520px] md:min-h-[560px] lg:min-h-[600px]
            "
          >
            {/* chips */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-[15px] ring-1 ring-slate-200">
                <FaMapMarkerAlt className="text-orange-600" />
                Santa Fe Capital y alrededores
              </span>
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-[15px] ring-1 ring-slate-200 hover:bg-slate-100"
              >
                <FaPhoneAlt className="text-orange-600" />
                +54 342 5829061
              </a>
              <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-[15px] ring-1 ring-slate-200">
                <FaClock className="text-orange-600" />
                Lun a Sáb 8–18 h
              </span>
            </div>

            {/* bullets */}
            <ul className="mt-5 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-emerald-500" />
                Respuesta rápida por WhatsApp.
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-emerald-500" />
                Presupuestos claros y sin costo.
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-emerald-500" />
                Construcción, electricidad y remodelaciones.
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
                aria-label="Escribir por WhatsApp"
              >
                <FaWhatsapp size={22} className="shrink-0" />
                <span>Escribinos por WhatsApp</span>
              </a>

              <a
                href={TEL_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-4 font-semibold text-slate-800 hover:bg-slate-50 transition"
                aria-label="Llamar ahora"
              >
                <FaPhoneAlt />
                Llamar ahora
              </a>
            </div>

            {/* Nota (pequeña) pegada abajo para que el contenido “llene” la altura */}
            <p className="mt-auto pt-4 text-xs text-slate-500">
              Al hacer clic en WhatsApp se abrirá una conversación con un
              mensaje precargado.
            </p>
          </div>

          {/* FAQ derecha */}
          <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-1">
            <div className="rounded-[22px] bg-gradient-to-b from-emerald-50 to-white p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                Preguntas frecuentes
              </h3>

              <div className="mt-4 divide-y divide-emerald-100">
                {FAQ.map((it, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={i} className="py-1">
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between gap-3 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-slate-900 text-[17px]">
                          {it.q}
                        </span>
                        <FaChevronDown
                          className={`shrink-0 text-slate-500 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Contenido con transición sin “salto” visual */}
                      <div
                        className={`grid overflow-hidden transition-all duration-300 ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0">
                          <p className="pb-4 text-slate-700">
                            {it.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
