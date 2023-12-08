import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import '../style/style.css'
import PokemonCard from './PokemonCard'
import Loader from "./Loader";
import logo from '../assets/logo.svg'
import '../style/Loader.css'


const Display = () => {
    const [pokeList, setPokeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    async function fetchApi(url_pokemon) {
      try {
        // Démarre le chargement, affiche le Loader
        setIsLoading(true);
  
        // Récupération des données (promesse)
        let poke_data = await fetch(url_pokemon);
        const pokemons = await poke_data.json();
  
        let res = [];
        // Boucle sur toute les données récupérées
        pokemons["data"].map((elem) => {
          res.push({
            "id": elem["id"],
            "cover": elem["image"],
            "name": elem["name"]["fr"],
            "generation": elem["generation"],
            "type": [elem["types"]],
          });
        });
  
        // Met fin au chargement, masque le Loader

        setIsLoading(false);
        setPokeList(res);
      } catch (error) {
        console.error('Une erreur s\'est produite lors du chargement des données :', error);
        // Gérer les erreurs ici si nécessaire
        setIsLoading(false); // Assurez-vous de désactiver le Loader en cas d'erreur
      }
    }
  
    useEffect(() => {
      const url_pokemon = "https://pokedex-api.3rgo.tech/api/pokemon";
      const url_type = "https://pokedex-api.3rgo.tech/api/types";
      fetchApi(url_pokemon);
    }, []);
  
    return (
      <div className="display">
        {isLoading ? (
          // Affichez le Loader tant que les données sont en cours de chargement
          <Loader />
        ) : (
          // Affichez le contenu une fois que les données sont chargées
          <div>
            <img src={logo} alt='logo' />
            <SearchBar />
            <div className="pokeList">
            
            {pokeList.map((elem) => (
              // Affichez chaque Pokemon ici (ajustez selon vos besoins)
              <PokemonCard key={elem.id} name={elem["name"]} cover={elem["cover"]} id={elem["id"]} generation={elem["generation"]} type={elem["type"][0]} />
            ))}
          </div>
          </div>
          
        )}
      </div>
    );
  };
  
export default Display;