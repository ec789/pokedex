import React, {useState, useEffect} from 'react';
import "./DetailedView.css";


function DetailedView(props){

	/*
	pokemon = {
		id: 1,
		name: "bulbasaur",
		types: ["grass", "poison"],
		src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
	}
	*/

    const [pokemon, setPokemon] = useState( {id: "???", name: "???", types: ["???"], src: "placeholder.png"} );


   	useEffect( () => {
   		if(props.pokemon && props.pokemon.url){
			fetch(props.pokemon.url)
			.then((response) => response.json())
		    .catch((error) => console.error(error))
		    .then((data) => {
				const pokemon = {
					id: data.id,
					name: data.name,
					types: data.types.map( e => e.type.name),
					src: (data.sprites.other["official-artwork"].front_default || data.sprites.front_default),
				}
				setPokemon(pokemon);
			})
		}

	}, [props.pokemon]);


    return(
        <div id="detailed-view-container" className="Detail-main-container">
            <div id="dv-image-container" className="Detail-image-container">
                <img src={pokemon.src} alt={props.pokemon && props.pokemon.name} height="300" width="300"/>
            </div>
            <div id="dv-info-container" className="Detail-info-container">
                <h2>{pokemon.name[0].toUpperCase()+ pokemon.name.slice(1)}</h2>
                <p>ID: {pokemon.id}</p>
                <p>Type: {pokemon.types.join(', ')}</p>
            </div>
        </div>
    );
}


export default DetailedView;