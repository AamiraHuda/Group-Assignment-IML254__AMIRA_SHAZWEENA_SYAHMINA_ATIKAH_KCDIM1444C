import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "educational", label: "Educational" },
    { id: "promotions", label: "Promotions" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#fdfbf9]/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#d4c4b7]/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with clean styling */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer h-full py-2"
            onClick={() => handleNavClick("home")}
            id="header-logo-container"
          >
            <img src="/assets/logo.svg" alt="Pearl &amp; Polish Logo" className="h-14 w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`text-sm font-medium transition-all duration-300 pb-1 border-b-2 hover:text-[#8b7355] ${
                    isActive
                      ? "text-[#8b7355] border-[#8b7355]"
                      : "text-[#4a3b32] border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick("reservation")}
              id="nav-book-now-btn"
              className="bg-[#4a3b32] text-[#fdfbf9] px-6 py-2.5 rounded-full hover:bg-[#8b7355] active:scale-95 transition-all shadow-md text-sm font-medium"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#4a3b32] hover:text-[#8b7355] focus:outline-none p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform rotate-0" />
              ) : (
                <Menu className="w-6 h-6 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#fdfbf9] border-b border-[#d4c4b7] absolute w-full left-0 shadow-lg animate-fadeIn"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#e8d8ce] text-[#4a3b32] font-semibold"
                      : "text-[#4a3b32] hover:bg-[#fdfbf9]/50 hover:text-[#8b7355]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick("reservation")}
              className="w-full text-center py-3.5 mt-2 bg-[#4a3b32] text-[#fdfbf9] rounded-xl font-medium shadow-md active:scale-98 transition-all"
            >
              Book Reservation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
