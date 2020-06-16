'use strict'
const Tank  = require('../../sources/engine/Tank');

describe('Tank test', () => {

  test('deplacement', () => {
    this.tank = new Tank("Monika");
    expect(this.tank.name).toBe("Monika");
    this.tank.move(1);//haut-gauche
    expect(this.tank.x).toBe(401);
    expect(this.tank.y).toBe(401);
    this.tank.move(0);//gauche
    expect(this.tank.x).toBe(402);
  });

});

