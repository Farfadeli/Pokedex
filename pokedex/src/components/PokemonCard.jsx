import React, {useState} from 'react'
import '../style/PokemonCard.css'

function  PokemonCard({name, cover, type, id, generation}) {
    const [isModalVisible, setModalVisibility] = useState(false)

    const handleCardClick = () => {
        setModalVisibility(true);
    
    }
    
    const closeModal = () => {
        setModalVisibility(false)
    }

    return(
        <div>
            <div className="card" onClick={handleCardClick}>
                <h1>#{id}</h1>
                <img className="pokedex-cover" src={cover} alt={`cover`} />
                <div className='card-details'>
                    <h2>{name}</h2>
                </div>
                <div className='card-details'>
                    <h3>{type}</h3>
                </div>
                <div className='card-details'>
                    <h3>Génération : {generation}</h3>
                </div>
            </div>

            {isModalVisible && (
                <div className='modal-overlay' onClick={closeModal}>
                    <div className='modal-content'>
                        <h1>#{id}</h1>
                        <img className="pokedex-cover" src={cover} alt={`cover`} />
                        <div className='card-details'>
                            <h2>{name}</h2>
                        </div>
                        <div className='card-details'>
                            <h3>{type}</h3>
                        </div>
                        <div className='card-details'>
                            <h3>Génération : {generation}</h3>
                        </div>
                        <div className='card-details'>
                            <h3>azertyuiop</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )

}

export default PokemonCard