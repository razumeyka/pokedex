import React from 'react';

import classes from './RightCol.module.css';

const RightCol = (props) => {
    return (
        <div className={classes.col}>
            {props.children}
        </div>
    )
}

export default RightCol