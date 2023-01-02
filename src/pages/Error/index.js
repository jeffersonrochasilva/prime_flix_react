import "./error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error">
      <h1 className="subTitle">404</h1>
      <h1 className="title">Esta pagina não existe : (</h1>
      <Link to="/" className="botao">
        Veja todos os filmes
      </Link>
    </div>
  );
}
export default Error;
