import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KpiDashboard from './pages/KpiDashboard';
import TopUpQueue from './pages/TopUpQueue';
import WithdrawQueue from './pages/WithdrawQueue';
import Games from './pages/Games';
import Payments from './pages/Payments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<KpiDashboard />} />
          <Route path="topups" element={<TopUpQueue />} />
          <Route path="withdraws" element={<WithdrawQueue />} />
          <Route path="games" element={<Games />} />
          <Route path="payments" element={<Payments />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
