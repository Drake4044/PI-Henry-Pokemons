import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearDetail, getDetailPokemon } from "../../redux/actions";


class DetailPokemon extends React.Component {

    componentDidMount() {
        this.props.getDetailPokemon(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.clearDetail()
    }
    

    render() {

        return (
            <div>
                <Link to="/pokemons" >
                    <button>ATRAS</button>
                </Link>
                <div className="detailPokemon" >
                    <img src={this.props.pkmnDetail.image} alt={this.props.pkmnDetail.name}  />
                    <h2>POKEMON Nro: {this.props.pkmnDetail.id}</h2>
                    <h1>Name: {this.props.pkmnDetail.name}</h1>
                    <p>Life: {this.props.pkmnDetail.hp}</p>
                    <p>Attack: {this.props.pkmnDetail.attack}</p>
                    <p>Defense: {this.props.pkmnDetail.defense}</p>
                    <p>Speed: {this.props.pkmnDetail.speed}</p>
                    <p>Height: {this.props.pkmnDetail.height}</p>
                    <p>Weight: {this.props.pkmnDetail.weight}</p>
                </div>
            </div>
        )
    }
}

export const mapDispatchToProps = { getDetailPokemon, clearDetail  }

export const mapStateToProps = state => {
    return {
        pkmnDetail: state.pokemonDetail
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailPokemon)

