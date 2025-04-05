import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Loginpage from './pages/Loginpage';
import { useAuthStore } from './store/useAuthStore';
import Employeepage from './pages/Employeepage';
import Hrpage from './pages/Hrpage';
// import { ProtectedRoute } from './components/ProtectedRoute'; // Assuming you have this
import './index.css';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,isHR,loginAsHR } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('source');

    if (location.pathname === '/hrpage' && source === 'atomhr') {
      loginAsHR();
      navigate('/hrpage', { replace: true, state: { fromAtomHR: true } });
    } else if (location.pathname === '/hr-portal' && source === 'atomhr') {
      loginAsHR();
      navigate('/hrpage', { replace: true, state: { fromAtomHR: true } });
    }
  }, [location, navigate, loginAsHR]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={isHR ? <Navigate to="/hrpage" replace /> : authUser ? <Navigate to="/employee" replace /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/employee" />} />
        <Route path="/employee" element={authUser ? <Employeepage /> : <Navigate to="/login" />} />
        <Route
          path="/hrpage"
          element={isHR  && location.state?.fromAtomHR ? <Hrpage /> : <Navigate to="/" replace />}
        />
        {/* <Route path="/hr/*" element={<ProtectedRoute allowedRoles={['hr']} component={Hrpage} />} />
        <Route path="/employee/*" element={<ProtectedRoute allowedRoles={['employee']} component={Employeepage} />} />
        <Route path="/hr-portal" element={<>Redirecting...</>} /> */}
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// import LoginPage from './components/LoginPage';
// import { useAuthStore } from './store/useAuthStore';
// import { ProtectedRoute } from './components/ProtectedRoute'; // Assuming you have this
// import Employeepage from './pages/Employeepage';
// import Hrpage from './pages/Hrpage';

// function AppRoutes() {
//   const { authUser, userRole, loginAsHR } = useAuthStore();
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user landed on the specific HR access route
//     if (location.pathname === '/hr-portal') {
//       // **Ideally, you should still verify this with your backend.**
//       // Atom HR might pass some identifier (like a token) in the URL
//       // (e.g., /hr-portal?token=...) that you then send to your backend
//       // for verification.

//       // For a simpler scenario (less secure), you could just set the HR role:
//       loginAsHR();
//       navigate('/hr', { replace: true });
//     }
//   }, [location, navigate, loginAsHR]);

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={authUser && userRole === 'employee' ? <Navigate to="/employee" replace /> : <LoginPage />}
//       />
//       <Route path="/employee/*" element={<ProtectedRoute allowedRoles={['employee']} component={Employeepage} />} />
//       <Route path="/hr/*" element={<ProtectedRoute allowedRoles={['hr']} component={Hrpage} />} />
//       <Route path="/hr-portal" element={<>Loading...</>} /> {/* This route acts as the entry point */}
//       <Route
//         path="/"
//         element={
//           authUser ? (
//             userRole === 'hr' ? (
//               <Navigate to="/hr" replace />
//             ) : (
//               <Navigate to="/employee" replace />
//             )
//           ) : location.pathname === '/hr-portal' ? (
//             <>Loading...</> {/* Keep showing loading while HR auth in progress */}
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// function App() {
//   const { checkAuth, authUser, userRole, isCheckingAuth } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   useEffect(() => {
//     if (!isCheckingAuth) {
//       if (authUser) {
//         if (userRole === 'hr') {
//           navigate('/hr', { replace: true });
//         } else if (userRole === 'employee') {
//           navigate('/employee', { replace: true });
//         }
//       }
//     }
//   }, [isCheckingAuth, authUser, userRole, navigate]);

//   if (isCheckingAuth) {
//     return <div>Checking Authentication...</div>; // Or a loading spinner
//   }

//   return (
//     <AppRoutes />
//   );
// }

// export default App;