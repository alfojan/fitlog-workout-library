import React from "react";
import FooterLogo from "@/assets/Footer.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#090A0D] min-h-[100px] flex flex-col justify-center py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 justify-center">
          <Image src={FooterLogo} alt="Footer Logo" />
          <div className="text-xl font-bold">FITLOG</div>
        </div>

        <div className="text-center text-sm text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
