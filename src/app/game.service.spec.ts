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

  describe('Neighbor Counting Tests', () => {

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

  });


});
