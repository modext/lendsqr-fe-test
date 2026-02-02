/**
 * Alternative app entry using React Router via BrowserRouter.
 * The app currently runs via main.tsx using RouterProvider + router (app/router.tsx).
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { Login } from '@/pages/Login/Login';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Users } from '@/pages/Users/Users';
import { UserDetails } from '@/pages/UserDetails/UserDetails';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route index element={<Navigate to="/users" replace />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
