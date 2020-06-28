import { useEffect } from "react";
import apple from './apple.svg';
import citrus from './citrus.svg';
import kiwi from './kiwi.svg';
import mushroom from './mushroom.svg';
import peach from './peach.svg';
import raspberry from './raspberry.svg';
import watermelon from './watermelon.svg';
import { getRandomItem } from '../common/array';

const foodItems = [apple, citrus, kiwi, mushroom, peach, raspberry, watermelon];

const Food = (props) => {
    useEffect(() => {
        const context = props.context;
        const availableBoxes = props.availableBoxes;

        if (props.canvas.current && context && availableBoxes.length > 0) {
            const randomBox = getRandomItem(availableBoxes);
            drawFood(randomBox, context, props.canvas.current);
        }
    })

    const drawFood = (coords, context, canvas) => {
        function drawImage() {
            context.drawImage(this, (coords[0] + 1), (coords[1] + 1), 13, 13);
        };
        const image = new Image(10, 10);
        image.onload = drawImage;
        image.src = getRandomItem(foodItems);

    }

    return '';
};

export { Food }