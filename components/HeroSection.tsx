import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* 1. Main Hero Area (Above Part with premium background picture) */}
      <div className="relative min-h-[75vh] flex items-center py-20 md:py-28 z-0">
        {/* Background Image with Dark Overlay for perfect contrast */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
          {/* Maroon/black gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a050f]/95 via-[#4a0e1e]/85 to-[#000000]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 section-container animate-on-scroll">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Delhi Section Student, Young Professionals &amp; Women in
              Engineering and Life member Congress
            </h1>

            <p className="text-lg text-white/80 max-w-2xl mb-10 leading-relaxed">
              Converging young minds, visionary women engineers, and distinguished
              life members for a future of innovation.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#schedule"
                className="px-8 py-3 bg-white text-[#7B1F34] rounded font-bold text-sm hover:bg-gray-100 transition-all shadow-md inline-block"
              >
                View Schedule
              </a>
              <Link
                href="/register"
                className="px-8 py-3 border-2 border-white text-white rounded font-bold text-sm hover:bg-white/10 transition-all shadow-md inline-block"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Organized By Area (Below Part - Clean, separated white strip) */}
      <div className="relative z-10 bg-white border-b border-gray-100 shadow-sm py-8 md:py-10">
        <div className="section-container flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 animate-on-scroll">
          <div className="flex-shrink-0">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
              Organized by
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* Logos on clean white cards for premium aesthetics */}
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow">
              <img
                src="/logos/dssywlc-logo.png"
                alt="DSSYWLC '25 — IEEE Delhi Section SAC"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow">
              <img
                src="/logos/ssn-logo.png"
                alt="IEEE NSUT Student Branch"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow">
              <img
                src="/logos/ieee-logo.png"
                alt="IEEE Delhi Section Student Activities Committee"
                className="h-8 w-auto object-contain"
              />
            </div>
            {/* WIE logo has a dedicated white container as requested */}
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow">
              <img
                src="/logos/wie logo purple.png"
                alt="IEEE Women in Engineering"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
