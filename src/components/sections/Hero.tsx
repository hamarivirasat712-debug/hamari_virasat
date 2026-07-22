export default function Hero() {
    return (
        <section className="bg-white py-20 px-8 border-b border-[#C5A059]/10 text-center">
            <div className="max-w-3xl mx-auto">
                {/* Subtle Tagline */}
                <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-widest font-sans">
                    Passing Down the Flame, Not Just the Ashes
                </span>

                {/* Core Emotional Heading */}
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2B2B2B] mt-4 mb-6 leading-tight">
                    Preserve Your Family’s Sacraments for Generations
                </h1>

                {/* Supporting Copy */}
                <p className="text-base md:text-lg font-sans text-[#2B2B2B]/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Every family holds a unique lineage of sacred traditions. <strong className="text-[#B85D3B]">Virasat</strong> allows you to systematically document the step-by-step rituals, precise samagri lists, and traditional audio passed down by your ancestors—ensuring they are never forgotten or diluted.
                </p>

                {/* Primary Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-[#B85D3B] hover:bg-[#B85D3B]/90 text-white font-sans font-medium px-8 py-3 rounded shadow-sm transition-all">
                        Begin Archiving Your Lineage
                    </button>
                    <button className="border border-[#C5A059] hover:bg-[#FAF6F0] text-[#2B2B2B] font-sans font-medium px-8 py-3 rounded transition-all">
                        Explore Demo Ritual
                    </button>
                </div>
            </div>
        </section>
    );
}