import styles from "./listaLocais.module.css"
import { useContext } from "react";
import { LocaisContext } from "../context/LocaisContext";
import CardLocais from "../components/cardLocais";

function ListaLocais(){

    const {locais} = useContext(LocaisContext);

    return(
        <div className="container">
            <div className={styles.container}>
                <h1>Lista de Locais</h1>
                <div>
                    {locais.map((item, index) => (
                        <CardLocais dadosLocal={item} key={index}/>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListaLocais;