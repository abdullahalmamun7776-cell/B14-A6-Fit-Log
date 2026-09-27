import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
          FitLog
        </p>

        <h1 className="mt-4 text-7xl font-black md:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-black uppercase md:text-3xl">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-white/50">
          The page or workout you are looking for does not exist.
          Let&apos;s get you back to the workout library.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#ccff00] px-7 py-3 text-sm font-black uppercase text-black transition hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}