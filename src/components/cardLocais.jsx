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
                    <span>Endereço: {dadosLocal.logradouro} {dadosLocal.numCasa}, {dadosLocal.bairro}. {dadosLocal.cidade}, {dadosLocal.estado} </span>
                    {/* <span>Trajeto: {dadosLocal.trajeto} Km</span>
                    <span>Duraçao: {dadosLocal.duracao} min</span> */}
                </div>
                <div>
                    <Button
                        variant="outlined"
                        sx={{ fontWeight: 'bold', width: '7em', marginRight: '15px'}}
                        onClick={() => goEditar(dadosLocal.id)
                            // navigate("/",
                            // window.scrollTo({ top: 0 })

                        }
                    >Editar
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ fontWeight: 'bold', width: '7em' }}
                        onClick={() => goDelete(dadosLocal.id)
                            // navigate("/",
                            // window.scrollTo({ top: 0 })

                        }
                    >Apagar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardLocais;