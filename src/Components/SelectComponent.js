import React, {useState} from 'react';
import DetailedView from './DetailedView.js';
import GridView from './GridView.js';



function SelectComponent(){

	/*	
	pokemon = {
		name: "bulbasaur",
		url: "https://pokeapi.co/api/v2/pokemon/1/"
	}
	*/

	const [selectedPokemon, setSelectedPokemon] = useState();

	function handle_click(e){
		e.preventDefault();
		let pokemon = {
			name: e.target.getAttribute("poke_name"), 
			url: e.target.getAttribute("poke_url")
		};
		setSelectedPokemon(pokemon);
	}


	return(
		<>
			<GridView onClick={handle_click} selectedPokemon={selectedPokemon}></GridView>
			<DetailedView pokemon={selectedPokemon}></DetailedView> 
		</>
	);

}

export default SelectComponent;