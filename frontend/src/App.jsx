import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchemesPage from './pages/SchemesPage';
import SchemeDetailPage from './pages/SchemeDetailPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schemes" element={<SchemesPage />} />
        <Route path="/scheme/:id" element={<SchemeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;