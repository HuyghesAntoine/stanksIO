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
        this.formpseudo = document.querySelector('#pseud');
        pseudo = document.querySelector('#pseud').value;
        this.formpseudo.onsubmit = (event) => this.onSubPseudo(event);
    }
    onClickMoveUp(event) {
        this.socket.move(3*(Math.PI/2));
    }
    onClickMoveDown(event) {
        this.socket.move(Math.PI/2);
    }
    onClickMoveRight(event) {
        this.socket.move(0);
    }
    onClickMoveLeft(event) {
        this.socket.move(Math.PI);
    }
    onClickShoot(event) {
        this.socket.shoot();
    }
    onSubPseudo(event,pseudo){
        this.socket.ChangePseudo(pseudo);
    }
}