const data = require('./userManager.js');
const path = require('path');



exports.register = function (fn,ln,day,month,year,mail,passwd){
    console.log(fn,ln,day,month,year,passwd,mail);
    const insc = data.insert_user(fn, ln, day, month, year, mail, passwd);
   
}

exports.sign_in = function(req,res){
    const conex = data.get_user(req.body.mail, req.body.mot2pass);
    if(conex){
        req.session.firstname=conex.firstname;
        res.redirect('/?status=success');
        console.log(conex.firstname);
    }
    else{
        res.redirect('/?status=error');
        console.log('erreur');
    }
};