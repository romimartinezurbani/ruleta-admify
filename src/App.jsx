import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const data = [
  { option: "Descuento especial", style: { backgroundColor: "#4BB0A9", textColor: "#FFFFFF" } },
  { option: "Llavero", style: { backgroundColor: "rgba(255,255,255,0.15)", textColor: "#FFFFFF" } },
  { option: "Asesoría gratis", style: { backgroundColor: "#4BB0A9", textColor: "#FFFFFF" } },
  { option: "¡Intenta de nuevo!", style: { backgroundColor: "rgba(255,255,255,0.15)", textColor: "#FFFFFF" } },
];

function App() {
  const [formData, setFormData] = useState({ nombre: "", whatsapp: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.whatsapp) {
      return alert("Completa los campos");
    }
    setSubmitted(true);
  };

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const saveToFirebase = async (premio) => {
    try {
      await addDoc(collection(db, "participantes"), {
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        premio: premio,
        fecha: serverTimestamp(),
      });
      console.log("🎉 Datos guardados en Firestore!");
    } catch (error) {
      console.error("❌ Error al guardar en Firestore:", error);
    }
  };

  return (
    <div className="app-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>🎉 Ruleta Admify 🎉</h1>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="Tu WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          <button type="submit">¡Participar!</button>
        </form>
      ) : (
        <div className="ruleta-container">
          <h2>¡Hola {formData.nombre}!</h2>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor="#4BB0A9"
            outerBorderWidth={5}
            innerBorderColor="#FFFFFF"
            innerBorderWidth={5}
            radiusLineColor="#FFFFFF"
            radiusLineWidth={2}
            textDistance={65}
            fontSize={16}
            onStopSpinning={() => {
              setMustSpin(false);
              const premio = data[prizeNumber].option;
              setResult(premio);
              saveToFirebase(premio);
            }}
          />
          <button onClick={handleSpinClick}>Girar Ruleta</button>
          {result && <p className="resultado">Ganaste: {result}</p>}
        </div>
      )}
    </div>
  );
}

export default App;



