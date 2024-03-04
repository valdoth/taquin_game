"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var CONST;
(function (CONST) {
    CONST[CONST["ZERO"] = 0] = "ZERO";
})(CONST || (CONST = {}));
var ACTION = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
];
var FINAL_STATE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];
var CURRENT_STATE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 0, 8],
];
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.AfficheMatrix = function (M) {
        for (var i = 0; i < M.length; i++) {
            var row = "";
            for (var j = 0; j < M[i].length; j++) {
                row += M[i][j] + " ";
            }
            console.log(row.trim());
        }
    };
    return Utils;
}());
var Taquin = /** @class */ (function () {
    function Taquin(grid, finalState, actions) {
        this.bestPath = [];
        this.Cost = Infinity;
        this.grid = grid;
        this.taille = grid.length;
        this.actions = actions;
        this.finalState = finalState;
        this.isSoluble(this.grid);
    }
    Taquin.prototype.isCanMove = function (positon) {
        if ((positon.x >= 0 && positon.x < this.taille) && (positon.y >= 0 && positon.y < this.taille)) {
            return true;
        }
        else {
            return false;
        }
    };
    Taquin.prototype.isSoluble = function (state) {
        var stateFlatten = state.flat();
        for (var i = 0; i < stateFlatten.length; i++) {
            for (var j = i; j < stateFlatten.length; j++) {
            }
        }
        return true;
    };
    Taquin.prototype.getNeighbors = function (state) {
        var positionZero = this.getPositionZero(state);
        var neighbors = [];
        for (var _i = 0, _a = this.actions; _i < _a.length; _i++) {
            var action = _a[_i];
            var nextPosition = {
                x: positionZero.x + action.x,
                y: positionZero.y + action.y
            };
            if (this.isCanMove(nextPosition)) {
                var currentState = state.map(function (s) { return s.slice(); });
                var temp = currentState[nextPosition.x][nextPosition.y];
                currentState[nextPosition.x][nextPosition.y] = currentState[positionZero.x][positionZero.y];
                currentState[positionZero.x][positionZero.y] = temp;
                neighbors.push(currentState);
            }
        }
        return neighbors;
    };
    Taquin.prototype.getPositionZero = function (state) {
        for (var i = 0; i < this.taille; i++) {
            var j = state[i].indexOf(CONST.ZERO);
            if (state[i].indexOf(CONST.ZERO) != -1) {
                return {
                    x: i,
                    y: j
                };
            }
        }
        return { x: 0, y: 0 };
    };
    ;
    Taquin.prototype.BFS = function () {
        var queue = [{ vertice: this.grid, path: [JSON.stringify(this.grid)] }];
        var visited = new Set();
        visited.add(JSON.stringify(this.grid));
        while (queue.length) {
            var _a = queue.shift(), vertice = _a.vertice, path = _a.path;
            if (JSON.stringify(vertice) == JSON.stringify(this.finalState)) {
                console.log(path.length);
                if (this.Cost > path.length) {
                    this.Cost = path.length;
                    this.bestPath = path;
                    return;
                }
            }
            var neighbors = this.getNeighbors(vertice);
            for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
                var neighbor = neighbors_1[_i];
                if (!visited.has(JSON.stringify(neighbor))) {
                    queue.push({ vertice: neighbor, path: __spreadArray(__spreadArray([], path, true), [JSON.stringify(neighbor)], false) });
                    visited.add(JSON.stringify(neighbor));
                }
            }
        }
    };
    return Taquin;
}());
var taquin = new Taquin(CURRENT_STATE, FINAL_STATE, ACTION);
taquin.BFS();
console.log(taquin);
console.log(taquin.bestPath);
