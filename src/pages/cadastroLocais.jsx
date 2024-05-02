import style from "./loginCadastro.module.css"
import { TextField, Button } from "@mui/material"
import { FormControlLabel, Checkbox, FormGroup, FormLabel } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import styles from "./cadastroLocais.module.css"
import { useContext, useState } from "react"
import { LocaisContext } from "../context/LocaisContext"

function Cadastro() {

    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm()
    const { registerLocal, editLocal, readLocalId } = useContext(LocaisContext);
    // const { requestApi, data } = useContext(FetchContext);
    const [data, setData] = useState()

    async function onSubmit(formValues) {
        if (data.erro) {
            alert("Cep Invalido")
            return
        }
        else {
            await registerLocal(formValues);
            console.log(formValues, data);
            navigate("/lista-locais",
                window.scrollTo({ bottom: 0 })
            )
        };
    };

    function requestApi(url) {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res)
                // console.log("data iside fetch",data)
            })
            .catch(error => {
                console.error(error);
            })
    }

    // async function requestApi(url) {
    //     try {
    //         let response = await fetch(url)
    //         setData(response.json())
    //     }
    //     catch {
    //     }
    // }

    const onblurSearchCep = async () => {
        //debugger
        let cepInput = getValues('cep');

        if (cepInput.length == 8) {
            await requestApi(`https://viacep.com.br/ws/${cepInput}/json/`);
            console.log("data", data);
            if (data) {
                setValue('bairro', data.bairro);
                setValue('logradouro', data.logradouro);
                setValue('estado', data.uf);
                setValue('cidade', data.localidade);
                setValue("isLogged", false);
            } else {
                alert("Cep Invalido")
                console.log("Cep Invalido")
            }
        }
    };

    const options = [
        { label: 'Musculaçao', value: 'musculacao' },
        { label: 'Trillas', value: 'trilhas' },
        { label: 'Pilates', value: 'pilates' },
        { label: 'Nataçao', value: 'natacao' }
    ];

    async function readActualLocal(id) {
        debugger
        let dataLocalActual = await readLocalId(id);
        setLocalActual(dataLocalActual);
    }

    const [localActual, setLocalActual] = useState({
        nome: "",
        cpf: "",
        email: "",
        descricao: "",
        cep: "88047470",
        bairro: "",
        logradouro: "",
        estado: "",
        cidade: "",
        numeroCasa: "",
        complemento: "",
        latitude: "",
        longitude: "",
        localExcercises: ""
    })

    return (
        <div className="container">
            <div className={styles.divContainer}>
                <h1>Cadastro do Local</h1>

                <form className={style.divFormCadastro} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.divTextField}>
                        <div>Nome do local</div>
                        <TextField
                            fullWidth
                            name="nome"
                            type="text"
                            defaultValue={localActual.nome}
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
                        {errors.nome && <p className={style.pError}>{errors.nome.message}</p>}
                    </div>

                    <div className={style.divTextField2}>
                        <div className={style.divTextField}>
                            <div>CPF do usuario</div>
                            <TextField
                                name="cpf"
                                placeholder="CPF"
                                type="number"
                                defaultValue={localActual.cpf}
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
                            {errors.cpf && <p className={style.pError}>{errors.cpf.message}</p>}
                        </div>
                        <div className={style.divTextField}>
                            <div>E-mail de usuario</div>
                            <TextField
                                name="email"
                                type="email"
                                defaultValue={localActual.email}
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
                            {errors.email && <p className={style.pError}>{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className={style.divTextField}>
                        <div>Descriçao do local</div>
                        <TextField
                            name="descricao"
                            placeholder="Descriçao breve do local, no maximo 300 caracteres"
                            type="text"
                            defaultValue={localActual.descricao}
                            multiline
                            rows={2}
                            sx={{ mt: 1, width: '37em' }}
                            variant="outlined"
                            {...register("descricao",
                                {
                                    required: "Campo Obrigatorio",
                                    minLength: {
                                        value: 50,
                                        message: "Mínimo 50 caracteres"
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: "Máximo de 300 caracteres"
                                    }
                                }
                            )
                            }
                        // textValue={errors.descricao?.message || "Descrição breve do local"}
                        />
                        {errors.descricao && <p className={style.pError}>{errors.descricao.message}</p>}
                    </div>

                    <div className={style.divTextField2}>
                        <div className={style.divTextField}>
                            <div>CEP</div>
                            <TextField
                                name="cep"
                                placeholder="CEP"
                                type="number"
                                defaultValue={localActual.cep}
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
                            {errors.cep && <p className={style.pError}>{errors.cep.message}</p>}
                        </div>

                        <div className={style.divTextField}>
                            <div>Numero do local</div>
                            <TextField
                                name="numeroCasa"
                                placeholder="Numero da casa"
                                type="number"
                                defaultValue={localActual.numeroCasa}
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
                            {errors.numeroCasa && <p className={style.pError}>{errors.numeroCasa.message}</p>}
                        </div>

                        <div className={style.divTextField}>
                            <div>Complemento</div>
                            <TextField
                                name="complemento"
                                placeholder="Complemento"
                                type="text"
                                defaultValue={localActual.complemento}
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
                            {errors.complemento && <p className={style.pError}>{errors.complemento.message}</p>}
                        </div>
                    </div>
                    {/* !data.erro value that comes from API */}
                    {/* {displayDiv1 && <p style={{ color: 'blue' }}>Endereço: {data.logradouro}. {data.bairro}, {data.localidade}. {data.uf}</p>}
                {displayDiv2 && <p style={{ color: 'red' }}><b>CEP não valido!</b></p>} */}
                    {/* {validValue && <p style={{ color: 'blue' }}>Endereço: {data.logradouro}. {data.bairro}, {data.localidade}. {data.uf}</p>}
                {!validValue && <p style={{ color: 'red' }}><b>CEP não valido!</b></p>} */}

                    <div className={style.divTextField2}>
                        <div className={style.divTextField}>
                            <div>Latitude</div>
                            <TextField
                                name="latitude"
                                placeholder="Em graus decimais"
                                type="number"
                                defaultValue={localActual.latitude}
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
                            {errors.latitude && <p className={style.pError}>{errors.latitude.message}</p>}
                        </div>
                        <div className={style.divTextField}>
                            <div>Longitude</div>
                            <TextField
                                name="longitude"
                                placeholder="Em graus decimais"
                                type="number"
                                defaultValue={localActual.longitude}
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
                            {errors.longitude && <p className={style.pError}>{errors.longitude.message}</p>}
                        </div>
                    </div>

                    <div>
                        <FormLabel component="legend">Praticas esportivas:</FormLabel>
                        {/* <FormGroup className={style.formGroupOptions}> */}
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

                    <div className={style.divBtn}>
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
                        <Button
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => readActualLocal("2")
                            }
                        >Ler local
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                        // onClick={() => editLocal("2")
                        // }
                        >Modificar Local
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;