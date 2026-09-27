
/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyPlanPage() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [loading, setLoading] = useState(true);
  const [doneWorkouts, setDoneWorkouts] = useState([]);
  const [toast, setToast] = useState("");

  // Load Plan and Saved data
  useEffect(() => {
    function loadData() {
      const savedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const savedWorkouts = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      const completed = JSON.parse(
        localStorage.getItem("fitlog-done") || "[]"
      );

      setPlan(savedPlan);
      setSaved(savedWorkouts);
      setDoneWorkouts(completed);
      setLoading(false);
    }

    loadData();

    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  // Toast
  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  // Remove workout from Today's Plan
  function removeWorkout(id) {
    const updatedPlan = plan.filter(
      (workout) => String(workout.id) !== String(id)
    );

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlan(updatedPlan);

    window.dispatchEvent(new Event("storage"));

    showToast("Workout removed from today's plan!");
  }

  // Remove saved workout
  function removeSaved(id) {
    const updatedSaved = saved.filter(
      (workout) => String(workout.id) !== String(id)
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSaved(updatedSaved);

    window.dispatchEvent(new Event("storage"));

    showToast("Workout removed from saved!");
  }

  // Mark as Done / Undone
  function markAsDone(id) {
    const workoutId = String(id);

    const alreadyDone = doneWorkouts.some(
      (doneId) => String(doneId) === workoutId
    );

    let updatedDone;

    if (alreadyDone) {
      updatedDone = doneWorkouts.filter(
        (doneId) => String(doneId) !== workoutId
      );

      showToast("Workout marked as not done!");
    } else {
      updatedDone = [...doneWorkouts, id];

      showToast("Workout marked as done! ✓");
    }

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(updatedDone)
    );

    setDoneWorkouts(updatedDone);
  }

  // Current tab workouts
  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  // Total minutes
  const totalMinutes = plan.reduce((total, workout) => {
    const minutes = parseInt(workout.duration) || 0;

    return total + minutes;
  }, 0);

  // Total calories
  const totalCalories = plan.reduce((total, workout) => {
    const calories = parseInt(workout.calories) || 0;

    return total + calories;
  }, 0);

  return (
    <main className="min-h-screen px-5 py-16 md:px-8">

      {/* Toast */}
      {toast && (
        <div className="fixed right-5 top-24 z-100 animate-pulse">
          <div className="rounded-xl border border-[#ccff00]/40 bg-[#121513] px-5 py-4 shadow-2xl shadow-black/40">
            <p className="text-sm font-bold text-[#ccff00]">
              {toast}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Your Log
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase md:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 text-white/60">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#121513] p-6">
            <p className="text-sm uppercase text-white/40">
              Exercises
            </p>

            <p className="mt-2 text-4xl font-black text-[#ccff00]">
              {plan.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121513] p-6">
            <p className="text-sm uppercase text-white/40">
              Minutes
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121513] p-6">
            <p className="text-sm uppercase text-white/40">
              Calories
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3 border-b border-white/10 pb-4">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-3 text-sm font-black uppercase transition ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Today is Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-3 text-sm font-black uppercase transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />

            <p className="mt-4 text-[#ccff00]">
              Loading workouts…
            </p>

          </div>
        )}

        {/* Empty State */}
        {!loading && currentWorkouts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#121513] p-10 text-center">

            <h2 className="text-2xl font-black uppercase">
              Nothing Here Yet
            </h2>

            <p className="mt-3 text-white/50">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-black uppercase text-black"
            >
              Go to Workouts
            </Link>

          </div>
        )}

        {/* Workout Cards */}
        {!loading && currentWorkouts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {currentWorkouts.map((workout) => {

              const isDone = doneWorkouts.some(
                (doneId) =>
                  String(doneId) === String(workout.id)
              );

              return (
                <article
                  key={workout.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#121513]"
                >

                  {/* Image */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">

                    {/* Category */}
                    <span className="rounded-full border border-[#ccff00]/30 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]">
                      {workout.category}
                    </span>

                    {/* Name */}
                    <h2 className="mt-4 text-xl font-black uppercase">
                      {workout.name}
                    </h2>

                    {/* Equipment */}
                    <p className="mt-2 text-sm text-white/50">
                      {workout.equipment}
                    </p>

                    {/* Stats */}
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

                    {/* Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="rounded-full bg-[#ccff00] px-4 py-3 text-center text-sm font-black uppercase text-black"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" ? (

                        <button
                          onClick={() =>
                            markAsDone(workout.id)
                          }
                          className="rounded-full border border-white/20 px-4 py-3 text-sm font-black uppercase text-white transition hover:bg-white/10"
                        >
                          {isDone
                            ? "Done ✓"
                            : "Mark as Done"}
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            removeSaved(workout.id)
                          }
                          className="rounded-full border border-red-500/40 px-4 py-3 text-sm font-black uppercase text-red-400 transition hover:bg-red-500/10"
                        >
                          Remove
                        </button>

                      )}

                    </div>

                    {/* Remove From Plan */}
                    {activeTab === "plan" && (
                      <button
                        onClick={() =>
                          removeWorkout(workout.id)
                        }
                        className="mt-3 w-full rounded-full border border-white/10 px-4 py-3 text-sm font-black uppercase text-white/50 transition hover:border-red-500/40 hover:text-red-400"
                      >
                        Remove ×
                      </button>
                    )}

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}
