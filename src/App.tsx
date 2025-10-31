import { AuthProvider } from "./context/authContext";
import { FiltersProvider } from "./context/filtersContext";
import { AppRoutes } from "./router/AppRoutes";

export default function App() {
   return (
      <AuthProvider>
         <FiltersProvider>
            <AppRoutes />
         </FiltersProvider>
      </AuthProvider>
   )

}
