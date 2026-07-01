interface ServiceItem {
  name: string;
  description: string;
  price: string;
}

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const categories = [
    {
      id: "manicures",
      categoryName: "Signature Manicures",
      badge: "Category 1",
      description: "Nourishing, protective, and styled treatments for your hands.",
      imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600",
      items: [
        {
          name: "The Classic Polish",
          description: "Nail shaping, careful cuticle pushback, massage, and premium organic non-toxic regular polish.",
          price: "RM35",
        },
        {
          name: "Gel Overlay (Signature)",
          description: "Long-lasting, high-shine gel coating cured carefully under high-efficiency LED lights.",
          price: "RM50",
        },
        {
          name: "The Spa Ritual Manicure",
          description: "Includes a gentle hand exfoliation scrub, therapeutic warm paraffin wax wrap, and extended massage.",
          price: "RM65",
        },
      ] as ServiceItem[],
    },
    {
      id: "pedicures",
      categoryName: "Luxury Pedicures",
      badge: "Category 2",
      description: "Restorative, soothing soaking therapy and detailed nail care for your feet.",
      imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
      items: [
        {
          name: "Essential Pedicure",
          description: "Cleansing warm herbal soak, gentle scrub, rigorous nail and cuticle care, and professional polish.",
          price: "RM45",
        },
        {
          name: "Jelly Spa Pedicure",
          description: "A playful, gelatinous warm foot bath that deeply locks in essential oils and skin moisture.",
          price: "RM60",
        },
        {
          name: "Callus Smoothing Treatment",
          description: "An intensive softening application and file therapy designed for dry or rough heels.",
          price: "RM15",
        },
      ] as ServiceItem[],
    },
    {
      id: "enhancements",
      categoryName: "Enhancements & Custom Art",
      badge: "Category 3",
      description: "Add length, durability, and a completely unique creative expression.",
      imageUrl: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600",
      items: [
        {
          name: "Acrylic Extensions Full Set",
          description: "Professional tip extensions or sculpted forms styled to your target length and shape.",
          price: "RM70+",
        },
        {
          name: "Builder Gel (BIAB) Overlay",
          description: "A flexible and durable reinforcing overlay designed to help your natural nails grow.",
          price: "RM65",
        },
        {
          name: "Hand-Painted Custom Nail Art",
          description: "Chromes, negative space, customized linework, and gemstone highlights styled exactly to your requests.",
          price: "Varies",
        },
      ] as ServiceItem[],
    },
  ];

  return (
    <section id="services" className="w-full py-16 bg-[#e8d8ce]/10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <span className="text-[#8b7355] text-xs font-bold tracking-widest uppercase block mb-2">
            Spa Treatments
          </span>
          <h2 className="font-serif text-4xl font-bold text-[#4a3b32] mb-4">
            Our Premium Services
          </h2>
          <div className="w-24 h-1 bg-[#8b7355] mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Explore our specialized treatments across three custom wellness modules. Tap any service to book your personalized slot.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="space-y-16">
          {categories.map((category, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={category.id}
                className={`bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#d4c4b7]/30 flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 items-center hover:shadow-md transition-shadow duration-300`}
              >
                {/* Section Image */}
                <div className="w-full lg:w-2/5 shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-2xl border-2 border-[#d4c4b7]/30 translate-x-3 translate-y-3 pointer-events-none"></div>
                    <img
                      src={category.imageUrl}
                      alt={category.categoryName}
                      className="rounded-2xl shadow-sm w-full object-cover h-[300px] lg:h-[380px]"
                    />
                  </div>
                </div>

                {/* Services List */}
                <div className="w-full lg:w-3/5">
                  <span className="bg-[#e8d8ce] text-[#4a3b32] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {category.badge}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#4a3b32] mt-4 mb-2">
                    {category.categoryName}
                  </h3>
                  <p className="text-sm text-[#8b7355] mb-8">
                    {category.description}
                  </p>

                  <div className="space-y-6">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => onBookService(item.name)}
                        className="group flex justify-between items-start border-b border-[#d4c4b7]/40 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-[#fdfbf9]/50 p-2 rounded-lg transition-all duration-300"
                        title="Click to book this service"
                      >
                        <div className="pr-4">
                          <h4 className="font-bold text-lg text-[#4a3b32] group-hover:text-[#8b7355] transition-colors flex items-center gap-2">
                            {item.name}
                            <span className="opacity-0 group-hover:opacity-100 text-xs font-normal text-[#8b7355] transition-opacity">
                              (Click to book)
                            </span>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif font-bold text-lg text-[#8b7355] block">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
