import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LearningOutcomes from "./components/LearningOutcomes";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import Toast from "./components/Toast";
import WorkshopDetails from "./components/WorkshopDetails";
import { useToast } from "./hooks/useToast";

/**
 * Root application shell. Composes the single-page layout in section order
 * and mounts the global Toast portal at the bottom of the tree (outside
 * the scrollable content flow).
 */
export default function App() {
  const { toast, dismissToast } = useToast();

  return (
    <div className="min-h-screen overflow-x-hidden font-body">
      <Navbar />

      <main>
        <HeroSection />
        <WorkshopDetails />
        <LearningOutcomes />
        <FaqSection />
        <RegistrationForm />
      </main>

      <Footer />

      {/* Global toast notification layer */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
