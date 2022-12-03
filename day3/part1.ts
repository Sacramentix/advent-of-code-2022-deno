const input = Deno.readTextFileSync("./input.txt");

const sacks = input.split(/\r?\n/);

let score = 0;

sacks.forEach(sack=>{
    const m:Record<number, true> = {};
    for (let i=0;i<sack.length/2;i++) {
        m[sack.charCodeAt(i)] = true;
    }
    for (let j=sack.length/2;j<sack.length;j++) {
        const t = sack.charCodeAt(j);
        if (m[t]) {
            delete m[t];
            // the charcode of A is 65 & a is 97
            // by subtracting 96 we can have all
            // lowercase letter have the correct priority
            // all uppercase letter will be have negative priority
            // but we can fix this by adding 58;
            const n = t-96
            score+= n<0 ? n+58 : n;
        }
    }
})

console.log(score);
