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

    async function editUser(modifiedDataUser, id) {
        try{
            // debugger
            await fetch("http://localhost:3000/listaUsuarios/" + id ,{
                method: "PUT",
                body: JSON.stringify(modifiedDataUser),
                header:{
                    'Context-Type': 'application/json',
                }
            })
            readList()//update locais
        }
        catch(err){
            alert("Erro ao atualizar o usuario!")
            error = err.message
        }
    }

    return(
        <UsuarioContext.Provider value={{usuarios, registerUser, editUser, error}}>
            {children}
        </UsuarioContext.Provider>
    )
}