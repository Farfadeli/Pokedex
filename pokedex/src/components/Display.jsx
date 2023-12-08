import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'



const Display  = (props) =>{

    const [pokeList,setPokeList] = useState(null)
    const [cardPoke, setCardpoke] = useState([])


    async function fetchApi(url_pokemon, url_type){
        let poke_data = await fetch(url_pokemon)
        let poke_type = await fetch(url_type)
        const pokemons = await poke_data.json()
        const types = await poke_type.json()
        let res = []
        setPokeList(pokemons["data"][0]["name"]["fr"])
        for(let e = 0; e !== pokemons["data"].length; e++){
            res.push({"name" : pokemons["data"][0]["name"]["fr"], "image" : pokemons["data"][0]["image"], "id" : pokemons["data"][0]["id"], "type": pokemons["data"][0]["types"], "generation": pokemons["data"][0]["generation"]})
        }
        setCardpoke(res)
        
    }

    useEffect(() => {
        const url_pokemon = "https://pokedex-api.3rgo.tech/api/pokemon"
        const url_type = "https://pokedex-api.3rgo.tech/api/types"
        fetchApi(url_pokemon, url_type)
    }, [])

    return(
        <div className="display">
            <SearchBar/>
            <div className="pokeList">
                {cardPoke.map()}
            </div>
        </div>
    )
}

export default Display;