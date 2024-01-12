import React, { useEffect, useState } from 'react'
import '../style/PokemonCard.css'
import Type from './Type';
import RadarChart from './RadarChart';
import Cards from './Cards';

function PokemonCard({ name_type, name_en, name, cover, type, id, generation, height, weight, def, atk, vit, hp, spe_atk, spe_def, evovleFrom, evovleTo }) {
    const [isModalVisible, setModalVisibility] = useState(false)
    const [coverState, setCoverState] = useState("")
    const [coverIsShiny, setCoverIsShiny] = useState(false)
    const [cards, setCards] = useState([])
    const [visibleCard, setVisibleCard] = useState(false)
    const [timeStamp, setTimeStamp] = useState(0)

    const fetch_card = async (name) => {
        const url = `https://api.pokemontcg.io/v2/cards?q=name:${name_en}`
        var fetcher = await fetch(url)
        var json = await fetcher.json()

        const data = json["data"]
        setCards(data)
    }

    const visible = () => {
        setVisibleCard(true)
        console.log(cards)
    }
    const handleCardClick = () => {
        fetch_card()
        setModalVisibility(true);
    }

    const closeModal = () => {
        setModalVisibility(false)
    }

    useEffect(() => {
        setCoverState(cover[0])
    }, [])

    const changeCoverToShiny = () => {
        if (coverIsShiny) {
            setCoverState(cover[0])
            setCoverIsShiny(false)
        }
        else {
            setCoverState(cover[1])
            setCoverIsShiny(true)
        }
    }


    return (
        <div>
            <div className={`card ${name_type}`} onClick={handleCardClick}>
                <h1>#{id}</h1>
                <img className="pokedex-cover" src={cover[0]} alt={`cover`} />
                <div className='card-details'>
                    <h2>{name}</h2>
                </div>
                {type}
                <div className='card-details'>
                    <h3>Génération : {generation}</h3>
                </div>
            </div>

            {isModalVisible && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <div className='close-x'>
                            <svg onClick={closeModal} width="25" height="25">
                                <line x1="0" y1="0" x2="25" y2="25" stroke="black" fill='black' />
                                <line x1="0" y1="25" x2="25" y2="0" stroke="black" fill='black' />
                            </svg>
                        </div>
                        <h1>#{id}</h1>
                        <img onClick={changeCoverToShiny} className="pokedex-cover" src={coverState} alt={`cover`} />
                        <div className='card-details'>
                            <h2>{name}</h2>
                        </div>
                        <div className='card-details'>
                            {type}
                        </div>
                        <div className='card-details'>
                            <h3>Génération : {generation}</h3>
                        </div>
                        <div className='card-details'>
                            <h3>Taille : {height}</h3>
                        </div>
                        <div className='card-details'>
                            <h3>Poids : {weight}</h3>
                        </div>
                        <div className='card-details'>
                            <RadarChart atk={atk} def={def} vit={vit} hp={hp} spe_atk={spe_atk} spe_def={spe_def} />
                            
                        </div>
                        <div className='btn-contain'><button className={`btn-card ${name_type}`} onClick={() => visible()}>Voir les cartes</button></div>
                        <div className='card-container'>
                        {
                            visibleCard ? cards.map(elem => {
                                let url_img = elem["images"]["small"]
                                console.log(url_img)
                                return <Cards img_url={url_img} />
                            }) : ""
                        }
                        </div>

                    </div>
                </div>
            )}
        </div>

    )

}

export default PokemonCard