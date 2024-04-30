import { useContext } from "react"
import styles from "./cardLocais.module.css"
import { Button } from "@mui/material"
import { LocaisContext } from "../context/LocaisContext"

function CardLocais({ dadosLocal }) {

    const {deleteLocal} = useContext(LocaisContext)

    function goEditar(id) {
        console.log("editando: " + id)
    }

    function goDelete(id) {
        let apagar = confirm(`Deseja apagar o local "${dadosLocal.nome}"?`);
        if (apagar) {
            deleteLocal(id);
        }
    }

    return (
        <div className={styles.card_container}>
            <div className={styles.div1DadosLocal}>
                <h2 className={styles.nomeLocal}>
                    {dadosLocal.nome}
                </h2>
                <div className={styles.div2DadosLocal}>
                    {/* <span>
                        {dadosLocal.cidade} / {dadosLocal.estado}
                    </span> */}
                    <span>Endereço: {dadosLocal.logradouro} {dadosLocal.numeroCasa}, {dadosLocal.bairro}. {dadosLocal.cidade}, {dadosLocal.estado} </span>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        sx={{ fontWeight: 'bold', width: '7em', marginRight: '15px'}}
                        onClick={() => goEditar(dadosLocal.id)
                            // GO TO FORM
                        }
                    >Editar
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ fontWeight: 'bold', width: '7em' }}
                        onClick={() => goDelete(dadosLocal.id)
                        }
                    >Apagar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardLocais;