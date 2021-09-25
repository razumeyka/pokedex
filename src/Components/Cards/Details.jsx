import React from 'react';

import classes from './Details.module.css';

const Details = (props) => {
    const pokemon = props.pokemon;

    return (
        <div className={classes.card}>
            <div className={classes.pic}>
                <img src={pokemon.url} alt={pokemon.name} />
            </div>
            <div className={classes.name}>{pokemon.name}</div>
            <table className={classes.params}>
                <tbody>
                    <tr className={classes.param}>
                        <td className={classes.title}>Type</td>
                        <td className={classes.value}>{pokemon.types}</td>
                    </tr>
                    <tr className={classes.param}>
                        <td className={classes.title}>Weight</td>
                        <td className={classes.value}>{pokemon.weight}</td>
                    </tr>
                    <tr className={classes.param}>
                        <td className={classes.title}>Total moves</td>
                        <td className={classes.value}>{pokemon.moves}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Details;