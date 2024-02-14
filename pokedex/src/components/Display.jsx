import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'
import Type from "./Type";
import Loader from "./Loader";
import logo from '../assets/logo.svg'
import {ContextPokemonList} from "./hooks/usePokemonList";
import {ContextLang} from "./hooks/useLang";



const Display = () => {
    const [pokeList, setPokeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokeTypes, setPokeTypes] = useState([])
    const [lang, setLang] = useState("fr")

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
            let evolveFrom = elem["evolvedFrom"]
            let evolveTo = elem["evolvesTo"]
            let repEvolveFrom = []
            let repEvolvesTo = []

            if(Object.keys(evolveFrom).length == 1){repEvolveFrom.push({"img": pokemons["data"][parseInt(Object.keys(evolveFrom)[0])-1]["image"], "condition" : evolveFrom[Object.keys(evolveFrom)[0]]})}
            if(Object.keys(evolveFrom).length == 2){
                repEvolveFrom.push({"img": pokemons["data"][parseInt(Object.keys(evolveFrom)[0])-1]["image"], "condition" : evolveFrom[Object.keys(evolveFrom)[0]]})
                repEvolveFrom.push({"img": pokemons["data"][parseInt(Object.keys(evolveFrom)[1])-1]["image"], "condition" : evolveFrom[Object.keys(evolveFrom)[1]]})
            }
            if(Object.keys(evolveTo).length == 1){
                repEvolvesTo.push({"img": pokemons["data"][parseInt(Object.keys(evolveTo)[0])-1]["image"], "condition" : evolveTo[Object.keys(evolveTo)[0]]})
            }
            if(Object.keys(evolveTo).length == 2){
                repEvolvesTo.push({"img": pokemons["data"][parseInt(Object.keys(evolveTo)[0])-1]["image"], "condition" : evolveTo[Object.keys(evolveTo)[0]]})
                repEvolvesTo.push({"img": pokemons["data"][parseInt(Object.keys(evolveTo)[1])-1]["image"], "condition" : evolveTo[Object.keys(evolveTo)[1]]})
            }

          res.push({
            "id": elem["id"],
            "cover": [elem["image"], elem["image_shiny"]],
            "name": elem["name"],
            "generation": elem["generation"],
            "type": [elem["types"]],
            "evolveFrom":repEvolveFrom,
            "Taille" : elem["height"],
            "poids" : elem["weight"],
            "hp" : elem["stats"]["hp"],
            "atk": elem["stats"]["atk"],
            "def" : elem["stats"]["def"],
            "vit" : elem["stats"]["vit"],
            "spe_atk": elem["stats"]["spe_atk"],
            "spe_def" : elem["stats"]["spe_def"],
            "evolveTo" : repEvolvesTo, "visible": true
          });
        });
        let res_type = []
        type_data["data"].map((elem) => {
            res_type.push([elem["image"], elem["name"]])
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
                    <Type image={pokeTypes[ids[0][0]-1][0]} name={pokeTypes[ids[0][0]-1][1][lang]}/>
                    <Type image={pokeTypes[ids[0][1]-1][0]} name={pokeTypes[ids[0][1]-1][1][lang]}/>
                </div>
            )
        }
        else{
            return(
                <div className="card-details type">
                    <Type image={pokeTypes[ids[0][0]-1][0]} name={pokeTypes[ids[0][0]-1][1][lang]}/>
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
            <ContextPokemonList.Provider value={[pokeList, setPokeList]}>
                <ContextLang.Provider value={[lang,setLang]}>
          // Affichez le contenu une fois que les données sont chargées
          <div>
            <div className="container_img">
                <img src={logo} className="logo" alt='logo' />
            </div>
            <SearchBar/>
            <div className="pokeList">
                {
                pokeList.map((elem) => {
                    if(elem["visible"]){
                        return <PokemonCard key={elem["id"]}
                                            name_type={pokeTypes[elem["type"][0][0]-1][1]["fr"]}
                                            name = {elem["name"][lang]}
                                            cover={elem["cover"]}
                                            id={elem["id"]}
                                            generation={elem["generation"]}
                                            type={defPokeType(elem["type"])}
                                            height={elem["Taille"]}
                                            weight={elem["poids"]}
                                            hp={elem["hp"]}
                                            atk={elem["atk"]}
                                            def={elem["def"]}
                                            vit={elem["vit"]}
                                            spe_atk={elem["spe_atk"]}
                                            spe_def={elem["spe_def"]}
                                            evovleFrom={elem["evolveFrom"]}
                                            evovleTo={elem["evolveTo"]}
                        />
                    }

                })
                
                }
            </div>

            </div>
                </ContextLang.Provider>
            </ContextPokemonList.Provider>
    )
}

            
      </div>
    );
  };
  
export default Display;