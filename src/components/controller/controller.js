import React, { useRef, useEffect, useState } from 'react';
import { Board } from '../board/board';
import { Snake } from '../snake/snake';
import { Food } from '../food/food';
import isEqual from 'is-equal';

const Controller = (props) => {
    const canvas = useRef(null);
    let [context, setContext] = useState(null);
    let [boxSize, setBoxSize] = useState([]);
    let [availableBoxes, setAvailableBoxes] = useState([]);

    const getBoxSize = (size) => {
        if (!isEqual(size, boxSize)) {
            setBoxSize(boxSize.concat(size));
        }
    }

    useEffect(() => {
        setContext(canvas.current.getContext('2d'));
    }, [canvas]);

    useEffect(() => {
        const totalBoxes = calculateTotalBoxesInBoard(canvas.current, boxSize);

        if (!isEqual(availableBoxes, totalBoxes)) {
            setAvailableBoxes(availableBoxes.concat(totalBoxes));
        }
        console.log(availableBoxes)
    }, [availableBoxes, boxSize]);

    const calculateTotalBoxesInBoard = (canvas, boxSize) => {
        let result = [];
        let rows = Math.floor(canvas.clientWidth / boxSize[0]);

        let boxSizeTemp = [0, 0];
        while (rows >= 0) {
            let columns = Math.floor(canvas.clientHeight / boxSize[1]);
            boxSizeTemp[1] = 0;
            while (columns >= 0) {
                result.push([...boxSizeTemp]);
                boxSizeTemp[1] += boxSize[1];
                columns -= 1;
            }
            boxSizeTemp[0] += boxSize[0];
            rows -= 1;
        }

        return result;
    }

    return (<>
        <div>Hi {props.player.name}, game is still under development 🙂</div>
        <canvas style={{ maxHeight: props.style.maxHeight, flex: 1 }} ref={canvas}></canvas>
        <Board getBoxSize={getBoxSize} canvas={canvas} context={context} />
        <Snake context={context} canvas={canvas} size={boxSize} availableBoxes={availableBoxes} />
        <Food availableBoxes={availableBoxes} size={boxSize} context={context} canvas={canvas} />
    </>);
}

export { Controller };
