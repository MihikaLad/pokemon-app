import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => {
                const pokemonData = response.data.results;
                Promise.all(pokemonData.map(pokemon => axios.get(pokemon.url)))
                    .then(pokemonResponses => {
                        setPokemons(pokemonResponses.map(res => res.data));
                    });
            });
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search Pokémon..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
            <div className="pokemon-list">
                {filteredPokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
