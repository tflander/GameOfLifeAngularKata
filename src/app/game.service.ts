import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  columns: number;
  rows: number;
  grid: string[];

  constructor() {
    this.columns = 0;
    this.rows = 0;
    this.grid = [];
  }

  tick() {
    let updatedGrid = [];
    for(let r = 0; r < this.rows; ++r) {
      let row = "";
      for (let c = 0; c < this.columns; ++c) {
        let cell = this.grid[r][c];
        let n = this.neighborsFor(c,r);
        let newstate = this.nextState(cell, n);
        row += newstate;
      }
      updatedGrid.push(row);
    }
    this.grid = updatedGrid;
  }

  createGrid(columns: number, rows: number) {
    this.columns = columns;
    this.rows = rows;

    for(let r = 0; r < rows; ++r) {
      let row = "";
      for (let c = 0; c < columns; ++c) {
        if(Math.random() < 0.5)
          row += ".";
        else
          row += "X";
      }
      this.grid.push(row);
    }
  }

  setGrid(gridState: string[]) {
    this.columns = gridState[0].length;
    this.rows = gridState.length;

    for(let r = 0; r < this.rows; ++r) {
      let row = "";
      for (let c = 0; c < this.columns; ++c) {
        row += gridState[r][c];
      }
      this.grid.push(row);
    }
  }

  neighborsFor(column: number, row: number) {
    let neighborCount = 0;
    for (let c = column - 1; c <= column + 1; ++c) {
      for (let r = row - 1; r <= row + 1; ++r) {
        if(r >= 0 && r < this.rows) {
          if (this.grid[r][c] == 'X') {
            if (c != column || r != row)
              ++neighborCount;
          }
        }
      }
    }
    return neighborCount;
  }

  nextState(currentState: string, neighbors: number) {
    if(currentState == '.')  {
      if(neighbors == 3) return 'X'
    } else {
      if (neighbors == 2 || neighbors == 3)
        return 'X';
    }
    return '.';
  }
}

