export interface Positon {
    x: number;
    y: number;
}

enum CONST {
  ZERO = 0,
}
type Matrix = number[][]
type Vector = number[]
const ACTION: Positon[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]
const FINAL_STATE: Matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
]
const CURRENT_STATE: Matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 0, 8],
]
type QUEUE = {
  vertice: Matrix
  path: string[]
}

class Utils {
    constructor() {
        
    }
    AfficheMatrix(M : Matrix){
        for (let i = 0; i < M.length; i++) {
            let row = "";
            for (let j = 0; j < M[i].length; j++) {
                row += M[i][j] + " ";
            }
            console.log(row.trim());
        }
    }
}

class Taquin {
    grid: Matrix
    taille: number
    actions: Positon[]
    finalState: Matrix;
    bestPath: string[] = [];
    Cost: number = Infinity;
    constructor(grid: Matrix, finalState: Matrix, actions: Positon[]) {
        this.grid = grid;
        this.taille = grid.length;
        this.actions = actions;
        this.finalState = finalState;
        this.isSoluble(this.grid);
    }
    private isCanMove(positon: Positon): boolean {
        if ((positon.x >= 0 && positon.x < this.taille) && (positon.y >= 0 && positon.y < this.taille)) {
            return true;
        } else {
            return false;
        }
    }
    private isSoluble(state: Matrix): boolean {
        const stateFlatten : Vector = state.flat();
        for(let i=0;i<stateFlatten.length;i++){
            for(let j=i;j<stateFlatten.length;j++){
                
            }
        }
        return true
    }
    public getNeighbors(state: Matrix): Matrix[] {
        let positionZero: Positon = this.getPositionZero(state);
        let neighbors: Matrix[] = [];
        for (const action of this.actions) {
            const nextPosition: Positon = {
                x: positionZero.x + action.x,
                y: positionZero.y + action.y
            }
            if (this.isCanMove(nextPosition)) {
                const currentState: Matrix = state.map(s => s.slice());
                const temp = currentState[nextPosition.x][nextPosition.y];
                currentState[nextPosition.x][nextPosition.y] = currentState[positionZero.x][positionZero.y];
                currentState[positionZero.x][positionZero.y] = temp;
                neighbors.push(currentState)
            }
        }
        return neighbors;
    }
    private getPositionZero(state: Matrix): Positon {
        for (let i = 0; i < this.taille; i++) {
            const j = state[i].indexOf(CONST.ZERO);
            if (state[i].indexOf(CONST.ZERO) != -1) {
                return {
                    x: i,
                    y: j
                }
            }
        }
        return { x: 0, y: 0 };
    };
    public BFS() {
        const queue: QUEUE[] = [{ vertice: this.grid, path: [JSON.stringify(this.grid)] }];
        const visited = new Set<string>();
        visited.add(JSON.stringify(this.grid));
        while (queue.length) {
            const { vertice, path } = queue.shift() as QUEUE;
            if (JSON.stringify(vertice) == JSON.stringify(this.finalState)) {
                console.log(path.length);
                if (this.Cost > path.length) {
                    this.Cost = path.length;
                    this.bestPath = path;
                    return
                }
            }
            const neighbors = this.getNeighbors(vertice);
            for (const neighbor of neighbors) {
                if (!visited.has(JSON.stringify(neighbor))) {
                    queue.push(
                        { vertice: neighbor, path: [...path, JSON.stringify(neighbor)] }
                    )
                    visited.add(JSON.stringify(neighbor));
                }
            }
        }
    }
}

const taquin = new Taquin(CURRENT_STATE, FINAL_STATE, ACTION);
taquin.BFS();
console.log(taquin)
console.log(taquin.bestPath);
