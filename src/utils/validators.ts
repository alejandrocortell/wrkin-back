export const trim = (text) => {
    return text.trim()
}

export const isString = (text) => {
    return typeof text === 'string' ? true : false
}

export const isNumber = (number) => {
    return typeof number === 'number' ? true : false
}

export const isDate = (date) => {
    const a = new Date(date)
    return a.getTime() === a.getTime()
}

export const isBoolean = (bool) => {
    return typeof bool === 'boolean' ? true : false
}
