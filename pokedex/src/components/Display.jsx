import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'
import Type from "./Type";



const Display  = () =>{

    const [pokeList,setPokeList] = useState([])
    const [pokeTypes, setPokeTypes] = useState([])

    async function fetchApi(url_pokemon, url_types){
        // Récupération des données (promesse)
        let poke_data = await fetch(url_pokemon)
        const pokemons = await poke_data.json()
        let poke_type_data = await fetch(url_types)
        const type_data = await poke_type_data.json()
        let res = []
        // Boucle sur toute les données récupérer
        pokemons["data"].map((elem) => {
            res.push({"id" : elem["id"] , "cover" :elem["image"], "name": elem["name"]["fr"], "generation": elem["generation"], "type": [elem["types"]]})
        })
        let res_type = []
        type_data["data"].map((elem) => {
            res_type.push([elem["image"], elem["name"]["fr"]])
        })
        setPokeTypes(res_type)
        setPokeList(res)
    }

    function defPokeType(ids){
        if(ids[0].length == 2){
            return(
                <div className="card-details type">
                    <Type image={pokeTypes[ids[0][0]-1][0]} name={pokeTypes[ids[0][0]-1][1]}/>
                    <Type image={pokeTypes[ids[0][1]-1][0]} name={pokeTypes[ids[0][1]-1][1]}/>
                </div>
            )
        }
        else{
            return(
                <div className="card-details type">
                    <Type image={pokeTypes[ids[0][0]-1][0]} name={pokeTypes[ids[0][0]-1][1]}/>
                </div>
            )
        }
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
                {
                pokeList.map((elem) => {
                    return <PokemonCard key={elem["id"]} name={elem["name"]} cover={elem["cover"]} id={elem["id"]} generation={elem["generation"]} type={defPokeType(elem["type"])}/>
                })
                
                }
            </div>
        </div> 
    )
}

export default Display;