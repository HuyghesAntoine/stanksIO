'use strict'
const Hunter  = require('../../sources/engine/tank/Hunter');
// Tank tests 
describe('Hunter test', () => {
  //Test change Pseudo
  test('pseudo', () => {
    this.tank = new Hunter(0, "socketid");
    this.tank.changePseudo("Monika");
    expect(this.tank.pseudo).toBe("Monika");
  });

  test('move', () => {
    this.tank = new Hunter(0, "socketid");
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = 0;
    this.tank.move();//try to move on the right
    expect(this.x+3).toBe(this.tank.x);
    expect(this.y).toBe(this.tank.y);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = Math.PI/2;
    this.tank.move();//try to move up
    expect(this.y+3).toBe(this.tank.y);
    expect(this.x).toBe(this.tank.x);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = -Math.PI;
    this.tank.move();//try to move on the left
    expect(this.x-3).toBe(this.tank.x);
    expect(this.y).toBe(this.tank.y);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = -Math.PI/2;
    this.tank.move();//try to move down
    expect(this.y-3).toBe(this.tank.y);
    expect(this.x).toBe(this.tank.x);
  });
// check if ammo as the right damage/direction/position
  test('shoot', () => {
    this.tank = new Hunter(0, "socketid");
    this.tank.shoot();
    this.tank.gun[0].moveAll();
    this.tank.gun[0].ammos.forEach(ammo =>{ 
      expect(ammo.damage).toBe(this.tank.attack);
      expect(ammo.direction).toBe(this.tank.direction);
      expect(ammo.x).toBe(410);
    });
  });
// check upgrade on attack/attackSpeed/speed/bulletSize
  test('upgrade', () =>{
    this.tank = new Hunter(0, "socketid");
    this.tank.level.xpPoint = 4;

    expect(this.tank.attack).toBe(1);
    this.tank.upgrade(0);
    expect(this.tank.attack).toBe(1+0.15);

    expect(this.tank.attackSpeed).toBe(850);
    this.tank.upgrade(1);
    expect(this.tank.attackSpeed).toBe(850*0.95);

    expect(this.tank.speed).toBe(3);
    this.tank.upgrade(2);
    expect(this.tank.speed).toBe(3+0.15);    
    
    expect(this.tank.bulletSize).toBe(6);
    this.tank.upgrade(3);
    expect(this.tank.bulletSize).toBe(6+0.5);

    expect(this.tank.bulletSize).toBe(6.5);
    this.tank.upgrade(3);//plus de point d'xp
    expect(this.tank.bulletSize).toBe(6.5);
  });

});

