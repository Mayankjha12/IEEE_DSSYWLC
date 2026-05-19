export default function HostInstitution() {
  return (
    <section className="py-20 bg-[#f0f4f8]">
      <div className="section-container animate-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              Host Institution
            </h2>
            <p className="text-gray-600 text-lg mb-1">
              Netaji Subhas University of Technology
            </p>
            <div className="w-16 h-0.5 bg-[#7B1F34] rounded-full mb-8"></div>

            <p className="text-gray-500 leading-relaxed mb-6">
              Netaji Subhas University of Technology (NSUT), formerly known as
              Netaji Subhas Institute of Technology (NSIT), is an Autonomous
              State University established in 1983 (originally as Delhi
              Institute of Technology). Upgraded to full university status in
              2018, NSUT&apos;s main campus is spread across approximately 149.5
              acres in Dwarka, New Delhi, featuring modern classrooms, advanced
              laboratories, a comprehensive central library, and a large
              auditorium.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              The fully residential campus functions like a mini-city with five
              boys&apos; hostels, three girls&apos; hostels, staff housing, a
              cooperative mess, a sprawling sports complex, banks, a post
              office, shopping kiosks, and a dispensary. NSUT also operates an
              East Campus in Geeta Colony and a West Campus in Jaffarpur Kalan.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7B1F34]"></span>
                <span className="text-slate-700 font-semibold text-sm">
                  Autonomous State University (Est. 1983)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7B1F34]"></span>
                <span className="text-slate-700 font-semibold text-sm">
                  149.5 Acre Residential Campus
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7B1F34]"></span>
                <span className="text-slate-700 font-semibold text-sm">
                  Award-Winning IEEE Student Branch
                </span>
              </li>
            </ul>

            <a
              href="https://nsut.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7B1F34] font-semibold text-sm hover:underline inline-flex items-center gap-1"
            >
              Visit University Website{" "}
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Right: image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover"
              alt="NSUT Dwarka campus"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo9fGP_rCsilouwZjARaG_z_HtX4lJTKlvgsuQMajtiokI2l4X2Rc-jhszN2hZpn480IEaNNgjZFvwSWEM3p_W_13xxaeZRPCTV5dSWt_meD9Nkx3QqbujptYb0fF9YT-M5GUhqNkrAkwSwS26I5xqyqetidW8-e3r_79dVrT6frDgS_LYg2yhkhXtYRSKxamUBLpjQ-dJOvKTwEo30pUoDudWBRqDvXktd5b_Y9fV4qycC6uG-d4ewyxxd3o2hco4IXIoV4Xprik"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
