import React from 'react';

import classes from './LeftCol.module.css';

const LeftCol = (props) => {
    return (
        <div className={classes.col}>
            {props.children}
        </div>
    )
}

export default LeftCol

