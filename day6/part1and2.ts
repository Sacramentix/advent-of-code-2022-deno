const input = Deno.readTextFileSync("./input.txt");

const part1Marker = 4;
const part2Marker = 14;

for (let i=part1Marker,c=input.substring(i-part1Marker,i);i<input.length;i+=1,c=input.substring(i-part1Marker,i)) {
    if (new Set(c.split('')).size == c.length) {
        console.log("part 1: ", c, i);
        break;
    }
}

for (let i=part2Marker,c=input.substring(i-part2Marker,i);i<input.length;i+=1,c=input.substring(i-part2Marker,i)) {
    if (new Set(c.split('')).size == c.length) {
        console.log("part 2: ", c, i);
        break;
    }
}
