class InscriptionEvents {
    constructor(socket) {
      this.socket = socket;
    }
  
    Inscription(event,fn,ln,day,month,year,passwd,mail) {
        this.socket.Inscription(fn,ln,day,month,year,mail,passwd);
    }
}