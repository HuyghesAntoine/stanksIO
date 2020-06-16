'use strict'
const Tank  = require('../../sources/engine/Tank');

describe('Tank test', () => {

  test('deplacement', () => {
    this.tank = new Tank("Monika");
    expect(this.tank.id).toBe("Monika");
    this.tank.move(Math.PI /2);//haut-gauche
  });

  test('tir', () => {
    this.tank = new Tank("monika");
    this.tank.shoot();
    this.tank.gun.moveAll();
    this.tank.gun.ammos.forEach(ammo =>{ 
      expect(ammo.damage).toBe(this.tank.attack);
      expect(ammo.direction).toBe(this.tank.direction);
      expect(ammo.x).toBe(410);
    });
  });

});

