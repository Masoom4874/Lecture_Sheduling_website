import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import SideBar from "./componets/SideBar";
import Instructors from "./pages/Instructors";
import Courses from "./pages/Courses";
import Lectures from "./pages/Lectures";
import { Login } from "./componets/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Instructors />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
