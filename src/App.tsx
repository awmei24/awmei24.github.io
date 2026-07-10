import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { GardenProvider } from "./components/garden/GardenContext";
import { ScrollGarden } from "./components/garden/ScrollGarden";
import { CursorTrail } from "./components/garden/CursorTrail";
import { SecretBloom } from "./components/garden/SecretBloom";
import { IdleCritter } from "./components/garden/IdleCritter";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const WorkPage = lazy(() => import("./pages/WorkPage").then((m) => ({ default: m.WorkPage })));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })));
const HobbiesPage = lazy(() => import("./pages/HobbiesPage").then((m) => ({ default: m.HobbiesPage })));
const HobbyDetailPage = lazy(() => import("./pages/HobbyDetailPage").then((m) => ({ default: m.HobbyDetailPage })));
const WritingPage = lazy(() => import("./pages/WritingPage").then((m) => ({ default: m.WritingPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:projectId" element={<ProjectDetailPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/hobbies/:hobbyId" element={<HobbyDetailPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function SiteChrome() {
  const { pathname } = useLocation();
  // the contact page is its own dark closing spread — no footer band there
  const showFooter = pathname !== "/contact";

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <AnimatedRoutes />
      </main>
      {showFooter && <Footer />}

      {/* garden easter-egg layers (all reduced-motion aware) */}
      <ScrollGarden />
      <CursorTrail />
      <SecretBloom />
      <IdleCritter />
    </>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <GardenProvider>
          <SiteChrome />
        </GardenProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
