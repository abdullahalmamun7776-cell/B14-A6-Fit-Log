import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-white/10 bg-[#0b0d0c]">
      <div className="mx-auto grid `min-h-150` max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-2 lg:py-20">

        
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Workout Library
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/60 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today is plan, and watch the week is work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black hover:bg-[#d9ff4d]"
          >
            Browse Workouts
            <span aria-hidden="true">→</span>
          </a>
        </div>

       <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <Image 
           src="/banner.png" alt="Working training"
           
           width="1200"
           height="500"
           className="h-105 w-full object-cover md:h-125"
           />

          <div className="absolute inset-0 `bg-gradient-to-t` from-[#0b0d0c]/50 to-transparent" />
        </div>

      </div>
    </section>
  );
}