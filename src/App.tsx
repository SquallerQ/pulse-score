import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainPage } from './pages/MainPage/MainPage';
import { About } from './pages/About/About';
import { Header } from './components/Header/Header';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

const HistoryPage = lazy(() => import('./pages/HistoryPage/HistoryPage'));

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route
          path="/history"
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <HistoryPage />
            </Suspense>
          }
        />

        <Route path="/About" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
