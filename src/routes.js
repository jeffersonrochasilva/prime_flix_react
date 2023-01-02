import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Header from "./components/Header";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Favoritos from "./pages/Favoritos";

function RouterApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
