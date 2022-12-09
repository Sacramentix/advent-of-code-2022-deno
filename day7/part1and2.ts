const input = Deno.readTextFileSync("./input.txt").split(/\r?\n/);


type File = {
    size: number
}
type Dir = {
    size: number,
    content: Map<string, File | Dir>
}

const root:Dir = {
    size: 0,
    content: new Map()
}

let currentPath:string[] = [];

let currentDir:Dir = root;


function command(line:string) {
    if (line.startsWith('$ cd')) {
        const p = line.substring(5);
        if (p == '/') {
            currentPath = [];
            currentDir = root;
        } else if (p == '..') {
            currentPath.pop();
            setCurrentDirFromRoot();
        } else {
            /* There is no case where we go directly to a subfolder ex: '$ cd abc/xyz' */
            /* We trake the assumption there is no errot we can't get a cd to a file */
            currentPath.push(p);
            setCurrentDir(p);
        }
    }
}

function setCurrentDirFromRoot() {
    currentDir = root;
    for (const d of currentPath) {
        const x = currentDir.content.get(d);
        if (x == null || !('content' in x)) return;
        currentDir = x;
    }
}

function setCurrentDir(d:string) {
    const x = currentDir.content.get(d);
    if (x == null || !('content' in x)) return;
    currentDir = x;
}

input.forEach(line => {
    if (line.startsWith('$')) return command(line);
    if (line.startsWith('dir')) {
        const dir = line.substring(4);
        if (!currentDir.content.has(dir)) currentDir.content.set(dir, {size: 0, content: new Map()});
    } else {
        const [sizeS, file] = line.split(" ");
        currentDir.content.set(file, {size: Number(sizeS)});
    }
})

function calcDirSize(dir:Dir) {
    for (const v of dir.content.values()){
        if ('content' in v) dir.size += calcDirSize(v);
        else dir.size += v.size;
    }
    return dir.size;
}

calcDirSize(root);


function sumDirSizeBelow(dir:Dir, t:number) {
    let sum = 0;
    for (const v of dir.content.values()){
        if ('content' in v) {
            if (v.size <= t) sum += v.size;
            sum += sumDirSizeBelow(v, t)
        }
    }
    return sum;
}


function findSmallestDirAbove(dir:Dir, t:number, current = Infinity) {
    for (const v of dir.content.values()){
        if ('content' in v) {
            if (v.size >= t && v.size < current) {
                current = v.size;
            } 
            current = findSmallestDirAbove(v,t,current);
        }
    }
    return current;
}

const dirs:Dir[] = [];

function dirsAdd(dir:Dir) {
    for (const v of dir.content.values()){
        if ('content' in v) {
            dirsAdd(v);
        }
    } 
    dirs.push(dir);
}

dirsAdd(root);
dirs.sort((a, b) => a.size-b.size)

console.log(sumDirSizeBelow(root, 100_000));
console.log(findSmallestDirAbove(root, 30_000_000-(70_000_000-root.size)));
