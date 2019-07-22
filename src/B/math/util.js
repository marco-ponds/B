export const min = (list = []) => {
    return parseFloat(Math.min(...list));
}

export const max = (list = []) => {
    return parseFloat(Math.max(...list));
}

export const maxIndex = (list = []) => {
    let max = 0;
    let index = 0;

    list.forEach((el, i) => {
        if (el > max) {
            max = el;
            index = i;
        }
    });

    return { max, index };
}

export const normalise = (list = []) => {
    const M = max(list);
    const m = min(list);

    return list.map((value) => parseFloat((value - m)/(M - m)));
}
