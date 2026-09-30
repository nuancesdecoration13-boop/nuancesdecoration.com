import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import Rideaux from './pages/Rideaux';
import Voilages from './pages/Voilages';
import Stores from './pages/Stores';
import RevetementInterieur from './pages/RevetementInterieur';
import RevetementExterieur from './pages/RevetementExterieur';
import Banquettes from './pages/Banquettes';
import Bateaux from './pages/Bateaux';
import BanquettesExterieurSurMesure from './pages/BanquettesExterieurSurMesure';
import Histoire from './pages/Histoire';
import Contact from './pages/Contact';
import Showroom from './pages/Showroom';
import CGV from './pages/CGV';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-[73px] md:pt-[89px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/realisations/rideaux" element={<Rideaux />} />
            <Route path="/realisations/voilages" element={<Voilages />} />
            <Route path="/realisations/stores" element={<Stores />} />
            <Route path="/realisations/revetement-interieur" element={<RevetementInterieur />} />
            <Route path="/realisations/revetement-exterieur" element={<RevetementExterieur />} />
            <Route path="/realisations/banquettes" element={<Banquettes />} />
            <Route path="/realisations/bateaux" element={<Bateaux />} />
            <Route path="/realisations/banquettes-exterieur-sur-mesure" element={<BanquettesExterieurSurMesure />} />
            <Route path="/histoire" element={<Histoire />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/cgv" element={<CGV />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
