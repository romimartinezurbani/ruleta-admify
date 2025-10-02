import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

// 👉 Configuración de premios con estilos de marca
const data = [
  { option: "🎁 Descuento especial", style: { backgroundColor: "#4BB0A9", textColor: "#FFFFFF" } },
  { option: "🔑 Llavero Admify", style: { backgroundColor: "#FFFFFF", textColor: "#051D40" } },
  { option: "📞 Asesoría gratuita", style: { backgroundColor: "#4BB0A9", textColor: "#FFFFFF" } },
  { option: "🔄 Intentá de nuevo", style: { backgroundColor: "#FFFFFF", textColor: "#051D40" } },
];

export default function RuletaAdmify() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [user, setUser] = useState({ nombre: "", email: "" });
  const [resultado, setResultado] = useState("");

  // Girar ruleta
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  // Enviar formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 🚀 Acá podés guardar en Firebase o tu backend
    setFormCompleted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#051D40] text-white p-6 font-[Quicksand]">
      {!formCompleted ? (
        // 📌 Formulario inicial
        <div className="bg-white text-[#051D40] p-6 rounded-2xl shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center font-[Wide]">
            Participá en la ruleta 🎡
          </h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={user.nombre}
              onChange={(e) => setUser({ ...user, nombre: e.target.value })}
              required
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4BB0A9]"
            />
            <input
              type="email"
              placeholder="Tu email o WhatsApp"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4BB0A9]"
            />
            <button
              type="submit"
              className="bg-[#4BB0A9] text-white py-2 rounded-lg hover:bg-[#3b948e] transition font-semibold"
            >
              Continuar
            </button>
          </form>
        </div>
      ) : (
        // 📌 Ruleta
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold font-[Wide]">¡Giramos la ruleta! 🚀</h2>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor="#4BB0A9"
              outerBorderWidth={4}
              innerBorderColor="#FFFFFF"
              innerBorderWidth={2}
              radiusLineColor="#FFFFFF"
              radiusLineWidth={1}
              fontSize={14}
              textDistance={50}
              fontWeight={"bold"}
              perpendicularText={false}
              textColors={["#FFFFFF", "#051D40"]}
              onStopSpinning={() => {
                setMustSpin(false);
                setResultado(data[prizeNumber].option);
              }}
            />
          </div>

          <button
            onClick={handleSpinClick}
            className="bg-[#4BB0A9] text-white px-6 py-2 rounded-lg hover:bg-[#3b948e] transition font-semibold"
          >
            Girar 🎡
          </button>

          {resultado && (
            <div className="mt-6 p-4 bg-white text-[#051D40] rounded-xl shadow text-center">
              <p className="font-semibold">{user.nombre}, ganaste:</p>
              <p className="text-xl font-[Wide]">{resultado}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
