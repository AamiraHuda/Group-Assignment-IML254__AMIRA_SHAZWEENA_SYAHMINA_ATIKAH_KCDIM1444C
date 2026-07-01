import { UserPlus, Gem, Crown, Check } from "lucide-react";

interface PromotionsProps {
  onNavigate: (pageId: string) => void;
}

export default function Promotions({ onNavigate }: PromotionsProps) {
  const promos = [
    {
      id: "new-client",
      badge: "Offer Page 1",
      title: "New Client Special",
      priceDisplay: "20%",
      priceSuffix: "OFF",
      summary: "Enjoy 20% off your absolute first premium Gel Manicure or luxurious Spa Pedicure session with us.",
      icon: UserPlus,
      darkTheme: false,
      benefits: ["Valid on any classic service", "Complimentary skin evaluation", "Free botanical hydration lotion"],
      ctaText: "Claim New Client Offer",
    },
    {
      id: "bridal-party",
      badge: "Offer Page 2",
      title: "Bridal & Group Soirée",
      priceDisplay: "RM150",
      priceSuffix: "/person",
      summary: "Book for 4 or more participants. The bride's treatment is completely free, plus complementary sparkling cider and fresh berries.",
      icon: Gem,
      darkTheme: true,
      benefits: ["Private salon seating zone", "Nail art included for bride", "Group photos & refreshments"],
      ctaText: "Inquire Group Booking",
    },
    {
      id: "loyalty",
      badge: "Offer Page 3",
      title: "Pearl Members Club",
      priceDisplay: "Buy 5",
      priceSuffix: "Get 1 Free",
      summary: "Accumulate reward stamps on our elegant membership pass. Your 6th classic manicure service is on us.",
      icon: Crown,
      darkTheme: false,
      benefits: ["Free automatic enrolment", "Birthday special discounts", "Priority queue slot bookings"],
      ctaText: "Learn Loyalty Rules",
    },
  ];

  return (
    <section id="promotions" className="w-full py-16 bg-[#e8d8ce]/30 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[#8b7355] text-xs font-bold tracking-widest uppercase block mb-2">
            Seasonal Events
          </span>
          <h2 className="font-serif text-4xl font-bold text-[#4a3b32] mb-4">
            Current Promotions
          </h2>
          <div className="w-24 h-1 bg-[#8b7355] mx-auto rounded-full mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-700">
            Take advantage of our exclusive seasonal packages, group benefits, and local loyalty reward systems.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {promos.map((promo) => {
            const IconComponent = promo.icon;
            return (
              <div
                key={promo.id}
                className={`rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between ${
                  promo.darkTheme
                    ? "bg-[#4a3b32] text-white border-t-8 border-[#d4c4b7] relative overflow-hidden"
                    : "bg-white text-[#4a3b32] border-t-8 border-[#8b7355] border border-gray-100"
                }`}
              >
                {/* Popular Badge for Bridal */}
                {promo.darkTheme && (
                  <div className="absolute top-0 right-0 bg-[#8b7355] text-white text-xxs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider">
                    POPULAR
                  </div>
                )}

                <div>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                      promo.darkTheme ? "bg-[#8b7355]/30" : "bg-[#e8d8ce]/60"
                    }`}
                  >
                    <IconComponent
                      className={`w-7 h-7 ${
                        promo.darkTheme ? "text-[#e8d8ce]" : "text-[#4a3b32]"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                      promo.darkTheme ? "text-[#d4c4b7]" : "text-[#8b7355]"
                    }`}
                  >
                    {promo.badge}
                  </span>

                  <h3 className="font-serif text-2xl font-bold mb-4">
                    {promo.title}
                  </h3>

                  {/* Price Banner */}
                  <div className="flex items-baseline gap-2 mb-6 border-b border-gray-100/10 pb-6">
                    <span
                      className={`text-4xl font-serif font-bold ${
                        promo.darkTheme ? "text-[#e8d8ce]" : "text-[#8b7355]"
                      }`}
                    >
                      {promo.priceDisplay}
                    </span>
                    <span
                      className={`text-sm ${
                        promo.darkTheme ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {promo.priceSuffix}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-6 leading-relaxed ${
                      promo.darkTheme ? "text-[#d4c4b7]/90" : "text-gray-600"
                    }`}
                  >
                    {promo.summary}
                  </p>

                  {/* Benefits Checklist */}
                  <ul className="space-y-2.5 mb-8 text-xs">
                    {promo.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            promo.darkTheme ? "bg-[#8b7355]/30" : "bg-green-50"
                          }`}
                        >
                          <Check
                            className={`w-3.5 h-3.5 ${
                              promo.darkTheme ? "text-[#e8d8ce]" : "text-green-600"
                            }`}
                          />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onNavigate("reservation")}
                  className={`w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md ${
                    promo.darkTheme
                      ? "bg-[#e8d8ce] text-[#4a3b32] hover:bg-white"
                      : "bg-[#4a3b32] text-[#fdfbf9] hover:bg-[#8b7355]"
                  }`}
                >
                  {promo.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
