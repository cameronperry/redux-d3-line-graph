export function changeMetric(value) {
    return {
        type: 'CHANGE_METRIC',
        value: value
    };
}

export function changeQuarter(value) {
    return {
        type: 'CHANGE_QUARTER',
        value: value
    };
}
