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

    return(
        <UsuarioContext.Provider value={{usuarios}}>
            {children}
        </UsuarioContext.Provider>
    )
}