import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainPage } from './pages/MainPage/MainPage';
import { Header } from './components/Header/Header';

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
      </Routes>
    </div>
  );
}

export default App;
