export default function SpeakersSection() {
  const speakers = [
    {
      name: "Prof. Anand Srivastava",
      role: "Vice Chancellor, NSUT",
      img: "/speakers/vc-nsut.png",
    },
    {
      name: "Prof. Shampa Chakraverty",
      role: "Dean of Student Welfare, NSUT",
      img: "/speakers/dsw-nsut.png",
    },
    {
      name: "Prof. (Dr.) Prerna Gaur",
      role: "Director, NSUT West Campus, Chair — IEEE India Council",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186781/drprernagaur_lp5okn.jpg",
    },
    {
      name: "Prof. (Dr.) Preeti Bajaj",
      role: "Chair-Elect, IEEE India Council, Director — KIET Group of Institutions",
      img: "/speakers/preeti-bajaj.png",
    },
    {
      name: "Dr. M. N. Hoda",
      role: "Director, Bharti Vidyapeeth & Chairperson, IEEE Delhi Section",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186780/mnhoda_thmusc.jpg",
    },
    {
      name: "Deepak Mathur",
      role: "Past IEEE Region 10 Director & VP — IEEE MGA",
      img: "/speakers/deepak-mathur.png",
    },
    {
      name: "Prof. (Dr.) Sneha Kabra",
      role: "Secretary, IEEE Delhi Section, Senior Member IEEE, Fellow IETE",
      img: "https://res.cloudinary.com/dlia5xgwx/image/upload/v1770186781/snehakabra_xf0qis.jpg",
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
