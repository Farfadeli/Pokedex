import React, { useEffect, useState } from "react";
import '../style/Loader.css';
import PokeballSvg from '../assets/pokeball.svg';

const Loader = () => {
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    // Utilisez setTimeout pour simuler un chargement de 10 secondes
    const timeoutId = setTimeout(() => {
      setLoadingText("Still loading..."); // Modifiez le texte pendant le chargement si nécessaire
    }, 10000); // Par exemple, 10 secondes

    // Nettoyez le timeout lors du démontage du composant
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="loader">
      <div className="pokeball-container">
        {/* Utilisez la balise <img> pour afficher votre fichier SVG */}
        <img className="pokeball" src={PokeballSvg} alt="Pokeball" />
      </div>
      {loadingText}
    </div>
  );
};

export default Loader;
