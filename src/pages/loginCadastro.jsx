import style from "./loginCadastro.module.css"
import { TextField, Select, Button, MenuItem } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

function Login() {

    const navigate = useNavigate();

    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm();
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmit1(formValues) {
        console.log(formValues);
    };

    function onSubmit2(formValue) {
        console.log(formValue);
    };


    return (
        <div className="divContainer">
            <div className={style.chooseOption} >
                <h1>Login</h1>
                <h1>Cadastro de usuario</h1>
            </div>

            <form className={style.divFormLogin} onSubmit={handleSubmitLogin(onSubmit1)}>
                <div className={style.divTextField}>
                    <div>Email de usuario</div>
                    <TextField
                        type="email"
                        sx={{ mt: 1 }}
                        variant="outlined"
                        placeholder="usuario@email.com"
                        {...registerLogin("email")}
                    />
                    {loginErrors.email && <p className={style.pError}>{loginErrors.email.message}</p>}
                </div>
                <div className={style.divTextField}>
                    <div>Senha</div>
                    <TextField
                        type="password"
                        sx={{ mt: 1 }}
                        variant="outlined"
                        placeholder="Senha"
                        {...registerLogin("senha",
                            {
                                required: "Campo Obrigatorio",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres."
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Máximo de 12 caracteres"
                                }
                            }
                        )
                        }
                    />
                    {loginErrors.senha && <p className={style.pError}>{loginErrors.senha.message}</p>}
                </div>
                <div className={style.divBtn}>
                    <Button
                        type='submit'
                        variant="contained"
                        sx={{ fontWeight: 'bold' }}
                    >Entrar
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

            <form className={style.divFormCadastro} onSubmit={handleSubmit(onSubmit2)}>
                <div className={style.divTextField}>
                    <div>Nome de usuario</div>
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
                                    message: "Máximo de 100 caracteres"
                                }
                            }
                        )
                        }
                    />
                    {/* {errors.nome && <p className={style.pError}>{errors.nome.message}</p>} */}
                </div>

                <div className={style.divTextField2}>
                    <div className={style.divTextField}>
                        <div>CPF</div>
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
                        {/* {errors.cpf && <p className={style.pError}>{errors.cpf.message}</p>} */}
                    </div>

                    <div className={style.divTextField}>
                        <div>Sexo</div>
                        <Select
                            defaultValue=""
                            sx={{ mt: 1, width: '18em' }}
                            {...register('sexo',
                                { required: "Campo Obrigatorio" }
                            )}
                        >
                            <MenuItem value="Maculino">Masculino</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Nao Informado">Não Informar</MenuItem>
                        </Select>
                        {errors.sexo && <p className={style.pError}>{errors.sexo.message}</p>}
                    </div>
                </div>

                <div className={style.divTextField2}>
                    <div className={style.divTextField}>
                        <div>Data de Nascimento</div>
                        <TextField
                            placeholder="Data de nascimento"
                            type="date"
                            sx={{ mt: 1, width: '18em' }}
                            variant="outlined"
                            {...register("data-nascimento",
                                {
                                    required: "Campo Obrigatorio",
                                }
                            )
                            }
                        />
                        {/* {errors.data-nascimento && <p className={style.pError}>{errors.data-nascimento.message}</p>} */}
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
                    </div>
                </div>

                <div className={style.divTextField}>
                    <div>CEP</div>
                    <TextField
                        placeholder="CEP"
                        type="number"
                        sx={{ mt: 1, width: '18em' }}
                        variant="outlined"
                        {...register("duracao",
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
                    {errors.duracao && <p className={style.pError}>{errors.duracao.message}</p>}
                </div>

                <div className={style.divTextField}>
                    <div>Senha</div>
                    <TextField
                        type="password"
                        sx={{ mt: 1, width: '18em' }}
                        variant="outlined"
                        placeholder="Senha"
                        {...register("senha",
                            {
                                required: "Campo Obrigatorio",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres."
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Máximo de 12 caracteres"
                                }
                            }
                        )
                        }
                    />
                    {errors.senha && <p className={style.pError}>{errors.senha.message}</p>}
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

export default Login;