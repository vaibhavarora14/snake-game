import { useEffect, useRef } from "react";
import { getRandomItem } from "../common/array";

const Snake = (props) => {
    let boxSize = useRef([]);

    const findfirstTimeSnakeCoord = (availableBoxes) => {
        const item = getRandomItem(availableBoxes);
        const endPointOfItem = [item[0] + boxSize.current[0], item[1] + boxSize.current[1]];

        const isBoxMatchingEndPointData = (box) => box[0] === endPointOfItem[0] && box[1] === endPointOfItem[0];
        const endPointInAvailableBoxes = availableBoxes.find(isBoxMatchingEndPointData);

        if (endPointInAvailableBoxes) {
            return item;
        }

        return findfirstTimeSnakeCoord(availableBoxes);
    }

    /**
     * Draw Snake from start, till end
     * @param {HTMLCanvasElement} canvas - will be used to identify where snake can be drawn
     * @param {CanvasRenderingContext2D} context - will be used to draw snake in canvas
     * @param {Array} availableBoxes - will tell the available empty boxes on canvas. helps to know that snake is inside map and not collided with anything
     * @param {Array} lastSnakeCoordinates - will tell the current snakeCoordinates, so that this method can draw successor step of snake coordinates
     */
    const drawSnake = (context, availableBoxes, lastSnakeCoordinates) => {
        if (!lastSnakeCoordinates) {
            context.fillStyle = '#000000';
            const snakeCoordinates = findfirstTimeSnakeCoord(availableBoxes);
            context.fillRect(snakeCoordinates[0], snakeCoordinates[1], boxSize.current[0], boxSize.current[1]);
        }
    }


    useEffect(() => {
        if (props.context && props.size && props.availableBoxes && props.availableBoxes.length > 0) {
            const context = props.context;
            boxSize.current = props.size;

            drawSnake(context, props.availableBoxes);
        }
    }, [drawSnake, props.availableBoxes, props.canvas, props.context, props.size]);
    return '';
}

export { Snake }