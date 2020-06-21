class ControlsEvents {
    constructor(socket) {

        this.socket = socket;

        setInterval( ()=> {
            if (joyMove.GetDir() == "C"){
                this.onTouchEnd();
            }
            else {
                this.onTouch(joyMove.GetX(),joyMove.GetY());
            }
            if (joyShoot.GetDir() == "C"){ }
            else {
                this.onTouchShoot(joyShoot.GetX(),joyShoot.GetY());
            }
        },1000/60);
        document.getElementById("attackUpgrade").addEventListener("click", () => this.attackUp());
        document.getElementById("speedUpgrade").addEventListener("click", () => this.speedUp());
        document.getElementById("sizeUpgrade").addEventListener("click", () => this.sizeUp());
        document.getElementById("attackSpeedUpgrade").addEventListener("click", () => this.attackSpeedUp());
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
        console.log(this.socket);
        this.socket.shoot(angle - Math.PI/2);
    }

    attackUp(){
        this.socket.upgrade(0);
    }
    speedUp(){
        this.socket.upgrade(1);
    }
    sizeUp(){
        this.socket.upgrade(2);
    }
    attackSpeedUp(){
        this.socket.upgrade(3);
    }
}    