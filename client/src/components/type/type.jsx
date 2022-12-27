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
            <h1>{type}</h1>
        </div>
    )
}


export default Type