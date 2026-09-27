/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#121513]">
      <div className="h-56 overflow-hidden bg-white/5">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#ccff00]/30 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]">
            {workout.category}
          </span>
        </div>

        <h3 className="text-xl font-black uppercase text-white">
          {workout.name}
        </h3>

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
            <p className="mt-1 text-sm font-bold text-white">
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

        <Link
          href={`/workout/${workout.id}`}
          className="mt-6 block rounded-full bg-[#2191ad] px-5 py-3 text-center text-sm font-black uppercase text-black transition hover:scale-[1.02]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}