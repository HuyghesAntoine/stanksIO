const data = require('./userManager.js');
const path = require('path');



exports.register = function (req,res){
    const insc = data.insert_user(req.body.lastname,req.body.firstname,req.body.jour,req.body.month,req.body.year,req.body.mail,req.body.mot2pass);
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
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