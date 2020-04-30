//Simplifies a date such as "2019-11-4" to 2019
export default function intrinio_simpleDate(date) {
    if (date) {
        return date.substring(0, 10)
    }
}