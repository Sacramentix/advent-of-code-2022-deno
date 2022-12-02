const input = Deno.readTextFileSync("input.txt");

const a = input.split("\r\n\r\n");
const maxSize = 3;
let max = new Array(maxSize).fill(0);
const addToMax3 = (n:number) => {
    for (var i=maxSize-1;i>-1;i--) {
        if (max[i]>n) break;
    }
    max.splice(i+1, 0, n);
    max.splice(3);
};
a.forEach(b => addToMax3( b.split("\r\n").reduce<number>( (n,c)=>n+Number(c),0 ) ) )

console.log(max);
console.log(max.reduce((n,x)=>n+x,0));