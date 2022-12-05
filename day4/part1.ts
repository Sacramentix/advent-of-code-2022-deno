const input = Deno.readTextFileSync("./input.txt");

const sacks = input.split(/\r?\n/);

let score = 0;

sacks.forEach(sack=>{
    const [min1, max1, min2, max2] = sack.split(/[,-]/).map(v=>Number(v));
    ( (min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2) ) && score++;
})

console.log(score);
