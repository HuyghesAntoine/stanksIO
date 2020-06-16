'use strict'
const Tank  = require('../../sources/engine/Tank');

describe('Tank test', () => {

  test('deplacement', () => {
    this.tank = new Tank("Monika");
    expect(this.tank.name).toBe("Monika");
    this.tank.move(1);//haut-gauche
    expect(this.tank.x).toBe(410);
    expect(this.tank.y).toBe(410);
    this.tank.move(0);//gauche
    expect(this.tank.x).toBe(420);
  });

  test('tir', () => {
    this.tank = new Tank("monika");
    this.tir = this.tank.shoot();
    expect(this.tir.damage).toBe(this.tank.attack);
    expect(this.tir.direction).toBe(this.tank.direction);
  })

});

