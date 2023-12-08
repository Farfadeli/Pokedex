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
        // Boucle sur toute les données récupérer
        pokemons["data"].map((elem) => {
            res.push(elem["image"])
        })
        setPokeList(res)

        console.log(pokeList)
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