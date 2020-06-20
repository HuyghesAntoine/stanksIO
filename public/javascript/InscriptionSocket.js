class InscriptionSocket {
    constructor() {
      this.socket = io();
    }
  
    Inscription(fn,ln,day,month,year,mail,passwd) {   
      this.socket.emit('inscription',fn, ln, day, month, year, mail, passwd);
    }
}