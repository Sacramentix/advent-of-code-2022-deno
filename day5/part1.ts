const input = Deno.readTextFileSync("./input.txt");

const [__board, _moves] = input.split(/\r?\n\r?\n/);

const _board = __board.split(/\r?\n/);

const boardSize = Number(_board.pop()?.match(/\d+\s*$/)?.[0]);

const board:string[][] = Array.from({length: boardSize},_=>[]);

_board.reverse().forEach(line => {
    for (let i=1,j=0;i<line.length;i+=4, j++) {
        const c = line.substring(i,i+1);
        if (c != " ") board[j].push(c);
    }
})

const moves = _moves.split(/\r?\n/).map(v=>/move (\d+) from (\d+) to (\d+)/.exec(v)??[]).map(([,amount,from,to])=>({amount: Number(amount), from: Number(from)-1, to: Number(to)-1}));

moves.forEach(move => {
    for (let i=0;i<move.amount;i++) {
        board[move.to].push(board[move.from].pop()!)
    }
})

const result = board.reduce((r, a)=>r+(a.pop()??""),"");
console.log(result);
