import React from "react";

const items = [
  { title: "Presupuesto sin cargo", desc: "Visitamos y cotizamos gratis.", icon: "💬" },
  { title: "Trabajos con garantía", desc: "Calidad y terminaciones prolijas.", icon: "✅" },
  { title: "Atención CABA y GBA", desc: "Llegamos a tu zona.", icon: "📍" },
];

export default function ValueProps() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">{it.icon}</div>
            <h3 className="font-semibold text-lg">{it.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
