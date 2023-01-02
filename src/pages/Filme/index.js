import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "e3b783a8d4cf82ae8e3b2a41824ee5c5",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          navigate("/", { replace: true });
          return;
        });
    }
    getFilme();

    return () => {};
  }, [id, navigate]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeFlix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success("FILME CADASTRADO COM SUCESSO");
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando</h1>
      </div>
    );
  }

  return (
    <div className="filme">
      <h1 className="title">{filme.title}</h1>
      <img
        className="img"
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3 className="subtitle">sinopse</h3>
      <span className="text">{filme.overview}</span>
      <strong className="subtext">Avaliação: {filme.vote_average} / 10</strong>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
