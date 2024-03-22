import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowCategorias from "./components/ShowCategorias";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ShowCategorias/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
