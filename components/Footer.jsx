export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0a0d0b]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <h2 className="text-2xl font-black uppercase">
            Fit<span className="text-[#ccff00]">Log</span>
          </h2>

          <p className="mt-2 text-sm text-white/40">
            Train with intent. Log every set.
          </p>
        </div>

        <p className="text-sm text-white/40">
          © 2026 FitLog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}