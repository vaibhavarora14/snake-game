import { useEffect } from "react";
import { getRandomItem } from '../common/array';
import apple from './apple.svg';
import citrus from './citrus.svg';
import kiwi from './kiwi.svg';
import mushroom from './mushroom.svg';
import peach from './peach.svg';
import raspberry from './raspberry.svg';
import watermelon from './watermelon.svg';

const foodItems = [apple, citrus, kiwi, mushroom, peach, raspberry, watermelon];

const Food = (props) => {
    const context = props.context;
    const availableBoxes = props.availableBoxes;

    const requiredFoodCount = props.requiredFoodCount;
    useEffect(() => {
        if (props.availableCoords.coords && props.availableCoords.coords.length === 0) {
            return;
        }

        if (requiredFoodCount.current !== props.food.count) {
            const randomBox = getRandomItem(props.availableCoords.coords);
            draw(randomBox, context);
            props.food.setter(props.food.count++);
        }
    }, [props.availableCoords, context, props.food, requiredFoodCount, availableBoxes]);

    const draw = (coords, context) => {
        function drawImage() {
            context.drawImage(this, (coords[0] + 1), (coords[1] + 1), 13, 13);
        };
        const image = new Image(10, 10);
        image.onload = drawImage;
        image.src = getRandomItem(foodItems);
    }

    return '';
};

export { Food };
