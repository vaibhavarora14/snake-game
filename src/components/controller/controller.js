import React from 'react';
import { Board } from '../board/board';

const Controller = (props) => {
    return (<>
        <div>Hi {props.player.name}, game is still under development 🙂</div>
        <Board />
    </>);
}

export { Controller };
