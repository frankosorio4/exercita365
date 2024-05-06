import styles from "./dashboard.module.css"
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../context/UsuariosContext";
import { LocaisContext } from "../context/LocaisContext";

function Dashboard() {

    const { usuarios, readUsuarioId } = useContext(UsuarioContext);
    const { locais } = useContext(LocaisContext);

    const [usersLogged, setUsersLogged] = useState(0);
    const [usersRegistered, setusersRegistered] = useState(0);
    const [localRegistered, setlocalRegistered] = useState(0);

    // const [idLSTORAGE, setIdLStorage] = useState(localStorage.getItem('idUserLogged'));
    // const [UserName, SetUserName] = useState('HOLA');

    //to do:get name of user ls to show in dashboard, may be with a filter;
    // useEffect( () => {
    //     getData()        
    // }, [localStorage.getItem('idUserLogged')]);

    // async function getData(){
    //     const dataUsuarioLS = await readUsuarioId(idLSTORAGE);
    //     if (dataUsuarioLS) {
    //         SetUserName(dataUsuarioLS.name);
    //         console.log(idLSTORAGE)
    //         console.log(dataUsuarioLS.name)
    //     }
    // }

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
            <div className={styles.divIntrodution}>
                <h1 className={styles.titulo}>Bem-vindo ao Exercita 365</h1>
                <div className={styles.introdution}>
                    Procurando um lugar ideal para praticar exercícios físicos e cuidar da saúde?
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.introdution2}>
                    Seja qual for o seu objetivo, seja emagrecer, ganhar massa muscular, melhorar a flexibilidade ou apenas se manter ativo, você veio ao lugar certo!
                    <ul>
                        <li>Encontre uma rede diversificada de locais para exercícios, desde academias com aparelhos de última geração até espaços ao ar livre como parques e praias.</li>
                        <li>Navegue por nossas opções e encontre o local perfeito para o seu treino.</li>
                        <li>Filtre por tipo de atividade, como musculação, pilates, natação, caminhada ou aulas coletivas.</li>
                        <li>Além disso, veja a localização, descrição do local e avaliações de outros usuários para te ajudar na escolha.</li>
                    </ul>
                    Não perca tempo e comece a sua jornada de exercícios físicos hoje mesmo! Aqui você pode ver e gerenciar locais para atividades físicas serem praticadas.
                </div>

                <div >
                    <div className={styles.cardOverview}>
                        <h2 className={styles.tituloCard}>
                            <b>Overview</b>
                        </h2>
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
                            <div>
                                <b>Cadastrado por: {local.email}</b>
                                {/* {usuarios.map((usuario, index) => (
                                    <b key={index}>
                                        Cadastrado por: {local.email === usuario.email ? usuario.email : ''}
                                    </b>
                                ))} */}
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
