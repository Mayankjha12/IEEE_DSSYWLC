export default function SpeakersSection() {
  const speakers = [
    {
      name: "Prof. Anand Srivastava",
      role: "Vice Chancellor, NSUT",
      img: "/speakers/vc-nsut.png",
    },
    {
      name: "Prof. Prerna Gaur",
      role: "Chair — IEEE India Council",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186781/drprernagaur_lp5okn.jpg",
    },
    {
      name: "Dr. Preeti Bajaj",
      role: "Chair-Elect — IEEE India Council",
      img: "/speakers/preeti-bajaj.png",
    },
    {
      name: "Prof. M.N. Hoda",
      role: "Chairperson — IEEE Delhi Section",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186780/mnhoda_thmusc.jpg",
    },
    {
      name: "Mr. Deepak Mathur",
      role: "Director — IEEE Region 10",
      img: "/speakers/deepak-mathur.png",
    },
    {
      name: "Dr. S.S. Jamuar",
      role: "Delhi Section LMAG Secretary",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186780/mnhoda_thmusc.jpg",
    },
    {
      name: "Ms. Sneha Kabra",
      role: "Secretary — IEEE Delhi Section",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186781/snehakabra_xf0qis.jpg",
    },
    {
      name: "Prof. Arti M K",
      role: "Dean (Student Welfare), NSUT",
      img: "/speakers/dsw-nsut.png",
    },
  ];

  return (
    <section className="py-20 bg-white" id="speakers">
      <div className="section-container">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Distinguished Speakers
          </h2>
          <div className="w-16 h-0.5 bg-[#7B1F34] mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto animate-on-scroll">
          {speakers.map((speaker, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={speaker.img}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-slate-800 font-bold text-sm mb-1">
                {speaker.name}
              </h3>
              <p className="text-[#7B1F34] text-xs leading-relaxed">
                {speaker.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
