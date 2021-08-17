import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

function verifyGrid(expectedGrid: string[][]) {

}

describe('GameService Tests', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('creates a fixed grid', () => {
    service.createGrid(10,12);

    expect(service.columns).toBe(10);
    expect(service.rows).toBe(12);
    expect(service.grid.length).toBe(12);
    expect(service.grid[0].length).toBe(10);
  });

  it('counts neighbors', () => {
    service.setGrid([
      "X...",
      "XX..",
      "XXX.",
      "XXXX",
      "XXXX"
    ]);

    expect(service.neighborsFor(1,1)).toBe(5);
    expect(service.neighborsFor(0,1)).toBe(4);
    expect(service.neighborsFor(0,0)).toBe(2);
    expect(service.neighborsFor(3,4)).toBe(3);
  });

  it('kills live cells with fewer than two live neighbours from starvation', () => {
    expect(service.nextState('X', 0)).toBe('.');
    expect(service.nextState('X', 1)).toBe('.');
  });

  it('allows live cells with two or three live neighbors to survive', () => {
    expect(service.nextState('X', 2)).toBe('X');
    expect(service.nextState('X', 3)).toBe('X');
  });

  it('kills live cells with more than three live neighbours from overpopulation', () => {
    expect(service.nextState('X', 4)).toBe('.');
    expect(service.nextState('X', 5)).toBe('.');
  });

  it('generates a live cell from a dead cell with three neighbors', () => {
    expect(service.nextState('.', 3)).toBe('X');
  });

  it('ensures dead cells without three neighbors stays dead', () => {
    expect(service.nextState('.', 2)).toBe('.');
    expect(service.nextState('.', 4)).toBe('.');
  });

});
