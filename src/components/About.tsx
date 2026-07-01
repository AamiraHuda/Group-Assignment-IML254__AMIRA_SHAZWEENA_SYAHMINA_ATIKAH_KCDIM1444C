interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export default function About() {
  const team: TeamMember[] = [
    {
      name: "Eleanor Vance",
      role: "Founder / Managing Director",
      bio: "With over 10 years of experience in luxury cosmetology, Eleanor established Pearl & Polish to redefine hygienic and artistic nail care standards.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sarah Jenkins",
      role: "Senior Nail Technician",
      bio: "Specializing in structured builder gels and durable extensions, Sarah ensures your custom extensions remain healthy and extremely resilient.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Mia Chen",
      role: "Lead Manicurist & Nail Artist",
      bio: "An illustrator by background, Mia loves painting complex customized hand designs, floral work, and textured metal-chrome highlights.",
      imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Chloe Davis",
      role: "Salon Coordinator",
      bio: "Chloe ensures every aspect of your spa reservation is frictionless, greeting you with custom-brewed refreshments upon check-in.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section id="about" className="w-full py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Intro Header */}
        <div className="text-center mb-16">
          <span className="text-[#8b7355] text-xs font-bold tracking-widest uppercase block mb-2">
            Our Philosophy
          </span>
          <h2 className="font-serif text-4xl font-bold text-[#4a3b32] mb-4">
            About Pearl & Polish
          </h2>
          <div className="w-24 h-1 bg-[#8b7355] mx-auto rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed">
            Founded with a passion for holistic beauty and restorative wellness, Pearl & Polish provides a modern sanctuary for dedicated self-care. We believe a manicure is never just a coat of color—it is a conscious moment to slow down, refresh, and step back into the world feeling deeply confident.
          </p>
        </div>

        {/* Narrative Split Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white p-8 sm:p-12 rounded-3xl border border-[#d4c4b7]/30 shadow-sm">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#4a3b32]">
              Crafting A Healthier, Clean Beauty Standard
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We recognized a major gap in the market: traditional nail salons often prioritized rapid turnover over hygienic detail and ingredient health. We set out to change that. 
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At Pearl & Polish, we operate an ultra-premium boutique salon experience. Every treatment begins with a thorough botanical assessment, utilizing medical-grade sanitary controls and curated plant-derived products. We make your natural nails stronger while bringing your creative art visions to life.
            </p>
            <div className="pt-4 border-t border-gray-100 flex gap-6">
              <div>
                <span className="block font-serif text-3xl font-bold text-[#8b7355]">100%</span>
                <span className="text-xs text-gray-500 uppercase font-medium">Hygienic Control</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-[#8b7355]">10-Free</span>
                <span className="text-xs text-gray-500 uppercase font-medium">Chemical Formula</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-[#8b7355]">15k+</span>
                <span className="text-xs text-gray-500 uppercase font-medium">Happy Clients</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2.5 rounded-2xl border-2 border-[#8b7355]/10 translate-x-3 translate-y-3 pointer-events-none"></div>
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
              alt="Salon Interior"
              className="rounded-2xl shadow-md w-full object-cover h-[350px]"
            />
          </div>
        </div>

        {/* Team Grid */}
        <div className="text-center mb-12">
          <span className="text-[#8b7355] text-xs font-bold tracking-widest uppercase block mb-2">
            The Artisans
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#4a3b32]">
            Meet Our Experts
          </h3>
          <div className="w-16 h-1 bg-[#8b7355] mx-auto rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d4c4b7]/30 text-center hover:shadow-md hover:border-[#8b7355]/40 transition-all duration-300 group"
            >
              <div className="overflow-hidden h-64 relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg text-[#4a3b32] mb-1">
                  {member.name}
                </h4>
                <p className="text-[#8b7355] font-semibold text-xs uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
