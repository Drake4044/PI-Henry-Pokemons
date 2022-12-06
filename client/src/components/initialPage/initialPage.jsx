import React from "react";
import ImagePage from "../../images/wallpaper.jpg"
import Boton from "../../images/pokeball.png"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../redux/actions"


const InitialPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPokemons())
    })


    return(
        <div>
            <img src={ImagePage} alt="Main page" />
            <Link to="/pokemons" >
                <img src={Boton} alt="Pokeball" />
            </Link>
        </div>
    )
}

export default InitialPage