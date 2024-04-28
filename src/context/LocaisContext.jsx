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

    return(
        <LocaisContext.Provider value={{locais}}>
            {children}
        </LocaisContext.Provider>
    )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum unde quam quidem aut accusantium, atque tenetur maxime tempora, maiores delectus, odit nisi id possimus similique? Voluptate quas soluta omnis!