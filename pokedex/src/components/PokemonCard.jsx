import React from 'react'
import '../style/PokemonCard.css'

function  PokemonCard({props}) {
    return(
        <div className="card">
            <h1>{props.name}</h1> 
            <img className="pokedex-cover" src={props.cover} alt={`cover`} />
            {props.type}
            {props.id}
            {props.generation}
        </div>
    )

}

export default PokemonCard