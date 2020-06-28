import { useEffect } from 'react';
import is from 'is';

const getEqualParitionsLength = (totalLengthOfRow) => {
    const averageBoxSize = 15;
    let size = averageBoxSize;
    let totalPartitions = totalLengthOfRow / averageBoxSize;

    if (is.decimal(totalPartitions)) {
        size = Math.floor(totalLengthOfRow / Math.floor(totalPartitions));
    }

    return size;
};

const calculateBoxSize = (width, height) => {
    const boxWidth = getEqualParitionsLength(width);
    const boxHeight = getEqualParitionsLength(height);

    return [boxWidth, boxHeight - 5];
};

const fillCanvasWithBoxes = (canvas, boxSize, context) => {
    const colors = ['#d9fad7', '#d2f5d0'];
    let yAxis = 0;
    let rowsCount = Math.floor(canvas.clientHeight / boxSize[1]);

    while (rowsCount > 0) {
        let columnsCount = canvas.clientWidth / boxSize[0];
        let nextColor = (rowsCount % 2 === 0) ? colors[0] : colors[1];
        let xAxis = 0;
        while (columnsCount > 0) {
            context.fillStyle = nextColor;
            context.fillRect(xAxis, yAxis, boxSize[0], boxSize[1]);

            xAxis += boxSize[0];
            nextColor = nextColor === colors[0] ? colors[1] : colors[0];
            columnsCount--;
        }
        yAxis += boxSize[1];
        rowsCount -= 1;
    }
}

const Board = (props) => {
    useEffect(() => {
        if (props.canvas.current && props.context) {
            const canvas = props.canvas.current;
            const boxSize = calculateBoxSize(canvas.clientWidth, canvas.clientHeight);

            fillCanvasWithBoxes(canvas, boxSize, props.context);

            props.getBoxSize.call(undefined, boxSize);
        }
    })
    return '';
}

export { Board }