import style from "./loginCadastro.module.css"
import { TextField, Select, Button, MenuItem } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useContext, useState } from "react"
import { UsuarioContext } from "../context/UsuariosContext"
import HeaderLogin from "../components/headerLogin"
// import { FetchContext } from "../context/FetchContext"

function Login() {

    const navigate = useNavigate();
    const [showLoginForm, setShowLoginForm] = useState(true);

    const { usuarios, registerUser, editUser} = useContext(UsuarioContext);
    // const { requestApi, data } = useContext(FetchContext);

    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm();
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm()

    async function onSubmit1(dataLogin) {
        try {
            //variables to validate
            let usuarioExiste = false;
            let usuarioEditado = [];

            usuarios.find(usuario => {
                if (usuario.email === dataLogin.email) {
                    usuarioEditado = usuario;
                    usuarioExiste = true;
                    console.log("id", usuario.id);
                    return true;
                }
            });
            if (usuarioEditado.senha === dataLogin.senha) {
                usuarioEditado.isLogged = true;
                // console.log("usuarioEditado", usuarioEditado);
                await editUser(usuarioEditado, usuarioEditado.id)
                localStorage.setItem("isLogged", true);
                localStorage.setItem("idUserLogged", usuarioEditado.id);
                // console.log("logged")
                window.location.href = "/"
                return true;
            };
            if (!usuarioExiste) {
                alert("Usuario não cadastrado");
                return true;
            }
            else {
                alert("Usuario ou senha incorretas");
                return true;
            };
        }
        catch (error) {
            console.error("Error logging in:", error);
            alert("Erro ao realizar login");

        }
    };

    function onSubmit2(dataCadastro) {
        let emailValido = true;
        let cpfValido = true;

        usuarios.find(usuario => {
            if (usuario.email == dataCadastro.email) {
                emailValido = false;
                alert("Email ja cadastrado! Tente com outro Email")
                return true// to stop the loop
            }
            if (usuario.cpf == dataCadastro.cpf) {
                cpfValido = false;
                alert("CPF ja cadastrado! Tente com outro CPF")
                return true// to stop the loop
            }
        });

        if (emailValido && cpfValido) {
            registerUser(dataCadastro);
            console.log(dataCadastro);
        }
    };

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
                setValue("isLogged", false);
                // console.log(resp.erro)
                if (resp.erro) {
                    alert("Cep Invalido")
                }
            }
        }
    };

    return (
        <div>
            <HeaderLogin />
            <div className="container">
                <div className="divContainer">
                    <div className={style.chooseOption} >
                        <h1>{showLoginForm ? 'Login' : 'Cadastro de usuario'}</h1>
                    </div>

                    {showLoginForm && (
                        <form className={style.divFormLogin} onSubmit={handleSubmitLogin(onSubmit1)}>
                            <div className={style.divTextField}>
                                <div>Email de usuario</div>
                                <TextField
                                    name="email"
                                    type="email"
                                    sx={{ mt: 1 }}
                                    variant="outlined"
                                    placeholder="usuario@email.com"
                                    {...registerLogin("email",
                                        { required: "Campo Obrigatorio" }
                                    )}
                                />
                                {loginErrors.email && <p className={style.pError}>{loginErrors.email.message}</p>}
                            </div>
                            <div className={style.divTextField}>
                                <div>Senha</div>
                                <TextField
                                    name="senha"
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
                            </div>

                        </form>
                    )}

                    {!showLoginForm && (
                        <form className={style.divFormCadastro} onSubmit={handleSubmit(onSubmit2)}>
                            <div className={style.divTextField}>
                                <div>Nome de usuario</div>
                                <TextField
                                    fullWidth
                                    name="nome"
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
                                    <div>CPF</div>
                                    <TextField
                                        name="cpf"
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
                                    <div>Sexo</div>
                                    <Select
                                        name="sexo"
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
                                        name="dataNasc"
                                        placeholder="Data de nascimento"
                                        type="date"
                                        sx={{ mt: 1, width: '18em' }}
                                        variant="outlined"
                                        {...register("dataNasc",
                                            {
                                                required: "Campo Obrigatorio",
                                            }
                                        )
                                        }
                                    />
                                    {errors.dataNasc && <p className={style.pError}>{errors.dataNasc.message}</p>}
                                </div>

                                <div className={style.divTextField}>
                                    <div>E-mail de usuario</div>
                                    <TextField
                                        name="email"
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

                            <div className={style.divTextField2}>
                                <div className={style.divTextField}>
                                    <div>CEP</div>
                                    <TextField
                                        name="cep"
                                        placeholder="CEP"
                                        type="number"
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
                                    <div>Numero da casa</div>
                                    <TextField
                                        name="numeroCasa"
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
                                    {errors.numeroCasa && <p className={style.pError}>{errors.numeroCasa.message}</p>}
                                </div>

                                <div className={style.divTextField}>
                                    <div>Complemento</div>
                                    <TextField
                                        name="complemento"
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
                                    {errors.complemento && <p className={style.pError}>{errors.complemento.message}</p>}
                                </div>
                            </div>

                            <div>
                                <div className={style.divTextField}>
                                    <div>Rua</div>
                                    <TextField
                                        fullWidth
                                        name="logradouro"
                                        type="text"
                                        // defaultValue={localActual.logradouro}
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
                                        // defaultValue={localActual.bairro}
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
                                    {errors.bairro && <p className={style.pError}>{errors.bairro.message}</p>}
                                </div>

                                <div className={style.divTextField}>
                                    <div>Cidade</div>
                                    <TextField
                                        name="cidade"
                                        placeholder="Cidade"
                                        type="text"
                                        // defaultValue={localActual.cidade}
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
                                        // defaultValue={localActual.estado}
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

                            <div className={style.divTextField}>
                                <div>Senha</div>
                                <TextField
                                    name="senha"
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
                            </div>
                        </form>
                    )}

                    <div className={style.divBtn2}>
                        {showLoginForm ? <div>Nâo possui uma conta?</div> : <div>Já possui uma conta?</div>}
                        <Button
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => setShowLoginForm(!showLoginForm)}
                        >
                            {showLoginForm ? 'Criar Conta' : 'Faça Login'}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;