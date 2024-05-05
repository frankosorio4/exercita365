import style from "./header.module.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate();

    const logout = () => {
        if (confirm("Você deseja sair da sua conta")){
            localStorage.removeItem('isLogged');
            localStorage.removeItem('idUserLogged');
            navigate("/login")
        }
    }

    return(
        <div className={style.headerContainer}>
            <nav className={style.navHeader}>
                <Link to="/">Home</Link>
                <Link to="/lista-locais">Lista de locais</Link>
                <Link to="/cadastro-local">Cadastro Local</Link>
                <Link to="#" onClick={logout}>Logout</Link>
            </nav>
        </div>
    )
}

export default Header;