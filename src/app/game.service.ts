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
    // TODO: update the game state
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
}

