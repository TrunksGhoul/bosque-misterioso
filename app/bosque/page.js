"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BosquePage() {
  const router = useRouter();
  const [flashlight, setFlashlight] = useState({ x: -100, y: -100 });
  const [pokemonPosition, setPokemonPosition] = useState({ x: 0, y: 0 });
  const [pokemonVisible, setPokemonVisible] = useState(false);
  const [pokeball, setPokeball] = useState(null);
  const [captured, setCaptured] = useState(false);

  const launchSound = useRef(null);
  const captureSound = useRef(null);
  const backgroundMusic = useRef(null);

  // Posición aleatoria del Pokémon
  useEffect(() => {
    const x = Math.floor(Math.random() * (window.innerWidth - 100));
    const y = Math.floor(Math.random() * (window.innerHeight - 100));
    setPokemonPosition({ x, y });

    // Inicia música de fondo al cargar el bosque
    if (backgroundMusic.current) {
      backgroundMusic.current.volume = 0.3; // volumen bajo para no molestar
      backgroundMusic.current.play().catch(() => {
        // algunos navegadores bloquean autoplay, se iniciará al primer click
      });
    }
  }, []);

  const handleClick = (e) => {
    setFlashlight({ x: e.clientX, y: e.clientY });

    // Verifica si el Pokémon está dentro del círculo de luz
    const dx = e.clientX - (pokemonPosition.x + 50);
    const dy = e.clientY - (pokemonPosition.y + 50);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100 && !captured) {
      setPokemonVisible(true);
    } else {
      setPokemonVisible(false);
    }

    // Reproduce música si no había empezado (por bloqueo de autoplay)
    if (backgroundMusic.current && backgroundMusic.current.paused) {
      backgroundMusic.current.play();
    }
  };

  const handlePokemonClick = (e) => {
    e.stopPropagation();
    if (!captured) {
      // Lanzar Pokéball
      setPokeball({ x: flashlight.x, y: flashlight.y });
      if (launchSound.current) launchSound.current.play();

      // Animación de captura
      setTimeout(() => {
        setCaptured(true);
        setPokemonVisible(false);
        if (captureSound.current) {
          captureSound.current.volume = 0.5; // más bajo que antes
          captureSound.current.play();
        }

        // Redirigir después de 3 segundos
        setTimeout(() => {
          router.push("/sorpresa");
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-screen h-screen relative overflow-hidden cursor-pointer"
      style={{
        backgroundImage: "url('/images/bosque.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(90%)", // bosque más claro
      }}
    >
      {/* Efecto linterna */}
      <div
        className="absolute w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${flashlight.x}px ${flashlight.y}px, rgba(255,255,255,0.9) 0%, rgba(0,0,0,0.7) 100%)`,
          transition: "background 0.1s ease-out",
        }}
      />

      {/* Pokémon visible solo dentro de la linterna */}
      <AnimatePresence>
        {pokemonVisible && !captured && (
          <motion.img
            src="/images/pokemon.gif"
            alt="Pokémon"
            className="absolute w-24 h-24"
            style={{ top: pokemonPosition.y, left: pokemonPosition.x }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePokemonClick}
          />
        )}
      </AnimatePresence>

      {/* Animación GIF Pokéball */}
      <AnimatePresence>
        {pokeball && !captured && (
          <motion.img
            src="/images/pokeball-launch.gif"
            alt="Pokéball"
            className="absolute w-24 h-24"
            style={{ top: pokeball.y - 12, left: pokeball.x - 12 }}
            initial={{ top: pokeball.y - 12, left: pokeball.x - 12 }}
            animate={{
              top: pokemonPosition.y + 12,
              left: pokemonPosition.x + 12,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Efectos de sonido y música */}
      <audio ref={launchSound} src="/sounds/launch.mp3" />
      <audio ref={captureSound} src="/sounds/capture.mp3" />
      <audio ref={backgroundMusic} src="/sounds/bosque.mp3" loop />
    </div>
  );
}
