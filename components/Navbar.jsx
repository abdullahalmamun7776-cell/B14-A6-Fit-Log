"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function updateCounts() {
      const savedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const savedWorkouts = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlanCount(savedPlan.length);
      setSavedCount(savedWorkouts.length);
    }

    updateCounts();

    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d0c]">
      <nav className="mx-auto max-w-7xl px-5 md:px-8">

        
        <div className="flex min-h-20 items-center justify-between">

         
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl font-black tracking-wide text-white"
          >
            FIT<span className="text-[#ccff00]">LOG</span>
          </Link>

          
          <div className="hidden items-center gap-8 md:flex">

            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-wide text-[#ccff00]"
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className="text-sm font-semibold uppercase tracking-wide text-white/60 transition hover:text-white"
            >
              My Plan
            </Link>

          </div>

          
          <div className="hidden items-center gap-2 md:flex">

            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold uppercase text-black"
            >
              Plan {planCount}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold uppercase text-white"
            >
              Saved {savedCount}
            </Link>

          </div>

          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/20 px-3 py-2 text-xl text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

       
        {menuOpen && (
          <div className="border-t border-white/10 py-5 md:hidden">

            <div className="flex flex-col gap-3">

              
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-bold uppercase text-[#ccff00] hover:bg-white/5"
              >
                Workout
              </Link>

             
              <Link
                href="/my-plan"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-bold uppercase text-white/70 hover:bg-white/5 hover:text-white"
              >
                My Plan
              </Link>

              
              <div className="mt-2 flex gap-2 px-4">

                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex-1 rounded-full bg-[#ccff00] px-3 py-2 text-center text-xs font-bold uppercase text-black"
                >
                  Plan {planCount}
                </Link>

                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex-1 rounded-full border border-white/30 px-3 py-2 text-center text-xs font-bold uppercase text-white"
                >
                  Saved {savedCount}
                </Link>

              </div>

            </div>

          </div>
        )}

      </nav>
    </header>
  );
}