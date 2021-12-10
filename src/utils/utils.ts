export const randomNumber = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export const generateBirthday = () => {
    const year = randomNumber(2000, 1950)
    const month = randomNumber(0, 11)
    const day = randomNumber(0, 31)
    const date = new Date(year, month, day)
    return date.toJSON()
}

export const generatePunchIn = (day: Date) => {
    const date = day
    const option = randomNumber(0, 3)
    switch (option) {
        case 0:
            let start = date.setHours(8, 0, 56)
            let end = date.setHours(16, 5, 45)
            return [[start, end]]
            break
        case 1:
            let start1o0 = date.setHours(6, 50, 26)
            let end1o0 = date.setHours(10, 51, 45)
            let start1o1 = date.setHours(11, 30, 56)
            let end1o1 = date.setHours(13, 5, 45)
            let start1o2 = date.setHours(15, 0, 56)
            let end1o2 = date.setHours(17, 5, 45)

            return [
                [start1o0, end1o0],
                [start1o1, end1o1],
                [start1o2, end1o2],
            ]
            break

        case 2:
            let start2o0 = date.setHours(6, 50, 26)
            let end2o0 = date.setHours(10, 51, 45)
            let start2o1 = date.setHours(11, 30, 56)
            let end2o1 = date.setHours(13, 5, 45)
            let start2o2 = date.setHours(15, 0, 56)
            let end2o2 = date.setHours(17, 5, 45)
            let start2o3 = date.setHours(17, 30, 56)
            let end2o3 = date.setHours(18, 0, 10)

            return [
                [start2o0, end2o0],
                [start2o1, end2o1],
                [start2o2, end2o2],
                [start2o3, end2o3],
            ]
            break

        case 3:
            let start3o0 = date.setHours(7, 58, 26)
            let end3o0 = date.setHours(14, 2, 45)
            let start3o1 = date.setHours(15, 0, 56)
            let end3o1 = date.setHours(17, 5, 45)

            return [
                [start3o0, end3o0],
                [start3o1, end3o1],
            ]
            break
        default:
            break
    }
}
