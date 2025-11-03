import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HoursPopup from './components/HoursPopup';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { LanguageProvider } from './components/LanguageContext';
import Home from './components/Home';
import TrackCalories from './components/TrackCalories';
import MealPlanner from './components/MealPlanner';
import ProgressHub from './components/ProgressHub';
import Resources from './components/Resources';
import FindSupport from './components/FindSupport';
import KeyFeatures from './components/KeyFeatures';
import AdvancedFeatures from './components/AdvancedFeatures';
import VisualShowcase from './components/VisualShowcase';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';

// Layout for all pages (no login required)
const AppLayout = ({ children, isScrolled, showNavOrderOptions, setShowNavOrderOptions, isMenuOpen, setIsMenuOpen, showHeroOrderOptions, setShowHeroOrderOptions, showHoursPopup, setShowHoursPopup }) => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header
          isScrolled={isScrolled}
          showNavOrderOptions={showNavOrderOptions}
          setShowNavOrderOptions={setShowNavOrderOptions}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <main className="pt-16">{children}</main>
        <HoursPopup
          showHoursPopup={showHoursPopup}
          setShowHoursPopup={setShowHoursPopup}
        />
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavOrderOptions, setShowNavOrderOptions] = useState(false);
  const [showHeroOrderOptions, setShowHeroOrderOptions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center z-50 animate-pulse-slower">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/logo.png"
            alt="NutriTrack Logo"
            className="w-40 h-40 object-contain mb-4 animate-bounce-subtle"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/128x128?text=Logo+Not+Available';
            }}
          />
          <div className="animate-spin-slow w-16 h-16 border-4 border-white border-t-transparent rounded-full mb-4"></div>
          <p className="text-white text-lg font-semibold animate-fadeInUp">
            Loading your health journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Default route - Direct to Home */}
        <Route
          path="/"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <Home
                showHeroOrderOptions={showHeroOrderOptions}
                setShowHeroOrderOptions={setShowHeroOrderOptions}
              />
            </AppLayout>
          }
        />

        {/* Other protected-like routes (now public) */}
        <Route
          path="/home"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <Home
                showHeroOrderOptions={showHeroOrderOptions}
                setShowHeroOrderOptions={setShowHeroOrderOptions}
              />
            </AppLayout>
          }
        />

        <Route
          path="/track-calories"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <TrackCalories />
            </AppLayout>
          }
        />

        <Route
          path="/meal-planner"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <MealPlanner />
            </AppLayout>
          }
        />

        <Route
          path="/progress-hub"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <ProgressHub />
            </AppLayout>
          }
        />

        <Route
          path="/resources"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <Resources />
            </AppLayout>
          }
        />

        <Route
          path="/find-support"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <FindSupport />
            </AppLayout>
          }
        />

        <Route
          path="/start-for-free"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <Home
                showHeroOrderOptions={showHeroOrderOptions}
                setShowHeroOrderOptions={setShowHeroOrderOptions}
              />
            </AppLayout>
          }
        />

        <Route
          path="/features"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <KeyFeatures />
            </AppLayout>
          }
        />

        <Route
          path="/advanced-features"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <AdvancedFeatures />
            </AppLayout>
          }
        />

        <Route
          path="/visual-showcase"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <VisualShowcase />
            </AppLayout>
          }
        />

        <Route
          path="/testimonials"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <Testimonials />
            </AppLayout>
          }
        />

        <Route
          path="/cta"
          element={
            <AppLayout
              isScrolled={isScrolled}
              showNavOrderOptions={showNavOrderOptions}
              setShowNavOrderOptions={setShowNavOrderOptions}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showHeroOrderOptions={showHeroOrderOptions}
              setShowHeroOrderOptions={setShowHeroOrderOptions}
              showHoursPopup={showHoursPopup}
              setShowHoursPopup={setShowHoursPopup}
            >
              <CTA />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;