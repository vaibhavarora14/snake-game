const getRandomItem = (list) => {
    if (!Array.isArray(list)) {
        return;
    }

    if (list.length < 2) {
        return list[0];
    }

    const randomIndex = Math.random() * list.length;
    const absoluteIndex = Math.floor(randomIndex);

    return list[absoluteIndex];
}

export {
    getRandomItem
}