import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Importe o componente Login
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial para o Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota do Cadastro (Componente será criado depois) */}
        {/* <Route path="/cadastro" element={<h1>Página de Cadastro</h1>} /> */}
        
      </Routes>
    </BrowserRouter>
  )
}

export default App