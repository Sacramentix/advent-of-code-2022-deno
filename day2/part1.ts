const input = Deno.readTextFileSync("./input.txt");

type ElfShape = 'A' | 'B' | 'C';

type MyShape  = 'X' | 'Y' | 'Z';

type Round = `${ElfShape} ${MyShape}`;

const strategy= input.split("\r\n") as Round[];

let score = 0;

const ABC:ElfShape[] = ['A','B','C'];
const [A,B,C] = ABC;

const XYZ:MyShape[] = ['X','Y','Z'];
const [X,Y,Z] = XYZ;

const shapeScore:Record<MyShape, number> = {
    'X': 1, 'Y': 2, 'Z': 3,
}

const Win = 6;
const Draw = 3;
const Lose = 0;

const winScore:Record<Round, number> = {
    'A X': Draw,    'B X': Lose,    'C X': Win,
    'A Y':  Win,    'B Y': Draw,    'C Y': Lose,
    'A Z': Lose,    'B Z':  Win,    'C Z': Draw,
};

let roundScore:Record<Round, number> = {} as any;

for (const i of ABC) {
    for (const j of XYZ) {
        const r = i+" "+j as Round;
        roundScore[r] = shapeScore[j]+ winScore[r];
    }
}

strategy.forEach(v=>score+=roundScore[v])

console.log(score);
