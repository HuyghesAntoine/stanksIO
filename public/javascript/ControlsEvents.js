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

        document.getElementById("attackUpgrade").addEventListener("click", this.attackUp);
        document.getElementById("speedUpgrade").addEventListener("click", this.speedUp);
        document.getElementById("sizeUpgrade").addEventListener("click", this.sizeUp);
        document.getElementById("attackSpeedUpgrade").addEventListener("click", this.attackSpeedUp);
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


    attackUp(){
        //document.getElementById("attackUpgrade").classList.add("btn-success");
        document.getElementById("attackUpgrade").disabled = true;
    }
    speedUp(){
        //document.getElementById("speedUpgrade").classList.add("btn-success");
        document.getElementById("speedUpgrade").disabled = true;
    }
    sizeUp(){
        //document.getElementById("sizeUpgrade").classList.add("btn-success");
        document.getElementById("sizeUpgrade").disabled = true;
    }
    attackSpeedUp(){
        //document.getElementById("attackSpeedUpgrade").classList.add("btn-success");
        document.getElementById("attackSpeedUpgrade").disabled = true;
    }
}