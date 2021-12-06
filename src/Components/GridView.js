import React, {useState, useEffect} from 'react';
import {Grid} from 'react-virtualized';
import "./GridView.css"


function GridView(props){

	const columnCount = 3; 

	const [list, setList] = useState([]);

	useEffect( () =>  {fetch("https://pokeapi.co/api/v2/pokemon?limit=-1")
		.then( (response) => response.json())
	    .catch( (error) => console.error(error))
	    .then( (data) => {
			setList(data.results);
		});

		}, []);



	function cellRenderer({columnIndex, key, rowIndex, style, isScrolling}) {
	  return (
	    <div key={key} style={style}>
	      <GridElement onClick={props.onClick} pokemon={list && list[columnCount * rowIndex + columnIndex]} selectedPokemon={props.selectedPokemon}/>
	    </div>
	  );
	}


	return(
		<Grid
		    cellRenderer={cellRenderer}
		    columnCount={columnCount}
		    columnWidth={120}
		    height={600}
		    rowCount={ (Math.floor(list.length/columnCount ) + 1)}
		    rowHeight={120}
		    width={400}
		    // TODO use width={getTotalColumnWidth()}
		/>
	);
}



function GridElement(props){

	const [src, setSrc] = useState("placeholder.png");
	
	useEffect( () => {
		let isMounted = true;
		if(props.pokemon){
			fetch(props.pokemon.url)
			.then((response) => response.json())
		    .catch((error) => console.error(error))
		    .then((data) => {
				if (isMounted) {
					setSrc(data.sprites.other["official-artwork"].front_default || data.sprites.front_default);
				}
			})
			return () => { isMounted = false;}
		}
	}, [props.pokemon]);


	if (!props.pokemon){
		return null;
	} else {
		return(
			<div className={(props.selectedPokemon && props.selectedPokemon.name) === props.pokemon.name ? "Cell-highlighted" : "Cell"}>
				<img className="Grid-img" src={src} onClick={props.onClick} pokemon={props.pokemon} poke_url={props.pokemon && props.pokemon.url} poke_name={props.pokemon && props.pokemon.name} alt={props.pokemon && props.pokemon.name} height="90" width="90"/>
			</div>
		);
	}
}

export default GridView;