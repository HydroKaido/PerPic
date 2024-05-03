import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/index';
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/Auth/LoginPage/index';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

