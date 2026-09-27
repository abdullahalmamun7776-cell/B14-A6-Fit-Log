import WorkoutCard from "./WorkoutCard";

function Library() {
  const workouts = [
    {
      id: 1,
      name: "Full Body Workout",
      category: "Strength",
      equipment: "Dumbbells",
      duration: "30 min",
      calories: "250 kcal",
      rating: "4.9",
      image: "/workout1.jpg",
    },
    {
      id: 2,
      name: "Upper Body Workout",
      category: "Upper Body",
      equipment: "Dumbbells",
      duration: "25 min",
      calories: "200 kcal",
      rating: "4.8",
      image: "/workout2.jpg",
    },
    {
      id: 3,
      name: "Lower Body Workout",
      category: "Lower Body",
      equipment: "Bodyweight",
      duration: "20 min",
      calories: "180 kcal",
      rating: "4.7",
      image: "/workout3.jpg",
    },
    {
      id: 4,
      name: "Chest Workout",
      category: "Chest",
      equipment: "Barbell",
      duration: "35 min",
      calories: "280 kcal",
      rating: "4.8",
      image: "/workout4.jpg",
    },
    {
      id: 5,
      name: "Back Workout",
      category: "Back",
      equipment: "Dumbbells",
      duration: "30 min",
      calories: "260 kcal",
      rating: "4.8",
      image: "/workout5.jpg",
    },
    {
      id: 6,
      name: "Arm Workout",
      category: "Arms",
      equipment: "Dumbbells",
      duration: "25 min",
      calories: "210 kcal",
      rating: "4.7",
      image: "/workout6.jpg",
    },
    {
      id: 7,
      name: "Shoulder Workout",
      category: "Shoulders",
      equipment: "Dumbbells",
      duration: "25 min",
      calories: "220 kcal",
      rating: "4.8",
      image: "/workout7.jpg",
    },
    {
      id: 8,
      name: "Leg Strength",
      category: "Legs",
      equipment: "Barbell",
      duration: "35 min",
      calories: "320 kcal",
      rating: "4.9",
      image: "/workout8.jpg",
    },
    {
      id: 9,
      name: "Core Workout",
      category: "Core",
      equipment: "Bodyweight",
      duration: "20 min",
      calories: "170 kcal",
      rating: "4.7",
      image: "/workout9.jpg",
    },
    {
      id: 10,
      name: "Cardio Workout",
      category: "Cardio",
      equipment: "Treadmill",
      duration: "30 min",
      calories: "300 kcal",
      rating: "4.8",
      image: "/workout10.jpg",
    },
    {
      id: 11,
      name: "HIIT Workout",
      category: "HIIT",
      equipment: "Bodyweight",
      duration: "20 min",
      calories: "280 kcal",
      rating: "4.9",
      image: "/workout11.jpg",
    },
    {
      id: 12,
      name: "Home Workout",
      category: "Home",
      equipment: "Bodyweight",
      duration: "25 min",
      calories: "190 kcal",
      rating: "4.7",
      image: "/workout12.jpg",
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Explore Workouts
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase md:text-4xl">
            Featured Workouts
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Choose a workout and start building your strength,
            endurance, and fitness.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div key={workout.id} className="w-full">
              <WorkoutCard workout={workout} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Library;