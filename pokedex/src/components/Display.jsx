import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'



const Display  = () =>{

    const [pokeList,setPokeList] = useState([])

    async function fetchApi(url_pokemon){
        // Récupération des données (promesse)
        let poke_data = await fetch(url_pokemon)
        const pokemons = await poke_data.json()

        let res = []
        // Boucle sur toute les données récupérer
        pokemons["data"].map((elem) => {
            res.push({"id" : elem["id"] , "cover" :elem["image"], "name": elem["name"]["fr"], "generation": elem["generation"], "type": [elem["types"]]})
        })

        setPokeList(res)
    }

    useEffect(() => {
        const url_pokemon = "https://pokedex-api.3rgo.tech/api/pokemon"
        const url_type = "https://pokedex-api.3rgo.tech/api/types"
        fetchApi(url_pokemon)
    }, [])

    return(
        <div className="display">
            <SearchBar/>
            <div className="pokeList">
                {
                pokeList.map((elem) => {
                    return <PokemonCard name={elem["name"]} cover={elem["cover"]} id={elem["id"]} generation={elem["generation"]} type={elem["type"][0]}/>
                })
                
                }
            </div>
        </div>
    )
}

export default Display;