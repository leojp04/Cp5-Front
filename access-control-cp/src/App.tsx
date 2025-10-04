import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/login";
import Cadastro from "./pages/cadastro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial para o Login */}
        <Route path="/" element={<Login />} />

        {/* Rota para o Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
