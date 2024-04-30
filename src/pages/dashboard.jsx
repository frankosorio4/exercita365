import styles from "./dashboard.module.css"
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuariosContext";

function Dashboard(){

    const {usuarios} = useContext(UsuarioContext);

    return(
        <div className="container">
            <div>
                <h1>Dashboard Page</h1>

                <div>
                    <h2>Visão geral dos locais(Intro)</h2>
                    <h2>Card Usuarios Logados-ativos-locais cadastrados</h2>
                    <h2>Lista de locais sem botoes</h2>
                </div>
                <div>
                    <h2>Lista Usuarios:</h2>
                    {usuarios.map(usuario => (
                        <div key={usuario.id}>
                            <h4>{usuario.nome}</h4>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;