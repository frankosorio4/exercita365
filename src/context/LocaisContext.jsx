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

    async function readLocalId(id){
        try{
            const data = await fetch("http://localhost:3000/listaLocais/"+id)
            setLocais(data.json())
        }
        catch{
            alert("Error ao editar Local")
        }
    };
    // function readLocalId(id){
    //     fetch("http://localhost:3000/listaLocais/" + id)
    //     .then(response => response.json())
    //     .then(data => setLocais(data))
    //     .catch(error => console.log(error))
    // };

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
            readList()
        })
        .catch(()=> alert("Erro ao atualizar o local!"))
    }

    function deleteLocal(id) {
        fetch("http://localhost:3000/listaLocais/" + id ,{
            method: "DELETE"
        })
        .then(() =>{
            alert("Local apagado com sucesso.")
            readList()
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