import styles from "./cadastroLocais.module.css"
import { TextField, Button } from "@mui/material"
import { FormControlLabel, Checkbox, FormGroup, FormLabel } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import { LocaisContext } from "../context/LocaisContext"
import { UsuarioContext } from "../context/UsuariosContext"

function Cadastro() {

    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm()
    const { registerLocal } = useContext(LocaisContext);
    const {readUsuarioId} = useContext(UsuarioContext);

    const [idLSTORAGE, setIdLStorage] = useState(localStorage.getItem('idUserLogged'));

    console.log(idLSTORAGE)

    // useEffect ( () =>{
    //     readUsuarioDataId(idLSTORAGE)
    // },[])
    
    // async function readUsuarioDataId(id) {
    //     // debugger
    //     let dataUsuarioActual =''; 
    //     dataUsuarioActual = await readUsuarioId(id);
    //     // console.log(dataUsuarioActual.cpf)
    // }

    async function onSubmit(formValues) {

        console.log(formValues)
        await registerLocal(formValues);
        navigate("/lista-locais",
            window.scrollTo({ bottom: 0 }))
    }

    const onblurSearchCep = async () => {
        // debugger
        let cepInput = getValues('cep');

        if (cepInput.length == 8) {
            const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);
            if (response) {
                const resp = await response.json();//NEEDS AWAIT
                setValue('bairro', resp.bairro);
                setValue('logradouro', resp.logradouro);
                setValue('estado', resp.uf);
                setValue('cidade', resp.localidade);
                const dataUsuarioActual = await readUsuarioId(idLSTORAGE);
                if (dataUsuarioActual){
                    setValue('cpf', dataUsuarioActual.cpf);
                    setValue('email', dataUsuarioActual.email);
                }
                if (resp.erro) {
                    alert("Cep Invalido")
                }
            }
        }
    };

    const options = [
        { label: 'Musculaçao', value: 'musculacao' },
        { label: 'Trillas', value: 'trilhas' },
        { label: 'Pilates', value: 'pilates' },
        { label: 'Nataçao', value: 'natacao' }
    ];

    return (
        <div className="container">
            <div className={styles.divContainer}>
                <h1>Cadastro do Local</h1>

                <form className={styles.divFormCadastro} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.divTextField}>
                        <div>Nome do local</div>
                        <TextField
                            fullWidth
                            name="nome"
                            type="text"
                            //defaultValue={localActual.nome}
                            sx={{ mt: 1, width: '37em' }}
                            variant="outlined"
                            placeholder="Nome de usuario"
                            {...register("nome",
                                {
                                    required: "Campo Obrigatorio",
                                    minLength: {
                                        value: 5,
                                        message: "Mínimo 5 caracteres."
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Máximo de 30 caracteres"
                                    }
                                }
                            )
                            }
                        />
                        {errors.nome && <p className={styles.pError}>{errors.nome.message}</p>}
                    </div>

                    {/* <div className={styles.divTextField2}>
                        <div className={styles.divTextField}>
                            <div>CPF do usuario</div>
                            <TextField
                                name="cpf"
                                placeholder="CPF"
                                type="number"
                                // value={dataUsuarioActual.cpf}
                                // defaultValue={dataUsuarioActual.cpf}
                                sx={{ mt: 1, width: '18em' }}
                                variant="outlined"
                                {...register("cpf",
                                    {
                                        required: "Campo Obrigatorio",
                                        minLength: {
                                            value: 11,
                                            message: "Mínimo 11 caracteres"
                                        },
                                        maxLength: {
                                            value: 11,
                                            message: "Máximo de 11 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.cpf && <p className={styles.pError}>{errors.cpf.message}</p>}
                        </div>
                        <div className={styles.divTextField}>
                            <div>E-mail de usuario</div>
                            <TextField
                                name="email"
                                type="email"
                                //defaultValue={localActual.email}
                                sx={{ mt: 1, width: '18em' }}
                                variant="outlined"
                                placeholder="usuario@email.com"
                                {...register("email",
                                    {
                                        required: "Campo Obrigatorio"
                                    }
                                )
                                }
                            />
                            {errors.email && <p className={styles.pError}>{errors.email.message}</p>}
                        </div>
                    </div> */}

                    <div className={styles.divTextField}>
                        <div>Descriçao do local</div>
                        <TextField
                            name="descricao"
                            placeholder="Descriçao breve do local, no maximo 300 caracteres"
                            type="text"
                            //defaultValue={localActual.descricao}
                            multiline
                            rows={2}
                            sx={{ mt: 1, width: '37em' }}
                            variant="outlined"
                            {...register("descricao",
                                {
                                    required: "Campo Obrigatorio",
                                    minLength: {
                                        value: 5,
                                        message: "Mínimo 5 caracteres"
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: "Máximo de 300 caracteres"
                                    }
                                }
                            )
                            }
                        />
                        {errors.descricao && <p className={styles.pError}>{errors.descricao.message}</p>}
                    </div>

                    <div className={styles.divTextField2}>
                        <div className={styles.divTextField}>
                            <div>CEP</div>
                            <TextField
                                name="cep"
                                placeholder="CEP"
                                type="number"
                                //defaultValue={localActual.cep}
                                sx={{ mt: 1, width: '16em' }}
                                variant="outlined"
                                {...register("cep",
                                    {
                                        required: "Campo Obrigatorio",
                                        onBlur: () => onblurSearchCep(),
                                        minLength: {
                                            value: 8,
                                            message: "Mínimo 8 caracteres"
                                        },
                                        maxLength: {
                                            value: 8,
                                            message: "Máximo de 8 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.cep && <p className={styles.pError}>{errors.cep.message}</p>}
                        </div>

                        <div className={styles.divTextField}>
                            <div>Numero do local</div>
                            <TextField
                                name="numeroCasa"
                                placeholder="Numero da casa"
                                type="number"
                                //defaultValue={localActual.numeroCasa}
                                sx={{ mt: 1, width: '11em' }}
                                variant="outlined"
                                {...register("numeroCasa",
                                    {
                                        required: "Campo Obrigatorio",
                                        minLength: {
                                            value: 1,
                                            message: "Mínimo 1 caracteres"
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "Máximo de 5 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.numeroCasa && <p className={styles.pError}>{errors.numeroCasa.message}</p>}
                        </div>

                        <div className={styles.divTextField}>
                            <div>Complemento</div>
                            <TextField
                                name="complemento"
                                placeholder="Complemento"
                                type="text"
                                //defaultValue={localActual.complemento}
                                sx={{ mt: 1, width: '8em' }}
                                variant="outlined"
                                {...register("complemento",
                                    {
                                        required: "Campo Obrigatorio",
                                        minLength: {
                                            value: 1,
                                            message: "Mínimo 1 caracteres"
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "Máximo de 3 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.complemento && <p className={styles.pError}>{errors.complemento.message}</p>}
                        </div>
                    </div>
                    {/* !data.erro value that comes from API */}

                    <div>
                        <div className={styles.divTextField}>
                            <div>Rua</div>
                            <TextField
                                fullWidth
                                name="logradouro"
                                type="text"
                                //defaultValue={localActual.logradouro}
                                sx={{ mt: 1, width: '37em' }}
                                variant="outlined"
                                placeholder="Rua"
                                {...register("logradouro",
                                    {
                                        required: "Campo Obrigatorio",
                                        minLength: {
                                            value: 5,
                                            message: "Mínimo 5 caracteres."
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Máximo de 40 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.logradouro && <p className={styles.pError}>{errors.logradouro.message}</p>}
                        </div>
                    </div>

                    <div className={styles.divTextField2}>
                        <div className={styles.divTextField}>
                            <div>Bairro</div>
                            <TextField
                                name="bairro"
                                placeholder="Bairro"
                                type="text"
                                //defaultValue={localActual.bairro}
                                sx={{ mt: 1, width: '16em' }}
                                variant="outlined"
                                {...register("bairro",
                                    {
                                        required: "Campo Obrigatorio",
                                        onBlur: () => onblurSearchCep(),
                                        minLength: {
                                            value: 5,
                                            message: "Mínimo 5 caracteres"
                                        },
                                        maxLength: {
                                            value: 25,
                                            message: "Máximo de 25 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.bairro && <p className={styles.pError}>{errors.bairro.message}</p>}
                        </div>

                        <div className={styles.divTextField}>
                            <div>Cidade</div>
                            <TextField
                                name="cidade"
                                placeholder="Cidade"
                                type="text"
                                //defaultValue={localActual.cidade}
                                sx={{ mt: 1, width: '14em' }}
                                variant="outlined"
                                {...register("cidade",
                                    {
                                        required: "Campo Obrigatorio",
                                        minLength: {
                                            value: 1,
                                            message: "Mínimo 3 caracteres"
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Máximo de 15 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.cidade && <p className={styles.pError}>{errors.cidade.message}</p>}
                        </div>

                        <div className={styles.divTextField}>
                            <div>Estado</div>
                            <TextField
                                name="estado"
                                placeholder="Estado"
                                type="text"
                                //defaultValue={localActual.estado}
                                sx={{ mt: 1, width: '5em' }}
                                variant="outlined"
                                {...register("estado",
                                    {
                                        required: "Campo Obrigatorio",
                                        minLength: {
                                            value: 1,
                                            message: "Mínimo 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "Máximo de 3 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.estado && <p className={styles.pError}>{errors.estado.message}</p>}
                        </div>
                    </div>

                    <div className={styles.divTextField2}>
                        <div className={styles.divTextField}>
                            <div>Latitude</div>
                            <TextField
                                name="latitude"
                                placeholder="Em graus decimais"
                                type="number"
                                //defaultValue={localActual.latitude}
                                sx={{ mt: 1, width: '18em' }}
                                inputProps={{ step: 'any', min: -90, max: 90 }}
                                //inputProps={{ step: 0.1 }}
                                variant="outlined"
                                // helperText="Digite un valor entre -180 and 180 (or 0 to 360)"
                                {...register("latitude",
                                    {
                                        required: "Campo Obrigatorio",
                                        maxLength: {
                                            value: 12,
                                            message: "Máximo 12 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.latitude && <p className={styles.pError}>{errors.latitude.message}</p>}
                        </div>
                        <div className={styles.divTextField}>
                            <div>Longitude</div>
                            <TextField
                                name="longitude"
                                placeholder="Em graus decimais"
                                type="number"
                                //defaultValue={localActual.longitude}
                                inputProps={{ step: 'any', min: -180, max: 180 }}
                                //inputProps={{ step: 0.1 }}
                                sx={{ mt: 1, width: '18em' }}
                                variant="outlined"
                                {...register("longitude",
                                    {
                                        required: "Campo Obrigatorio",
                                        maxLength: {
                                            value: 13,
                                            message: "Máximo 13 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.longitude && <p className={styles.pError}>{errors.longitude.message}</p>}
                        </div>
                    </div>

                    <div>
                        <FormLabel component="legend">Praticas esportivas:</FormLabel>
                        {/* <FormGroup className={styles.formGroupOptions}> */}
                        <FormGroup row>
                            {options.map((option) => (
                                <FormControlLabel
                                    name="localExcercises"
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            {...register('localExcercises', { required: true })}
                                            value={option.value}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                        {errors.localExcercises && <p style={{ color: 'red' }}>Escolha pelo menos uma opção.</p>}
                    </div>

                    <div className={styles.divBtn}>
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{ fontWeight: 'bold' }}
                        >Cadastrar
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => navigate("/",
                                window.scrollTo({ top: 0 })
                            )
                            }
                        >Voltar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;