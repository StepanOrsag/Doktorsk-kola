import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { OfferHelpPage } from './pages/OfferHelpPage';
import { SeekHelpPage } from './pages/SeekHelpPage';
import { CollaborationPage } from './pages/CollaborationPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nabidka-pomoci" element={<OfferHelpPage />} />
              <Route path="/poptavka-pomoci" element={<SeekHelpPage />} />
              <Route path="/nabidka-spoluprace" element={<CollaborationPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
