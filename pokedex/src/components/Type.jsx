import React from "react";
import '../style/type.css'
const Type = ({image , name}) =>{
    return(
        <div className="type_component">
            <img src={image} alt="image type" />
            <p>{name}</p>
        </div>
    )
}

export default Type;