import React, {useContext, useEffect, useState} from "react";
import {ContextLang} from "./hooks/useLang";
import {ContextPokemonList} from "./hooks/usePokemonList";

const SearchBar = ({onSearch}) => {

    const [lang, setLang] = useContext(ContextLang)
    const [pokemonList, setPokemonList] = useContext(ContextPokemonList)
    const [type, setType] = useState(0)
    const [generation, setGeneration] = useState("")
    const [searchBarValue, setSearchBarValue] = useState("")


    const queryPokemon = () => {
        if(type == 0){
            if(generation == 0){
                let res = []
               pokemonList.map((elem) => {
                   res.push(elem)
                   if(elem["name"][lang].substring(0, searchBarValue.length) != searchBarValue){
                       res[res.length - 1]["visible"] = false
                   }
                   else{
                       res[res.length - 1]["visible"] = true
                   }
               })
                setPokemonList(res)
            }
            else{
                let res = []
                pokemonList.map((elem) => {
                    res.push(elem)
                    if(elem["name"][lang].substring(0, searchBarValue.length) != searchBarValue){
                        res[res.length - 1]["visible"] = false
                    }
                    else{
                        if(parseInt(generation) == elem["generation"]) {
                            res[res.length - 1]["visible"] = true
                        }
                        else{
                            res[res.length - 1]["visible"] = false
                        }
                    }

                })
                setPokemonList(res)
            }

        }
        else{
            if(generation == 0){
                let res = []
                pokemonList.map((elem) => {
                    res.push(elem)
                    if(elem["name"][lang].substring(0, searchBarValue.length) != searchBarValue){
                        res[res.length - 1]["visible"] = false
                    }
                    else{
                        if(elem["type"][0][0] != type){
                            if(elem["type"][0][1] != type)
                            {
                                res[res.length - 1]["visible"] = false
                            }
                            else{
                                res[res.length - 1]["visible"] = true
                            }
                        }
                        else{
                            res[res.length - 1]["visible"] = true
                        }

                    }
                })
                setPokemonList(res)
            }
            else{

                let res = []
                pokemonList.map((elem) => {
                    res.push(elem)
                    if(elem["name"][lang].substring(0, searchBarValue.length) != searchBarValue){
                        res[res.length - 1]["visible"] = false
                    }
                    else{
                        if(elem["type"][0][0] != parseInt(type) && elem["type"][0][1] != parseInt(type)){
                            res[res.length - 1]["visible"] = false
                        }
                        else if(elem["generation"] != generation){
                            res[res.length - 1]["visible"] = false
                        }
                        else{
                            res[res.length - 1]["visible"] = true
                        }

                    }
                })
                setPokemonList(res)

            }
        }
    }


    useEffect(() => {
        queryPokemon()
    }, [searchBarValue, type, generation,lang]);


    const changeLang = () =>{
        setLang(lang == "fr" ? "en" : "fr")
    }

    return (
        <div className="search-component">
            <input onChange={(e) => {setSearchBarValue(e.target.value)}} type="search"  className="searchbar" placeholder="Rechercher un pokémon..." />
            <div className="select-list">
                <select onChange={() => changeLang()}>
                    <option>Français</option>
                    <option>English</option>
                </select>
                <select name="" id="">
                    <option value="">Trier par</option>
                </select>

                {
                    lang == "fr" ? <select onChange={(e) => {
                            setType(e.target.value)
                        }}>
                            <option value={0}>Type</option>
                            <option value={17}>Ténèbre</option>
                            <option value={11}>Plante</option>
                            <option value={7}>Feu</option>
                            <option value={9}>Insecte</option>
                            <option value={2}>Combat</option>
                            <option value={14}>Roche</option>
                            <option value={18}>Vol</option>
                            <option value={10}>Normal</option>
                            <option value={4}>Eau</option>
                            <option value={16}>Spectre</option>
                            <option value={6}>Fée</option>
                            <option value={8}>Glace</option>
                            <option value={3}>Dragon</option>
                            <option value={5}>Électrik</option>
                            <option value={13}>Psy</option>
                            <option value={15}>Sol</option>
                            <option value={12}>Poison</option>
                            <option value={1}>Acier</option>

                        </select> :
                        <select onChange={(e) => {
                            setType(e.target.value);
                        }}>
                            <option value={0}>Type</option>
                            <option value={17}>Dark</option>
                            <option value={11}>Leaf</option>
                            <option value={7}>Fire</option>
                            <option value={9}>Bug</option>
                            <option value={2}>Fighting</option>
                            <option value={14}>Rock</option>
                            <option value={18}>Fly</option>
                            <option value={10}>Normal</option>
                            <option value={4}>Water</option>
                            <option value={16}>Ghost</option>
                            <option value={6}>Fairy</option>
                            <option value={8}>Ice</option>
                            <option value={3}>Dragon</option>
                            <option value={5}>Électric</option>
                            <option value={13}>Psychic</option>
                            <option value={15}>Ground</option>
                            <option value={12}>Poison</option>
                            <option value={1}>steel</option>

                        </select>
                }

                <select onChange={(e) => {
                    setGeneration(e.target.value);
                }}>
                    {<option value={0}>Generation</option>}
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                </select>
            </div>
        </div>
    )
}


export default SearchBar;