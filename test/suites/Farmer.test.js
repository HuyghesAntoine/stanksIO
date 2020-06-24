'use strict'
const Farmer  = require('../../sources/engine/tank/Farmer');
// Tank tests 
describe('Farmer test', () => {
  //Test change Pseudo

  test('pseudo', () => {
    this.tank = new Farmer(0, "socketid");
    this.tank.changePseudo("Monika");
    expect(this.tank.pseudo).toBe("Monika");
  });

  test('move', () => {
    this.tank = new Farmer(0, "socketid");
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = 0;
    this.tank.move();//try to move on the right
    expect(this.x+2).toBe(this.tank.x);
    expect(this.y).toBe(this.tank.y);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = Math.PI/2;
    this.tank.move();//try to move up
    expect(this.y+2).toBe(this.tank.y);
    expect(this.x).toBe(this.tank.x);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = -Math.PI;
    this.tank.move();//try to move on the left
    expect(this.x-2).toBe(this.tank.x);
    expect(this.y).toBe(this.tank.y);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = -Math.PI/2;
    this.tank.move();//try to move down
    expect(this.y-2).toBe(this.tank.y);
    expect(this.x).toBe(this.tank.x);
  });
// check if ammo as the right damage/direction/position
  test('shoot', () => {
    this.tank = new Farmer(0, "socketid");
    this.tank.shoot();
    this.tank.gun[0].moveAll();
    this.tank.gun[0].ammos.forEach(ammo =>{ 
      expect(ammo.damage).toBe(this.tank.attack);
      expect(ammo.direction).toBe(this.tank.direction);
      expect(ammo.x).toBe(410);
    });
  });
// check upgrade on levelMult/speed/attack/attackspeed
  test('upgrade', () =>{
    this.tank = new Farmer(0, "socketid");
    this.tank.level.xpPoint = 4;

    expect(this.tank.level.mult).toBe(1.5);
    this.tank.upgrade(0);
    expect(this.tank.level.mult).toBe(1.5*1.1);

    expect(this.tank.speed).toBe(2);
    this.tank.upgrade(1);
    expect(this.tank.speed).toBe(2+0.15);

    expect(this.tank.attack).toBe(1);
    this.tank.upgrade(2);
    expect(this.tank.attack).toBe(1+0.15);    
    
    expect(this.tank.attackSpeed).toBe(1000);
    this.tank.upgrade(3);
    expect(this.tank.attackSpeed).toBe(1000*0.95);

    expect(this.tank.attack).toBe(1.15);
    this.tank.upgrade(3);//no more xp point
    expect(this.tank.attack).toBe(1.15);
  });

});

