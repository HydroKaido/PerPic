import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/index';
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/Auth/LoginPage/index';
import MyForm from './pages/CreatePage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/artwork/create' element={<MyForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

