import { useState } from "react";
import { Sparkles, Eye } from "lucide-react";

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  // Premium, high-quality nail care and manicure portfolio images
  const allImages = [
    {
      id: 1,
      title: "Elegant Pearl Inlays",
      category: "classic",
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      title: "Pastel Ombre Gradient",
      category: "art",
      url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      title: "Gold Foil & Sage Green",
      category: "art",
      url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      title: "Modern Minimalist French",
      category: "classic",
      url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 5,
      title: "Chromes & Velvet Magnetics",
      category: "extension",
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 6,
      title: "Matte Cocoa Extensions",
      category: "extension",
      url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 7,
      title: "Hand-painted Daisies",
      category: "art",
      url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 8,
      title: "Deep Crimson Glaze",
      category: "classic",
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 9,
      title: "Terrazzo Coated Tips",
      category: "art",
      url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=500",
    },
  ];

  // Helper to chunk or shift the image list depending on the selected page (creates 5 different view configurations)
  const getPagedImages = () => {
    let list = [...allImages];
    if (activeFilter !== "all") {
      list = list.filter((img) => img.category === activeFilter);
    }
    // Shift the sequence circularly to mock different pages of content
    const shiftBy = (currentPage - 1) % list.length;
    return [...list.slice(shiftBy), ...list.slice(0, shiftBy)].slice(0, 6);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll slightly to top of gallery on change
    const section = document.getElementById("gallery");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeImages = getPagedImages();

  return (
    <section id="gallery" className="w-full py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Title */}
        <div className="text-center mb-12">
          <span className="text-[#8b7355] text-xs font-bold tracking-widest uppercase block mb-2">
            The Studio Portfolio
          </span>
          <h2 className="font-serif text-4xl font-bold text-[#4a3b32] mb-4">
            Our Work Gallery
          </h2>
          <div className="w-24 h-1 bg-[#8b7355] mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            A visual curation of our premium hand-painted gel designs, custom extensions, and restorative procedures.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {[
            { id: "all", label: "All Designs" },
            { id: "classic", label: "Classic Polish" },
            { id: "art", label: "Nail Art" },
            { id: "extension", label: "Extensions" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-[#8b7355] text-[#fdfbf9] shadow-sm"
                  : "bg-white text-[#4a3b32] border border-[#d4c4b7]/50 hover:bg-[#e8d8ce]/25"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <div
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 transition-opacity duration-300"
        >
          {activeImages.map((img, index) => {
            // Give index 0 a special sizing class on md view for asymmetry
            const isFeatured = index === 0 && activeImages.length > 3;
            return (
              <div
                key={`${img.id}-${currentPage}-${index}`}
                className={`relative rounded-2xl overflow-hidden shadow-sm border border-[#d4c4b7]/20 bg-white group hover:shadow-md transition-all duration-300 ${
                  isFeatured ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`overflow-hidden relative ${isFeatured ? "h-[300px] md:h-[530px]" : "h-[250px]"}`}>
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#4a3b32]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[#e8d8ce] text-xs uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {img.category}
                    </span>
                    <h4 className="text-white font-serif font-bold text-lg flex items-center justify-between">
                      {img.title}
                      <Eye className="w-5 h-5 text-white/80" />
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stateful Page Selectors */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center space-x-3">
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                id={`gal-btn-${pageNum}`}
                className={`w-11 h-11 rounded-full font-serif font-bold text-sm transition-all duration-300 ${
                  currentPage === pageNum
                    ? "bg-[#4a3b32] text-white shadow-md scale-105"
                    : "bg-[#d4c4b7]/50 text-[#4a3b32] hover:bg-[#8b7355] hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-[#8b7355] mt-4 font-mono">
            Viewing Collection Page <span className="font-bold">{currentPage}</span> of 5
          </p>
        </div>
      </div>
    </section>
  );
}
