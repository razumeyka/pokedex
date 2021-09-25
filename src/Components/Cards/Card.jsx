import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
    const pokemon = props.pokemon;

    const showDetailsHandler = () => {
        props.onShowPokemonDetails(pokemon);
    }

    return (
        <div className={classes.card} onClick={showDetailsHandler}>
            <div className={classes.pic}>
                <img src={pokemon.url} alt={pokemon.name} />
            </div>
            <div className={classes.name}>{pokemon.name}</div>
            <div className={classes.tags}>
                { pokemon.types.split(', ').map( item => {
                    let colorClass = (item === 'grass') ? `${classes.tag} ${classes.tag_grass}` :
                        (item === 'poison') ? `${classes.tag} ${classes.tag_poison}` :
                        (item === 'fire') ? `${classes.tag} ${classes.tag_fire}` :
                        (item === 'flying') ? `${classes.tag} ${classes.tag_flying}` : 
                        (item === 'water') ? `${classes.tag} ${classes.tag_water}` : 
                        (item === 'bug') ? `${classes.tag} ${classes.tag_bug}` : 
                        (item === 'normal') ? `${classes.tag} ${classes.tag_normal}` : 
                        (item === 'electric') ? `${classes.tag} ${classes.tag_electric}` :
                        `${classes.tag}`;

                    return (
                        <div key={item} className={colorClass}>{item}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Card;