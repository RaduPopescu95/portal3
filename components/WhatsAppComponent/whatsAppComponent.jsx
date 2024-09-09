"use client";

import React, { useState, useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsAppComponent = () => {
  const [pulsing, setPulsing] = useState(true); // Inițial efectul de pulsare este activ
  const [showPopup, setShowPopup] = useState(true); // Inițial popup-ul este vizibil

  // Oprește pulsarea după un anumit interval de timp
  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      setPulsing(false);
    }, 5000); // 5 secunde pentru pulsare

    return () => clearTimeout(pulseTimer);
  }, []);

  // Ascunde popup-ul după câteva secunde sau când utilizatorul apasă pe buton
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(false); // Ascunde popup-ul după 8 secunde
    }, 18000);

    return () => clearTimeout(popupTimer);
  }, []);

  const handleWhatsAppClick = () => {
    setShowPopup(false); // Ascunde popup-ul când utilizatorul face click pe buton
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Tooltip-ul care sugerează utilizatorului să apese pe buton */}
      {showPopup && (
        <div
          style={{
            position: "fixed", // Folosim fixed pentru a ne asigura că apare corect
            bottom: "105px", // Ajustăm poziția față de butonul de WhatsApp
            right: "30px", // Plasăm aproape de buton
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: "9999", // Asigurăm că este afișat deasupra altor elemente
            fontSize: "14px",
            color: "#333",
            width: "200px",
          }}
        >
          <p style={{ margin: 0 }}>
          Aveți nevoie de ajutor în utilizarea platformei? Apăsați aici pentru a discuta cu noi
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "23px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white", // Săgeata popup-ului
            }}
          ></div>
        </div>
      )}

      {/* Butonul de WhatsApp */}
      <FloatingWhatsApp
        phoneNumber="+40747010407"
        accountName="JobsMD"
        avatar="https://i.imgur.com/zIRZHpt.png"
        chatMessage="Bună ziua! Cum vă putem ajuta?"
        statusMessage="De obicei răspundem în câteva minute"
        placeholder="Scrie un mesaj..."
        allowClickAway={false}
        notification={true}
        notificationSound={true}
        styles={{
          animation: pulsing ? "pulse 2s infinite" : "none",
        }}
        onClick={handleWhatsAppClick} // Ascunde popup-ul când utilizatorul apasă pe buton
      />
    </div>
  );
};

export default WhatsAppComponent;
