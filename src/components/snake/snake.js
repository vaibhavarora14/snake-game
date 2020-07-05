import { useEffect, useRef } from "react";
import { getRandomItem } from "../common/array";

const SNAKE_SPEED = 100;

const findfirstTimeSnakeCoord = (availableBoxes, boxSize) => {
    const item = getRandomItem(availableBoxes);
    const endPointOfItem = [item[0] + boxSize[0], item[1] + boxSize[1]];

    const isBoxMatchingEndPointData = (box) => box[0] === endPointOfItem[0] && box[1] === endPointOfItem[0];
    const endPointInAvailableBoxes = availableBoxes.find(isBoxMatchingEndPointData);

    if (endPointInAvailableBoxes) {
        return item;
    }

    return findfirstTimeSnakeCoord(availableBoxes);
}

/**
 * Draw Snake from start, till end
 */
const drawSnake = ({ context, availableBoxes, boxSize, lastSnakeCoordinates, direction }) => {
    context.fillStyle = '#000000';

    if (!lastSnakeCoordinates) {
        const snakeCoordinates = findfirstTimeSnakeCoord(availableBoxes, boxSize);
        lastSnakeCoordinates = snakeCoordinates;
        context.fillRect(snakeCoordinates[0], snakeCoordinates[1], boxSize[0], boxSize[1]);
    }
    else {
        debugger;
        switch (direction.current) {
            case "left": {
                context.fillRect(
                    lastSnakeCoordinates[0] - boxSize[0],
                    lastSnakeCoordinates[1],
                    boxSize[0],
                    boxSize[1]
                );
                lastSnakeCoordinates[0] = lastSnakeCoordinates[0] - boxSize[0];
                break;
            }
            case "right": {
                context.fillRect(
                    lastSnakeCoordinates[0] + boxSize[0],
                    lastSnakeCoordinates[1],
                    boxSize[0],
                    boxSize[1]
                );
                lastSnakeCoordinates[0] = lastSnakeCoordinates[0] + boxSize[0];
                break;
            }
            case "down": {
                context.fillRect(
                    lastSnakeCoordinates[0],
                    lastSnakeCoordinates[1] + boxSize[1],
                    boxSize[0],
                    boxSize[1]
                );
                lastSnakeCoordinates[1] = lastSnakeCoordinates[1] + boxSize[1];
                break;
            }
            case "up": {
                context.fillRect(
                    lastSnakeCoordinates[0],
                    lastSnakeCoordinates[1] - boxSize[1],
                    boxSize[0],
                    boxSize[1]
                );
                lastSnakeCoordinates[1] = lastSnakeCoordinates[1] - boxSize[1];
                break;
            }
            default: {
                // do nothing
            }
        }
    }

    setTimeout(() => {
        requestAnimationFrame(() => {
            drawSnake({ context, availableBoxes, boxSize, direction, lastSnakeCoordinates })
        })
    }, SNAKE_SPEED);
}

const Snake = (props) => {
    const direction = useRef('right');

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft': {
                    direction.current = 'left';
                    break;
                }
                case 'ArrowDown': {
                    direction.current = 'down';
                    break;
                }
                case 'ArrowRight': {
                    direction.current = 'right';
                    break;
                }
                case 'ArrowUp': {
                    direction.current = 'up';
                    break;
                }
                default: {
                    // do nothing
                }
            }
        });
        return () => document.removeEventListener('keydown');
    }, [direction]);

    useEffect(() => {
        if (!props.context) {
            return;
        }

        const availableCoords = props.availableCoords.coords;

        if (availableCoords.length === 0 || props.boxSize.length === 0) {
            return;
        }

        if (props.requiredSnakeCount === props.runningSnake.count) {
            return;
        }

        drawSnake({
            context: props.context,
            availableBoxes: availableCoords,
            boxSize: props.boxSize,
            direction
        });
    }, [props.availableCoords.coords, props.boxSize, props.context, props.requiredSnakeCount, props.runningSnake.count]);
    return '';
}

export { Snake };
