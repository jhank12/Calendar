import "./App.css";

import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Signup from "./Components/Pages/Signup/Signup";
import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import { AuthContextProvider } from "./Contexts/AuthContext";

import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <AuthContextProvider>
      <main>
        <Routes>
          <Route path="/*" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" exact element={<Home />} />
          </Route>
        </Routes>
      </main>
    </AuthContextProvider>
  );
}

export default App;
