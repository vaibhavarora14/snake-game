import React from 'react';

const Toggle = (props) => {
    return (<> {
        props.state === true && props.children
    }</>
    );
}

export { Toggle }