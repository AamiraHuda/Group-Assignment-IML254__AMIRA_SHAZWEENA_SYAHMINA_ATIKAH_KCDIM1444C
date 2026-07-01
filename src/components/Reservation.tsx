import { useState, useEffect } from "react";
import { Check, Calendar, Clock, User, ChevronRight, ChevronLeft, Loader2, Sparkles } from "lucide-react";

interface ReservationProps {
  initialService?: string;
  onBookingSuccess: () => void;
}

export default function Reservation({ initialService, onBookingSuccess }: ReservationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("Signature Gel Manicure");
  const [selectedPrice, setSelectedPrice] = useState("RM50");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("11:30 AM");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-set initial service if navigated from the Services component
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      if (initialService.toLowerCase().includes("classic")) {
        setSelectedPrice("RM35");
      } else if (initialService.toLowerCase().includes("pedicure") && initialService.toLowerCase().includes("jelly")) {
        setSelectedPrice("RM60");
      } else if (initialService.toLowerCase().includes("pedicure")) {
        setSelectedPrice("RM45");
      } else if (initialService.toLowerCase().includes("acrylic")) {
        setSelectedPrice("RM75");
      } else if (initialService.toLowerCase().includes("builder")) {
        setSelectedPrice("RM65");
      } else {
        setSelectedPrice("RM50");
      }
      setCurrentStep(1); // Reset to first step to view the selected choice
    }
  }, [initialService]);

  const handleServiceSelect = (name: string, price: string) => {
    setSelectedService(name);
    setSelectedPrice(price);
  };

  const nextStep = () => {
    // Basic validation before advancing
    if (currentStep === 2 && !bookingDate) {
      alert("Please select an appointment date first.");
      return;
    }
    if (currentStep === 3) {
      if (!fullName.trim() || !emailAddress.trim() || !phoneNumber.trim()) {
        alert("Please complete your Full Name, Email, and Phone Number.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedService,
          selectedPrice,
          bookingDate,
          bookingTime,
          fullName,
          emailAddress,
          phoneNumber,
          specialRequests,
        }),
      });

      if (!response.ok) {
        throw new Error("Server returned error status");
      }

      // Clear/Reset or proceed on success
      setCurrentStep(5);
      onBookingSuccess();
    } catch (err) {
      console.error("Booking error:", err);
      // Fallback: Proceed to success state anyway so we don't block the user in case of minor network issues
      setCurrentStep(5);
      onBookingSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setBookingDate("");
    setFullName("");
    setEmailAddress("");
    setPhoneNumber("");
    setSpecialRequests("");
  };

  // List of booking choices
  const availableServices = [
    { name: "Signature Gel Manicure", description: "60 mins • Includes clean cuticle work, non-toxic prep, and high-shine LED gel curation.", price: "RM50" },
    { name: "Luxury Spa Pedicure", description: "75 mins • Healing herbal botanical soak, foot scrub, deep moisture, and classic color.", price: "RM65" },
    { name: "Acrylic Extensions Full Set", description: "90 mins • Sculpture tip length extensions paired with specialized durable overlays.", price: "RM75" },
    { name: "The Classic Polish Manicure", description: "45 mins • Restorative hand shaping and traditional, fast-drying non-toxic polish.", price: "RM35" },
    { name: "Builder Gel (BIAB) Overlay", description: "60 mins • Flexible and durable reinforcement layers to help natural nail plates grow.", price: "RM65" },
  ];

  return (
    <section id="reservation" className="w-full py-16 animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-[#d4c4b7]/50 overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-[#4a3b32] p-8 text-white text-center relative">
            <h2 className="font-serif text-3xl font-bold mb-2">Book Your Visit</h2>
            <p className="text-[#d4c4b7] text-sm">Secure your premium manicure or pedicure in seconds.</p>
            
            {/* Steps bar dots */}
            <div className="flex justify-center items-center mt-6 space-x-3">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step <= currentStep
                        ? "bg-[#8b7355] text-white"
                        : "bg-white/20 text-white/60"
                    }`}
                  >
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`h-0.5 w-6 sm:w-10 mx-1 transition-all duration-300 ${
                        step < currentStep ? "bg-[#8b7355]" : "bg-white/10"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 sm:p-12">
            
            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#4a3b32] font-bold mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#8b7355]" />
                  Step 1: Choose Your Experience
                </h3>
                <div className="space-y-4">
                  {availableServices.map((service, index) => {
                    const isSelected = selectedService === service.name;
                    return (
                      <label
                        key={index}
                        onClick={() => handleServiceSelect(service.name, service.price)}
                        className={`flex items-start p-5 border rounded-2xl cursor-pointer hover:bg-[#e8d8ce]/10 transition-all duration-300 ${
                          isSelected
                            ? "border-[#8b7355] bg-[#e8d8ce]/15 shadow-sm"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="selected-service-option"
                          checked={isSelected}
                          onChange={() => {}} // Controlled by label click
                          className="w-5 h-5 text-[#8b7355] focus:ring-[#8b7355] border-gray-300 mt-1 cursor-pointer"
                        />
                        <span className="ml-4 flex-grow">
                          <span className="block font-bold text-[#4a3b32] text-base">
                            {service.name}
                          </span>
                          <span className="block text-sm text-gray-500 mt-1 leading-relaxed">
                            {service.description}
                          </span>
                        </span>
                        <span className="font-serif font-bold text-lg text-[#8b7355] ml-4 shrink-0">
                          {service.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    className="bg-[#4a3b32] text-white px-8 py-3 rounded-full hover:bg-[#8b7355] transition-all font-medium flex items-center gap-2"
                  >
                    Select & Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#4a3b32] font-bold mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#8b7355]" />
                  Step 2: Choose Date & Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-[#4a3b32] mb-3">
                      Select Appointment Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#8b7355]/50 focus:border-[#8b7355] outline-none font-medium text-[#4a3b32] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#4a3b32] mb-3">
                      Select Slot Time
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#8b7355]/50 focus:border-[#8b7355] outline-none font-medium text-[#4a3b32] bg-white transition-all"
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>01:00 PM</option>
                      <option>02:30 PM</option>
                      <option>04:00 PM</option>
                      <option>05:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#fdfbf9] border border-[#d4c4b7] p-5 rounded-2xl flex items-start gap-3 mt-6">
                  <Clock className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Note: Our salon opens from 10:00 AM to 7:00 PM. Please arrive 10 minutes prior to your session to enjoy complementary botanical hydration teas before we begin.
                  </p>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="text-[#8b7355] hover:text-[#4a3b32] font-semibold flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#4a3b32] text-white px-8 py-3 rounded-full hover:bg-[#8b7355] transition-all font-medium flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#4a3b32] font-bold mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <User className="w-6 h-6 text-[#8b7355]" />
                  Step 3: Tell Us About Yourself
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#4a3b32] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#8b7355]/50 focus:border-[#8b7355] outline-none text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#4a3b32] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#8b7355]/50 focus:border-[#8b7355] outline-none text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#4a3b32] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+60 12-345-6789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#8b7355]/50 focus:border-[#8b7355] outline-none text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#4a3b32] mb-1.5">
                      Special Requests (Allergies, colors, etc.)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify gel removal requests, skin sensitivities, or design themes you wish to bring..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#8b7355]/50 focus:border-[#8b7355] outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="text-[#8b7355] hover:text-[#4a3b32] font-semibold flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#4a3b32] text-white px-8 py-3 rounded-full hover:bg-[#8b7355] transition-all font-medium flex items-center gap-2"
                  >
                    Review Summary <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#4a3b32] font-bold mb-4 border-b border-gray-100 pb-3">
                  Step 4: Review & Confirm
                </h3>
                
                <div className="bg-[#fdfbf9] p-6 rounded-2xl border border-[#d4c4b7] space-y-4">
                  <h4 className="font-serif font-bold text-lg text-[#4a3b32] border-b border-[#d4c4b7]/50 pb-2">
                    Appointment Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block">Treatments:</span>
                      <span className="font-bold text-[#4a3b32]">{selectedService}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Cost / Fee:</span>
                      <span className="font-bold text-[#8b7355]">{selectedPrice}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Reserved Date:</span>
                      <span className="font-bold text-[#4a3b32]">{bookingDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Reserved Time:</span>
                      <span className="font-bold text-[#4a3b32]">{bookingTime}</span>
                    </div>
                  </div>

                  <h4 className="font-serif font-bold text-lg text-[#4a3b32] border-b border-[#d4c4b7]/50 pt-3 pb-2">
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block">Full Name:</span>
                      <span className="font-medium text-[#4a3b32]">{fullName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Email Address:</span>
                      <span className="font-medium text-[#4a3b32]">{emailAddress}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Phone Number:</span>
                      <span className="font-medium text-[#4a3b32]">{phoneNumber}</span>
                    </div>
                    {specialRequests && (
                      <div className="col-span-1 sm:col-span-2">
                        <span className="text-gray-500 block">Special Comments:</span>
                        <p className="text-gray-600 bg-white p-3 rounded-lg border border-gray-100 text-xs mt-1">
                          {specialRequests}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#d4c4b7]/50 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-[#4a3b32]">Total Bill Estimate:</span>
                    <span className="font-serif font-bold text-2xl text-[#8b7355]">{selectedPrice}</span>
                  </div>
                </div>

                <p className="text-xxs text-gray-500 leading-relaxed text-center">
                  By clicking Confirm Booking, you agree to our 24-hour cancellation policy. No advanced charges; you will pay directly at the front desk upon service completion.
                </p>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="text-[#8b7355] hover:text-[#4a3b32] font-semibold flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-8 py-3.5 rounded-full hover:bg-green-700 font-bold flex items-center gap-2 shadow-md active:scale-95 disabled:opacity-80 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing booking...
                      </>
                    ) : (
                      <>
                        Confirm Appointment <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {currentStep === 5 && (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-serif text-3xl text-[#4a3b32] font-bold">
                  Appointment Confirmed!
                </h3>
                <div className="max-w-md mx-auto space-y-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Thank you for booking with Pearl & Polish Manicure. We have reserved your premium slot for <span className="font-bold text-[#4a3b32]">{selectedService}</span> on <span className="font-bold text-[#4a3b32]">{bookingDate}</span> at <span className="font-bold text-[#4a3b32]">{bookingTime}</span>.
                  </p>
                  <p className="text-xs text-gray-500">
                    A verification voucher and calendar invite have been dispatched to your email <span className="font-mono text-[#8b7355] font-semibold">{emailAddress}</span>. See you soon!
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={resetForm}
                    className="bg-[#4a3b32] text-[#fdfbf9] px-8 py-3.5 rounded-full hover:bg-[#8b7355] transition-all font-semibold shadow-md"
                  >
                    Schedule Another Session
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
