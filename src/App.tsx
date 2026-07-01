import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Educational from "./components/Educational";
import Promotions from "./components/Promotions";
import Reservation from "./components/Reservation";
import GroupInfo from "./components/GroupInfo";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<string>("");

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookServiceDirectly = (serviceName: string) => {
    setSelectedServiceToBook(serviceName);
    setCurrentPage("reservation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingSuccess = () => {
    // Clear initial state on success screen
    setSelectedServiceToBook("");
  };

  // Render active section based on current state route
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "about":
        return <About />;
      case "services":
        return <Services onBookService={handleBookServiceDirectly} />;
      case "gallery":
        return <Gallery />;
      case "educational":
        return <Educational />;
      case "promotions":
        return <Promotions onNavigate={handleNavigate} />;
      case "reservation":
        return (
          <Reservation
            initialService={selectedServiceToBook}
            onBookingSuccess={handleBookingSuccess}
          />
        );
      case "group-info":
        return <GroupInfo />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-[#fdfbf9] text-[#4a3b32] font-sans antialiased flex flex-col min-h-screen selection:bg-[#e8d8ce] selection:text-[#4a3b32]">
      {/* Sticky header bar */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Primary scrollable view area */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Sticky bottom footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
