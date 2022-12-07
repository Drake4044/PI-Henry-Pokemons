import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsByName } from "../../redux/actions";


const NavBar = () => {

    const [ pkmnName, setPkmnName ] = useState({ name: "" })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setPkmnName({
            name: e.target.value
        })
        filtrado() 
    }

    const filtrado = () => {
        dispatch(getPokemonsByName(pkmnName.name.toLowerCase()))
    }


    return(
        <div>
            <input type="text" name="name" placeholder="Search Pokemon..." value={pkmnName.name} onChange={handleChange} />
            <button onClick={filtrado} >BUSCAR</button>
            <select>
                <option>Order by Name ASC</option>
                <option>Order by Name DES</option>
            </select>
            <select>
                <option>Order by Types ASC</option>
                <option>Order by Types DES</option>
            </select>
        </div>
    )
}

export default NavBar