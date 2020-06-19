'use strict'
const Tank  = require('../../sources/engine/Tank');

describe('Tank test', () => {

  test('pseudo', () => {
    this.tank = new Tank(0, "socketid");
    expect(this.tank.pseudo).toBe("noname");
    this.tank.changePseudo("Monika");
    expect(this.tank.pseudo).toBe("Monika");
  });

  test('deplacement', () => {
    this.tank = new Tank(0, "socketid");
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.move(Math.PI);//haut-gauche
    console.log(this.tank.x + "  " +this.x);
  });

  test('tir', () => {
    this.tank = new Tank(0, "socketid");
    this.tank.shoot();
    this.tank.gun.moveAll();
    this.tank.gun.ammos.forEach(ammo =>{ 
      expect(ammo.damage).toBe(this.tank.attack);
      expect(ammo.direction).toBe(this.tank.direction);
      expect(ammo.x).toBe(410);
    });
  });

  test('upgrade', () =>{
    this.tank = new Tank(0, "socketid");
    expect(this.tank.healthMax).toBe(3);
    expect(this.tank.attack).toBe(1);
    expect(this.tank.speed).toBe(5);
    expect(this.tank.attackSpeed).toBe(1000);
    expect(this.tank.score).toBe(0);
  });

});

