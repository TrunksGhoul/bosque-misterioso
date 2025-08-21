import "./globals.css";

export const metadata = {
  title: "Bosque Misterioso",
  description: "Explora el bosque y encuentra Pokémon raros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fuente pixel art de Google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
