import React, { useRef, useEffect, useState } from 'react';
import { Board } from '../board/board';
import { Snake } from '../snake/snake';
import { Food } from '../food/food';
import isEqual from 'is-equal';

const Controller = (props) => {
    const canvas = useRef(null);
    let [context, setContext] = useState(null);
    let [boxSize, setBoxSize] = useState([]);
    let availableBoxes = useRef([]);
    const [coordsAvailable, setAvailableCoords] = useState([]);
    const requiredFoodCount = useRef(1);
    const [foodCount, setFoodCount] = useState(0);

    const [requiredSnakeCount, setRequiredSnakeCount] = useState(1);
    const [runningSnakeCount, setRunningSnakeCount] = useState(0);

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

        if (!isEqual(availableBoxes.current, totalBoxes)) {
            availableBoxes.current = totalBoxes;
            setAvailableCoords(totalBoxes);
            // setAvailableBoxes(availableBoxes.concat(totalBoxes));
        }
        console.log(availableBoxes.current)
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
        <Snake
            runningSnake={{ count: runningSnakeCount, setter: setRunningSnakeCount }}
            requiredSnakeCount={requiredSnakeCount}
            context={context}
            canvas={canvas}
            boxSize={boxSize}
            availableCoords={{ coords: coordsAvailable, setter: setAvailableCoords }}
            food={{ count: foodCount, setter: setFoodCount }}
        />
        <Food
            availableCoords={{ coords: coordsAvailable, setter: setAvailableCoords }}
            requiredFoodCount={requiredFoodCount}
            availableBoxes={availableBoxes}
            size={boxSize}
            context={context}
            food={{ count: foodCount, setter: setFoodCount }}
        />
    </>);
}

export { Controller };
