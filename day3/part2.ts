const input = Deno.readTextFileSync("./input.txt");

const sacks = input.split(/\r?\n/);

let score = 0;
let m:Record<number, number> = {};
let o = 0;

function getTriple() {
    // Find the 'letter' entries carried by all elf ( see below for explanation )
    const kv = Object.entries(m).find(([k,v])=>v===0b111);
    if (kv != null)  {
        const n = Number(kv[0]) - 96;
        score+= n<0 ? n+58 : n;
        m = {};
    }
}

sacks.forEach(sack=>{
    const k = o%3;
    if (k==0) getTriple();
    for (const s of sack) {
        const t = s.charCodeAt(0);
        /**
         * HERE
         * We set bit of m[t] (which tell the occurence of letter of charcode t in sack)
         * The bit set depend on k which vary between 0 & 2 ( it correspond to the position of the elf in his group)
         * When all 3 elf of a group have a 'letter' m[t] should be set to binary 0b111 which is 7 in decimal 
         */
        m[t] = (m[t] ?? 0)  | (1 << k);
    }
    o++;
});
// We need to check the last group 
getTriple();

console.log(score);
