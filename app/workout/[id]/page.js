/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const calorieValues = [
  "250 kcal",
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

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  const [planCount, setPlanCount] = useState(0);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function loadPlanCount() {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    setPlanCount(existingPlan.length);

    return existingPlan;
  }

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await res.json();

        const selectedWorkout = data.find(
          (item) => String(item.id) === String(params.id)
        );

        if (selectedWorkout) {
          const index = data.indexOf(selectedWorkout);

          const workoutData = {
            ...selectedWorkout,
            calories: calorieValues[index] || "N/A",
            difficulty: "Intermediate",
            sets: "3",
            reps: "10-12",
            instructions: [
              "Start with the correct position and maintain proper posture.",
              "Perform the movement slowly and with controlled form.",
              "Focus on the target muscle throughout every repetition.",
              "Return to the starting position and repeat for the recommended sets.",
            ],
          };

          setWorkout(workoutData);

          const savedPlan = JSON.parse(
            localStorage.getItem("fitlog-plan") || "[]"
          );

          const savedWorkouts = JSON.parse(
            localStorage.getItem("fitlog-saved") || "[]"
          );

          setPlanCount(savedPlan.length);

          setAdded(
            savedPlan.some(
              (item) =>
                String(item.id) === String(selectedWorkout.id)
            )
          );

          setSaved(
            savedWorkouts.some(
              (item) =>
                String(item.id) === String(selectedWorkout.id)
            )
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();

    function handleStorage() {
      loadPlanCount();
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [params.id]);

  function addToPlan() {
    if (!workout) return;

    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const alreadyAdded = existingPlan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyAdded) {
      setAdded(true);
      showToast("Workout is already in today's plan!");
      return;
    }

    if (existingPlan.length >= 5) {
      setPlanCount(existingPlan.length);
      showToast("Today's plan is full (5 workouts)!");
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlanCount(updatedPlan.length);
    setAdded(true);

    window.dispatchEvent(new Event("storage"));

    showToast("Added to today's plan! ✓");
  }

  function toggleSave() {
    if (!workout) return;

    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const alreadySaved = existingSaved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadySaved) {
      const updatedSaved = existingSaved.filter(
        (item) => String(item.id) !== String(workout.id)
      );

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      setSaved(false);

      window.dispatchEvent(new Event("storage"));

      showToast("Removed from saved!");
    } else {
      const updatedSaved = [...existingSaved, workout];

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      setSaved(true);

      window.dispatchEvent(new Event("storage"));

      showToast("Saved for later! ✓");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />

          <p className="mt-4 text-[#ccff00]">
            Loading workout...
          </p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase">
            Workout Not Found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-black uppercase text-black"
          >
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  const planIsFull = planCount >= 5 && !added;

  return (
    <main className="min-h-screen px-5 py-12 md:px-8 md:py-20">
      {toast && (
        <div className="fixed right-5 top-24 z-100">
          <div className="rounded-xl border border-[#ccff00]/40 bg-[#121513] px-5 py-4 shadow-2xl">
            <p className="text-sm font-bold text-[#ccff00]">
              {toast}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-bold uppercase tracking-wider text-[#ccff00]"
        >
          ← Back to Workouts
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#121513] md:grid-cols-2">
          <div className="h-87.5 md:h-full md:min-h-162.5">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            <span className="inline-block rounded-full border border-[#ccff00]/30 px-4 py-2 text-xs font-bold uppercase text-[#ccff00]">
              {workout.category}
            </span>

            <h1 className="mt-5 text-4xl font-black uppercase md:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-white/60">
              Build strength and improve your overall fitness with this
              focused workout. Follow the recommended sets, reps and
              duration while maintaining proper form.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Equipment
                </p>

                <p className="mt-2 font-bold">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Difficulty
                </p>

                <p className="mt-2 font-bold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Sets
                </p>

                <p className="mt-2 font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Reps
                </p>

                <p className="mt-2 font-bold">
                  {workout.reps}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Duration
                </p>

                <p className="mt-2 font-bold">
                  {workout.duration}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Calories
                </p>

                <p className="mt-2 font-bold">
                  {workout.calories}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase text-white/40">
                  Rating
                </p>

                <p className="mt-2 font-bold">
                  {workout.rating}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-black uppercase">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-white/60"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-black">
                      {index + 1}
                    </span>

                    <span className="leading-7">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 space-y-3">
              <button
                onClick={addToPlan}
                disabled={planIsFull}
                className={`w-full rounded-full px-6 py-4 font-black uppercase transition ${
                  added
                    ? "bg-[#ccff00] text-black"
                    : planIsFull
                    ? "cursor-not-allowed bg-white/10 text-white/30"
                    : "bg-[#ccff00] text-black hover:scale-[1.02]"
                }`}
              >
                {added
                  ? "Added to Today's Plan ✓"
                  : planIsFull
                  ? "Today's Plan Full (5/5)"
                  : "Add to Today's Plan"}
              </button>

              <button
                onClick={toggleSave}
                className="w-full rounded-full border border-[#ccff00]/40 px-6 py-4 font-black uppercase text-[#ccff00] transition hover:bg-[#ccff00]/10"
              >
                {saved
                  ? "Saved for Later ✓"
                  : "Save for Later"}
              </button>

              {added && (
                <button
                  onClick={() => router.push("/my-plan")}
                  className="w-full rounded-full border border-white/20 px-6 py-4 font-black uppercase text-white transition hover:bg-white/10"
                >
                  View My Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}