import React from "react";
import "./initialPage.css"
import ImagePage from "../../images/wallpaper.jpg"
import Boton from "../../images/pokeball.png"
import GottaCatchALL from "../../images/gotta-catch-all.png"
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
            <div className="mainpage">
                <img src={ImagePage} alt="Main page" />
            </div>
            <div className="pokeball">
                <img src={Boton} alt="Pokeball" />
                <Link to="/pokemons" >
                    <div className="circle">
                        <div className="light"></div>
                    </div>
                </Link>
            </div>
            <div className="gottacatch" >
                <img src={GottaCatchALL} alt="Gotta catch all" />
            </div>
        </div>
    )
}

export default InitialPage