import { BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Educational() {
  const articles = [
    {
      step: "Guide 1 of 4",
      title: "Understanding Nail Anatomy",
      summary: "Understand the biological matrix, plate, and bed. Knowing how your natural nail grows is key to preventing structural damage and promoting health.",
      imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400",
      content: [
        "The nail matrix is located under the skin at the base and produces keratin cells.",
        "Your nail plate is the visible, hard structure made of layers of dead protein.",
        "Protecting the cuticle ensures dust and bacteria do not enter the delicate matrix."
      ]
    },
    {
      step: "Guide 2 of 4",
      title: "The Truth About Cuticles",
      summary: "Should you cut or push back? We break down the clinical facts about the eponychium and explain how to moisturize safely without triggering infection.",
      imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=400",
      content: [
        "The cuticle is a barrier designed to keep bacteria from entering the live nail root.",
        "Aggressive trimming can lead to chronic inflammation, swelling, and ridges.",
        "Instead, use specialized cuticle softeners and gently push back with wood sticks."
      ]
    },
    {
      step: "Guide 3 of 4",
      title: "Gel vs. Acrylic: Choosing Right",
      summary: "Confused about artificial overlays? We compare chemical structures, curing mechanisms, and how each system fits your daily style and physical lifestyle.",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
      content: [
        "Acrylics are formed from mixing powder/liquid monomer and are extremely strong.",
        "Hard gels are cured under UV/LED light and offer more natural flex and high gloss.",
        "BIAB (Builder In A Bottle) is ideal for strengthening natural growth without severe bulk."
      ]
    },
    {
      step: "Guide 4 of 4",
      title: "Maximizing Manicure Lifespan",
      summary: "Keep your style looking fresh for weeks. Simple daily practices to prevent lifting, hydration rules, and why hot water is the enemy of fresh overlays.",
      imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400",
      content: [
        "Wear rubber gloves when cleaning or doing dishes to prevent chemical lifting.",
        "Apply luxury cuticle oil twice a day to keep the seal flexible and moisturized.",
        "Never pick or peel lifting gel as it takes away layers of your natural plate."
      ]
    }
  ];

  return (
    <section id="educational" className="w-full py-16 bg-[#fdfbf9] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[#8b7355] text-xs font-bold tracking-widest uppercase block mb-2">
            Knowledge Hub
          </span>
          <h2 className="font-serif text-4xl font-bold text-[#4a3b32] mb-4">
            Educational Guides
          </h2>
          <div className="w-24 h-1 bg-[#8b7355] mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Professional tips, detailed anatomical insights, and guidance for keeping your nails strong and gorgeous between your spa appointments.
          </p>
        </div>

        {/* Guides Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-3xl border border-[#d4c4b7]/30 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#4a3b32]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-mono">
                  {article.step}
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#4a3b32] mb-3">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="space-y-3 mb-6 bg-[#e8d8ce]/10 p-5 rounded-2xl border border-[#e8d8ce]/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b7355] mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> Professional Tips:
                    </h4>
                    {article.content.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#8b7355] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href="#learn"
                    onClick={(e) => e.preventDefault()}
                    className="text-[#8b7355] hover:text-[#4a3b32] font-bold text-sm inline-flex items-center gap-1 group transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
