import styles from "./listaLocais.module.css"
import { useContext } from "react";
import { LocaisContext } from "../context/LocaisContext";

function ListaLocais(){

    const {locais} = useContext(LocaisContext);

    return(
        <div>
            <h1>Lista Locais Page</h1>
            <div>
                {locais.map(item => (
                    <div key={item.id}>
                        <h4>{item.nome}</h4>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default ListaLocais;