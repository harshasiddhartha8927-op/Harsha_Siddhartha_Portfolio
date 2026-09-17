import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';
import { ContactPage } from './components/ContactPage';
import { NotFoundPage } from './components/NotFoundPage';

// Admin Components
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProjects } from './admin/AdminProjects';
import { AdminProjectForm } from './admin/AdminProjectForm';
import { AdminSkills } from './admin/AdminSkills';
import { AdminServices } from './admin/AdminServices';
import { AdminAbout } from './admin/AdminAbout';
import { AdminContact } from './admin/AdminContact';

function PublicPortfolio() {
  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-kanit overflow-x-clip w-full min-h-screen selection:bg-[#B600A8] selection:text-white">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <FooterSection />
    </div>
  );
}

export function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PublicPortfolio />} />

          {/* Dedicated Contact Page Route */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<AdminProjectForm />} />
            <Route path="projects/edit/:id" element={<AdminProjectForm />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Fallback Catch-All Page Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
