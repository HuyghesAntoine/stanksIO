class ControlsEvents {
    constructor(socket) {

        this.socket = socket;

        setInterval( ()=> { //60 times per seconds
            if (joyMove.GetDir() == "C"){
                this.onTouchEnd(); //check if joystick is release
            }
            else {
                this.onTouch(joyMove.GetX(),joyMove.GetY()); //refresh the position of joystick and move
            }
            if (joyShoot.GetDir() == "C"){ }
            else {
                this.onTouchShoot(joyShoot.GetX(),joyShoot.GetY()); //refresh the position of joystick and shoot
            }
        },1000/60);

        //listener for upgrades
        document.getElementById("attackUpgrade").addEventListener("click", () => this.upgrade(0));
        document.getElementById("speedUpgrade").addEventListener("click", () => this.upgrade(1));
        document.getElementById("sizeUpgrade").addEventListener("click", () => this.upgrade(2));
        document.getElementById("attackSpeedUpgrade").addEventListener("click", () => this.upgrade(3));
    }

    onSubPseudo(event, pseudo) {
        this.socket.ChangePseudo(pseudo);
    }

    onTouch(x,y) {
        var angle = Math.atan2(x,y);
        this.socket.move(angle - Math.PI/2);
    }
    onTouchEnd() {
        this.socket.stopMove();
        this.idMove = -1;
    }

    onTouchShoot(x,y) {
        var angle = Math.atan2(x,y);
        this.socket.shoot(angle - Math.PI/2);
    }

    upgrade(i){
        this.socket.upgrade(i);
    }
}    