import { Sparkles, Leaf, ShieldAlert } from "lucide-react";

interface HomeProps {
  onNavigate: (pageId: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <section id="home" className="w-full animate-fadeIn">
      {/* Hero Banner Section */}
      <div className="relative bg-[#e8d8ce] py-20 lg:py-32 overflow-hidden">
        {/* Decorative background visual accents */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#8b7355]/40 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#4a3b32]/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Headline and CTAs */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#fdfbf9] text-[#8b7355] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm border border-[#d4c4b7]/30">
              Welcome to Luxury Nail Care
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#4a3b32] mb-6 leading-tight">
              Elevate Your <br />Everyday Polish
            </h1>
            <p className="text-base md:text-lg text-[#8b7355] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience premium, restorative nail care in a relaxing, highly hygienic environment. We specialize in custom hand-painted nail artistry, organic structural gels, and personalized pampering.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate("reservation")}
                className="bg-[#4a3b32] text-[#fdfbf9] px-8 py-4 rounded-full hover:bg-[#8b7355] transition-all duration-300 shadow-lg font-medium text-base hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                Book Appointment
              </button>
              <button
                onClick={() => onNavigate("services")}
                className="bg-[#fdfbf9] text-[#4a3b32] border border-[#d4c4b7] px-8 py-4 rounded-full hover:bg-[#e8d8ce] transition-all duration-300 font-medium text-base hover:-translate-y-0.5 active:translate-y-0"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Featured Hero Visual */}
          <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Outer decorative box frame */}
              <div className="absolute -inset-3 rounded-2xl border border-[#8b7355]/20 translate-x-4 translate-y-4 pointer-events-none"></div>
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800"
                alt="Manicure Setup"
                className="rounded-2xl shadow-xl w-full object-cover h-[380px] sm:h-[450px] border-4 border-white relative z-10 hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Core Features Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4a3b32]">
            Why Pearl & Polish?
          </h2>
          <div className="w-16 h-1 bg-[#8b7355] mx-auto rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#d4c4b7]/30 hover:shadow-md hover:border-[#8b7355]/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-[#e8d8ce]/50 rounded-full flex items-center justify-center mb-6">
              <Leaf className="w-7 h-7 text-[#8b7355]" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[#4a3b32]">
              Non-Toxic Products
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              We exclusively utilize high-grade, cruelty-free, 10-free, and vegan-friendly nail formulations to protect your health and beauty.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#d4c4b7]/30 hover:shadow-md hover:border-[#8b7355]/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-[#e8d8ce]/50 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-[#8b7355]" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[#4a3b32]">
              Expert Technicians
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Our highly-certified nail masters specialize in anatomical care, precision cuticle work, and advanced hand-painted nail designs.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#d4c4b7]/30 hover:shadow-md hover:border-[#8b7355]/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-[#e8d8ce]/50 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-7 h-7 text-[#8b7355]" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[#4a3b32]">
              Medical-Grade Hygiene
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Your safety is our priority. All metal implements undergo autoclaving sanitation, and non-metal tools are strictly single-use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
