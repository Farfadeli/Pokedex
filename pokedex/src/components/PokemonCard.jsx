import React from 'react'
import '../style/PokemonCard.css'

function  PokemonCard({name, cover, type, id, generation}) {
    return(
        <div className="card">
            <h1>{id}</h1>
            <img className="pokedex-cover" src={cover} alt={`cover`} />
            <h2>{name}</h2> 
            <br/>
            <h3>{type}</h3>
            <br/>
            <h3>Génération : {generation}</h3>
        </div>
    )

}

export default PokemonCard