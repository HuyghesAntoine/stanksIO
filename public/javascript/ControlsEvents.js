class ControlsEvents {
    constructor(socket){
        this.socket = socket;
        this.buttonUp = document.querySelector('#up');
        this.buttonUp.onclick = (event) => this.onClickMoveUp(event);
        this.buttonDown = document.querySelector('#down');
        this.buttonDown.onclick = (event) => this.onClickMoveDown(event);
        this.buttonRight = document.querySelector('#right');
        this.buttonRight.onclick = (event) => this.onClickMoveRight(event);
        this.buttonLeft = document.querySelector('#left');
        this.buttonLeft.onclick = (event) => this.onClickMoveLeft(event);
        this.buttonShoot = document.querySelector('#fire');
        this.buttonShoot.onclick = (event) => this.onClickShoot(event);
    }
    onClickMoveUp(event) {
        this.socket.move(6);
    }
    onClickMoveDown(event) {
        this.socket.move(2);
    }
    onClickMoveRight(event) {
        this.socket.move(0);
    }
    onClickMoveLeft(event) {
        this.socket.move(4);
    }
    onClickShoot(event) {
        this.socket.shoot();
    }
}