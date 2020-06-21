import React, { useRef } from 'react';
import { Board } from '../board/board';

const Controller = (props) => {
    const canvas = useRef(null);

    return (<>
        <div>Hi {props.player.name}, game is still under development 🙂</div>
        <canvas style={{ maxHeight: props.style.maxHeight, flex: 1 }} ref={canvas}></canvas>
        <Board canvas={canvas} />
    </>);
}

export { Controller };
