import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./components/layout/Nav";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { HobbiesPage } from "./pages/HobbiesPage";
import { HobbyDetailPage } from "./pages/HobbyDetailPage";
import { WritingPage } from "./pages/WritingPage";
import { ContactPage } from "./pages/ContactPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:projectId" element={<ProjectDetailPage />} />
        <Route path="/hobbies" element={<HobbiesPage />} />
        <Route path="/hobbies/:hobbyId" element={<HobbyDetailPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
