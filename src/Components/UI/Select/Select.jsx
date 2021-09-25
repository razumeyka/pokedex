import React, { useState, useEffect, useCallback } from 'react';

import classes from './Select.module.css';

const Select = (props) => {

    const [types, setTypes] = useState([]);
    const [error, setError] = useState(null);

    const fetchTypes = useCallback( async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type?limit=999');
            const data = await response.json();
            const names = data.results.map( item => item.name);
            setTypes(names);
        } catch (err){
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    const sortTypeHandler = (event) => {
        props.onSort(event.target.value);
    };

    return (
        <>
            { error && <p>{error}</p> }
            <select className={classes.select} onChange={sortTypeHandler}>
                <option value="">All types</option>
                {types.map( item => {
                    return (
                        <option key={item} value={item}>{item}</option>
                    )
                })}
            </select>
        </>
    )
}

export default Select;