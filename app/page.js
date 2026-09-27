
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

async function getWorkouts() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-5 py-20 md:px-8"
      >
        <WorkoutLibrary workouts={workouts} />
      </section>
    </main>
  );
}
