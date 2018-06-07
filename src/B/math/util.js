export const min = (list = []) => {
    return parseFLoat(Math.min(...list));
}

export const max = (list = []) => {
    return parseFloat(Math.max(...list));
}


export const normalise = (list = []) => {
    const M = max(list);
    const m = min(list);

    return list.map((value) => parseFloat((value - m)/(M - m)));
}
