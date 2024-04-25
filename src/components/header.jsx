import style from "./header.module.css"
import { Link } from "react-router-dom"

function Header(){

    return(
        <div className={style.headerContainer}>
            <nav className={style.navHeader}>
                <Link to="/">Home</Link>
                <Link to="/lista-locais">Lista de locais</Link>
                <Link to="/cadastro-local">Cadastro Local</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
    )
}

export default Header;