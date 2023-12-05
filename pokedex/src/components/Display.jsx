import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'



const Display  = (props) =>{

    const [pokeList,setPokeList] = useState(null)
    const [poketype, setPokeType] = useState(null)



    // async function fetchApi(url_pokemon, url_type){
    //     let poke_data = await fetch(url_pokemon)
    //     let poke_type = await fetch(url_type)
    //     const pokemons = await poke_data.json()
    //     const types = await poke_type.json()  
    // }

    // useEffect(() => {
    //     const url_pokemon = "https://pokedex-api.3rgo.tech/api/pokemon"
    //     const url_type = "https://pokedex-api.3rgo.tech/api/types"
    //     fetchApi(url_pokemon, url_type)
    // }, []) 

    return(
        <div className="display">
            <SearchBar/>
        </div>
    )
}

export default Display;