import React from "react";
import { useContext } from "react"
import styles from "./cardLocais.module.css"
import { Button } from "@mui/material"
import { LocaisContext } from "../context/LocaisContext"
import { useNavigate } from 'react-router-dom'

function CardLocais({ dadosLocal }) {

    const { deleteLocal } = useContext(LocaisContext);
    const navigate = useNavigate();

    function goEditar(idEdit) {
        // console.log("Editando Card Locais: " + idEdit);
        navigate(`/editar-local/${idEdit}`);
    }

    function goDelete(idDelete) {
        let apagar = confirm(`Deseja apagar o local "${dadosLocal.nome}"?`);
        if (apagar) {
            deleteLocal(idDelete);
        };
    }

    return (
        <div className={styles.card_container}>
                <h2 className={styles.nomeLocal}>
                    {dadosLocal.nome}
                </h2>
                <div className={styles.div2DadosLocal}>
                    <span>
                        <b>Descriçao: </b> {dadosLocal.descricao}.
                    </span>
                    <span>
                        <b>Endereço: </b>{dadosLocal.logradouro} {dadosLocal.numeroCasa}, {dadosLocal.bairro}. {dadosLocal.cidade}, {dadosLocal.estado}
                    </span>
                    <span>
                        <b>Cadastrado por: </b>{dadosLocal.email}.
                    </span>
                </div>
                <div className={styles.btn}>
                    <Button
                        // variant="contained"
                        variant="outlined"
                        color="success"
                        sx={{ fontWeight: 'bold', width: '7em', marginRight: '15px' }}
                        onClick={() => goEditar(dadosLocal.id)
                        }
                    >Editar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ fontWeight: 'bold', width: '7em' }}
                        onClick={() => goDelete(dadosLocal.id)
                        }
                    >Apagar
                    </Button>
                </div>
        </div>
    )
}

export default CardLocais;