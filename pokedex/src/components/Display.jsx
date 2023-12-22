import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'
import Type from "./Type";
import Loader from "./Loader";
import logo from '../assets/logo.svg'



const Display = () => {
    const [pokeList, setPokeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokeTypes, setPokeTypes] = useState([])

    async function fetchApi(url_pokemon, url_types) {
      try {
        // Démarre le chargement, affiche le Loader
        setIsLoading(true);
  
        // Récupération des données (promesse)
        let poke_data = await fetch(url_pokemon);
        const pokemons = await poke_data.json();
        let poke_type_data = await fetch(url_types)
        const type_data = await poke_type_data.json()  
        let res = [];
        // Boucle sur toute les données récupérées
        pokemons["data"].map((elem) => {
          res.push({
            "id": elem["id"],
            "cover": [elem["image"], elem["image_shiny"]],
            "name": elem["name"]["fr"],
            "generation": elem["generation"],
            "type": [elem["types"]],
            "Evolution":{"EvoledFrom" : {}},
            "Taille" : elem["height"],
            "poids" : elem["weight"]
          });
        });
        let res_type = []
        type_data["data"].map((elem) => {
            res_type.push([elem["image"], elem["name"]["fr"]])
        })
        setPokeTypes(res_type)
  
        // Met fin au chargement, masque le Loader

        setIsLoading(false);
        setPokeTypes(res_type)
        setPokeList(res);
      } catch (error) {
        console.error('Une erreur s\'est produite lors du chargement des données :', error);
        // Gérer les erreurs ici si nécessaire
        setIsLoading(false); // Assurez-vous de désactiver le Loader en cas d'erreur
      }
    }

    function defPokeType(ids){
        if(ids[0].length === 2){
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
      const url_pokemon = "https://pokedex-api.3rgo.tech/api/pokemon";
      const url_type = "https://pokedex-api.3rgo.tech/api/types";
      fetchApi(url_pokemon, url_type);
    }, []);
  
    return (
      <div className="display">
        {isLoading ? (
          // Affichez le Loader tant que les données sont en cours de chargement
          <Loader />
        ) : (
          // Affichez le contenu une fois que les données sont chargées
          <div>
            <div className="container_img">
                <img src={logo} className="logo" alt='logo' />
            </div>
            <SearchBar />
            <div className="pokeList">
                {
                pokeList.map((elem) => {
                    return <PokemonCard key={elem["id"]} name={elem["name"]} cover={elem["cover"]} id={elem["id"]} generation={elem["generation"]} type={defPokeType(elem["type"])} height={elem["Taille"]} weight={elem["poids"]}/>
                })
                
                }
            </div>
        </div> 
    )
}

            
      </div>
    );
  };
  
export default Display;