import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("/movie/now_playing", {
          params: {
            api_key: "e3b783a8d4cf82ae8e3b2a41824ee5c5",
            language: "pt-BR",
            page: 1,
          },
        });
        setFilmes(response.data.results.slice(0, 10));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    }
    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((item) => {
          return (
            <article key={item.id}>
              <strong>{item.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt="item.title"
              ></img>
              <Link to={`/filme/${item.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
// jkvmvgjhgvjhg

//e3b783a8d4cf82ae8e3b2a41824ee5c5

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2I3ODNhOGQ0Y2Y4MmFlOGUzYjJhNDE4MjRlZTVjNSIsInN1YiI6IjYzYjA1OWNhMWQxYmY0MDA4YWRmNTEwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M1JD0uUUVzgGntwHF9xNHpoe0XigvLCnJVVv4F-9Wt4
