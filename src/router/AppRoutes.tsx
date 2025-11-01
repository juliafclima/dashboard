import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";

export const AppRoutes: React.FC = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <ProtectedRoute>
                  <Dashboard />
               </ProtectedRoute>
            }
         />
         <Route path="/login" element={<LoginPage />} />
      </Routes>
   );
};
