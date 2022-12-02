const input = Deno.readTextFileSync("./input.txt");

type ElfShape = 'A' | 'B' | 'C';

type MyShape  = 'X' | 'Y' | 'Z';

type Round = `${ElfShape} ${MyShape}`;

const strategy= input.split("\r\n") as Round[];
let score = 0;

const A = 'A';
const B = 'B';
const C = 'C';

const ABC = [A,B,C];

const X = 'X';
const Y = 'Y';
const Z = 'Z';
const XYZ = [X,Y,Z];

const n = ABC.length*XYZ.length;

const shapeScore:Record<MyShape, number> = {
    'X': 1,
    'Y': 2,
    'Z': 3,
}

const winScore:Record<Round, number> = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,

    'B X': 0,
    'B Y': 3,
    'B Z': 6,

    'C X': 6,
    'C Y': 0,
    'C Z': 3,   
};

const choice:Record<Round, MyShape> = {
    'A X': Z,
    'A Y': X,
    'A Z': Y,

    'B X': X,
    'B Y': Y,
    'B Z': Z,

    'C X': Y,
    'C Y': Z,
    'C Z': X,  
}

let roundScore:Record<Round, number> = {} as any;

for (const i of ABC) {
    for (const j of XYZ) {
        const r = i+" "+j as Round;
        const played = choice[r];
        roundScore[r] = shapeScore[played]+ winScore[(i+" "+played) as Round];
    }
}

strategy.forEach(v=>score+=roundScore[v])

console.log(score);
