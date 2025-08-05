import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import StoreOwnerDashboard from "./components/store/StoreOwnerDashboard";
import ClientInterface from "./components/client/ClientInterface";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import AdminDashboard from "./components/AdminDashboard";
import SuperAdminDashboard from "./components/SuperAdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/clientinterface" element={<ClientInterface />} />
            <Route path="/store-dashboard/*" element={<StoreOwnerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
          </Routes>
        </>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
