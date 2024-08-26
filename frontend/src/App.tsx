import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./domains/Login/pages/LoginPage";
import RegisterPage from "./domains/Register/pages/RegisterPage";
import ArtGalleryPage from "./domains/ArtGallery/pages/ArtGalleryPage";
import CreateArtGalleryPage from "./domains/CreateArtGallery/pages/CreateArtGalleryPage";
import ArtSinglePage from "./domains/ArtSingle/pages/ArtSinglePage";
import DashboardPage from "./domains/Dashboard/pages/DashboardPage";
import ErrorPage from "./domains/ErrorPage/pages/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<ArtGalleryPage />}></Route>
          <Route path="/" element={<ArtGalleryPage />}></Route>
          <Route path="/:id" element={<ArtSinglePage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/h/create" element={<CreateArtGalleryPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
