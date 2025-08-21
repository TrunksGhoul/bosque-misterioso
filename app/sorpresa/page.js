"use client";

import { useEffect, useRef } from "react";

export default function SorpresaPage() {
  const victoryRef = useRef(null);

  useEffect(() => {
    if (victoryRef.current) {
      victoryRef.current.volume = 0.7;
      victoryRef.current.loop = true; // bucle infinito
      victoryRef.current.play().catch(() => {
        console.log("El navegador puede bloquear autoplay.");
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <video
        src="/videos/celebracion.mp4" // <-- tu archivo MP4
        autoPlay
        loop
        muted={false}
        className="w-full h-full object-cover"
      />
      <audio ref={victoryRef} src="/sounds/victory.mp3" />
    </div>
  );
}
