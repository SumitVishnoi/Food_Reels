import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import CreateFood from "./pages/CreateFood";
import Save from "./components/Save";
import { useContext } from "react";
import { UserDataContext } from "./context/UserContext";
import PartnerProfile from "./pages/PartnerProfile";
import UserProfile from "./pages/UserProfile";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { userData } = useContext(UserDataContext);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/user/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/user/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <UserLogin />
            )
          }
        />
        <Route
          path="/user/register"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <UserRegister />
            )
          }
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/create-food" element={<CreateFood />} />
        <Route
          path="/food-partner/:id"
          element={userData && <PartnerProfile />}
        />
        <Route path="/save" element={userData && <Save />} />
        <Route path="/user/profile" element={userData && <UserProfile />} />
        <Route
          path="*"
          element={<ErrorPage />} // fallback for all invalid paths
        />
      </Routes>
    </div>
  );
}

export default App;
