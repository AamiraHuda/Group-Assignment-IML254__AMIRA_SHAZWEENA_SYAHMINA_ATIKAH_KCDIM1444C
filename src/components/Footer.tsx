import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

interface FooterProps {
  onNavigate: (pageId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4a3b32] text-[#d4c4b7] mt-auto border-t-4 border-[#8b7355]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center">
              <img src="/assets/logo-white.svg" alt="Pearl &amp; Polish Logo" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-sm text-[#d4c4b7]/80 max-w-sm leading-relaxed">
              Elevating everyday polish with premium, organic care, non-toxic products, and custom professional artistry.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#8b7355]/20 flex items-center justify-center hover:bg-[#8b7355] text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#8b7355]/20 flex items-center justify-center hover:bg-[#8b7355] text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#8b7355]/20 flex items-center justify-center hover:bg-[#8b7355] text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="TikTok/YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="text-[#fdfbf9] font-serif font-bold mb-5 uppercase text-xs tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("promotions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Promotions
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate("group-info")}
                  className="hover:text-white transition-colors text-[#e8d8ce] font-bold tracking-wide text-left flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
                  Group Details (IML254)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[#fdfbf9] font-serif font-bold mb-5 uppercase text-xs tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5" />
                <span>123 Beauty Blvd, Suite 100, Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8b7355] shrink-0" />
                <span>+60 3-1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8b7355] shrink-0" />
                <span className="break-all">hello@pearlandpolish.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4c4b7]/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#d4c4b7]/60">
          <p>&copy; {currentYear} Pearl & Polish Manicure. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono">
            Designed with Elegance & Precision
          </p>
        </div>
      </div>
    </footer>
  );
}
