export default function RitualGrid() {
    const rituals = [
        { id: 1, name: "Godbharai (Prebirth)" },
        { id: 2, name: "Chatti (Post Birth)" },
        { id: 3, name: "Sataisa (Post Birth)" },
        { id: 4, name: "Annaprasan" },
        { id: 5, name: "Mundan" },
        { id: 6, name: "Vidhya Arambh" },
        { id: 7, name: "Upnayan (Janeu)" },
        { id: 8, name: "Puberty Ritual (Girls)" },
        { id: 9, name: "Custom / Exceptional Family Ritual (DIY)", isDIY: true },
    ];

    return (
        <section className="py-20 bg-[#FAF6F0] border-b border-[#C5A059]/20">
            <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Core Riti Riwaj Heading Target */}
                <h2 className="text-3xl md:text-5xl font-bold text-[#B85D3B] mb-2 font-serif">
                    Riti Riwaj
                </h2>
                <p className="text-[#2B2B2B]/70 font-sans text-sm max-w-md mx-auto mb-12">
                    Preserve your lineage steps, specific items, traditional songs, and relative roles[cite: 1].
                </p>

                {/* Dynamic Card Blueprint Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rituals.map((ritual) => (
                        <div
                            key={ritual.id}
                            className={`p-6 text-left rounded-lg transition-all ${ritual.isDIY
                                    ? "border-2 border-dashed border-[#C5A059] bg-white shadow-sm"
                                    : "bg-white border border-slate-200 shadow-sm"
                                }`}
                        >
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2 font-serif">
                                {ritual.name}
                            </h3>
                            <p className="text-xs font-sans text-[#2B2B2B]/60 leading-relaxed mb-4">
                                {ritual.isDIY
                                    ? "Document a unique ceremony specific to your regional lineage or community roots to keep forever[cite: 1, 2]."
                                    : "Capture the precise samagri lists, special food, photographic notes, and ancestral details[cite: 1]."}
                            </p>
                            <div className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider font-sans">
                                {ritual.isDIY ? "Discovery Slot" : "6 Sub-sections Included"}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}