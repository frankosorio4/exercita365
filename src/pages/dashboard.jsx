import styles from "./dashboard.module.css"
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../context/UsuariosContext";
import { LocaisContext } from "../context/LocaisContext";

function Dashboard() {

    const { usuarios } = useContext(UsuarioContext);
    const { locais } = useContext(LocaisContext);

    const [usersLogged, setUsersLogged] = useState(0);
    const [usersRegistered, setusersRegistered] = useState(0);
    const [localRegistered, setlocalRegistered] = useState(0);

    useEffect(() => {
        setusersRegistered(usuarios.length);
    }, [usuarios])

    useEffect(() => {
        const loggedUserArray = Object.values(usuarios).filter(
            (user) => user['isLogged'] === true
        );
        // console.log(loggedUserArray);
        setUsersLogged(loggedUserArray.length);
    }, [usuarios]);

    useEffect(() => {
        setlocalRegistered(locais.length);
    }, [locais]);

    return (
        <div className="container">
            <div className={styles.container}>
                <div>
                    <h1 className={styles.titulo}>Bem-vindo ao Exercita 365</h1>
                    <div>
                        Aqui você pode ver e gerenciar locais para atividades físicas serem praticadas.
                    </div>
                </div>

                <div >
                    <div className={styles.cardOverview}>
                                <h2 className={styles.tituloCard}>
                                    <b>Overview</b>
                                </h2> 
                                {/* <span>
                                    Numero de Usuarios: {usersRegistered}.
                                </span> */}
                                <span>
                                    Usuarios Logados: {usersLogged}.
                                </span>
                                <span>
                                    Numero de locais: {localRegistered}.
                                </span>
                    </div>
                </div>

                <hr />

                <div className={styles.locais}>
                    <h2>Lista Locais:</h2>
                    {locais.map((local) => (
                        <div className={styles.cardLocais} key={local.id}>
                                <h3 className={styles.tituloCard}>
                                    {local.nome}
                                </h3>
                                <div>
                                    <b>Endereço: </b>{local.logradouro} {local.numeroCasa}, {local.bairro}. {local.cidade}, {local.estado}
                                </div>
                                <div>
                                    <b>Descricao: </b> {local.descricao}
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

{/* <div>
<h2>Lista Usuarios:</h2>
{usuarios.map(usuario => (
    <div key={usuario.id}>
        <h4>{usuario.nome}</h4>
    </div>
)
)}
</div> */}
