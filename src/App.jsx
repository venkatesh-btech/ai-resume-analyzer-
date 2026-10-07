import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import Analyzer from './pages/Analyzer.jsx';
import History from './pages/History.jsx';
import Home from './pages/Home.jsx';
import Results from './pages/Results.jsx';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyzer />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AppLayout>
  );
}
