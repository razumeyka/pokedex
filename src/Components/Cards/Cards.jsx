import React, { useState, useEffect, useCallback } from 'react';

import Card from './Card';
import Select from '../UI/Select/Select';
import Spinner from '../UI/Spinner/Spinner';

import classes from './Cards.module.css';

const Cards = (props) => {

    const [pokemons, setPokemons] = useState([]);
    const [sort, setSort] = useState("");
    const [sortedPokemons, setSortedPokemons] = useState([]);
    const [limit, setLimit] = useState(12);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback( async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);
            const data = await response.json();
            const characters = await Promise.all(
                data.results.map( async (item) => {
                    const response = await fetch(item.url);
                    const data = await response.json();

                    const types = data.types.map( item => {
                        return item.type.name
                    }).join(', ');

                    return {
                        id: data.id,
                        name: data.name,
                        url: data.sprites.front_default,
                        types: types,
                        weight: data.weight,
                        moves: data.moves.length,
                    };
                })
            );
            setPokemons(characters);

            const sortPokemons = () => {
                const sortedPokemons = characters.filter( pokemon => {
                    return pokemon.types.indexOf(sort) !== -1 ;
                });
                setSortedPokemons(sortedPokemons);
            }

            if (sort) {
                sortPokemons();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    },[limit, sort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const paginationHandler = () => {
        setLimit( prev => prev + 12);
    };

    const showHandler = item => {
        props.onShowDetails(item);
    };

    const sortHandler = item => {
        setSort(item);
    }

    let content = <p>Found no pokemons</p>;

    if ( pokemons.length > 0 ) {
        content = pokemons.map( item => {
            return (
                <div key={item.id} className={classes.card}>
                    <Card pokemon={item} onShowPokemonDetails={showHandler} />
                </div>
            )
        });
    }

    if ( sort ) {
        if ( sortedPokemons.length !== 0 ) {
            content = sortedPokemons.map( item => {
                return (
                    <div key={item.id} className={classes.card}>
                        <Card pokemon={item} onShowDetails={showHandler} />
                    </div>
                )
            });
        } else {
            content = <p>Found no {sort} pokemons</p>;
        }
    }

    if ( error ) {
        content = <p>{error}</p>;
    }

    if ( isPending ) {
        content = <Spinner />;
    }

    return (
        <div>
            <Select onSort={sortHandler} />
            <div className={classes.cards}>{content}</div>
            <button type="button" onClick={paginationHandler}>Load more</button>
        </div>
    )
}

export default Cards;