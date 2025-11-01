import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";

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
         <Route path="*" element={<ErrorPage />} />
      </Routes>
   );
};
