import { createContext, useEffect, useState } from "react";

export const LocaisContext = createContext();

export const LocaisContextProvider = ({children}) => {

    const [locais, setLocais] = useState([]);

    useEffect( () =>
        readList()
    ,[]);

    function readList(){
        fetch("http://localhost:3000/listaLocais")
        .then(response => response.json())
        .then(data => setLocais(data))
        .catch(error => console.log(error))
    };

    function registerLocal(dataLocal) {
        fetch("http://localhost:3000/listaLocais",{
            method: "POST",
            body: JSON.stringify(dataLocal),
            header:{
                'Context-Type': 'application/json',
            },
        })
        .then(() =>{
            alert("Local cadastrado com sucesso.")
            readList()
        })
        .catch(()=> alert("Erro ao cadastrar usuário!"))
    }

    return(
        <LocaisContext.Provider value={{locais, registerLocal}}>
            {children}
        </LocaisContext.Provider>
    )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum unde quam quidem aut accusantium, atque tenetur maxime tempora, maiores delectus, odit nisi id possimus similique? Voluptate quas soluta omnis!