import style from "./loginCadastro.module.css"
import { TextField, Select, Button, MenuItem } from "@mui/material"
import { FormControlLabel, Checkbox, FormGroup, FormLabel } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import styles from "./cadastroLocais.module.css"


function Cadastro() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmit(form1Values) {
        console.log(form1Values);
    };

    const options = [
        { label: 'Musculaçao', value: 'musculacao' },
        { label: 'Trillas', value: 'trilhas' },
        { label: 'Pilates', value: 'Pilates' },
        { label: 'Nataçao', value: 'natacao' }
    ];


    return (
        <div className={styles.divContainer}>
            <h1>Cadastro do Local</h1>

            <form className={style.divFormCadastro} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.divTextField}>
                    <div>Nome do local</div>
                    <TextField
                        fullWidth
                        type="text"
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
                            placeholder="CPF"
                            type="number"
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
                            type="email"
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
                        placeholder="Descriçao breve do local, no maximo 300 caracteres"
                        type="text"
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
                            placeholder="CEP"
                            type="number"
                            sx={{ mt: 1, width: '16em' }}
                            variant="outlined"
                            {...register("cep",
                                {
                                    required: "Campo Obrigatorio",
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
                            placeholder="Numero da casa"
                            type="number"
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
                        {errors.cpf && <p className={style.pError}>{errors.cpf.message}</p>}
                    </div>

                    <div className={style.divTextField}>
                        <div>Complemento</div>
                        <TextField
                            placeholder="Complemento"
                            type="text"
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
                        {errors.cpf && <p className={style.pError}>{errors.cpf.message}</p>}
                    </div>
                </div>

                <div className={style.divTextField2}>
                    <div className={style.divTextField}>
                        <div>Latitude</div>
                        <TextField
                            placeholder="Em graus decimais"
                            type="number"
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
                            placeholder="Em graus decimais"
                            type="number"
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
                </div>
            </form>
        </div>
    )
}

export default Cadastro;