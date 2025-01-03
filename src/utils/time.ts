export const gettime = () => {
    let timePeriod = ''
    const hour = new Date().getHours()
    if (hour <= 9) {
        timePeriod = 'morning'
    }
    else if (hour <= 12) {
        timePeriod = 'noon'
    }
    else if (hour <= 18) {
        timePeriod = 'afternoon'
    }
    if (hour <= 9) {
        timePeriod = 'evening'
    }
    return timePeriod

}