"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  const navLinks = (
    <>
      <li>
        <Link href="/" className={pathname === "/" ? "text-[#C2F800]" : ""}>
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "text-[#C2F800]" : ""}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-[#090A0D] shadow-sm min-h-[80px] flex items-center sticky top-0 z-50 border-b border-[#252830]">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-[#17191e] text-white rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image src={logo} alt="Logo" width={25} height={25} />

            <Link href="/" className="text-3xl font-bold">
              FITLOG
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-6">
          {/* Plan Badge */}
          <Link href="/my-plan" className="gap-2 flex items-center">
            Plan
            <div className="bg-[#C2F800] rounded-full text-black w-[20px] h-[20px] flex items-center justify-center font-semibold">
              {plan.length}
            </div>
          </Link>

          {/* Saved Badge */}
          <Link href="/my-plan" className="gap-2 flex items-center">
            Saved
            <div className="border border-[#2D313B] rounded-full text-white w-[20px] h-[20px] flex items-center justify-center">
              {saved.length}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
