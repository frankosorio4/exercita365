import { createContext, useEffect, useState } from "react";

export const LocaisContext = createContext();

export const LocaisContextProvider = ({children}) => {

    const [locais, setLocais] = useState([]);

    useEffect( () =>
        readList()//update locais
    ,[]);

    function readList(){
        fetch("http://localhost:3000/listaLocais")
        .then(response => response.json())
        .then(data => setLocais(data))
        .catch(error => console.log(error))
    };

    async function readLocalId(id) {
        try {
            const response = await fetch("http://localhost:3000/listaLocais/" + id)
            const resp = await response.json()
            return resp
        }
        catch {
            alert("Error ao ler dados do Local")
        }
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
            readList()//update locais
        })
        .catch(()=> alert("Erro ao cadastrar local!"))
    }

    function editLocal(modifiedDataLocal, id) {
        fetch("http://localhost:3000/listaLocais/" + id ,{
            method: "PUT",
            body: JSON.stringify(modifiedDataLocal),
            header:{
                'Context-Type': 'application/json',
            },
        })
        .then(() =>{
            alert("Local atualizado com sucesso.")
            readList()//update locais
        })
        .catch(()=> alert("Erro ao atualizar o local!"))
    }

    function deleteLocal(id) {
        fetch("http://localhost:3000/listaLocais/" + id ,{
            method: "DELETE"
        })
        .then(() =>{
            alert("Local apagado com sucesso.")
            readList()//update locais
        })
        .catch(()=> alert("Erro ao apagar local!"))
    }

    return(
        <LocaisContext.Provider value={{locais, registerLocal, editLocal, deleteLocal, readLocalId}}>
            {children}
        </LocaisContext.Provider>
    )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum unde quam quidem aut accusantium, atque tenetur maxime tempora, maiores delectus, odit nisi id possimus similique? Voluptate quas soluta omnis!