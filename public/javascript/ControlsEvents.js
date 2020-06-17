class ControlsEvents {
    constructor(socket) {

        this.socket = socket;
        this.body = document.querySelector('#controlPage');

        this.idMove = -1;
        this.idShoot = -1;

        this.controlCanvas = document.querySelector('#controlCanvas2');
        this.controlCanvas.addEventListener('touchstart', (event) => this.onTouch(event), false);
        this.controlCanvas.addEventListener('touchmove', (event) => this.onTouchMove(event), false);
        this.controlCanvas.addEventListener('touchend', (event) => this.onTouchEnd(event), false);


        this.tirCanvas = document.querySelector('#controlCanvas');
        this.tirCanvas.addEventListener('touchstart', (event) => this.onTouchShoot(event), false);
        this.tirCanvas.addEventListener('touchmove', (event) => this.onTouchMoveShoot(event), false);
        this.tirCanvas.addEventListener('touchend', (event) => this.onTouchEndShoot(event), false);

        document.getElementById('controlPage').addEventListener('keydown', (event) => this.onKeyDown(event), false);
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;

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
        if(this.idShoot == -1)
            this.idMove = 0;
        else
            this.idMove = 1;
        var angle = Math.atan2(this.controlCanvas.clientHeight/2 - event.touches[this.idMove].pageY, this.controlCanvas.clientWidth/2 - event.touches[this.idMove].pageX);
        this.socket.move(angle+Math.PI);
    }
    onTouchMove(event){
        var angle = Math.atan2(this.controlCanvas.clientHeight/2 - event.touches[this.idMove].pageY, this.controlCanvas.clientWidth/2 - event.touches[this.idMove].pageX);
        this.socket.move(angle+Math.PI);
    }
    onTouchEnd(event){
        this.socket.stopMove();
        this.idMove = -1;
    }

    onTouchShoot(event){
        if(this.idMove == -1)
            this.idShoot = 0;
        else
            this.idShoot = 1;
        console.log(event.touches);
        var angle = Math.atan2(this.controlCanvas.clientHeight/2 - event.touches[this.idShoot].pageY, this.controlCanvas.clientWidth+this.controlCanvas.clientWidth/2 - event.touches[this.idShoot].pageX);
        this.socket.shoot(angle+Math.PI);
    }
    onTouchMoveShoot(event){
        var angle = Math.atan2(this.controlCanvas.clientHeight/2 - event.touches[this.idShoot].pageY, this.controlCanvas.clientWidth+this.controlCanvas.clientWidth/2 - event.touches[this.idShoot].pageX);
        this.socket.shoot(angle+Math.PI);
    }
    onTouchEndShoot(event){
        this.idShoot = -1;
    }
}