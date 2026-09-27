
"use client";

import { useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const calorieValues = [
    "150 kcal",
    "200 kcal",
    "180 kcal",
    "280 kcal",
    "260 kcal",
    "210 kcal",
    "220 kcal",
    "320 kcal",
    "170 kcal",
    "300 kcal",
    "280 kcal",
    "190 kcal",
  ];

 
  const workoutsWithCalories = workouts.map((workout, index) => ({
    ...workout,
    calories: calorieValues[index] || "N/A",
  }));

  
  const sortedWorkouts = [...workoutsWithCalories].sort(
    (a, b) => {
      if (sortBy === "duration") {
        const durationA = parseInt(a.duration) || 0;
        const durationB = parseInt(b.duration) || 0;

        return durationA - durationB;
      }

      if (sortBy === "calories") {
        const caloriesA =
          parseInt(a.calories) || 0;
        const caloriesB =
          parseInt(b.calories) || 0;

        return caloriesA - caloriesB;
      }

      if (sortBy === "rating") {
        const ratingA =
          parseFloat(a.rating) || 0;
        const ratingB =
          parseFloat(b.rating) || 0;

        return ratingB - ratingA;
      }

      return 0;
    }
  );

  return (
    <>
     
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Workout Library
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            The Library
          </h2>

          <p className="mt-3 max-w-xl text-white/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

       
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-bold uppercase text-white/50"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-full border border-white/20 bg-[#121513] px-5 py-3 pr-10 text-sm font-bold uppercase text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ccff00]">
              ▼
            </span>
          </div>
        </div>

      </div>

     
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </>
  );
}
