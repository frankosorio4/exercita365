import { createContext, useEffect, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioContextProvider = ( {children} ) => {

    const [usuarios, setUsuarios] = useState([]);

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
            },
        })
        .then(() =>{
            alert("Usuario cadastrado com sucesso.");
            readUser();
        })
        .catch(()=> alert("Erro ao cadastrar Usuario!"))
    }

    function validateUser(){
        a=1
        //to do
    }

    return(
        <UsuarioContext.Provider value={{usuarios,registerUser}}>
            {children}
        </UsuarioContext.Provider>
    )
}