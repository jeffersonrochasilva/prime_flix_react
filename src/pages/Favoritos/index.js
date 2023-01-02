import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const response = localStorage.getItem("@primeFlix");
    let filmesSalvos = JSON.parse(response) || [];
    console.log(filmesSalvos, "response");
    setFilmes(filmesSalvos);
  }, []);

  function deleteFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeFlix", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      {filmes.length === 0 && (
        <span>Você não possui ennhum filme salvo : (</span>
      )}
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={() => deleteFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
