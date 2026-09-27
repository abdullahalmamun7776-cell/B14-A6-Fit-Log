export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />

        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          Loading workouts…
        </p>

        <p className="mt-2 text-sm text-white/40">
          Preparing your workout library
        </p>
      </div>
    </main>
  );
}