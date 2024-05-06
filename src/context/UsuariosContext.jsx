import { createContext, useEffect, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioContextProvider = ( {children} ) => {

    const [usuarios, setUsuarios] = useState([]);
    let error = null

    useEffect( () =>
        readUser()
    ,[]);

    function readUser(){
        fetch("http://localhost:3000/listaUsuarios")
        .then(response => response.json())
        .then(data => setUsuarios(data))
        .catch(error => console.log(error))
    };

    async function readUsuarioId(id) {
        try {
            const response = await fetch(`http://localhost:3000/listaUsuarios/${id}`)
            const resp = await response.json()
            return resp
        }
        catch (error){
            alert("Error ao ler dados do Local")
            console.log(error)
        }
    };

    function registerUser(dataUser) {
        fetch("http://localhost:3000/listaUsuarios",{
            method: "POST",
            body: JSON.stringify(dataUser),
            header:{
                'Context-Type': 'application/json',
            }
        })
        .then(() =>{
            alert("Usuario cadastrado com sucesso.");
            readUser();
        })
        .catch(()=> alert("Erro ao cadastrar Usuario!"))
    }

    async function editUser(usuarioEditado, id) {
        try {
            // console.log("entro no fetch")
            const response = await fetch(`http://localhost:3000/listaUsuarios/${id}`, {
                method: "PUT",//Change by the send it
                //method: "PATCH",//Change only the send fields
                body: JSON.stringify(usuarioEditado),
                header: {
                    'Context-Type': 'application/json',
                },
            })
            let resp = await response.json();
            console.log("response",resp);
            readUser();//update locais
            // console.log("salio do fetch")
        }
        catch {
            error => console.log(error)
            // console.log("Erro ao atualizar o usuario!")
        }
    }

    return(
        <UsuarioContext.Provider value={{usuarios, registerUser, editUser, readUsuarioId, error}}>
            {children}
        </UsuarioContext.Provider>
    )
}