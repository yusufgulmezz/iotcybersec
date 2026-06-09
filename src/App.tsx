import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramPage from './pages/ProgramPage';
import ApplicationPage from './pages/ApplicationPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hakkinda" element={<AboutPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/portfolyo" element={<PortfolioPage />} />
        <Route path="/portfolyo/:slug" element={<PortfolioDetailPage />} />
        <Route path="/basvuru" element={<ApplicationPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
