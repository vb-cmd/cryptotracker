export const humanReadable = (value) => {
    const num = parseFloat(value)

    if (isNaN(num) || num === null) {
        return '¯\\_(ツ)_/¯'
    } else if (num === 0) {
        return '0';
    } else if (num < 1 && num > -1) {
        return num.toFixed(8).toString();
    } else {
        return num.toFixed(2).toString();
    }
}