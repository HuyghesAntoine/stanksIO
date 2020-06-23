'use strict'
const Level = require('../../sources/engine/Level');
const Lead = require ('../../sources/engine/Leaderboard');
// Level tests 
describe('Level test', () => {

    test('add xp',() => {
        this.level = new Level();
        this.level.addXp(10);
        expect(this.level.xp).toBe(10);
    });

    test('change mult', () =>{
        this.level = new Level();
        this.level.changeMult(2);
        expect(this.level.mult).toBe(2);
        expect(this.level.levelUp()).toBeFalsy();
    });

    test ('upgrade',()=>{
        this.level = new Level();
        this.level.addXp(100);
        expect(this.level.xpPoint).toBe(1);
        expect(this.level.levelNumber).toBe(2);
        expect(this.level.xp).toBe(0);
        expect(this.level.xpNeeded).toBe(100*1.1);
    });
});
