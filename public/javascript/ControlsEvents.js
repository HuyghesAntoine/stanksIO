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
            if (joyShoot.GetDir() == "C"){
                
            }
            else {
                this.onTouchShoot(joyShoot.GetX(),joyShoot.GetY());
            }
        },1000/60);
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
}