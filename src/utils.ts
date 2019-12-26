export function shuffle<T>(array: T[]): T[] {
    let index, temp;

    for (let i = array.length - 1; i > 0; i--) {
        index = Math.floor(Math.random() * i);
        temp = array[i];
        array[i] = array[index];
        array[index] = temp;
    }

    return array;
}
