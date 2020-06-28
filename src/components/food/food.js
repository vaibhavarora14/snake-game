import { useEffect } from "react";
import apple from './icons8-apple.svg';

const Food = (props) => {
    useEffect(() => {
        const context = props.context;
        const availableBoxes = props.availableBoxes;

        if (props.canvas.current && context && availableBoxes.length > 0) {
            const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            console.log(randomBox);
            drawFood(randomBox, context, props.canvas.current);
        }
    })

    const drawFood = (coords, context, canvas) => {
        function drawImage() {
            context.drawImage(this, (coords[0] - 15 + 1), (coords[1] + 1), 12, 8);
        };
        const image = new Image(10, 10);
        image.onload = drawImage;
        image.src = apple;

    }

    return '';
};

export { Food }