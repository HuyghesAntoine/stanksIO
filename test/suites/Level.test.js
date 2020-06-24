'use strict'
const Level = require('../../sources/engine/Level');
const Lead = require ('../../sources/engine/Leaderboard');
// Level tests 
describe('Level test', () => {
    //check if we can add xp to a player
    test('add xp',() => {
        this.level = new Level();
        this.level.addXp(10);
        expect(this.level.xp).toBe(10);
    });
    //check if we can change the levelMult
    test('change mult', () =>{
        this.level = new Level();
        this.level.changeMult(2);
        expect(this.level.mult).toBe(2);
        expect(this.level.levelUp()).toBeFalsy();
    });
    //check if we get xpPoint when we reach a new level
    test ('upgrade',()=>{
        this.level = new Level();
        this.level.addXp(100);
        expect(this.level.xpPoint).toBe(1);
        expect(this.level.levelNumber).toBe(2);
        expect(this.level.xp).toBe(0);
        expect(this.level.xpNeeded).toBe(100*1.1); //check the new xpNeeded
    });
});
