"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/bosque"); // Redirige a la página del bosque
  };

  return (
    <div
      onClick={handleClick}
      className="w-screen h-screen flex items-center justify-center cursor-pointer p-4"
      style={{
        fontFamily: "'Press Start 2P', cursive",
        backgroundImage: "url('/images/bosque.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(75%)", // Bosque más claro
      }}
    >
      <div className="bg-black bg-opacity-30 p-4 rounded">
        <p className="text-white text-lg md:text-2xl text-center">
          ¡Bienvenida al Bosque Misterioso! Un lugar envuelto en niebla y
          secretos... ¡Explora con cuidado, LUSENA! Dicen que un Pokémon raro se
          oculta entre las sombras de los árboles. ¿Podrás encontrarlo?
        </p>
      </div>
    </div>
  );
}
