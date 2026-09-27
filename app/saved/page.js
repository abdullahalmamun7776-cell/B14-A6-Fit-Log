/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SavedPage() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    function loadSavedWorkouts() {
      const saved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setSavedWorkouts(saved);
    }

    loadSavedWorkouts();

    window.addEventListener("storage", loadSavedWorkouts);

    return () => {
      window.removeEventListener("storage", loadSavedWorkouts);
    };
  }, []);

  function removeSaved(id) {
    const updatedSaved = savedWorkouts.filter(
      (workout) => String(workout.id) !== String(id)
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSavedWorkouts(updatedSaved);

    window.dispatchEvent(new Event("storage"));
  }

  return (
    <main className="min-h-screen px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Your Favorites
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase md:text-5xl">
            Saved Workouts
          </h1>

          <p className="mt-3 text-white/60">
            Your favorite workouts are saved here.
          </p>
        </div>

        {savedWorkouts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#121513] p-10 text-center">
            <h2 className="text-2xl font-black uppercase">
              No Saved Workouts
            </h2>

            <p className="mt-3 text-white/50">
              Save your favorite workouts to see them here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-black uppercase text-black"
            >
              Browse Workouts
            </Link>
          </div>
        )}

        {savedWorkouts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedWorkouts.map((workout) => (
              <article
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#121513]"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <span className="rounded-full border border-[#ccff00]/30 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]">
                    {workout.category}
                  </span>

                  <h2 className="mt-4 text-xl font-black uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-sm text-white/50">
                    {workout.equipment}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs uppercase text-white/40">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {workout.duration}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-white/40">
                        Calories
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {workout.calories || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-white/40">
                        Rating
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {workout.rating}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full bg-[#ccff00] px-4 py-3 text-center text-sm font-black uppercase text-black"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => removeSaved(workout.id)}
                      className="rounded-full border border-red-500/40 px-4 py-3 text-sm font-black uppercase text-red-400 transition hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}