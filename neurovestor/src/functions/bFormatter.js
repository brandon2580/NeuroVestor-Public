//Simplifies numbers in the billions to something like $12.53B
export default function bFormatter(num) {
    return Math.abs(num) > 999999999 ? Math.sign(num) * ((Math.abs(num) / 1000000000).toFixed(2)) + 'B' : Math.sign(num) * Math.abs(num)
}