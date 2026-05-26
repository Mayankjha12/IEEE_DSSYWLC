export default function AccommodationSection() {
  const hotels = [
    {
      name: "SSS Group Hotel",
      location: "Mahavir Enclave",
      contact: "98189 14386",
      details:
        "Double sharing=1100/night, Triple sharing=1400/night, Breakfast=150/person additional",
      distance: "6.1km",
    },
    {
      name: "FabHotel White House",
      location: "Sector 17",
      contact: "70424 24242",
      details: "Double sharing=3192/night, Mattress=500",
      distance: "3.1km",
    },
    {
      name: "Hotel Dwarka Inn",
      location: "Sector 15",
      contact: "78408 00036",
      details: "2500/night",
      distance: "2.2km",
    },
    {
      name: "Southwest Inn",
      location: "Sector 13",
      contact: "87004 10756",
      details: "3500/night (breakfast included)",
      distance: "2km",
    },
    {
      name: "Hotel Grand Parisian",
      location: "Sector 13",
      contact: "011 4305 3102",
      details: "3500/night +tax",
      distance: "2km",
    },
    {
      name: "New Moon",
      location: "Sector 13",
      contact: "070118 41234",
      details: "Double sharing=2000/night, Mattress=300–400",
      distance: "1.5km",
    },
  ];

  return (
    <section className="py-20 bg-[#f0f4f8]" id="accommodation">
      <div className="section-container">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Accommodation
          </h2>
          <p className="text-gray-500 mb-4">
            Comfortable stay options near the venue.
          </p>
          <div className="w-16 h-0.5 bg-[#7B1F34] mx-auto"></div>
        </div>

        {/* Table */}
        <div className="max-w-5xl mx-auto animate-on-scroll">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4 pr-4">
                    Hotel
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4 pr-4">
                    Location
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4 pr-4">
                    Contact
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4 pr-4">
                    Details
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">
                    Distance from College
                  </th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-5 pr-4">
                      <p className="text-slate-800 font-bold text-sm">
                        {hotel.name}
                      </p>
                    </td>
                    <td className="py-5 pr-4">
                      <p className="text-gray-500 text-sm">{hotel.location}</p>
                    </td>
                    <td className="py-5 pr-4">
                      {hotel.contact ? (
                        <a
                          href={`tel:${hotel.contact.replace(/\s/g, "")}`}
                          className="text-[#7B1F34] text-sm font-semibold hover:underline"
                        >
                          {hotel.contact}
                        </a>
                      ) : (
                        <p className="text-gray-400 text-sm">—</p>
                      )}
                    </td>
                    <td className="py-5 pr-4">
                      <p className="text-slate-800 text-sm">
                        {hotel.details || "—"}
                      </p>
                    </td>
                    <td className="py-5">
                      <p className="text-gray-500 text-sm">{hotel.distance}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contact & Notes */}
          <div className="bg-red-50 border-l-4 border-[#7B1F34] rounded-r-lg p-5 mt-10">
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              <strong>In-Campus Hostel Update:</strong> On-campus room booking
              will be available from the afternoon of the 6th to the afternoon
              of the 8th.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              <strong>Food Provision:</strong> Meals will be provided only on
              the event dates, i.e., 7th and 8th February.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              <strong>Note:</strong> In the event of an extreme emergency, you
              may contact us for last minute assistance.
            </p>
            <div className="border-t border-[#7B1F34]/20 pt-3">
              <p className="text-sm text-slate-800 font-bold mb-1">
                For Accommodation Queries, Contact:
              </p>
              <p className="text-sm text-gray-700">
                Aditya Mishra —{" "}
                <a
                  href="tel:+918826490096"
                  className="text-[#7B1F34] font-semibold hover:underline"
                >
                  88264 90096
                </a>
              </p>
              <p className="text-sm text-gray-700">
                Akshat Kacodia —{" "}
                <a
                  href="tel:+919310823970"
                  className="text-[#7B1F34] font-semibold hover:underline"
                >
                  93108 23970
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
