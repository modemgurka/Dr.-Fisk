export const metadata = {
  title: "Dr Fisk 2.0",
  description: "Barsk men korrekt fiskedoktor med torr humor",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
