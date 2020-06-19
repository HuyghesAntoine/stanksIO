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
        console.log(this.socket);
        this.socket.shoot(angle - Math.PI/2);
    }

    upgrade(value){
        console.log(this.socket);
        this.socket.upgrade(value);
    }

    attackUp(){
        //document.getElementById("attackUpgrade").classList.add("btn-success");
        document.getElementById("attackUpgrade").disabled = true;
        this.upgrade(0);
    }
    speedUp(){
        //document.getElementById("speedUpgrade").classList.add("btn-success");
        document.getElementById("speedUpgrade").disabled = true;
        this.socket.upgrade(1);
    }
    sizeUp(){
        //document.getElementById("sizeUpgrade").classList.add("btn-success");
        document.getElementById("sizeUpgrade").disabled = true;
        this.socket.upgrade(2);
    }
    attackSpeedUp(){
        //document.getElementById("attackSpeedUpgrade").classList.add("btn-success");
        document.getElementById("attackSpeedUpgrade").disabled = true;
        this.socket.upgrade(3);
    }
}