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
    // const [data, setData] = useState()

    async function onSubmit(formValues) {
        //TO DO if not valid cep
        await registerLocal(formValues);
        // console.log(formValues);
        navigate("/lista-locais",
            window.scrollTo({ bottom: 0 }))
    }

    function editarLocal(id){
        let dataModificada = getValues();//all the values
        // console.log(dataModificada)
        editLocal(dataModificada,id)
        // navigate("/lista-locais")//ACTIVATE
    }

    const onblurSearchCep = async () => {
        // debugger
        let cepInput = getValues('cep');

        if (cepInput.length == 8) {
            const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);
            if (response) {
                const resp = await response.json();//NEEDS AWAIT
                // console.log(resp)
                setValue('bairro', resp.bairro);
                setValue('logradouro', resp.logradouro);
                setValue('estado', resp.uf);
                setValue('cidade', resp.localidade);
                // setValue("isLogged", false);
                // console.log(resp.erro)
                if (resp.erro) {
                    alert("Cep Invalido")
                    // console.log("Cep Invalido")
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

    const [localActual, setLocalActual] = useState({//it is needed?
        nome: "",
        cpf: "",
        email: "",
        descricao: "",
        cep: "",
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

    async function readLocalDataId(id) {
        // debugger
        const dataLocalActual = await readLocalId(id);
        setValue('nome', dataLocalActual.nome);
        setValue('cpf', dataLocalActual.cpf);
        setValue('cep', dataLocalActual.cep);
        setValue('email', dataLocalActual.email);
        setValue('descricao', dataLocalActual.descricao);
        setValue('bairro', dataLocalActual.cep);
        setValue('logradouro', dataLocalActual.logradouro);
        setValue('estado', dataLocalActual.estado);
        setValue('cidade', dataLocalActual.cidade);
        setValue('numeroCasa', dataLocalActual.numeroCasa);
        setValue('complemento', dataLocalActual.complemento);
        setValue('latitude', dataLocalActual.latitude);
        setValue('longitude', dataLocalActual.longitude);
        // setValue('localExcercises', dataLocalActual.localExcercises);
    }

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
                                        value: 5,
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

                    <div>
                        <div className={style.divTextField}>
                            <div>Rua</div>
                            <TextField
                                fullWidth
                                name="logradouro"
                                type="text"
                                defaultValue={localActual.logradouro}
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
                            {errors.logradouro && <p className={style.pError}>{errors.logradouro.message}</p>}
                        </div>
                    </div>

                    <div className={style.divTextField2}>
                        <div className={style.divTextField}>
                            <div>Bairro</div>
                            <TextField
                                name="bairro"
                                placeholder="Bairro"
                                type="text"
                                defaultValue={localActual.bairro}
                                sx={{ mt: 1, width: '16em' }}
                                variant="outlined"
                                {...register("bairro",
                                    {
                                        required: "Campo Obrigatorio",
                                        onBlur: () => onblurSearchCep(),
                                        minLength: {
                                            value: 8,
                                            message: "Mínimo 5 caracteres"
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Máximo de 15 caracteres"
                                        }
                                    }
                                )
                                }
                            />
                            {errors.bairro && <p className={style.pError}>{errors.bairro.message}</p>}
                        </div>

                        <div className={style.divTextField}>
                            <div>Cidade</div>
                            <TextField
                                name="cidade"
                                placeholder="Cidade"
                                type="text"
                                defaultValue={localActual.cidade}
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
                            {errors.cidade && <p className={style.pError}>{errors.cidade.message}</p>}
                        </div>

                        <div className={style.divTextField}>
                            <div>Estado</div>
                            <TextField
                                name="estado"
                                placeholder="Estado"
                                type="text"
                                defaultValue={localActual.estado}
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
                            {errors.estado && <p className={style.pError}>{errors.estado.message}</p>}
                        </div>
                    </div>

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
                            onClick={() => readLocalDataId("2")
                            }
                        >Ler local
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                        onClick={() => editarLocal("2")}
                        >Editar Local
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;