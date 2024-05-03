import style from "./loginCadastro.module.css"
import { TextField, Select, Button, MenuItem } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useContext, useState } from "react"
import { UsuarioContext } from "../context/UsuariosContext"
import { FetchContext } from "../context/FetchContext"

function Login() {

    const navigate = useNavigate();
    const [showLoginForm, setShowLoginForm] = useState(true);

    const { usuarios, registerUser} = useContext(UsuarioContext);
    const { requestApi, data } = useContext(FetchContext);

    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm();
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm()

    async function editUser(usuarioEditado, id) {
        try{
            console.log("entro no fetch")
            await fetch("http://localhost:3000/listaUsuarios/" + id ,{
                method: "PUT",
                body: JSON.stringify(usuarioEditado),
                header:{
                    'Context-Type': 'application/json',
                },
            })
            console.log("salio do fetch")
        }
        catch{
            error => console.log(error)
            console.log("Erro ao atualizar o usuario!")
        }
    }

    async function onSubmit1(dataLogin) {
        try{
            // debugger
            let listaUsuarios = usuarios;
            //variables to validate
            let usuarioExiste = false;
            let usuarioValidado = false;
            let usuarioId = "";
            let usuarioEditado = [];

            listaUsuarios.map(usuario => {
                if(usuario.email == dataLogin.email){
                    usuarioExiste = true;
                    usuarioId = usuario.id;
                    console.log("id",usuarioId);
                    if(usuario.senha == dataLogin.senha){
                        usuarioValidado = true;
                        usuarioEditado = usuario;
                        usuarioEditado.isLogged = true;
                        console.log("usuarioEditado",usuarioEditado);
                        editUser(usuarioEditado, usuarioId)
                        // registerUser(usuarioEditado)
                        // navigate("/", window.scrollTo( { top: 0 } ) )
                    }
                }
            });
            if(usuarioValidado){
                console.log("usuario autorizado, DEPOIS DE SAIR do fetch")
            }
            else if(usuarioExiste){
                console.log("usuario ou senha incorretas")
            }
            else{
                console.log("usuario NO existe")
            }
        }
        catch{
        }

    };

    function onSubmit2(dataFormCadastro) {
        registerUser(dataFormCadastro);
        console.log(dataFormCadastro);
        // setShowLoginForm(true)//activate
    };

    async function searchCep() {
        //debugger
        let cepInput = getValues('cep');

        if (cepInput.length == 8){
            await requestApi(`https://viacep.com.br/ws/${cepInput}/json/`);
            console.log("data",data);
            if (data){
                setValue('bairro', data.bairro);
                setValue('logradouro', data.logradouro);
                setValue('estado', data.uf);
                setValue('cidade', data.localidade);
                setValue("isLogged", false);
                console.log("data.erro", data.erro);
            }
            // if (data.erro){
            //     alert("Cep Invalido")
            // }
        }
    };

    return (
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
                                // onClick={() => validateUser()}                                )
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
                                            onBlur: () => searchCep(),
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
                )}

                <div className={style.divBtn}>
                    <Button
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => setShowLoginForm(!showLoginForm)}

                    >
                        {showLoginForm ? 'Criar Conta' : 'Já possui uma conta? Faça Login'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;