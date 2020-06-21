const manager = require ('./manager');
exports.insert_user = function (lastname,firstname,day,month,year,email,passwd){
    const db = manager.connect();
    var birthday=day+"-"+month+"-"+year;
    const sq4 = "INSERT INTO users (lastname,firstname,birthdate,email,passwd) VALUES (?,?,?,?,?)"
    const req4 = db.prepare(sq4).run(lastname,firstname,birthday,email,passwd);
    db.close();
    return req4;
}

exports.get_user = function (email,passwd){
    const db = manager.connect();
    const sq5 = "SELECT firstname FROM users WHERE email=? and passwd=?"
    const req5 = db.prepare(sq5).get(email,passwd);
    db.close();
    return req5;
}
