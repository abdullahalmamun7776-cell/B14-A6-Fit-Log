import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FitLog",
  description: "Workout Library and Planning Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0d0b] text-white">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}