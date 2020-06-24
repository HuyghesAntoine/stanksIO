'use strict'
const Masto  = require('../../sources/engine/tank/Masto');
// Tank tests 
describe('Masto test', () => {

  test('pseudo', () => {
    this.tank = new Masto(0, "socketid");
    expect(this.tank.pseudo).toBe("noname");
    this.tank.changePseudo("Monika");
    expect(this.tank.pseudo).toBe("Monika");
  });

  test('deplacement', () => {
    this.tank = new Masto(0, "socketid");
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = 0;
    this.tank.move();//droite
    expect(this.x+1.5).toBe(this.tank.x);
    expect(this.y).toBe(this.tank.y);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = Math.PI/2;
    this.tank.move();//haut
    expect(this.y+1.5).toBe(this.tank.y);
    expect(this.x).toBe(this.tank.x);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = -Math.PI;
    this.tank.move();//gauche
    expect(this.x-1.5).toBe(this.tank.x);
    expect(this.y).toBe(this.tank.y);
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.tank.direction = -Math.PI/2;
    this.tank.move();//bas
    expect(this.y-1.5).toBe(this.tank.y);
    expect(this.x).toBe(this.tank.x);
  });

  test('tir', () => {
    this.tank = new Masto(0, "socketid");
    this.tank.shoot();
    this.tank.gun[0].moveAll();
    this.tank.gun[0].ammos.forEach(ammo =>{ 
      expect(ammo.damage).toBe(this.tank.attack);
      expect(ammo.direction).toBe(this.tank.direction);
      expect(ammo.x).toBe(410);
    });
  });

  test('upgrade', () =>{
    this.tank = new Masto(0, "socketid");
    this.tank.level.xpPoint = 4;

    expect(this.tank.maxHealth).toBe(15);
    this.tank.upgrade(0);
    expect(this.tank.maxHealth).toBe(15+2);

    expect(this.tank.speed).toBe(1.5);
    this.tank.upgrade(1);
    expect(this.tank.speed).toBe(1.5+0.25);

    expect(this.tank.attack).toBe(2);
    this.tank.upgrade(2);
    expect(this.tank.attack).toBe(2+0.15);    
    
    expect(this.tank.attackSpeed).toBe(1500);
    this.tank.upgrade(3);
    expect(this.tank.attackSpeed).toBe(1500*0.95);

    expect(this.tank.attack).toBe(2.15);
    this.tank.upgrade(2);//no more xp point
    expect(this.tank.attack).toBe(2.15);
  });

});

