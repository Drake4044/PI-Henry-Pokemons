import React from "react";  


const Type = ({id, type, setPkmn, state}) => {

    const onclick = () => {
        setPkmn({
            ...state,
            types: state.types.filter(type => type.id !== id)
        })
    }

    return (
        <div>
            <button onClick={onclick} >X</button>
            <h2>{type}</h2>
        </div>
    )
}


export default Type