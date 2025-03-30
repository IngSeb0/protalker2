
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import IndexEs from "./pages/IndexEs";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/es" element={<IndexEs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route 
            path="/demo" 
            element={
              <ProtectedRoute>
                <Demo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;
