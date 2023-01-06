import React from "react"; 
import "./type.css" 


const Type = ({id, type, setPkmn, state}) => {

    const onclick = () => {
        setPkmn({
            ...state,
            types: state.types.filter(type => type.id !== id)
        })
    }

    return (
        <div className={type}>
            <h2>{type}</h2>
            {id && <button onClick={onclick} className="delete">X</button>}
        </div>
    )
}


export default Type