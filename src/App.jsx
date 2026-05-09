import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import EsportsPage from './pages/EsportsPage';
import FoodPage from './pages/FoodPage';
import EntertainmentPage from './pages/EntertainmentPage';
import HealthPage from './pages/HealthPage';
import MoneyPage from './pages/MoneyPage';
import TravelPage from './pages/TravelPage';
import TechPage from './pages/TechPage';
import HistoryPage from './pages/HistoryPage';
import CulturePage from './pages/CulturePage';
import WarPage from './pages/WarPage';
import EnvironmentPage from './pages/EnvironmentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/esports" element={<EsportsPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/entertainment" element={<EntertainmentPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/money" element={<MoneyPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/war" element={<WarPage />} />
          <Route path="/environment" element={<EnvironmentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
