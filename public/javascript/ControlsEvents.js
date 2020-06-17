class ControlsEvents {
    constructor(socket) {
        this.socket = socket;
        this.buttonUp = document.querySelector('#up');
        this.buttonUp.onclick = (event) => this.onClickMoveUp(event);
        this.buttonUp.onkeypress = (event) => this.myFunction(event);
        this.buttonDown = document.querySelector('#down');
        this.buttonDown.onclick = (event) => this.onClickMoveDown(event);
        this.buttonRight = document.querySelector('#right');
        this.buttonRight.onclick = (event) => this.onClickMoveRight(event);
        this.buttonLeft = document.querySelector('#left');
        this.buttonLeft.onclick = (event) => this.onClickMoveLeft(event);
        this.buttonShoot = document.querySelector('#fire');
        this.buttonShoot.onclick = (event) => this.onClickShoot(event);
<<<<<<< HEAD
        this.buttonPseudo = document.querySelector('#pseudo');
        this.buttonPseudo.onclick = (event) => this.onSubPseudo(event, pseudo);
        this.flag = false;

        this.controlCanvas = document.querySelector('#controlCanvas'); 
        this.controlCanvas.addEventListener('touchstart', (event) => this.onTouch(event), false);
        this.controlCanvas.addEventListener('touchmove', (event) => this.onTouchMove(event), false);
        this.controlCanvas.addEventListener('touchend', (event) => this.onTouchEnd(event), false);
=======
>>>>>>> master

        document.getElementById('controlPage').addEventListener('keydown', (event) => this.onKeyDown(event), false);
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;

        this.buttonUp.innerHTML = "xd";
        if (keyCode == 90)
            this.onClickMoveUp(event);
        if (keyCode == 83)
            this.onClickMoveDown(event);
        if (keyCode == 81)
            this.onClickMoveLeft(event);
        if (keyCode == 68)
            this.onClickMoveRight(event);
    }
    onClickMoveUp(event) {
        this.socket.move(3 * (Math.PI / 2));
    }
    onClickMoveDown(event) {
        this.socket.move(Math.PI / 2);
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
    onSubPseudo(event, pseudo) {
        this.socket.ChangePseudo(pseudo);
    }

    onTouch(event){
        this.buttonUp.innerHTML = event.touches[0].pageX + " " + event.touches[0].pageY;
        var angle = Math.atan2(260 - event.touches[0].pageY, 450 - event.touches[0].pageX);
        this.socket.move(angle+Math.PI);
    }
    onTouchMove(event){
        var angle = Math.atan2(this.controlCanvas.clientHeight/2 - event.touches[0].pageY, this.controlCanvas.clientWidth/2 - event.touches[0].pageX);
        this.socket.move(angle+Math.PI);
        this.buttonDown.innerHTML = "angle " + angle;
        this.buttonUp.innerHTML = event.touches[0].pageX + " " + event.touches[0].pageY;
    }
    onTouchEnd(event){
        this.buttonUp.innerHTML = "up";
    }
}