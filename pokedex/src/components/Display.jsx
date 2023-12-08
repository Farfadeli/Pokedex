import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'



const Display  = (props) =>{

    const [pokeList,setPokeList] = useState([])
    const [cardPoke, setCardpoke] = useState({})

    async function fetchApi(url_pokemon){
        // Récupération des données (promesse)
        let poke_data = await fetch(url_pokemon)
        const pokemons = await poke_data.json()

        let res = []
        setPokeList(pokemons["data"][0]["name"]["fr"])
        for(let e = 0; e != pokemons["data"].length; e++){
            res.push({ {"name" : pokemons["data"][0]["name"]["fr"], "image" : pokemons["data"][0]["image"], "id" : pokemons["data"][0]["id"], "type": pokemons["data"][0]["types"], "generation": pokemons["data"][0]["generation"]}})
        }
        setCardpoke(res)
        
    }

    useEffect(() => {
        const url_pokemon = "https://pokedex-api.3rgo.tech/api/pokemon"
        const url_type = "https://pokedex-api.3rgo.tech/api/types"
        fetchApi(url_pokemon)
        console.log(cardPoke)
    }, [])

    return(
        <div className="display">
            <SearchBar/>
            <div className="pokeList">
            </div>
        </div>
    )
}

export default Display;