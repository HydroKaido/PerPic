import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/index";
import HomePage from "./pages/HomePage/index";
import LoginPage from "./pages/Auth/LoginPage/index";
import CreatePage from "./pages/CreatePage";
import Signup from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import SinglePage from "./pages/SinglePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:id" element={<SinglePage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/h/create" element={<CreatePage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
