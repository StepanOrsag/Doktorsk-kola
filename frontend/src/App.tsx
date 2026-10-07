import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { OfferHelpPage } from './pages/OfferHelpPage';
import { SeekHelpPage } from './pages/SeekHelpPage';
import { CollaborationPage } from './pages/CollaborationPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6'
      }}>
        <Routes>
          <Route path="/prihlaseni" element={<LoginPage />} />
          <Route path="/registrace" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/prihlaseni" replace />} />
        </Routes>
      </div>
    );
  }
  return (
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
            <Route path="/prispevek/:id" element={<PostDetailPage />} />
            <Route path="/pridat-prispevek" element={<CreatePostPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;